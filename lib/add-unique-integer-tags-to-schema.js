  var async = require('async');
  var mongoose = require('mongoose');

  var Counter = mongoose.model('Counter', {
    _id: {
      type: String,
      required: true
    },
    seq: {
      type: Number,
      required: true
    }
  });

  var getNextInSequence = function(tag, callback) {
    Counter.findOneAndUpdate({
        _id: tag
      }, {
        $inc: {
          seq: 1
        }
      }, {
        new: true,
        upsert: true
      },
      function(err, counter) {
        callback(err, counter && counter.seq);
      }
    );
  };

  var addUniqueIntegerTagToSchema = function(tag, schema) {
    schema.pre('save', function(next) {
      var datum = this;
      if (datum[tag] === undefined) {
        getNextInSequence(tag, function(error, idValue) {
          if (error) {
            next(new Error(error));
          } else {
            datum[tag] = idValue;
            next();
          }
        });
      }
    });
  };

  module.exports = addUniqueIntegerTagToSchema;
  module.exports.getNextInSequence = getNextInSequence;
  module.exports.Counter = Counter;

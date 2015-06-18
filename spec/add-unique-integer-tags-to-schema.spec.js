/* global beforeAll: true, afterAll: true */

var assert = require('assert');
var async = require('async');

var mongoUrl = 'mongodb://localhost/counters';
var mongoose = require('mongoose');
mongoose.connect(mongoUrl);

var addUniqueIntegerTagToSchema = require('../lib/add-unique-integer-tags-to-schema.js');
var Counter = addUniqueIntegerTagToSchema.Counter;
var getNextInSequence = addUniqueIntegerTagToSchema.getNextInSequence;

describe('database counters', function() {

  beforeEach(function(done) {
    Counter.remove({
        _id: {
          $in: ['deNovo', 'recycled', 'antiche']
        }
      },
      done);
  });

  describe('getNextInSequence', function() {

    it('creates a sequence when none exists', function(done) {
      getNextInSequence('deNovo', function(error, sequence) {
        Counter.find({
          _id: 'deNovo'
        }).count(function(err, count) {
          expect(err).toBeFalsy();
          expect(count).toBe(1);
          done();
        });
      });
    });

    it('does not create a new sequence when one exists', function(done) {
      Counter.create({
        _id: 'antiche',
        seq: 1832
      }, function(error, counter) {
        getNextInSequence('antiche', function(error, count) {
          expect(error).toBeFalsy();
          expect(count).toBe(1833);
          done();
        });
      });
    });

    it('provides a new id for each request', function(done) {
      async.times(5,
        function(err, next) {
          getNextInSequence('recycled', function(error, count) {
            expect(error).toBeFalsy();
            next(error, count);
          });
        },
        function(err, ids) {
          expect(ids.sort()).toEqual([1, 2, 3, 4, 5, ]);
          done();
        }
      );

    });
  });
});

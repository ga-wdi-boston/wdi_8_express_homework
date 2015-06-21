var mongoose = require('mongoose');

var directorSchema = new mongoose.Schema({
  director: {
    type: String,
    required: true
  }
});

var actorSchema = new mongoose.Schema({
  actor: {
    type: String,
    required: true
  }
});

var enumeratedGenreTypes = ['action comedy crime drama suspense horror romance science-fiction fantasy war western'].join(' ').split(' ');

var genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    enum: {
      values: enumeratedGenreTypes
      }
    }
});

var enumeratedRatings = ['G PG PG-13 R NC-17 Foreign Unrated Other'].join(' ').split(' ');

var ratingsSchema = new mongoose.Schema({
  ratings: {
    type: String,
    required: true,
    enum: {
      values: enumeratedRatings
    }
  }
});

var enumeratedStars = ['1/2 1 1*1/2 2 2*1/2 3 3*1/2 4 4*1/2 5']

var reviewSchema = new mongoose.Schema({
  title: String,
  reviewer: String,
  starRating: {
    type: String,
    required: true,
    enum: {
      values: enumeratedStars
    }
  },
  pubDate: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  }
});

var movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  director: [directorSchema],
  actor: [actorSchema],
  genre: [genreSchema],
  director: [directorSchema],
  review: [reviewSchema]
});

movieSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

movieSchema.virtual('fullName').set(function(name) {
  var names = name.split(' ');
  this.firstName = names[0];
  this.lastName = names[1];
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

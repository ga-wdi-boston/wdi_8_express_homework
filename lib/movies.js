var mongoose = require('mongoose');

// Director schema
/*
  { director: "George Miller"}
*/

var directorSchema = new mongoose.Schema({
  director: {
    type: String,
    required: true
  }
});

// Actor schema
/*
  { actor: "Tom Hardy"}
*/

var actorSchema = new mongoose.Schema({
  actor: {
    type: String,
    required: true
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

// Review Schema
/*
{
  title: "What a Lovely Lovely Film",
  reviewer: "Peter White",
  starRating: '5',
  pubDate: '06/21/2015'
  body: "This movie is a beautiful nightmare, one I wish to dream of again."
}
*/

var enumeratedRatings = ['G PG PG-13 R NC-17 Foreign Unrated Other'].join(' ').split(' ');
var enumeratedGenreTypes = ['action comedy crime drama suspense horror romance science-fiction fantasy war western'].join(' ').split(' ');

var movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true,
    enum: {
      values: enumeratedRatings
    }
  },
  genre: {
    type: String,
    required: true,
    enum: {
      values: enumeratedGenreTypes
    }
  },
  director: [directorSchema],
  actor: [actorSchema],
  review: [reviewSchema]
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

// Movie schema
/*
{
  title: 'Mad Max: Fury Road',
  year: '2015',
  rating: "R",
  genre: "action",
  director: [{
    'George Miller'
  }],
  actor: [{
    "Tom Hardy"
  }],
  review: [{
  title: "What a Lovely Lovely Film",
  reviewer: "Peter White",
  starRating: '5',
  pubDate: '06/21/2015'
  body: "This movie is a beautiful nightmare, one I wish to dream of again."
  }]
}
*/

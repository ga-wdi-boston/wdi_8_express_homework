'use strict'

var express = require('express');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();


var app = express();


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wdi');

var Movie = require('./lib/movies.js');


app.get('/api/v1/movies', function(req, res){
  Movie.find({}, function(error, movieList){
    if(error){
      console.log(error);
      res.statusCode(404);
    }
    res.json(movieList);
  })
});

app.get('/api/v1/movies/:id', function(req, res){
  Movie.find({
    _id: req.params.id
  }, function(error, movie ){
    if(error){
    console.log(error);
    res.json(movie);
  }
  res.json(movie);
  });
});

app.post('/api/v1/movies/', jsonParser);
app.post('/api/v1/movies/', function(req, res) {
  Movie.create(req.body, function(error, movie) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });
});

app.patch('/api/v1/movies/:id', jsonParser);
app.patch('/api/v1/movies/:id', function(req, res){
  Movie.findByIdAndUpdate(req.params.id, req.body, {overwrite: true}, function(error, movie){
    if(error){
      console.error(error);
      res.sendStatus(400);
    }
    console.log('Changed')
    res.sendStatus(200);
  });
});

app.patch('/movies/:id', jsonParser);
app.patch('/movies/:id', function(req, res) {
  Movie.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, function(error, movie) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/movies/:id', function(req, res) {
  Movie.remove({
    _id: req.params.id
  }, function(error) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

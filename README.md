# Homework in Express

## Objectives

* Set up and configure a project to use express 
* Configure routes and handlers in express
* Explain and use the express concepts of "handler chains" and "middleware"

## Objectives, to be continued

* Use the 'body-parser' middleware to oarse POST and PUT requests
* Integrate express with mongoose to implement a REST service

## Before we begin: a review of project layout, and helpful resources

Because this is based on our standard Node project template, you have extra resources available to you if you follow the standard node package layout.  It is all documented in the file [LAYOUT.md](doc/LAYOUT.md) in the `./doc` directory in this repository.

Also in that directory, you can find [INSTALL-MongoDB.md](doc/INSTALL-MongoDB.md), a summary of how to install MongoDB; [MongoReferenceCards.pdf](doc/MongoReferenceCards.pdf), a set of reference cards for MongoDB; and [Mongoose-HOWTO.md](doc/Mongoose-HOWTO.md), a summary of Mongoose.

Examples of simple routes and chained routes are in the `./example directory.

## Installing 

Mongoose, Express, and async.js are included in the dependencies in the package.json file already.  Install them, plus all of the development dependencies, by saying `npm install`

# Your Assignment, 

## Part 1: Add s chemas

Your mission is to set up a movie review database.

Movies have a lot of data associated with them!  They have a title, a year of production, a director, and at least one actor.  They also have a genre (which fr our purposes is limited to action, comedy, crime, drama, suspense, horror, romance, science fiction, fantasy, war, and western) and a rating (G, PG, PG-13, R, NC-17, Foreign, Unrated, or Other).

Most movies will have at least one review. Some will have several, and a few will have many.  Reviews have a title, an reviewer, a star rating, a publication date, and a body.

In the first phase of this project, you should create a Mongoose schema and model object according to this description, and some database seed data to verify that the schema and validation work.

## Part 2: Add routes 

Using the contacts web app and the blog-articles web app
that we have developed in class as models and references,
define and implement the necessary routes, handlers, and
other middleware to produce a complete REST API for managing
a set of movies and reviews.

At a minimum, this means five methods:
* create a movie
* retrieve all movies
* retrieve a movie by ID
* update a movie by ID
* delete a movie by ID

If you've picked up on the pattern this far, you can
probably predict what I'm going to say here!  Since the next
step is to create an API to serve HTML, make sure you
implement all these routes in the `/api` namespace.

## Part 3: Add rendering (partially)

Continue working on the movies app.  Get the scaffolding and
infrastructue in place, and try to get as far as we got in
class.

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

# Your Assignment

Your mission is to set up a movie review database.

Movies have a lot of data associated with them!  They have a title, a year of production, a director, and at least one actor.  They also have a genre (which fr our purposes is limited to action, comedy, crime, drama, suspense, horror, romance, science fiction, fantasy, war, and western) and a rating (G, PG, PG-13, R, NC-17, Foreign, Unrated, or Other).

Most movies will have at least one review. Some will have several, and a few will have many.  Reviews have a title, an reviewer, a star rating, a publication date, and a body.

In the first phase of this project, you should create a Mongoose schema and model object according to this description, and some database seed data to verify that the schema and validation work.



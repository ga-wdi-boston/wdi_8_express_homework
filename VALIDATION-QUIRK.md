# A Note on Validation in Mongoose

Mongoose has two ways of querying the database.

One way is idiomatic to Mongoose, and looks like this.  You call `Contact.find()`, or a similar function, and in the callback, modify the objects and call `save()` on them.

```javascript
Contact.find({
  lastName: 'Clinton',
  addresses: {
    $elemMatch: {
      street: /Pennsylvania Avenue/
    }
  }
}, function(error, results) {
  results.foreach(function(clinton) {
    clinton.addresses = clinton.addresses.filter(function(address) {
      return !address.street.match(/Pennsylvania Avenue/);
    });
    clinton.save();
  });
});
```

The other way is idiomatic to MongoDB.  Because a Mongoose model maps directly to a MongoDB collection, you can call MongoDBs find-and-update methods on them as well.

```javascript
Contact.findAndModify({
  lastName: 'Clinton',
  addresses: {
    $elemMatch: {
      street: /Pennsylvania Avenue/
    }
  }
}, {
  $pull: {
    addresses: {
      street: /Pensylvania Avenue/
    }
  }
});
```

In the initial design of Mongoose, using the Mongoose idiom meant you got validation, while using the MongoDB idiom meant you got atomicity -- that is, it is part of the design of the find-and-modify set of functions in Node that no other database changes or updates happen between the find and the update.

This was a reasonable decision at the time. It's not so reasonable now.  The Mongoose project team has decided to change this behavior: when their work on it is completely done, thnn the behavior will be that you get validations with every database write or record modification. 

For now, assume that the MongoDB find-and-modify functions do not perform any validations.  Some do and some don't -- the wok is in progress -- but it is better  defensive programming to assume a lack of validation.

(There is still a small group of people who are very vocal about the effects of validation on atomicity and on performance, but for them Mongoose intends to make it possible to disable the validations on the MongoDB find-and-modify functions.)

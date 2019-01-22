// dependencies
const express = require('express');
const bodyParser = require('body-parser');

// models
const User = require("../models/user.js")
const Recipe = require("../models/recipe.js")

const router = express.Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// api endpoints
router.get('/whoami', function(req, res) {
  if(req.isAuthenticated()){
    res.send(req.user);
  }
  else{
    res.send({});
  }
});

router.get('/user', function(req, res) {
  User.findOne({ _id: req.query._id }, function(err, user) {
    res.send(user);
  });
});

router.get('/recipes', function(req, res) {
  console.log(req.query);
  Recipe.findById(req.query._id, function(err, recipe) {
    if (err) {
          // handle the error
          console.log("An error occured: ", err.message);
    } else if (recipe=== null) {
          // handler the case when no student in the database
          // matches the given id
          console.log("No recipe with the given id found.");
    } else {
          // this means we found the student under name "Aaron"
          res.send(recipe);
    }
  });
});

router.get('/feed', function(req, res) {
  Recipe.find({}, function(err, feed) {
    res.send(feed);
  });
});


router.post(
  '/newrecipe',
  // connect.ensureLoggedIn(),
  function(req, res) {
      console.log("hi");
      console.log(req.body);
      const toPost = new Recipe({
        'name': req.body.rt,
        'description': req.body.rd,
        'ingredients': req.body.ri,
        'steps': req.body.rs,
        'forks': []
      });

      // user.recipes.addTOSet(recipe._id);
      // user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback. 

      toPost.save(function(err,recipe) {
        // configure socketio
        if (err) console.log(err);
      });

      res.send({});
  }
);


router.post('/editrecipe', function(req, res) {
  console.log('edited');
  console.log(req.query);
  // Recipe.findById(req.query.p, function(err, recipe) {
  Recipe.findById('5c4646bf2f469d35cca3336c', function(err, recipe) {
    console.log(recipe);
    if (err) {
          // handle the error
          console.log("An error occured: ", err.message);
    } else if (recipe=== null) {
          // handler the case when no student in the database
          // matches the given id
          console.log("No recipe with the given id found.");
    } else {
          // this means we found the student under name "Aaron"
          console.log(recipe);
          recipe.forks.push({
            'name': req.body.rt,
            'description': req.body.rd,
            'ingredients': req.body.ri,
            'steps': req.body.rs,
            'forks': []
          });
          console.log(recipe.forks);
          recipe.save()
          res.send(recipe);
    }
  });
});

module.exports = router;
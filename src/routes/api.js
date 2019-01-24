// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const connect = require('connect-ensure-login');

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
  console.log("first hello")
  Recipe.find({}, function(err, feed) {
    console.log("second hello")
    res.send(feed);
  });
});

router.post(
  '/newrecipe',
  connect.ensureLoggedIn(),
  function(req, res) {
    User.findOne({ _id: req.user._id },function(err,user) {
      const toPost = new Recipe({
        'name': req.body.rt,
        'author': user.name,
        'description': req.body.rd,
        'ingredients': req.body.ri,
        'steps': req.body.rs,
      });

      // user.set({ last_post: req.body.content });
      user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback. 

      toPost.save(function(err,recipe) {
        // configure socketio
        if (err) console.log(err);
      });

      res.send({});
    });
  }
);


router.post('/editrecipe', function(req, res) {
  const toPost = new Recipe({
        'name': req.body.rt,
        'description': req.body.rd,
        'ingredients': req.body.ri,
        'steps': req.body.rs,
      });

      // user.recipes.addTOSet(recipe._id);
      // user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback. 
      toPost.save(function(err,recipe) {
        // configure socketio
        if (err) console.log(err);
      });

      editId = toPost._id
  // Recipe.findById(req.query.p, function(err, recipe) {
  Recipe.findById(req.body.p, function(err, recipe) {
    if (err) {
          // handle the error
          console.log("An error occured: ", err.message);
    } else if (recipe=== null) {
          // handler the case when no student in the database
          // matches the given id
          console.log("No recipe with the given id found.");
    } else {
          // this means we found the student under name "Aaron"
          
          recipe.forks.push(editId);
          console.log(recipe.forks);
          recipe.save()

          res.send(recipe);
    }
  });
});

module.exports = router;
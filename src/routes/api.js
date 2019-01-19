const express = require('express');
const bodyParser = require('body-parser');

const User = require("../models/user.js")
const Recipe = require("../models/recipe.js")

const router = express.Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/user', function(req, res) {
  User.findOne({ _id: req.query._id }, function(err, user) {
    res.send(user);
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
    User.findOne({ _id: req.user._id },function(err,user) {
      const toPost = new recipe({
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
    });
  }
);
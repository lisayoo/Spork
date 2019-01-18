const express = require('express');

const User = require("../models/user.js")
const Recipe = require("../models/recipe.js")

const router = express.Router()

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
  '/recipe',
  connect.ensureLoggedIn(),
  function(req, res) {
    User.findOne({ _id: req.user._id },function(err,user) {
      const toPost = new recipe({
        'id': user._id,
        'name': req.body.name,
        'author': user.name,
        'recipe': req.body.content,
        'forks': []
      });

      user.set({ last_post: req.body.content });
      user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback. 

      toPost.save(function(err,recipe) {
        // configure socketio
        if (err) console.log(err);
      });

      res.send({});
    });
  }
);
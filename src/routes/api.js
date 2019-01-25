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
  console.log('whoami reached');
  if(req.isAuthenticated()){
    console.log(req.user);
    res.send(req.user);
  }
  else{
    console.log('no user logged in');
    res.send({});
  }
  console.log("idk");
});

router.get('/user', function(req, res) {
  User.findById({ _id: req.query._id }, function(err, user) {
    console.log(user);
    res.send(user);
  });
});

router.get('/recipes', function(req, res) {
  console.log(req.query);
  Recipe.findById(req.query._id, function(err, recipe) {
    if (err) {
          console.log("An error occured: ", err.message);
    } else if (recipe=== null) {
          console.log("No recipe with the given id found.");
    } else {
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
        'author': user._id,
        'authorname': user.name,
        'description': req.body.rd,
        'ingredients': req.body.ri,
        'steps': req.body.rs,
      });
      user.recipes.push(toPost._id);
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
  connect.ensureLoggedIn(),
  User.findOne({ _id: req.user._id },function(err,user) {
  const toPost = new Recipe({
        'name': req.body.rt,
        'author': user._id,
        'authorname' :user.name,
        'description': req.body.rd,
        'ingredients': req.body.ri,
        'steps': req.body.rs,
      });

      toPost.save(function(err,recipe) {
        // configure socketio
        if (err) console.log(err);
      });

      editId = toPost._id
  user.recipes.push(editId);
  Recipe.findById(req.body.p, function(err, recipe) {
    if (err) {
          console.log("An error occured: ", err.message);
    } else if (recipe=== null) {
          console.log("No recipe with the given id found.");
    } else {
          
          recipe.forks.push(editId);
          console.log(recipe.forks);
          recipe.save()

          res.send(recipe);
    }

   });
  });
});

router.post(
  '/editpropic',
  // connect.ensureLoggedIn(),
  function(req, res) {
  User.findById(req.body.u, function(err, user) {
    if (err) {
          console.log("An error occured: ", err.message);
    } else if (recipe=== null) {
          console.log("No user with the given id found.");
    } else {
          cloudinary.v2.uploader.upload(req.body.pic, 
            {width: 1000, height: 1000, crop: "limit",public_id: req.body._id},
            function(error, result){
              console.log(result, error);
              user.set({image_url: result.url})
            });
          user.forks.push(editId);
          console.log(recipe.forks);
          recipe.save()

          res.send(recipe);
    }
  });
  }
);

module.exports = router;
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
  // var currentLocation = window.location;
  // console.log('currentLocation.href');
  // console.log(currentLocation.href);
  Recipe.find({}, function(err, feed) {
    res.send(feed);
  });
});

router.get('/following', function(req, res) {
  console.log('getting list of following');
  User.find({_id: { $in: req.query.following }}, function(err, following) {
    res.send(following);
  });
});

router.get('/followers', function(req, res) {
  console.log('getting list of followers');
  User.find({_id: { $in: req.query.followers }}, function(err, followers) {
    res.send(followers);
  });
});

// router.get('/search', function(req, res) {
//   User.find( {name: req.query.key}, function(err, results) {
//     if (err) {
//       console.log("An error occured: ", err.message);
//     } else {
//       console.log("results found");
//       res.send(results);
//     }
//   });

//   Recipe.find( {nae: req.query.key} , function (err, results) {
//     if (err) {
//       console.log("An error occured: ", err.message);
//     } else {
//       console.log("results found");
//       res.send(results);
//     }
//   });
// });

// Student.find({name: "Aaron"}, function(err, students_named_Aaron) {
//       if (err) {
//             // handle the error
//             console.log("An error occured: ", err.message);
//       } else if (students_named_Aaron.length === 0) {
//             // handler the case when no student in the database
//             // matches the given parameters
//             console.log(`No students under name "Aaron" found.`);
//       } else {
//             // this means we found "many" students under name "Aaron"
//             console.log("The number of students named Aaron is ", students_named_Aaron.length);
//       }
// });

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
  User.findOne({ _id: req.user._id }, function(err,user) {
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
});


router.post('/editprofile', function(req, res) {
  connect.ensureLoggedIn(),
  User.findOne({ _id: req.user._id }, function(err,user) {
      console.log(req.body)
      user.set({name: req.body.n});
      user.set({bio: req.body.b});
      user.save();
  });
});
// router.post(
//   '/editpropic',
//   // connect.ensureLoggedIn(),
//   function(req, res) {
//   User.findById(req.body.u, function(err, user) {
//     if (err) {
//           console.log("An error occured: ", err.message);
//     } else if (recipe=== null) {
//           console.log("No user with the given id found.");
//     } else {
//           cloudinary.v2.uploader.upload(req.body.pic, 
//             {width: 1000, height: 1000, crop: "limit",public_id: req.body._id},
//             function(error, result){
//               console.log(result, error);
//               user.set({image_url: result.url})
//             });
//           user.forks.push(editId);
//           console.log(recipe.forks);
//           recipe.save()

//           res.send(recipe);
//     }
//   });
//   }
// );

router.post(
  '/subscribe',
  connect.ensureLoggedIn(),
  function(req, res) {
    console.log('i am trying to subscribe!!!');
    User.findOne({ _id: req.user._id },function(err,user) {
      user.following.push(req.body.id);
      console.log('my following' + user.following);
       user.save();
      User.findOne({_id: req.body.id}, function(err,them) {
        them.followers.push(req.user._id);
        console.log('their followers' + them.followers);
        them.save();
      });
    });
  res.send({});
});

router.post(
  '/unsubscribe',
  connect.ensureLoggedIn(),
  function(req, res) {
    console.log('UNSUBSCRIBE >:(');
    User.findOne({ _id: req.user._id },function(err,user) {
      user.following.pull(req.body.id);
      console.log('my following' + user.following);
       user.save();
      User.findOne({_id: req.body.id}, function(err,them) {
        them.followers.pull(req.user._id);
        console.log('their followers' + them.followers);
        them.save();
      });
    });
  res.send({});
});

module.exports = router;




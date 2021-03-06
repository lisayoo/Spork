// dependencies
const express = require('express');
const cloudinary = require('cloudinary');
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connect = require('connect-ensure-login');

// models
const User = require("../models/user.js")
const Recipe = require("../models/recipe.js")

const router = express.Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const profile_storage = cloudinaryStorage({
cloudinary: cloudinary,
folder: "profiles",
allowedFormats: ["jpg", "png"],
transformation: [{ width: 200, height: 200, crop: "crop", gravity: "face"}]
});

const recipe_pic_storage = cloudinaryStorage({
cloudinary: cloudinary,
folder: "recipe_pics",
allowedFormats: ["jpg", "png"],
transformation: [{ width: 500, height: 700, crop: "limit"}]
});

const profile_parser = multer({ storage: profile_storage });
const recipe_parser = multer({ storage: recipe_pic_storage });

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
  console.log("REQUEST RECIPE ID: " + req.query._id);
  // {
  //   $graphLookup: {
  //   from: 'recipes', // Explore the movies collection
  //   startWith: '$forks', // Start with movies that contain Arnold's _id
  //   connectFromField: 'forks', // Match actors in one movie...
  //   connectToField: '_id', // to actors in another movie
  //   as: 'forks',
  //   depthField: 'steps'
  // }}



  // Recipe.aggregate([
  //   { $match : 
  //     { _id: mongoose.Types.ObjectId(req.query._id) }},
  //   { $graphLookup: 
  //     { from: 'recipes', // Explore the movies collection
  //       startWith: '$forks', // Start with movies that contain Arnold's _id
  //       connectFromField: 'forks', // Match actors in one movie...
  //       connectToField: '_id', // to actors in another movie
  //       as: 'tree',
  //       depthField: 'depth'}}
  //   ], 
  //   function(err, tree){
  //         console.log('TREE IS: ');
  //         for (i =0; i< tree[0].tree.length; i++){
  //         console.log(tree[0].tree[i]);
  //     }
  //     } );


  Recipe.findById(req.query._id)
    .populate({path: 'forks'}).exec((err, recipe) => {
      if (err) {
          // handle the error
          console.log("An error occured: ", err.message);
    } else if (recipe=== null) {
          // handler the case when no student in the database
          // matches the given id
          console.log("No recipe with the given id found.");
    } else {
      
          res.send(recipe);


       }
    });

    


  // Recipe.findById(req.query._id, function(err, recipe) {
  //   if (err) {
  //         // handle the error
  //         console.log("An error occured: ", err.message);
  //   } else if (recipe=== null) {
  //         // handler the case when no student in the database
  //         // matches the given id
  //         console.log("No recipe with the given id found.");
  //   } else {
  //         res.send(recipe);


  //      }
  // });
});

router.get('/feed', function(req, res) {
  console.log("first hello")
  Recipe.find({}, function(err, feed) {
    console.log("second hello")
    res.send(feed);
  });
});

router.get('/recipe4user', function(req, res) {
  Recipe.find({}, function(err, feed) {

  })
});

router.get('/following',  function(req, res) {
  const desiredUser = req.query;
  console.log('desiredUser:' + desiredUser);
  console.log('getting list of following');
  console.log(desiredUser._id);
  User.findOne({_id: desiredUser._id}, function(err, user) {
    console.log('V IMPT' + user._id);
    console.log('what about my following' + user.following);
    res.send(user.following);
  });
});

router.get('/followers', function(req, res) {
  const desiredUser = req.query;
  console.log('desiredUser:' + desiredUser);
  console.log('getting list of followers');
  User.findOne({_id: desiredUser._id}, function(err, user) {
    console.log(user);
    res.send(user.followers);
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
  connect.ensureLoggedIn(),recipe_parser.single("image"),
  function(req, res) {
    if (req.file !== undefined){
    User.findOne({ _id: req.user._id },function(err,user) {
      const toPost = new Recipe({
        'name': req.body.title,
        'author': user._id,
        'authorname': user.name,
        'description': req.body.recipedescription,
        'ingredients': req.body.ingredients,
        'steps': req.body.steps,
        'image_url': req.file.secure_url

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
  } else {
        User.findOne({ _id: req.user._id },function(err,user) {
      const toPost = new Recipe({
        'name': req.body.title,
        'author': user._id,
        'authorname': user.name,
        'description': req.body.recipedescription,
        'ingredients': req.body.ingredients,
        'steps': req.body.steps,

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

  }
);


router.post('/editrecipe',  connect.ensureLoggedIn(), recipe_parser.single("image"),function(req, res) {
  if (req.file !== undefined){
  User.findOne({ _id: req.user._id }, function(err,user) {
    const toPost = new Recipe({
        'name': req.body.rt,
        'author': user._id,
        'authorname' :user.name,
        'description': req.body.rd,
        'ingredients': req.body.ri,
        'steps': req.body.rs,
        'image_url':req.file.secure_url
      });

      // user.recipes.addTOSet(recipe._id);
      // user.save(); // this is OK, because the following lines of code are not reliant on the state of user, so we don't have to shove them in a callback. 
      toPost.save(function(err,recipe) {
        // configure socketio
        if (err) console.log(err);
      });

      editId = toPost._id
    user.recipes.push(editId);
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
} else {
  User.findOne({ _id: req.user._id }, function(err,user) {
    const toPost = new Recipe({
        'name': req.body.rt,
        'author': user._id,
        'authorname' :user.name,
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
    user.recipes.push(editId);
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
  }
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

router.post('/vote', function(req, res) {
  connect.ensureLoggedIn(),
  User.findOne({ _id: req.user._id }, function(err,user) {
      if(req.body.type ==true){
          user.upvoted.push(req.body.recipe);
      } 
      user.save();
  
  Recipe.findOne({_id: req.body.recipe},function(err, recipe){
    if(req.body.type ==true){
      recipe.upvotes.push(user._id);
    } else {
      recipe.downvotes.push(user._id);
    }  
    recipe.save();
  });
    });
});

router.post('/profilepic', connect.ensureLoggedIn(),  profile_parser.single("image"), function(req,res){
  User.findOne({ _id: req.user._id }, function(err,user) {
     user.set({image_url: req.file.secure_url});
     user.save();
  });
  console.log("successfully set propic");
  //console.log(req.body.pic);
  // cloudinary.uploader.upload(req.body.pic.name, function(result){
  //   User.findById(req.user._id, function(err, user) {
  //     user.set({image_url: result.url});
  //     user.save();
  //     console.log(result.url);
  //   });
  // });
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
      user.following.addToSet(req.body.id);
      console.log('my following' + user.following);
       user.save();
      User.findOne({_id: req.body.id}, function(err,them) {
        them.followers.addToSet(req.user._id);
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
    console.log('UNSUBSCRIBE >:(1111111');
    console.log('req.user._id' + req.user._id);
    console.log('req.body,id' + req.body.id);

    User.findOneAndUpdate( { _id: req.user._id}, { $pullAll: { following: [req.body.id] } }, { new: true }, 
      function(err, data) {} 
    );

    console.log('hi');
    User.findOneAndUpdate( { _id: req.body.id}, { $pullAll: { followers: [req.user._id]}}, { new: true },
      function(err, data) {}
    );
  res.send({});
});


module.exports = router;
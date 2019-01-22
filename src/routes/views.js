// dependencies
const express = require('express');
const router = express.Router();

// public endpoints
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'src/views' });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/recipe', function(req, res) {
   res.sendFile('recipe.html', { root: 'src/views' });
});

router.get('/edit', function(req, res) {
   res.sendFile('edit.html', { root: 'src/views' });
});

router.get('/u/profile', function(req, res) {
  req.sendFile('profile.html',{ root: 'src/views' });
});

router.get('/feed', function(req, res) {
  res.sendFile('feed.html',{ root: 'src/views' });
});

// router.get('/newrecipe', function(req, res, next) {
//   res.sendFile('index.html', { root: 'src/views' });
// });

module.exports = router;


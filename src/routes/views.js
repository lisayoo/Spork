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
	console.log(req.user);
   res.sendFile('edit.html', { root: 'src/views' });
});

router.get('/view', function(req, res) {
   res.sendFile('view.html', { root: 'src/views' });
});

router.get('/u/profile', function(req, res) {
  res.sendFile('profile.html',{ root: 'src/views' });
});

router.get('/feed', function(req, res) {
  res.sendFile('feed.html',{ root: 'src/views' });
});

router.get('/search', function (req, res) {
	res.sendFile('search.html', { root: 'src/views' });
});

router.get('/u/followers', function(req, res) {
  res.sendFile('followers.html', { root: 'src/views' });
});

router.get('/u/following', function(req, res) {
  res.sendFile('following.html', { root: 'src/views' });
});

router.get('/404', function(req, res) {
  res.sendFile('404.html', { root: 'src/views' });
});

router.get('/subfeed', function(req, res) {
  res.sendFile('subfeed.html', { root: 'src/views'});
})

// router.get('/newrecipe', function(req, res, next) {
//   res.sendFile('index.html', { root: 'src/views' });
// });

module.exports = router;


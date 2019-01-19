// libraries
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const cors = require('cors');

// local dependencies
const db = require('./db.js');
const passport = require('./passport');
const views = require('./routes/views.js');
const api = require('./routes/api.js')

// initialize express app
const app = express();

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

// authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/login' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);

// set routes
app.use('/', views);
app.use('/api', api);
app.use('/static', express.static('public'));

// 404 route
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// route error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});

// port config
const port = 3000; // config variable
const server = http.Server(app);
server.listen(port, function() {
  console.log('Server running on port: ' + port);
});
const mongoose = require("mongoose");

// const mongoURL = process.env.ATLAS_SRV;
const mongoURL = process.env.ATLAS_SRV;
const options = { };

// connects to MongoDB
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise; // <- will explain what this is next week
const dbConnection = mongoose.connection;
// error handler
dbConnection.on('error', console.error.bind(console, 'connection error:'));
// optional: run when connection is successful
dbConnection.on('connected', function() {
      console.log('database connected');
});

const cloudinary = require("cloudinary");
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");


cloudinary.config({
	cloud_name: 'spork',
	api_key: '931476311764324',
	api_secret: 'UzuJ9BZe7ERB83QuBV7la1DhSJc'
})
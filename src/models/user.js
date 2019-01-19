const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	bio: String,
	recipes: [ObjectId]
});

const user = mongoose.model("user", userSchema);
module.exports = user;
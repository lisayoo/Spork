const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	image_url : {type: String, default: ''},
	googleid: String,
	name: String,
	bio: String,
	recipes: {type: Array, of: mongoose.Schema.Types.ObjectId, ref: 'recipe'},
	followers: {type: Array, of: mongoose.Schema.Types.ObjectId, ref: 'user', unique: true},
	following: {type: Array, of: mongoose.Schema.Types.ObjectId, ref: 'user', unique: true},
	upvoted: {type: Array, of: mongoose.Schema.Types.ObjectId, ref:'recipe',unique: true }
})

const user = mongoose.model("user", userSchema);
module.exports = user;module.exports = user;
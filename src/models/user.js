const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	image_url : String,
	googleid: String,
	name: String,
	bio: String,
	recipes: {type: Array, of: mongoose.Schema.Types.ObjectId, ref: 'recipe'}
})

const user = mongoose.model("user", userSchema);
module.exports = user;module.exports = user;
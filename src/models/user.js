const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	googleid: String,
	name: String,
	bio: String
})

const user = mongoose.model("user", userSchema);
module.exports = user;module.exports = user;
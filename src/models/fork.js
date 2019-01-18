
const mongoose= require('mongoose');

const forkSchema = new mongoose.Schema ({
	id: Number,
	name: String,
	author: String,
	upload_date: {type: Date, default: Date.now},
	edits: {type: Array, of: Map},
	forks: {type: Array, of:Number}


});

const fork = mongoose.model("fork", forkSchema);
module.exports = fork;
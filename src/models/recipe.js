
const mongoose= require('mongoose');

const forkSchema = new mongoose.Schema ({
	name: String,
	author: String,
	upload_date: {type: Date, default: Date.now},
	edits: {type: Array, of: Map},
	forks: [forkSchema]

});

const recipeSchema = new mongoose.Schema ({
	name: String,
	author: String,
	upload_date: {type: Date, default: Date.now},
	recipe: {type: Map, of: String},
	forks: [forkSchema]


});

const recipe = mongoose.model("recipe", recipeSchema);
module.exports = recipe;
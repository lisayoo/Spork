
const mongoose= require('mongoose');

const forkSchema = new mongoose.Schema ({
	name: {type: String, default: ''},
	// author: String,
	upload_date: {type: Date, default: Date.now},
	description: {type: String, default: ''},
	ingredients: {type: String, default: ''},
	steps: {type: String, default: ''},
	forks: []
	// forks: [forkSchema]

});


const recipeSchema = new mongoose.Schema ({
	// name: String,
	//author: String,
	// upload_date: {type: Date, default: Date.now},
	// description: String,
	// ingredients: String,
	// steps: String,
	// forks: [forkSchema]

	name: {type: String, default: ''},
	upload_date: {type: Date, default: Date.now},
	description: {type: String, default: ''},
	ingredients: {type: String, default: ''},
	steps: {type: String, default: ''},
	forks: [forkSchema]


});

const recipe = mongoose.model("recipe", recipeSchema);
module.exports = recipe;
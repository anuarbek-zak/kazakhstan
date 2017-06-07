var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
	name:String,
	children:[{type: mongoose.Schema.Types.ObjectId}],
	isChild:Boolean
});

module.exports = mongoose.model('Category', categorySchema);

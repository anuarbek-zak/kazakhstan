var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	name:String,
	description:String
});

module.exports = mongoose.model('Article', articleSchema);

var mongoose = require('mongoose');

var actionSchema = new mongoose.Schema({
		title:String,
		description:String,
		date:String
});

module.exports = mongoose.model('Action', actionSchema);

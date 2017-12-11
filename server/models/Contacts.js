var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	phone:String,
	address:String,
	siteNumber:String
});

module.exports = mongoose.model('Contacts', schema);
	
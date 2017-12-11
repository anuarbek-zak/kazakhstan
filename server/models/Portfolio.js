var mongoose = require('mongoose');

var portfolioSchema = new mongoose.Schema({
		name:String,
		description:String,
		image:String,
		siteNumber:String
});

module.exports = mongoose.model('Portfolio', portfolioSchema);

var mongoose = require('mongoose');

var gallerySchema = new mongoose.Schema({
	path:String,
	siteNumber:String
});

module.exports = mongoose.model('Gallery', gallerySchema);

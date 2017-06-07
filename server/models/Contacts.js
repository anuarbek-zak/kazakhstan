var mongoose = require('mongoose');

var contanctsSchema = new mongoose.Schema({
		number:String,
		mobile:String,
		address:String,
		email:String
});

module.exports = mongoose.model('Contancts', contanctsSchema);

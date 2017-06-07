var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	category_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Type'},
	description:String,
	name:String,
	images:[{type: String}]
});

module.exports = mongoose.model('Product', productSchema);

var Contacts = require('../models/Contacts');

var contact = Contacts({
	number:'878798',
		mobile:'87771986202',
		address:'Баймагамбетова 3№10',
		email:'amabilis.amabilis@mail.ru'
});

contact.save(function(error){
	if(error) return next(error);
});

// Contacts.remove({},function(error){
// 	if(error) return next(error);
// 	console.log('removed');
// })

module.exports.getAll = function(req, res, next){
	Contacts.find({}).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

module.exports.update = function(req, res, next){
	Contacts.findOneAndUpdate({},req.body.fields).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};
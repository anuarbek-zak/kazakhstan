var Contacts = require('../models/Contacts');

var cont1 = Contacts({address:'Ленинская 31',phone:'562280',siteNumber:'1'})
	cont1.save(function(err,obj) {
	if(err) console.log(err)
})

var cont2 = Contacts({address:'Шаяметова 171а',phone:'562280',siteNumber:'2'})
	cont1.save(function(err,obj) {
	if(err) console.log(err)
})

module.exports.get = function (req,res,next) {
	Contacts.find({siteNumber:req.headers.sitenumber}).exec(function(error,answer) {
		if(error) return next(error);
		console.log('asnwer[0]',answer[0])
		res.send(answer[0]);
	});
};

module.exports.edit = function (req,res,next) {
	Contacts.findOneAndUpdate({_id:req.params.id},req.body).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

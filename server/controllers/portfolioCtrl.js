var Portfolio = require('../models/Portfolio');
var fs = require('fs');

module.exports.save = function (req,res,next) {
	var portfolio = new Portfolio({
		name:req.body.portfolio.name,
		description:req.body.portfolio.description,
		image:req.files[0].filename,
		siteNumber:req.headers.sitenumber
	});

	portfolio.save(function(error,portfolio) {
		if(error) throw error;
		res.send(portfolio);
	});
};

module.exports.get = function (req,res,next) {
	Portfolio.find({siteNumber:req.headers.sitenumber}).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

module.exports.getById = function (req,res,next) {
	Portfolio.findById(req.params.id).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

module.exports.edit = function (req,res,next) {
	if(req.files.length>0) req.body.portfolio.image = req.files[0].filename;
	Portfolio.findOneAndUpdate({_id:req.params.id},req.body.portfolio).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

module.exports.delete = function (req,res,next) {
	Portfolio.remove({_id:req.params.id}).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

var Article = require("../models/Article");

module.exports.create = function (req,res,next) {
	var article = new Article({
		name:req.body.name,
		description:req.body.description
	});

	article.save(function(error,article) {
		if(error) throw error;
		res.send(article);
	});
}

module.exports.getAll = function(req, res, next){
	Article.find({}).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

module.exports.getOne = function(req, res, next){
	Article.findById(req.params._id).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

module.exports.delete = function(req, res, next){
	Article.remove({_id:req.params._id}).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

module.exports.update = function(req, res, next){
	Article.findById(req.params._id).exec(function(error,article) {
		if(error) return next(error);
		article.name = req.body.name;
		article.description = req.body.description;
		article.save(function(error,article){
					if(error) return next(error);
					res.send(article);
		})
	});
};
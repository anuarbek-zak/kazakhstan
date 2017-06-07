var Category = require('../models/Category');
var Product = require('../models/Product');
var async = require("async");
var fs = require('fs');

// Create
module.exports.create = function(req, res, next){
	var category = new Category();
	category.name = req.body.name;
	category.isChild = req.body.parent?true:false;
	category.save(function(error,category){
		if(error) throw error;
		if(req.body.parent){
			Category.findByIdAndUpdate(req.body.parent,{$push:{children:category._id}},function(err,parent) {
				res.send(category);
			});	
		}else{
			res.send(category);
		}		
	});
};

module.exports.getParents = function(req, res, next){
	Category.find({isChild:false}).populate({path:'children'}).exec(function(error,answer) {
		if(error) throw error;
		res.send(answer);
	});
};

module.exports.getAll = function(req, res, next){
	Category.find({}).exec(function(error,answer) {
		if(error) throw error;
		res.send(answer);
	});
};

module.exports.update = function(req, res, next){
	console.log(req.params.id);
	Category.findOneAndUpdate({_id:req.params.id},req.body).exec(function(error,answer) {
		if(error) return next(error);

		res.send(answer);
	});
};

module.exports.remove= function(req, res, next){
	Category.find({_id:req.params.id}).exec(function(error,category) {
		if(error) throw error;
		
		category = category[0];
		if(!category) return;	
		if(category.children.length>0){
			async.each(category.children,
				function(child,callback){
					removeOneCategory(child,callback);
				},function(err){
					if(err) throw err;		
					category.remove(function(err){
						if(err) return next(err)
							res.send("many cat removed");
					});
					
				});
		}else{
			removeOneCategory(category._id,function(){
				res.send("one category removed");			
			});
		}				
	});
};


function removeOneCategory(category_id,myCb) {
	Product.find({category_id:category_id}).exec(function(err,products) {
		async.each(
			products,
			function (product,callback) {
				async.each(product.images,
					function(image,callback2) {
						fs.unlink('frontend/assets/img/products/'+image,function(error) {
							if(error) throw error;
							callback2();
						});
					},function (err) {
						if(err) return next(err);
						product.remove(function(err) {
							if(err) return next(err);
							callback();
						});		
					});        
			},function (err) {
				if(err) throw err;
				Category.remove({_id:category_id},function(err){
					if(err) throw err;
					myCb();
				});				
			}
			);	
	});
}
var Product = require('../models/Product');
var fs = require('fs');
var async = require('async');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports.create = function (req,res,next) {
	var product = new Product({
		name:req.body.product.name,
		description:req.body.product.description,
		category_id:req.body.product.categoryId
	});

	for(var i in req.files){
		product.images.push(req.files[i].filename);
	}
	
	product.save(function(error,product) {
		if(error) throw error;
		res.send(product);
	});
};

module.exports.getAll = function(req, res, next){
	Product.find({}).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

module.exports.getByCategory = function(req, res, next){
	Product.find({category_id:req.params.category_id}).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

module.exports.getOne = function(req, res, next){
	Product.find({_id:req.params._id}).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

module.exports.removeImg = function(req, res, next){
	Product.update({_id:req.body.productId},{$pull:{images:req.body.filename}}).exec(function(error,prod) {
		if(error) return next(error);
		fs.unlink("frontend/assets/img/products/"+req.body.filename,function(err) {
			if(err) return next(err);
			res.send(prod);
		});		
	});
};

module.exports.delete = function(req, res, next){
	Product.findById(req.params._id).exec(function(err,product) {
		if(err) throw err;
		async.each(product.images,
			function(image,callback) {
				fs.unlink('frontend/assets/img/products/'+image,function(error) {
					if(error) throw error;
					callback();
				});
			},function (err) {
				if(err) return next(err);
				product.remove(function(err) {
					if(err) return next(err);
					res.send(200);
				});		
			});     
		
	});
};

module.exports.deleteImg = function(req, res, next){
	Product.update({_id:req.params._id},{$pull:{images:req.params.name}}).exec(function(err,product) {
		if(err) throw err;
		fs.unlink('frontend/assets/img/products/'+req.params.name,function(error) {
			if(error) throw error;
			res.send(200);
		});     
		
	});
};

module.exports.update = function(req, res, next){
	Product.findById(req.params._id).exec(function(error,prod) {
		if(error) return next(error);
		prod.name = req.body.product.name;
		prod.description = req.body.product.description;
		prod.images = req.body.product.images?req.body.product.images:[];
		for(var i in req.files){
			prod.images.push(req.files[i].filename);
		}
		prod.save(function(err,product){
			res.send(product);	
		});
	});
};

module.exports.zakaz = function(req, res, next){
	if(req.body.product._id!=undefined){
		Product.findById(req.body.product._id).exec(function(error,answer) {
			if(error) return next(error);
			sendMail(req,res,answer);
		});
	}else{
		sendMail(req,res);
	}
	
};

function sendMail(req,res,answer){
	var transport = nodemailer.createTransport(smtpTransport({
		service: 'mail.ru',
		auth: {
			user: 'amabilis.amabilis@mail.ru',
			pass: '1234567qwerty'
		}
	}));
	var text="";
	if(answer) {
		text= "Пришел заказ на товар '"+answer.name+"' (ссылка на товар - http://amabilis.kz/#/productInfo/"+req.body.product._id+") от "+
		req.body.user.name+" с номером "+req.body.user.number+" и почтой "+req.body.user.email+".Сообщение: "+(req.body.user.message?req.body.user.message:"Отсутствует")+""
	}	else {
		text="Пришло сообщение от "+
		req.body.user.name+" с номером "+req.body.user.number+" и почтой "+req.body.user.email+".Сообщение: "+(req.body.user.message?req.body.user.message:"Отсутствует")+""}
	var mailOptions = {
		from: 'amabilis.amabilis@mail.ru', // sender address
		to: 'amabilis.amabilis@mail.ru', // list of receivers
		subject: 'Мебель', // Subject line
		text:text
	};

	transport.sendMail(mailOptions, function (error) {
		if (error) {
			console.log('Error occured');
			console.log(error.message);
			return;
		}
		res.send({"success": "success"});
	});
}
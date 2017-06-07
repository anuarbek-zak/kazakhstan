var Action = require('../models/Action');

module.exports.getAll = function(req, res, next){
	Action.find({}).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
};

// var action = new Action({
// 	title:'Супер акция',
// 	description:'Рады сообщить о скидке на кресла для руководителей ELF. Для более подробной информации обращайтесь в офис нашей компании',
// 	date:'02.05.17'
// });

// action.save(function(err){
// 	if(err) return err;
// });

module.exports.update = function(req, res, next){
	Action.find({}).exec(function(error,answer) {
		if(error) return next(error);
		answer[0].title = req.body.title;
		answer[0].description = req.body.description;
		answer[0].date = req.body.date;
		answer[0].save(function(error,ans){
			if(error) return next(error);
			res.send(ans);
		})
	});
};
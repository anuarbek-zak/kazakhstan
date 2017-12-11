var Gallery = require("../models/Gallery");
var fs = require('fs');
var path = require('path');
var photosFolderPath = path.join(__dirname, '../../frontend/photos/');

module.exports.save = function (req,res,next) {
	var gallery = new Gallery({
		path:req.files[0].filename,
		siteNumber:req.headers.sitenumber
	});

	gallery.save(function(error,gallery) {
		if(error) throw error;
		res.send(gallery);
	});
}

module.exports.get = function (req,res,next) {
	Gallery.find({siteNumber:req.headers.sitenumber}).exec(function(error,answer) {
		if(error) return next(error);
		res.send(answer);
	});
}

module.exports.delete = function (req,res,next) {
	Gallery.findById(req.params.id).exec(function(error,answer) {
		if(error) return next(error);
		console.log('anser',answer)
		console.log('anser',photosFolderPath+answer.path)
		if(answer){
			fs.exists(photosFolderPath+answer.path, function(exists) {
				if (exists) {
        fs.unlink(photosFolderPath+answer.path,function(err)	 {
        	if(err) console.log(err)
        })
      }
    })
		}
	});
}

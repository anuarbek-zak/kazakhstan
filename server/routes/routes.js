var express = require('express');
var router = express.Router();
var galleryCtrl = require('../controllers/galleryCtrl');	
var portfolioCtrl = require('../controllers/portfolioCtrl');	
var contactsCtrl = require('../controllers/contactsCtrl');	
var multer = require('multer');
var path = require('path')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'frontend/photos/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})	
// ленинска 31 562280 шаяметова 171а 8705460
var upload = multer({storage:storage});


router.get('/api/users',function (req,res) {
    User.find({}).exesc(function (err,users) {
        if(err) return err;
        res.send(users);
    });
});

router.post('/api/gallery',upload.any(),galleryCtrl.save);
router.get('/api/gallery',galleryCtrl.get);
router.delete('/api/gallery/:id',galleryCtrl.delete);

router.post('/api/portfolio',upload.any(),portfolioCtrl.save);
router.get('/api/portfolio',portfolioCtrl.get);
router.get('/api/portfolio/:id',portfolioCtrl.getById);
router.post('/api/portfolio/:id',upload.any(),portfolioCtrl.edit);
router.delete('/api/portfolio/:id',portfolioCtrl.delete);

router.get('/api/contacts',contactsCtrl.get);
router.put('/api/contacts/:id',contactsCtrl.edit);


module.exports = router;

var compression = require('compression');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var User  = require('./server/models/User');
var app = express();
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost:27017/kz');

// Middlewares
//Compress our responses
app.use(compression());
app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'frontend'), { maxAge: 3600000 }));

app.use(session({ secret: 'your secret here',
	resave:  true,
	saveUninitialized: true,
	key: 'some key',
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


var routes = require('./server/routes/routes');	

app.use('/',routes);
var users = [];

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.send(500, { message: err.message });	
});

// Start server
var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

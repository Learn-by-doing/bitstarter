var express = require('express');
var session = require('express-session');
var config = require('./config.js');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(config.dbOptions);
var exphbr = require('express-handlebars');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var app = express();

app.engine('html', exphbr({
	defaultLayout: 'main',
	extname: '.html'
}));

app.use(session({
	key: 'bitstarter-cookie',
	secret: 'secret!',
	store: sessionStore,
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next) {

	req.isAuthenticated = function() {
		return !!req.session.user;
	};

	next();
});

app.use(function(req, res, next) {
	console.log('URL requested', req.originalUrl);
	next();
});

app.set('view engine', 'html');

app.use(serveStatic(__dirname + '/public'));

app.config = require('./config');
require('./controllers')(app);

// This is where we catch express errors. No "app.use" beyond this one!
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Oops! Something went wrong.')
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

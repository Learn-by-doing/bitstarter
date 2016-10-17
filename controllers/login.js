'use strict';

var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
var db = require('../database.js');
var config = require('../config.js');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(config.dbOptions);

function requireAuthentication(req, res, next) {

	if (!req.isAuthenticated()) {
		return res.redirect('/login');
	}

	// The user is logged in.F
	// Allow heir request to continue.
	next();
}


module.exports = function(app) {
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(session({
		key: 'bitstarter-cookie',
		secret: 'secret!',
		store: sessionStore,
		resave: false,
		saveUninitialized: true
	}));


	app.use(function(req, res, next) {
		console.log('URL requested', req.originalUrl);
		next();
	});


	app.use(function(req, res, next) {

		req.isAuthenticated = function() {
			return !!req.session.user;
		};

		next();
	});



	app.get('/login', function(req, res, next) {

		res.render('login');
	});

	app.post('/login', function(req, res) {

		var usernameReq = req.body.username;
		var passwordReq = req.body.password;
		db.knex('users')
		.where({username: usernameReq })
		.select('password')
		.then(function(result){
			if (!result || !result[0]){ // not found
				res.send('Wrong username!');
			}
			var hash = result[0].password;
			bcrypt.compare(passwordReq, hash, function(error, ressult, callback) {
				if (ressult){
					console.log('inside bcrypt.compare')
					// req.session.regenerate(function(err) {
					req.session.user = {username: usernameReq};
					// }) // closing regenerate
					var sessionUser= req.session.user.username;
					res.send('Congratulations ' + sessionUser + '! You are logged!')
				}else{
					// Wrong username/password.
					res.send('Wrong username/password!');
				}
			}) // closing bcrypt

		}) // closing then
		.catch(function(error){
			console.log(error);
		})
	});
} // closing module.exports

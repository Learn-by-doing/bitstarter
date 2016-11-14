'use strict';

var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var db = require('../database.js');
var config = require('../config.js');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(config.dbOptions);

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
		if (req.isAuthenticated()) {
			res.redirect('/');
		} else {
			res.render('login');
		}

	});

	app.post('/login', function(req, res) {

		// the following variables take the
		// data username and password from the form
		var usernameReq = req.body.username;
		var passwordReq = req.body.password;
		// knex compares the information from the form
		// with the information in the user table
		// and login the user if it is right
		db('users')
			.where({username: usernameReq })
				.select('password')
				.then(function(result) {
					if (!result || !result[0]) { // not found
						res.send('Wrong username!');
					}
					var hash = result[0].password;
					if (bcrypt.compareSync(passwordReq, hash)) {
						// Correct username+password.
						// Generate a new session and store their user information in the session data.
						req.session.regenerate(function() {

							req.session.user = {username: usernameReq};
							res.redirect('/')
						})
					} else {
						// Wrong username/password.
						res.send('Wrong username/password!');
					}
				}).catch(function(error) {
					console.log(error);
				}); // closing then(
	});
} // closing module.exports

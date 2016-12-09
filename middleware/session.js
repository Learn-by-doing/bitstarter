'use strict';

module.exports = function(app) {

	var session = require('express-session');
	var MySQLStore = require('express-mysql-session')(session);
	var sessionStore = new MySQLStore(app.config.db);

	app.use(session({
		key: app.config.session.key,
		secret: app.config.session.secret,
		store: sessionStore,
		resave: false,
		saveUninitialized: true
	}));
};

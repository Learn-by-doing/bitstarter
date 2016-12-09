'use strict'

module.exports = function(app) {

	app.use(function(req, res, next) {

		req.isAuthenticated = function() {
			return !!req.session.user;
		};

		next();
	});

	app.middleware.requireAuthentication = function(req, res, next) {

		if (!req.isAuthenticated()) {
			return res.redirect('/login');
		}

		// The user is logged in.
		// Allow their request to continue.
		next();
	};
};

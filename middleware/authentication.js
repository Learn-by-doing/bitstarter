'use strict'

module.exports = {

	requireAuthentication : function(req, res, next) {
		if (!req.isAuthenticated()) {
			return res.redirect('/login');
		}
		// The user is logged in.
		// Allow heir request to continue.
		next();
	}
}

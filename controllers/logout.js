'use strict'

module.exports = function(app) {

	app.get('/logout', function(req, res) {

		if (req.isAuthenticated()) {
			// Destroy their current session to be sure they are logged out.
			// This is important because the session might contain data related to their user account.
			req.session.destroy(function() {
				// Send them to the login page.
				res.redirect('/login');
			});
		} else {
			// They are already logged out.
			// Send them to the login page.
			res.redirect('/login');
		}
	});

}; // close module.exports

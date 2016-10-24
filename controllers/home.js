'use strict';


module.exports = function(app) {

	app.get('/', function (req, res) {

		if (req.isAuthenticated()) {
			// Already logged in.
			return res.render('home', {
				username: req.session.user.username,
				loggedMessage: 'You are logged'

			});
		}else{
			return res.render('home')
		}
	});
};

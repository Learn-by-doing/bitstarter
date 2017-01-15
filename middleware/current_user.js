'use strict';

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.locals.user = req.session.user;
		next();
	});
}

'use strict';

module.exports = function(app) {

	app.use(function(req, res, next) {
		console.log('URL requested', req.originalUrl);
		next();
	});
};

'use strict';

module.exports = function(app) {

	app.middleware = {};

	/*
		!! IMPORTANT !!
		The order of middleware is significant. Do not re-order unless you understand what you're doing.
	*/
	require('./parsers')(app);
	require('./session')(app);
	require('./auth')(app);
	require('./logging')(app);
	require('./template')(app);
	require('./static')(app);
};

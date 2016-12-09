'use strict';

module.exports = function(app) {

	var serveStatic = require('serve-static');

	app.use(serveStatic(__dirname + '/public'));
};

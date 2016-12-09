'use strict';

module.exports = function(app) {

	var exphbr = require('express-handlebars');

	app.engine('html', exphbr({
		defaultLayout: 'main',
		extname: '.html'
	}));

	app.set('view engine', 'html');
};

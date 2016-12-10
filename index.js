'use strict';

var express = require('express');
var app = module.exports = express();

app.config = require('./config');
app.db = require('./database');
app.services = require('./services');
require('./middleware')(app);
require('./controllers')(app);

app.db.setUp(function(error) {

	if (error) {
		throw error;
	}

	// This is where we catch express errors. No "app.use" beyond this one!
	app.use(function(error, req, res, next) {
		console.error(error.stack)
		res.status(500).send('Oops! Something went wrong.')
	});

	app.listen(3000, function() {
		console.log('Example app listening on port 3000!');
	});

	app.ready = true;
});

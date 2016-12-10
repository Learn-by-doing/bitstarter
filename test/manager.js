'use strict';

if (process.env.NODE_ENV !== 'test') {
	throw new Error('NODE_ENV must be set to "test" to run tests');
}

var _ = require('underscore');
var async = require('async');

var app = require('../index');
var db = app.db;

var manager = module.exports = {

	// Wait for the app to be ready.
	onReady: function(cb) {

		if (app.ready) {
			// App is already ready.
			// Execute the callback at the next loop.
			return _.defer(cb);
		}

		// App not ready yet.
		// Wait a little time and then check again.
		setTimeout(function() {
			manager.onReady(cb);
		}, 50);
	},

	setUp: function(cb) {

		async.series([
			manager.onReady,
			manager.tearDown,
			db.setUp
		], cb);
	},

	tearDown: function(cb) {

		manager.dropDatabaseTables(cb);
	},

	dropDatabaseTables: function(cb) {

		// Drop tables in reverse order (because of foreign keys).
		var models = _.values(db.models).reverse();
		async.eachSeries(models, function(model, next) {
			db.schema.dropTableIfExists(model.tableName).then(function() {
				next();
			}).catch(next);
		}, cb);
	}
};

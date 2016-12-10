'use strict';

var async = require('async');
var config = require('./config');

var db = module.exports = require('knex')({
	client: 'mysql',
	connection: config.db
});

db.models = require('./models');

db.setUp = function(cb) {

	async.eachSeries(db.models, function(model, next) {
		model.setUpTable(next);
	}, cb);
};

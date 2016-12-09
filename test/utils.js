'use strict'

var async = require('async');
var db = require('../database.js');


module.exports = {
	deleteTestDb : function(cb) {

		var tables = ['project_addresses', 'projects', 'sessions', 'users'];

		async.each(tables, function(table, next) {
			db(table).del().then(function() {
				next();
			}).catch(next);
		}, cb);
	},

} // close module.exports

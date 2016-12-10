'use strict';

var _ = require('underscore');
var async = require('async');
var db = require('../database');

module.exports = {

	tableName: null,

	query: function() {

		return db(this.tableName);
	},

	defineSchema: function(table) {

		// Meant to be overwritten.
	},

	setUpTable: function(cb) {

		if (!this.defineSchema || !this.tableName) {
			return cb();
		}

		var tableName = this.tableName;
		var defineSchema = _.bind(this.defineSchema, this);
		var schemaChanges = _.map(this.schemaChanges || [], function(fn) {
			return _.bind(fn, this);
		}, this);

		db.schema.hasTable(tableName).then(function(exists) {

			if (exists) {

				if (schemaChanges && !_.isEmpty(schemaChanges)) {
					// IMPORTANT: Make all schema changes in series (not parallel).
					return async.series(schemaChanges, cb);
				}

				return cb();
			}

			db.schema.createTable(tableName, defineSchema).then(function() {
				cb();
			}).catch(cb);

		}).catch(cb);
	},

	schemaChanges: [],

	queueSchemaChange: function(fn) {

		this.schemaChanges = _.clone(this.schemaChanges).concat(fn);
	},

	extend: function(obj) {

		return _.extend({}, this, obj);
	}

};

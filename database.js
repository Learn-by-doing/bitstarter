'use strict';

var config = require('./config.js');

var db = module.exports = require('knex')({
	client: 'mysql',
	connection: config.dbOptions
});

db.schema.hasTable('users').then(function(exists) {
	if (!exists) {
		return db.schema.createTable('users', function(table) {
			table.increments('id');
			table.string('username');
			table.string('password');
			table.string('email');
		}).catch(console.log);
	}
});

// create projects table
db.schema.hasTable('projects').then(function(exists) {
	if (!exists) {
		return db.schema.createTable('projects', function(table) {
			table.increments('id');
			table.string('name');
			table.string('description');
			table.decimal('goal_amount', 16,8);
		}).catch(console.log);
	}
});

// create addresses table
db.schema.hasTable('project_addresses').then(function(exists) {
	if (!exists) {
		return db.schema.createTable('project_addresses', function(table) {
			table.increments('id');
			table.integer('project_id').unsigned();
			table.foreign('project_id').references('projects.id');
			table.string('token');
		}).catch(console.log);
	}
});

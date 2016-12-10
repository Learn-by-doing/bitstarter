'use strict';

var BaseModel = require('./BaseModel');

module.exports = BaseModel.extend({

	tableName: 'project_addresses',

	defineSchema: function(table) {

		BaseModel.defineSchema.apply(this, arguments);

		table.increments('id');
		table.integer('project_id').unsigned();
		table.foreign('project_id').references('projects.id');
		table.string('token');
	}

});

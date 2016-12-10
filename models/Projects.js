'use strict';

var BaseModel = require('./BaseModel');

module.exports = BaseModel.extend({

	tableName: 'projects',

	defineSchema: function(table) {

		BaseModel.defineSchema.apply(this, arguments);

		table.increments('id');
		table.string('name');
		table.string('description');
		table.decimal('goal_amount', 16, 8);
	}

});

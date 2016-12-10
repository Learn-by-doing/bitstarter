'use strict';

var BaseModel = require('./BaseModel');

module.exports = BaseModel.extend({

	tableName: 'users',

	defineSchema: function(table) {

		BaseModel.defineSchema.apply(this, arguments);

		table.increments('id');
		table.string('username');
		table.string('password');
		table.string('email');
	}

});

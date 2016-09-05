'use strict';

module.exports = {

	db: {
		host: process.env.BITSTARTER_DB_HOST || 'localhost',
		port: parseInt(process.env.BITSTARTER_DB_HOST || 3306)
	}
};

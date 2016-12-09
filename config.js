'use strict';

module.exports = {

	dbOptions : {
		host: process.env.BITSTARTER_DB_HOST || '127.0.0.1',
		port: parseInt(process.env.BITSTARTER_DB_PORT || 3306),
		user: process.env.BITSTARTER_DB_USER || 'bitstarter',
		password: process.env.BITSTARTER_DB_PASSWORD || 'password',
		database: process.env.BITSTARTER_DB_DATABASE || 'bitstarter'
	}
};

'use strict';

module.exports = {

	db: {
		host: process.env.BITSTARTER_DB_HOST || '127.0.0.1',
		port: parseInt(process.env.BITSTARTER_DB_PORT || 3306),
		user: process.env.BITSTARTER_DB_USER || 'bitstarter',
		password: process.env.BITSTARTER_DB_PASS || 'password',
		database: process.env.BITSTARTER_DB_NAME || 'bitstarter'
	},

	session: {
		key: process.env.BITSTARTER_SESSION_KEY || 'bitstarter.sid',
		secret: process.env.BITSTARTER_SESSION_SECRET || 'default not-so secret'
	}
};

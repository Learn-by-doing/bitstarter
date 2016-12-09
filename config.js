'use strict';

module.exports = {

	dbOptions : {
		host     : process.env.BITSTARTER_HOST || '127.0.0.1',
		port     : process.env.BITSTARTER_PORT || 3306,
		user     : process.env.BITSTARTER_USER || 'bitstarter',
		password : process.env.BITSTARTER_PASSWORD || 'password',
		database : process.env.BITSTARTER_DATABASE || 'bitstarter'
	}
};

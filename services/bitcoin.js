'use strict';

var request = require('request');
var _ = require('underscore');

module.exports = {

	getFunds: function(addresses, cb) {

		var uri = 'https://blockchain.info/multiaddr?active=';
		uri += addresses.join('|');

		request(uri, function(error, response, body) {

			if (!error && response.statusCode == 200) {
				var obj = JSON.parse(body);
				var allAccountsReceived
				_.each(addresses, function(element, index) {
					allAccountsReceived += obj.addresses[index].total_received;
				});
				cb(allAccountsReceived);
			} else {
				console.log('There was an error')
			}
		});
	}
};

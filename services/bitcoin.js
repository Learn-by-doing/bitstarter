'use strict';

var request = require('request');
var _ = require('underscore');

var bitcoin = module.exports = {

	getFunds : function(addresses, callback) {

		var uri = 'https://blockchain.info/multiaddr?active=';
		uri += addresses.join('|');

		request(uri, function (error, response, body) {

			if (!error && response.statusCode == 200) {
				var obj = JSON.parse(body);
				var allAccountsReceived
				_.each(addresses, function(element, index) {
					allAccountsReceived += obj.addresses[index].total_received;
				});
				callback(allAccountsReceived);
			}
			else {
				console.log('There was an error')
			}

			});
	},

}; // closing bitcoin module.exports

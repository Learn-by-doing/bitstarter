'use strict';

var request = require('request');
var _ = require('underscore');

var bitcoin = module.exports = {

	getFunds : function(addresses, callback) {

		var uri = 'https://blockchain.info/multiaddr?active=';

		if (addresses.every(validateAddress)) {
			// USE encodeURIComponent()
			uri += addresses.join('|');
		}
		else{
			console.log('wrong address');
			var allAccountsReceived = undefined;
			callback(allAccountsReceived);
		}

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

function validateAddress(element, index, array) {
	var result = true;
	// not valid string length
	if (element.length > 34 || element.length < 25) {
		result = false;
	}
	// this character are invalid in base58 encoding
	if(/[0OIl]/.test(element)) {
    result = false;
	}
	// first character must be 1 or 3
	if (element.charAt(0) === 1 || element.charAt(0) === 3) {
		result = false;
	}
	// regEx to match a bitcoin address
	if(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(element) != true	) {
    result = false;
	}

return result;		
}
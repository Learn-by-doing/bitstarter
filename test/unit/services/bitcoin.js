'use strict';

var bitcoin = require('../../../services/bitcoin');
var expect = require('chai').expect;

describe('testing bitcoin.js', function() {

	it('testing function getFunds for 3 addresses', function(done) {

		var testAddresses = [
			'1BHPGY7Rb9WaBBkYPKjZTnKYRzt5mC8NPM',
			'1Nkk6rPhFk5UbbNWT12QyCTosgjV8MWjeg',
			'16TAy1uNFNEw58uPN4c7C8VnJUYp2ZJUjd'
		];

		// bitcoin.getFunds makes a request to a remote service.
		// This service is slow to respond sometimes.
		this.timeout(30000);

		bitcoin.getFunds(testAddresses, function(amount) {
			expect(amount).to.not.be.undefined;
			expect(amount).to.be.a('number');
			done();
		});
	});
});

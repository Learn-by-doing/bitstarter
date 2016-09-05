// for testing run  in the terminal:
// node_modules/.bin/mocha test/test.js  or npm test

var bitcoin = require('../bitcoin.js');
var expect = require('chai').expect;


var address1 = '1BHPGY7Rb9WaBBkYPKjZTnKYRzt5mC8NPM';
var address2 = '1Nkk6rPhFk5UbbNWT12QyCTosgjV8MWjeg';
var address3 = '16TAy1uNFNEw58uPN4c7C8VnJUYp2ZJUjd';
var wrongAddress = '26TAy1u'

describe('testing bitcoin.js', function () {

	it('testing function getFunds for 3 addresses', function (done) {
		var address_test = [address1, address2, address3];
		bitcoin.getFunds(address_test, function(allAccountsReceived) {

			expect(allAccountsReceived).to.not.be.undefined;
			expect(allAccountsReceived).to.be.a('number');
			done();

		});
	});

	it('testing function getFunds for 2 addresses', function (done) {
		var address_test = [address1, address2];
		bitcoin.getFunds(address_test, function(allAccountsReceived) {

			expect(allAccountsReceived).to.not.be.undefined;
			expect(allAccountsReceived).to.be.a('number');
			done();

		});
	});

	it('testing function getFunds for 1 addresses', function (done) {
		var address_test = [address2];
		bitcoin.getFunds(address_test, function(allAccountsReceived) {

			expect(allAccountsReceived).to.not.be.undefined;
			expect(allAccountsReceived).to.be.a('number');
			done();

		});
	});

	it('testing function getFunds for wrong address', function (done) {
		var address_test = [wrongAddress];
		bitcoin.getFunds(address_test, function(allAccountsReceived) {

			expect(allAccountsReceived).to.be.undefined;
			done();

		});
	});

}); // closing describe testing bitcoin.js
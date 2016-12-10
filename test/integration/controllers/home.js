'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);

var manager = require('../../manager');

describe('testing home.js', function() {

	before(manager.setUp);
	after(manager.tearDown);

	it('testing get /', function(done){
		chai.request('http://localhost:3000/')
		.get('')
		.end(function(error, res){
			expect(res).to.have.status(200);
			done();
		});
	});
});

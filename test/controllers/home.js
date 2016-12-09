var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);

describe('testing home.js', function () {

	it('testing get /', function(done){
		chai.request('http://localhost:3000/')
		.get('')
		.end(function(err, res){
			expect(res).to.have.status(200);
			done();
		})
	})
}); // closing describe testing home.js

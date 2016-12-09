var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);

describe('testing login.js and logout.js', function () {

	it('testing get /login', function(done){
		chai.request('http://localhost:3000/')
		.get('login')
		.end(function(err, res){
			expect(res).to.have.status(200);
			done();
		})
	})

}); // closing describe testing login.js

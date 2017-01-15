'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);

var manager = require('../../../manager');


describe('testing projects.js', function() {

	before(function(done){
		manager.setUp(done)
	})

	before(function(done){
		manager.createUser('Testuser', 'email@email.com', 'password', done)
	})

	after(manager.tearDown);

	it('add a project', function(done){

		var agent = chai.request.agent('http://localhost:3000')
		agent
			.post('/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				username : 'Testuser',
				password : 'password'
			})
			.then(function(res) {
				// The `agent` now has the sessionid cookie saved, and will send it
				// back to the server in the next request:
				return agent.post('/projects/add')
				.set('content-type', 'application/x-www-form-urlencoded')
				.set({
					name : 'test',
					description : 'test',
					amount : '12345678.12345678',
					token : '1BHPGY7Rb9WaBBkYPKjZTnKYRzt5mC8NPM'
				})
				.then(function(res){
					expect(res).to.have.status(200);
					expect(res.body).to.be.a('object');
					expect(res).to.redirectTo('http://localhost:3000/');
					done();
				})
			})
			.catch(done)
	})

}); // closing describe testing projects.js

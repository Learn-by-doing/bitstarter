'use strict'

var db = require('../database.js');
var _ = require('underscore');


module.exports = function(app) {
	// it has to be able to add one or more adresses
	var adresses
	_.each(adresses, function(element, index){
		req.body.adrress
	})


	app.post('/addproject', function(req, res) {
		db('projects')
		.insert({
		name : req.body.projectName,
		description : req.body.description,
		address : req.body.address,
		}).catch(funciton(error){
			console.log(error);
		})
	})

} // closing module.export
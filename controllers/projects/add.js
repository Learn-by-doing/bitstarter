'use strict'

var db = require('../../database.js');

module.exports = function(app) {

	app.get('/projects/add', function(req, res) {
		res.render('projects-add');
	});

	app.post('/projects/add', function(req, res) {
		db.transaction(function(trx){
			db('projects')
			.transacting(trx)
			.insert({
				name : req.body.name,
				description : req.body.description,
				goal_amount : req.body.amount,
			})
			.then(function(result){
				db('project_addresses')
				.insert({
					project_id : result,
					token : req.body.token
				}).then(function(result) {
					res.redirect('/');
				});
			})
			.then(trx.commit)
			.catch(trx.rollback)
			.catch(function(error) {
				console.log(error);
			});
		});
	});
};

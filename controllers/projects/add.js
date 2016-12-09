'use strict'

module.exports = function(app) {

	app.get('/projects/add', app.middleware.requireAuthentication, function(req, res) {
		res.render('projects-add');
	});

	app.post('/projects/add', app.middleware.requireAuthentication, function(req, res) {
		app.db.transaction(function(trx) {
			app.db('projects')
			.transacting(trx)
			.insert({
				name : req.body.name,
				description : req.body.description,
				goal_amount : req.body.amount,
			})
			.then(function(result){
				app.db('project_addresses')
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

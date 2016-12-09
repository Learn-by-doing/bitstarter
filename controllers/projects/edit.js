'use strict';

module.exports = function(app) {

	app.use('/projects/edit/:id', app.middleware.requireAuthentication);

	app.get('/projects/edit/:id', function(req, res) {

		app.db('projects')
			.innerJoin('project_addresses','projects.id','project_addresses.project_id')
			.where({'projects.id': req.params.id })
			.select('name','description','goal_amount','token')
			.then(function(result) {
				if (!result || !result[0]) {
					res.send("We couldn't find a project with such id");
				}

				res.render('projects-edit',{
					id : req.params.id,
					name : result[0].name, 
					description : result[0].description,
					amount : result[0].goal_amount,
					token : result[0].token
				});
			});	
	});

	app.post('/projects/edit/:id', function(req, res) {

		app.db.transaction(function(trx){
			app.db('projects')
			.transacting(trx)
			.where({'projects.id': req.params.id})
			.update({
				name : req.body.name,
				description : req.body.description,
				goal_amount : req.body.amount,
			})
			.then(function(result){
				app.db('project_addresses')
				.where({'project_addresses.project_id': req.params.id})
				.update({
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

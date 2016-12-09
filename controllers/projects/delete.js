'use strict'

module.exports = function(app) {

	app.get('/projects/delete/:id', app.middleware.requireAuthentication, function(req, res) {
		var id = req.params.id;
		app.db.transaction(function(trx) {
			// Note: make sure an address can be assigned to 1 project only or that no other project uses it
			app.db('project_addresses')
				.transacting(trx)
				.where('project_id', id)
				.del()
				.catch(function(error) {
					console.log(error);
				})
				.then(
					app.db('projects')
					.where('id', id)
					.del()
					.catch(function(error) {
						console.log(error);
					})
				)
				.then(trx.commit)
				.catch(trx.rollback)
				.catch(function(error) {
					console.log(error);
				})
				.finally(function() {
					res.redirect('../../')

				})
		})

	});
};

'use strict';

module.exports = function(app) {

	app.get('/', function(req, res) {

		if (req.isAuthenticated()) {
			// Already logged in.
			var username = req.session.user.username;
			var loggedMessage = 'You are logged';
		}

		app.db.select([
			'projects.name',
			'projects.description',
			'projects.goal_amount',
			'project_addresses.token'
		])
		.from('projects')
		.leftJoin('project_addresses', 'projects.id', 'project_addresses.project_id')
		.then(function(projects) {
			res.render('home', {
				projects: projects,
				username: username,
				loggedMessage: loggedMessage
			});
		}).catch(console.log);
	});
};

var db = require('../database.js');
var fs = require('fs');

// Get content from file
var contents = fs.readFileSync("./test/fixtures/projects.json");
// Define to JSON type
var seed_data = JSON.parse(contents);
projects = seed_data.projects;

function seed() {

	projects.forEach(function(project) {
		db('projects')
			.insert({
				name: project.name,
				description: project.description,
				goal_amount: project.goal_amount
			}).then(function(result) {
				db('project_addresses')
					.insert({
						project_id: result[0],
						token: project.token
					}).then(function() {
						process.exit();
					});
			}).catch(console.log);
	});
}

seed();
var prompt = require('prompt');
var bcrypt = require('bcrypt');
var db = require('./database.js');

// input data schema
var schema = {
	properties: {
		username: {
			description: 'Enter your username',
			pattern: /^([a-z0-9]{4,30})$/,
			message: 'Username should be only lowercase letters or numbers, length from 4 to 30 characters',
			required: true
		},
		email: {
			description: 'Enter your email',
			pattern: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
			message: 'Please enter correct email',
			required: true
		},
		password: {
			description: 'Enter your password',
			type: 'string',
			pattern: /^([a-zA-Z0-9]{6,128})$/,
			message: 'Please enter a password or passphrase, only letters or numbers, length from 6 to 128 characters',
			hidden: true,
			replace: '*',
			required: true
		},
		password_retype: {
			description: 'Retype your password',
			type: 'string',
			pattern: /^([a-zA-Z0-9]{6,128})$/,
			message: 'Please retype the same password',
			hidden: true,
			replace: '*',
			required: true,
			conform: function(password_retype) {
				var password = prompt.history('password').value;
				return (password === password_retype);
			}
		},
	}
};
prompt.start();

// get the properties for the new user
prompt.get(schema, function (err, result) {

	// check if the username exists
	db.knex.select()
		.where('username', result.username)
		.from('users')
		.limit(1)
		.then(function(results) {
			if (results.length) {
				console.log("Error: The username '" + result.username + "' already exists.");
				process.exit(1);
			}
		}).catch(console.log);

	// bcrypt the password
	var rounds = 1;
	// var salt = bcrypt.genSaltSync(10);
	bcrypt.genSalt(rounds, function(err, salt) {
		bcrypt.hash(result.password, salt, function(err, hash) {
			// store new user in db
			db.knex('users').insert({
				username: result.username,
				email: result.email,
				password: hash
			}).then(function() {
				// log new user data
				console.log('New user created:');
				console.log('  username: ' + result.username);
				console.log('  email: ' + result.email);
				console.log('  password hash: ' + hash);
				process.exit(0);
			}).catch(console.log);
		});
	});
});

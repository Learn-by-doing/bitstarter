var prompt = require('prompt');
var bcrypt = require('bcrypt');

// input data schema
var schema = {
	properties: {
		username: {
			description: 'Enter your username',
		    pattern: /^([a-z0-9]{4,30})$/,
		    message: 'Username must be only lowercase letters or numbers, length from 4 to 30 characters',
		    required: true
		},
		name: {
			description: 'Enter your name',
			pattern: /^[a-zA-Z\s\-]+$/,
			message: 'Name must be only letters, spaces or dashes',
			required: true
		},
		email: { // TODO maybe it's better to use simple regex and do checks by sending an email
			description: 'Enter your email',
			pattern: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
			message: 'Please enter correct email',
			required: true
		},
		password: {
			description: 'Enter your password',
			type: 'string',
			pattern: /^([a-zA-Z0-9]{8,15})$/,
			message: 'Password must be only letters or numbers, length from 8 to 15 characters',
			hidden: true,
			replace: '*',
			required: true
		},
		password_retype: {
			description: 'Retype your password',
			type: 'string',
			pattern: /^([a-zA-Z0-9]{8,15})$/,
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

	// log the results
	console.log('New user created:');
	console.log('  username: ' + result.username);
	console.log('  name: ' + result.name);
	console.log('  email: ' + result.email);

	// bcrypt the password
	var rounds = 1;
	var salt = bcrypt.genSaltSync(10);  
	bcrypt.genSalt(rounds, function(err, salt) {
		bcrypt.hash(result.password, salt, function(err, hash) {
			console.log("  password hash: " + hash);
			
			// TODO add user to database

		});
	});
});

// TODO create table to store users

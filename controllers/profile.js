'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {

	app.use('/profile', app.middleware.requireAuthentication);

	app.get('/profile', function(req, res, next) {

		var sessionUser= req.session.user.username;

		app.db('users')
			.where({username: sessionUser })
			.select('email')
			.then(function(result) {
				if (!result || !result[0]) {
					res.send("We couldn't find a user with this email");
				}

				res.render('profile', {email:result[0].email});
			});
	});

	app.post('/profile', function(req, res) {

		var usernameReq = req.body.username;
		var passwordReq = req.body.password;
		var emailReq = req.body.email;

		app.db('users')
			.where({username: usernameReq })
			.select('password')
			.then(function(result) {
				if (!result || !result[0]) {
					res.send("We couldn't find a user with this email");
				}

				var hash = result[0].password;
				bcrypt.compare(passwordReq, hash, function(err,result) {
					if (result) {
						app.db('users')
							.where({username: usernameReq })
							.update({email:emailReq})
							.then(function(count) {
								if (count == 1) {
									res.render('profile', {
										email:    emailReq,
										msg:      'Congratulations - profile for ' + usernameReq + ' updated!'
									});
								} else {
									res.render('profile', { 
										email:    emailReq,
										msg:      'failed to update profile for ' + usernameReq 
									});
								}
							});
					} else {
						res.render('profile', {
							email: emailReq,
							msg: 'Wrong password'
						});
					}
				});
			}).catch(function(error) {
				console.log(error);
			}); 
	});
};

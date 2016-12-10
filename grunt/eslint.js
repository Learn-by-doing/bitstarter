'use strict';

module.exports = {
	options: {
		configFile: '.eslintrc.js',
		ignorePath: '.eslintignore'
	},
	files: [
		'Gruntfile.js',
		'controllers/**/*.js',
		'scripts/**/*.js',
		'services/**/*.js',
		'test/**/*.js'
	]
};

module.exports = function(grunt) {
	grunt.loadNpmTasks("gruntify-eslint");
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask("default", ["eslint"]);

	grunt.initConfig({
		eslint: {
			options: {
				configFile: ".eslintrc.js",
				ignorePath: ".eslintignore"
				// rulePaths: []
			},
			files: [
				'Gruntfile.js',
				'controllers/**/*.js',
				'scripts/**/*.js',
				'services/**/*.js',
				'test/**/*.js'
			]
		},
		watch: {
			tasks: ['eslint'],
			files: [
				'Gruntfile.js',
				'controllers/**/*.js',
				'scripts/**/*.js',
				'services/**/*.js',
				'test/**/*.js',
				'*.js'
			]
		}
	});
}

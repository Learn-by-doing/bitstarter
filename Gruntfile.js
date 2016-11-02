module.exports = function(grunt) {
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
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/**/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks("gruntify-eslint");
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask("test", ["mochaTest", "eslint"]);
	grunt.registerTask("default", ["test"]);
}

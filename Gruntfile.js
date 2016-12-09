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
				src: ['test/**/**.js']
			}
		},
		env : {
			test : {
				NODE_ENV : 'test',
				BITSTARTER_HOST : '127.0.0.1',
				BITSTARTER_PORT : 3306,
				BITSTARTER_USER : 'bitstarterTest',
				BITSTARTER_PASSWORD : 'bitstarterTest',
				BITSTARTER_DATABASE : 'bitstarterTest'
			}
		}
	});

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks("gruntify-eslint");
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-env');
	grunt.registerTask('requireAPP', function(){
		require('./index.js');
	});
	grunt.registerTask("test", ["env:test",'requireAPP', "mochaTest", "eslint"]);
	grunt.registerTask("default", ["test"]);
}

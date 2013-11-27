'use strict';
module.exports = function(grunt) {

	// Load Grunt Tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		// Compile Sass to CSS
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'assets/css/build/main.css': 'assets/css/scss/main.scss'
				}
			}
		},

		// Minify CSS
		cssmin: {
			files: {
				'assets/css/build/main.css': 'assets/css/scss/main.scss'
			}
		},

		// Lint JS
		jshint: {
			beforeconcat: ['assets/js/*.js']
		},

		// Process JS Includes
		// includereplace: {
		// 	dist: {
		// 		src: 'assets/js/plugins.js',
		// 		dest: 'assets/js/plugins.processed.js',
		// 		expand: false,
		// 		cwd: 'assets/js'
		// 	}
		// },
		bake: {
			build: {
				files: {
					"assets/js/plugins.processed.js": "assets/js/plugins.js"
				}
			}
		},

		// Concatenate JS
		concat: {
			dist: {
				src: [
					'assets/js/plugins.processed.js',
					'assets/js/main.js'
				],
				dest: 'assets/js/build/production.js'
			}
		},

		// Uglify JS
		uglify: {
			build: {
				src: 'assets/js/build/production.js',
				dest: 'assets/js/build/production.min.js'
			}
		},

		// Optimize Images
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'assets/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/img/'
				}]
			}
		},

		// Watch
		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: ['assets/js/**/*.js'],
				tasks: ['bake','concat', 'uglify', 'jshint'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['assets/css/scss/**/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					spawn: false
				}
			},
			images: {
				files: ['assets/img/**/*.{png,jpg,gif}'],
				tasks: ['imagemin'],
				options: {
					spawn: false
				}
			}
		},

		// Connect
		connect: {
			server: {
				options: {
					port: 8000,
					base: './'
				}
			}
		}

	});

	// Register Tasks
	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin']);
	grunt.registerTask('dev', ['connect', 'watch']);

};

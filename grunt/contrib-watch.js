module.exports = function(grunt) {

	grunt.config('watch', {
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
		scss: {
			files: ['assets/css/scss/**/*.scss'],
			tasks: ['sass', 'cssmin'],
			options: {
				livereload: false
			}
		},
		css: {
			files: ['assets/build/css/main.css']
		},
		images: {
			files: ['assets/img/**/*.{png,jpg,gif}'],
			tasks: ['imagemin']
		},
		svg: {
			files: ['assets/img/**/*.svg'],
			tasks: ['svgmin']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');

};

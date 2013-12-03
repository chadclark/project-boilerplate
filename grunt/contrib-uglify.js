module.exports = function(grunt) {

	grunt.config('uglify', {
		build: {
			src: 'assets/build/js/production.js',
			dest: 'assets/build/js/production.min.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

};

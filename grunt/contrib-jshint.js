module.exports = function(grunt) {

	grunt.config('jshint', {
		options: {
			jshintrc: '.jshintrc'
		},
		beforeconcat: ['assets/js/*.js']
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

};

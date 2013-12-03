module.exports = function(grunt) {

	grunt.config('jshint', {
		options: {
			jshintrc: '.jshintrc',
			ignores: ['assets/js/plugins.js','assets/js/plugins.processed.js']
		},
		beforeconcat: ['assets/js/*.js']
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

};

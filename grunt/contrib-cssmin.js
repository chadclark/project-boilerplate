module.exports = function(grunt) {

	grunt.config('cssmin', {
		build: {
			files: {
				'assets/build/css/main.css': 'assets/css/scss/main.scss'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');

};

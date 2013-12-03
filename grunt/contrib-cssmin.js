module.exports = function(grunt) {

	grunt.config('cssmin', {
		build: {
			files: {
				'assets/build/css/main.css': 'assets/css/main.css'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');

};


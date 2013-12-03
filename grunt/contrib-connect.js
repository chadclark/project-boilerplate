module.exports = function(grunt) {

	grunt.config('connect', {
		server: {
			options: {
				port: 8000,
				base: './'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');

};

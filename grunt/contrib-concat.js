module.exports = function(grunt) {

	grunt.config('concat', {
		build: {
			src: [
				'assets/js/plugins.processed.js',
				'assets/js/main.js'
			],
			dest: 'assets/build/js/production.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

};

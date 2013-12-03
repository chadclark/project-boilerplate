module.exports = function(grunt) {

	grunt.config('bake', {
		build: {
			files: {
				"assets/js/plugins.processed.js": "assets/js/plugins.js"
			}
		}
	});

	grunt.loadNpmTasks('grunt-bake');

};

module.exports = function(grunt) {

	grunt.config('svgmin', {
		options: {
			plugins: [{
				removeViewBox: false
			}]
		},
		build: {
			files: [{
				expand: true,
				cwd: 'assets/img/',
				src: ['**/*.svg'],
				dest: 'assets/build/img/'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-svgmin');

};

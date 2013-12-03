module.exports = function(grunt) {

	grunt.config('imagemin', {
		build: {
			files: [{
				expand: true,
				cwd: 'assets/img/',
				src: ['**/*.{png,jpg,gif}'],
				dest: 'assets/build/img/'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');

};

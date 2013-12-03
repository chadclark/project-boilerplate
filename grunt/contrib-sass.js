module.exports = function(grunt) {

	grunt.config('sass', {
		build: {
			options: {
				style: 'expanded'
			},
			files: {
				'assets/css/main.css': 'assets/css/scss/main.scss'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');

};

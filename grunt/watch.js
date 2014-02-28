module.exports = {

	scripts: {
		files: ['assets/js/**/*.js', '!assets/js/plugins/*.js', '!assets/js/vendor/*.js'],
		tasks: ['newer:bake', 'newer:concat', 'newer:uglify', 'newer:jshint', 'notify:scripts'],
		options: {
			spawn: false,
			livereload: true
		}
	},
	scss: {
		files: ['assets/scss/**/*.scss'],
		tasks: ['sass', 'notify:scss'],
	},
	css: {
		files: ['assets/css/main.css'],
		tasks: ['newer:cssmin', 'notify:css'],
		options: {
			livereload: true
		}
	},
	images: {
		files: ['assets/img/**/*.{png,jpg,gif}'],
		tasks: ['newer:imagemin']
	},
	svg: {
		files: ['assets/img/**/*.svg'],
		tasks: ['newer:svgmin']
	}

};

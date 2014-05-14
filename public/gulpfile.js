// Set Plugin Variables
var gulp = require('gulp') // Gulp!
	concat		= require('gulp-concat'), // Concat
	fileInclude	= require('gulp-file-include'), // File Include
	jshint		= require('gulp-jshint'), // JS Hinting
	livereload 	= require('gulp-livereload'), // Live Reload
	notify		= require('gulp-notify'), // Notify
	rename		= require('gulp-rename'), // Rename
	sass		= require('gulp-ruby-sass'), // Sass (We have to use Ruby Sass until LibSass supports 3.3)
	uglify		= require('gulp-uglify'), // Uglify JS
	watch		= require('gulp-watch') // Watch
;

// Set asset path variables
var paths = {
	build: './assets/build/',
	js: './assets/js/',
	scss: './assets/scss/'
};

// JS Hint
gulp.task('jshint', function() {
	gulp.src(paths.js + '*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});

// File Include
gulp.task('fileInclude', function() {
	gulp.src(paths.js + 'plugins.js')
		.pipe(fileInclude())
		.pipe(gulp.dest(paths.js + 'combined/'))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	gulp.src([
		paths.js + 'combined/plugins.js',
		paths.js + 'main.js'
	])
		.pipe(concat('production.js'))
		.pipe(gulp.dest(paths.js))
		.pipe(rename('production.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.build + 'js/'))
		.pipe(notify('JS Compiled'))
});

// SCSS
gulp.task('styles', function() {
	gulp.src(paths.scss + 'main.scss')
		.pipe(sass({
			sourcemap: true,
			style: 'compressed'
		}))
		.pipe(gulp.dest(paths.build + 'css/'))
		.pipe(notify('SCSS Processed'))
});

// Watch
gulp.task('watch', function() {
	gulp.watch(paths.js + '*.js', ['jshint', 'scripts']);
	gulp.watch(paths.js + 'plugins.js', ['fileInclude']);
	gulp.watch(paths.scss + '*.scss', ['styles']);
	gulp.watch(paths.build + '**').on('change', function(file) {
		livereload().changed(file.path);
	}); // Live reload if anything in /assets/build changes
});

// Default Task
gulp.task('default', ['jshint', 'styles', 'scripts', 'fileInclude', 'watch']);
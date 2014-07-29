
// Set Plugin Variables
var gulp = require('gulp') // Gulp!
	changed 	= require('gulp-changed'), // Watch for changed files
	concat		= require('gulp-concat'), // Concat
	debug 		= require('gulp-debug'), // Debug
	imagemin 	= require('gulp-imagemin'), // Image Minifying
	include     = require('gulp-include'), // Include
	jshint		= require('gulp-jshint'), // JS Hinting
	livereload 	= require('gulp-livereload'), // Live Reload
	notify		= require('gulp-notify'), // Notify
	pngcrush 	= require('imagemin-pngcrush'); // PNG Crush
	rename		= require('gulp-rename'), // Rename
	sass		= require('gulp-ruby-sass'), // Sass (We have to use Ruby Sass until LibSass supports 3.3)
	uglify		= require('gulp-uglify'), // Uglify JS
	watch		= require('gulp-watch') // Watch
;

// Set asset path variables
var paths = {
	build: './assets/build/',
	js: './assets/js/',
	scss: './assets/scss/',
	img: './assets/img/'
};

// Error Logging
function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

// JS Hint
gulp.task('jshint', function() {
	gulp.src(paths.js + 'main.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});

// File Include
gulp.task('fileInclude', function() {
	gulp.src(paths.js + 'plugins.js')
		.pipe(include())
		.pipe(gulp.dest(paths.js + 'combined/'))
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	gulp.src([
		paths.js + 'combined/plugins.js',
		paths.js + 'main.js'
	])
		.on('error', handleError)
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
			sourcemap: false,
			style: 'compressed'
		}))
		//.pipe(debug({verbose: true}))
		.on('error', handleError)
		.pipe(gulp.dest(paths.build + 'css/'))
		.pipe(notify('SCSS Processed'))
});

// Image Minifying
gulp.task('imagemin', function() {
	var imgSrc = paths.img + '/**/*.*',
		imgDst = paths.build + 'img/'
	;

	gulp.src(imgSrc)
		//.pipe(changed(imgSrc))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [
				{ collapseGroups            : false },				
				{ removeUnknownsAndDefaults : false },
				{ removeUselessStrokeAndFill: false },
				{ removeViewBox             : false }
			],
			use: [pngcrush()]
		}))
		.pipe(gulp.dest(imgDst))
		.pipe(notify('Images Optimized'))
});

// Watch
gulp.task('watch', function() {
	gulp.watch(paths.js + 'main.js', ['jshint', 'scripts']);
	gulp.watch(paths.js + 'plugins.js', ['fileInclude', 'scripts']);
	gulp.watch(paths.scss + '**/*.scss', ['styles']);
	gulp.watch(paths.img + '**/*.*', ['imagemin']);
	gulp.watch(paths.build + '**').on('change', function(file) {
		livereload().changed(file.path);
	}); // Live reload if anything in /assets/build changes
});

// Default Task
gulp.task('default', ['jshint', 'styles', 'scripts', 'imagemin', 'fileInclude', 'watch']);
// Set Plugin Variables
var gulp = require('gulp') // Gulp!
	changed     = require('gulp-changed'), // Watch for changed files
	concat      = require('gulp-concat'), // Concat
	debug       = require('gulp-debug'), // Debug
	imagemin    = require('gulp-imagemin'), // Image Minifying
	include     = require('gulp-include'), // Include
	jshint      = require('gulp-jshint'), // JS Hinting
	livereload  = require('gulp-livereload'), // Live Reload
	notify      = require('gulp-notify'), // Notify
	pngcrush    = require('imagemin-pngcrush'); // PNG Crush
	plumber     = require('gulp-plumber'); // Gulp Plumber
	rename      = require('gulp-rename'), // Rename
	sass        = require('gulp-sass'), // Sass
	sourcemaps  = require('gulp-sourcemaps'), // Sourcemaps
	uglify      = require('gulp-uglify') // Uglify JS
;

// Set asset path variables
var paths = {
	build: 'public/assets/',
	js   : 'src/js/',
	scss : 'src/scss/',
	img  : 'src/img/',
	bower: 'bower_components/'
};

// Error Logging
function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

// Copy non-compiled JS files to /build/js/vendor folder.
// You must run this manually, it is not part of the default Gulp task.
var filesToMove = [
	paths.bower + 'modernizr/modernizr.js', // Modernizr
	paths.bower + 'respond/src/respond.js', // Respond.js (IE8)
	paths.bower + 'selectivizr/selectivizr.js', // Selectivizr (IE8)
	paths.bower + 'jquery/dist/jquery.min.js' // jQuery (1.x branch for IE8 compatibility)
];

gulp.task('jscopy', function() {
	gulp.src(filesToMove)
		.pipe(gulp.dest(paths.build + 'js/vendor/'))
});

// JS Hint
gulp.task('jshint', function() {
	gulp.src(paths.js + 'main.js')
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});

// File Include
gulp.task('fileInclude', function() {
	return gulp.src([
		paths.js + 'plugins.js',
		paths.js + 'main.js'
	])
		.pipe(include())
		.pipe(gulp.dest(paths.js + 'combined/'))
	;
});

// Concatenate & Minify JS
gulp.task('scripts', ['fileInclude'], function() {
	return gulp.src([
		paths.js + 'combined/plugins.js',
		paths.js + 'combined/main.js'
	])
		.pipe(concat('production.js'))
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(gulp.dest(paths.js))
		.pipe(rename('production.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.build + 'js/'))
		.pipe(sourcemaps.write())
		.pipe(notify('JS Compiled'))
	;
});

// SCSS
gulp.task('styles', function() {
	gulp.src(paths.scss + 'main.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest(paths.build + 'css/'))
		.pipe(notify('SCSS Processed'))
});


// Image Minifying
gulp.task('imagemin', function() {
	var imgSrc = paths.img + '**/*',
		imgDst = paths.build + 'img'
	;

	gulp.src(imgSrc)
		.pipe(changed(imgDst))
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
	gulp.watch(paths.js + 'modules/*.js', ['scripts']);
	gulp.watch(paths.js + 'main.js', ['jshint', 'scripts']);
	gulp.watch(paths.js + 'plugins.js', ['fileInclude', 'scripts']);
	gulp.watch(paths.scss + '**/*.scss', ['styles']);
	gulp.watch(paths.img + '**/*.*', ['imagemin']);
	livereload.listen();
	gulp.watch([paths.build + '**', '!' + paths.build + 'css/*.css.map']).on('change', livereload.changed); // Live reload if anything in /assets/build changes
});

// Default Task
gulp.task('default', ['jshint', 'styles', 'scripts', 'imagemin', 'fileInclude', 'watch']);
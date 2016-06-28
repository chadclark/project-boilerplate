// Set Plugin Variables
var gulp         = require('gulp'); // Gulp!
var autoprefixer = require('gulp-autoprefixer'); // Auto-prefixer CSS
var changed      = require('gulp-changed'); // Watch for changed files
var cheerio      = require('gulp-cheerio'); // Cheerio, good chap!
var concat       = require('gulp-concat'); // Concat
var debug        = require('gulp-debug'); // Debug
var imagemin     = require('gulp-imagemin'); // Image Minifying
var include      = require('gulp-include'); // Include
var jshint       = require('gulp-jshint'); // JS Hinting
var livereload   = require('gulp-livereload'); // Live Reload
var modernizr    = require('gulp-modernizr'); // Modernizr -- https://github.com/doctyper/gulp-modernizr
var notify       = require('gulp-notify'); // Notify
var pngcrush     = require('imagemin-pngcrush'); // PNG Crush
var plumber      = require('gulp-plumber'); // Gulp Plumber
var rename       = require('gulp-rename'); // Rename
var sass         = require('gulp-sass'); // Sass
var sourcemaps   = require('gulp-sourcemaps'); // Sourcemaps
var svgstore     = require('gulp-svgstore'); // Combine SVG files into one
var svgmin       = require('gulp-svgmin'); // Compress SVG files
var uglify       = require('gulp-uglify'); // Uglify JS

// Set asset path variables
var paths = {
	build: 'public/assets/',
	js   : 'src/js/',
	scss : 'src/scss/',
	img  : 'src/img/',
	svg  : 'src/svg/',
	bower: 'bower_components/'
};

// Auto Prefixer Options
var autoprefixerOptions = {
	browsers: [
		'last 2 versions'
	],
	cascade: false
};

// Error Logging
var onError = function(err) {
	console.log(err.toString());
	this.emit('end');
};

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
gulp.task('scripts', ['jshint', 'fileInclude'], function() {
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

// Modernizr Custom File Builder -- https://github.com/doctyper/gulp-modernizr
gulp.task('modernizr', function() {
	gulp.src(paths.js + '*.js')
		.pipe(modernizr('modernizr-custom.js', {
			tests: [
				'touchevents'
			]
		}))
		.pipe(uglify())
		.pipe(gulp.dest(paths.build + 'js/'))
});

// SCSS
gulp.task('styles', function() {
	gulp.src(paths.scss + 'main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: false,
			outputStyle: 'compressed'
		}))
		.on('error', function(err) {
			notify().write(err);
            this.emit('end');
		})
		.pipe(autoprefixer(autoprefixerOptions))
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
				{ removeViewBox             : false }
			],
			use: [pngcrush()]
		}))
		.pipe(gulp.dest(imgDst))
		.pipe(notify('Images Optimized'))
});

// SVG sprite
gulp.task('svgSprites', function () {
	return gulp.src(paths.svg + '*.svg')
	.pipe(plumber())
	.pipe(rename({prefix: 'icon-'}))
	.pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
        },
        parserOptions: { xmlMode: true }
    }))
	.pipe(svgmin({
		plugins: [
			{ removeTitle: true },
			{ removeUselessStrokeAndFill: true }
		],
		s2svg: {
			pretty: true
		}
	}))
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(gulp.dest(paths.build + 'svg'));
});

// Watch
gulp.task('watch', function() {
	gulp.watch(paths.js + 'modules/*.js', ['scripts']);
	gulp.watch(paths.js + 'main.js', ['scripts']);
	gulp.watch(paths.js + 'plugins.js', ['fileInclude', 'scripts']);
	gulp.watch(paths.scss + '**/*.scss', ['styles']);
	gulp.watch(paths.img + '**/*.*', ['imagemin']);
	gulp.watch(paths.svg + '**/*.svg', ['svgSprites']);
	livereload.listen();
	gulp.watch([paths.build + '**', '!' + paths.build + 'css/maps/*']).on('change', livereload.changed); // Live reload if anything in /assets/build changes
});

// Default Task
gulp.task('default', ['jshint', 'styles', 'scripts', 'imagemin', 'svgSprites', 'fileInclude', 'watch']);

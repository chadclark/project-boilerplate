// Manually require `gulp`
const gulp = require('gulp'); // Gulp!

// load all plugins in 'devDependencies' into the variable `$`
const $ = require('gulp-load-plugins')({
	pattern: ['*'],
	scope: ['devDependencies']
});

// read in package vars from `package.json`
const pkg = require('./package.json');

// Browsersync
const browserSync = $.browserSync.create();

// Auto Prefixer Options
const autoprefixerOptions = {
	browsers: [
		'last 2 versions'
	],
	cascade: false
};

gulp.task('browser-sync', function() {
    return browserSync.init({
		open: 'external',
		host: pkg.urls.browserSync,
        proxy: pkg.urls.browserSync
    });
});

gulp.task('scss', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			errLogToConsole: false,
      		outputStyle: 'compressed'
		}))
		.on('error', function(err) {
			$.notify().write(err);
			this.emit('end');
	    })
		.pipe($.autoprefixer(autoprefixerOptions))
		.pipe($.sourcemaps.write('maps'))
		.pipe(gulp.dest(pkg.paths.dist.css))
		.pipe(browserSync.stream({match: '**/*.css'}))
	;
});

gulp.watch(pkg.paths.src.scss + '**/*.scss', ['scss']);
gulp.watch(pkg.paths.templates.path + '**/*' + pkg.paths.templates.ext).on('change', browserSync.reload);

gulp.task('default', ['browser-sync', 'scss']);

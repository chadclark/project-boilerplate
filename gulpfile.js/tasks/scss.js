var config = require('../config');
if(!config.tasks.scss) return;

var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var path         = require('path');
var cssnano      = require('gulp-cssnano');

var paths = {
	src: path.join(config.root.src, config.tasks.scss.src, '/**/*.{' + config.tasks.scss.extensions + '}'),
	dest: path.join(config.root.dest, config.tasks.scss.dest)
}

var scssTask = function () {
	return gulp.src(paths.src)
		.pipe(gulpif(!global.production, sourcemaps.init()))
		.pipe(sass(config.tasks.scss.sass))
		.on('error', handleErrors)
		.pipe(autoprefixer(config.tasks.scss.autoprefixer))
		.pipe(gulpif(global.production, cssnano({autoprefixer: false})))
		.pipe(gulpif(!global.production, sourcemaps.write('../maps')))
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream());
}

gulp.task('scss', scssTask);
module.exports = scssTask;

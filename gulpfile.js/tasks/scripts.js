var config = require('../config');
if(!config.tasks.js) return;

var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var include      = require('gulp-include');
var merge        = require('merge-stream');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify')
var handleErrors = require('../lib/handleErrors');
var path         = require('path');

var paths = {
	src: path.join(config.root.src, config.tasks.js.src),
	dest: path.join(config.root.dest, config.tasks.js.dest)
}

var scriptsTask = function () {
	var plugins = gulp.src([
		paths.src + '/plugins/*.js'
	])
		.pipe(include())
		.pipe(concat('plugins.js'))
		.pipe(gulp.dest(paths.src + '/tmp'))
	;

	var modules = gulp.src([
		paths.src + '/modules/*.js'
	])
		.pipe(include())
		.pipe(concat('modules.js'))
		.pipe(gulp.dest(paths.src + '/tmp'))
	;

	var combine = gulp.src([
		paths.src + '/tmp/plugins.js',
		paths.src + '/tmp/modules.js'
	])
		.pipe(concat('production.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dest))
	;

	return merge(plugins, modules, combine);
}

gulp.task('scripts', scriptsTask);
module.exports = scriptsTask;

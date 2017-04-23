// Manually require `gulp`
const gulp = require('gulp'); // Gulp!

// load all plugins in 'devDependencies' into the variable `$`
const $ = require('gulp-load-plugins')({
	pattern: ['*'],
	scope: ['devDependencies']
});

const webpackStream = require('webpack-stream');
const webpack = require('webpack');

// read in package vars from `package.json`
const pkg = require('./package.json');

// Browsersync
const browserSync = $.browserSync.create();

const runSequence  = require('run-sequence').use(gulp);

let isProd = true;

// Auto Prefixer Options
const autoprefixerOptions = {
	browsers: [
		'ie >= 9',
		'safari >= 7',
		'ios >= 7',
		'android >= 4',
	],
	cascade: false
};

const webpackConfig = {
	watch: true,
	output: {
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ [
								'es2015',
								{
									'targets': {
										'browsers': [
											'last 2 versions',
											'ie >= 9'
										]
									},
									'loose': true,
									'modules': false
								}
							] ],
							plugins: [
								// for IE9
								// see https://gist.github.com/zertosh/4f818163e4d68d58c0fa
								'transform-proto-to-assign'
								// 'transform-object-assign'
							]
						}
					}
				]
			}
		]
	}
}

gulp.task('browser-sync', function() {
    return browserSync.init({
		open: 'external',
		host: pkg.urls.browserSync,
        proxy: pkg.urls.browserSync
    });
});

gulp.task('scss', function() {
	return gulp.src('src/scss/main.scss')
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

gulp.task('js', function() {
	return gulp.src(pkg.paths.src.js + 'main.js')
	.pipe(webpackStream(webpackConfig, webpack))
	.pipe(gulp.dest(pkg.paths.dist.js))
	.pipe($.rename({ extname: '.min.js' }))
	.pipe(gulp.dest(pkg.paths.dist.js))
	.pipe(browserSync.reload({stream: true}))
	;
});

gulp.watch(pkg.paths.src.scss + '**/*.scss', ['scss']);
gulp.watch(pkg.paths.src.js + '**/*.js', ['js']);
gulp.watch(pkg.paths.templates.path + '**/*' + pkg.paths.templates.ext).on('change', browserSync.reload);

gulp.task('default', ['browser-sync', 'scss', 'js']);

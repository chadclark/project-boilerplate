# Project Boilerplate

Project Boilerplate is an automated tool to help get a new website project up and running quickly.

## Prerequisites

- Gulp ([http://gulpjs.com/](http://gulpjs.com/))
- Sass ([http://sass-lang.com/install](http://sass-lang.com/install))
- Bourbon ([https://github.com/thoughtbot/bourbon](https://github.com/thoughtbot/bourbon))
- Neat ([https://github.com/thoughtbot/neat](https://github.com/thoughtbot/neat))

## Installation

To setup a project, run the following commands:

	$ git clone https://github.com/chadclark/project-boilerplate.git your-project-folder
	$ cd your-project-folder
	$ ./setup

To start watching for changes and to start a live-reloading server, run the following command from your project's `public` directory:

	$ gulp

## What It Does


### Build Automation

Project Boilerplate uses the awesome [Gulp.js](http://gulpjs.com) for automating tasks like compiling Sass, linting and concatenating javascript, and automatically optimizing images. Here's a complete list of the Gulp.js plugins included:

- __[gulp-concat](https://www.npmjs.org/package/gulp-concat/)__ - Combines the `plugins.js` and `main.js` files into one `production.js` file
- __[gulp-file-include](https://www.npmjs.org/package/gulp-file-include/)__ - Includes separate plugin files in `public/assets/js/plugins.js`
- __[gulp-imagemin](https://www.npmjs.org/package/gulp-imagemin/)__ - Minifies PNG, JPEG, GIF and SVG images
- __[gulp-jshint](https://www.npmjs.org/package/gulp-jshint/)__ - Checks Javascript files for errors using JSHint
- __[gulp-livereload](https://www.npmjs.org/package/gulp-livereload/)__ - This will reload the browser when certain files are updated (you will need to use a LiveReload browser extension)
- __[gulp-notify](https://www.npmjs.org/package/gulp-notify/)__ - This will send a notification message when certain tasks are completed
- __[gulp-rename](https://www.npmjs.org/package/gulp-rename/)__ - Used to rename the `production.js` to `production.min.js` file after it has been uglifed
- __[gulp-ruby-sass](https://www.npmjs.org/package/gulp-ruby-sass/)__ - This compiles the Sass files ([gulp-sass](https://www.npmjs.org/package/gulp-sass/) uses the faster libsass, but libsass does not yet support Sass 3.3 features) 	
- __[gulp-uglify](https://www.npmjs.org/package/gulp-uglify/)__ - This compresses the Javascript files
- __[gulp-watch](https://www.npmjs.org/package/gulp-watch/)__ - This will "watch" for certain events to happen (example, an updated .scss file) and then trigger a task(s) (like compiling Sass, compressing the CSS file and live reloading your browser)

## What Goes Where

Project Boilerplate makes some assumptions about where assets files are stored.

### Public Directory

All content viewable in a web browser is in the `public` directory. This is the public "root".

### Source Files
The "source" asset files are unminifed and uncompressed - they are meant to be read by humans.

'Source' assets files hierarchy:

~~~
public
 - assets
   - css
   - img
   - js
   - scss  
~~~

### Build Files
These files are minified, combined, uglified, etc. The goal for these files is to optimize for speed so pages load faster.

'Build' assets files hierarchy:

~~~
public
 - assets
   - build
     - css
     - img
     - js
~~~

## Bourbon, Neat and Normalize

The fantastic [Bourbon](http://bourbon.io/) and [Neat](http://neat.bourbon.io/) are used to jumpstart the styling of the site.

Bourbon is 'a simple and lightweight mixin library for Sass' and Neat is 'a lightweight semantic grid framework for Sass and Bourbon'.

To make sure we start with a blank slate, [normalize.scss](https://github.com/kristerkari/normalize.scss) is used.
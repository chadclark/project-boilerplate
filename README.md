# Project Boilerplate

Project Boilerplate is an automated tool to help get a new website project up and running quickly.

## Prerequisites

- Gulp ([http://gulpjs.com/](http://gulpjs.com/))
- Sass ([http://sass-lang.com/install](http://sass-lang.com/install))
- Bower ([http://bower.io/](http://bower.io/))

## Installation

### Cloning

```
$ git clone https://github.com/chadclark/project-boilerplate.git your-project-folder
$ cd your-project-folder
$ ./setup
```

### Downloading .zip

1. [Download project-boilerplate.zip](https://github.com/chadclark/project-boilerplate/archive/master.zip)
2. In terminal, `cd` to the unzipped project directory
3. Run `./setup`

The `setup` script will create necessary directories, install necessary Node modules and install necessary Bower components.

To start watching for changes and to start a live-reloading server, run the following command from your project's `public` directory:

	$ gulp

## What It Does


### Build Automation

Project Boilerplate uses the awesome [Gulp.js](http://gulpjs.com) for automating tasks like compiling Sass, linting and concatenating javascript, and automatically optimizing images. Here's a complete list of the Gulp.js plugins included:

- __[gulp-changed](https://www.npmjs.org/package/gulp-changed)__ - Only pass through changed files. This is used to make sure we only compress images/SVGs if they have been updated.
- __[gulp-concat](https://www.npmjs.org/package/gulp-concat/)__ - Combines the `plugins.js` and `main.js` files into one `production.js` file
- __[gulp-debug](https://www.npmjs.com/package/gulp-debug/)__ - Debug vinyl file streams to see what files are run through your gulp pipeline
- __[gulp-imagemin](https://www.npmjs.org/package/gulp-imagemin/)__ - Minifies PNG, JPEG, GIF and SVG images
- __[gulp-include](https://www.npmjs.org/package/gulp-include/)__ - Includes separate plugin files in `public/assets/js/plugins.js`
- __[gulp-jshint](https://www.npmjs.org/package/gulp-jshint/)__ - Checks Javascript files for errors using JSHint
- __[gulp-livereload](https://www.npmjs.org/package/gulp-livereload/)__ - This will reload the browser when certain files are updated (you will need to use a LiveReload browser extension)
- __[gulp-newer](https://www.npmjs.com/package/gulp-newer/)__ - A Gulp plugin for passing through only those source files that are newer than corresponding destination files.
- __[gulp-notify](https://www.npmjs.org/package/gulp-notify/)__ - This will send a notification message when certain tasks are completed
- __[gulp-plumber](https://www.npmjs.com/package/gulp-plumber)__ - Prevent pipe breaking caused by errors from gulp plugins
- __[gulp-rename](https://www.npmjs.org/package/gulp-rename/)__ - Used to rename the `production.js` to `production.min.js` file after it has been uglifed
- __[gulp-sass](https://www.npmjs.com/package/gulp-sass/)__ - Sass plugin for Gulp. Libsassin'.
- __[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps/)__ - Which one of your 866 .scss files is that rule coming from? Find out!
- __[gulp-uglify](https://www.npmjs.org/package/gulp-uglify/)__ - This compresses the Javascript files

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
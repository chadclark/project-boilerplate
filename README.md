# Project Boilerplate

Project Boilerplate is an automated tool to help get a new website project up and running quickly.

## Prerequisites

- NPM ([https://www.npmjs.com/])(https://www.npmjs.com/)
- Gulp ([http://gulpjs.com/](http://gulpjs.com/))
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

To start watching for changes and to start a live-reloading server, run the following command from your project's root directory:

	$ gulp

## What It Does


### Build Automation

(Needs to be updated)

## What Goes Where

Project Boilerplate makes some assumptions about where assets files are stored.

### Public Directory

All content viewable in a web browser is in the `public` directory. This is the public "root".

### Source Files
The "source" asset files are unminifed and uncompressed - they are meant to be read by humans.

'Source' assets files hierarchy:

~~~
src
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
   - css
   - img
   - js
~~~

## Bourbon, Neat and Normalize

The fantastic [Bourbon](http://bourbon.io/) and [Neat](http://neat.bourbon.io/) are used to jumpstart the styling of the site.

Bourbon is 'a simple and lightweight mixin library for Sass' and Neat is 'a lightweight semantic grid framework for Sass and Bourbon'.

To make sure we start with a blank slate, [normalize.scss](https://github.com/kristerkari/normalize.scss) is used.

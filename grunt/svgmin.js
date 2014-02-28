module.exports = {

	options: {
		full: true,
		plugins: [
			{ removeViewBox: false }
		]
	},
	build: {
		files: [{
			expand: true,
			cwd: 'assets/img/',
			src: ['**/*.svg'],
			dest: 'assets/build/img/'
		}]
	}

};

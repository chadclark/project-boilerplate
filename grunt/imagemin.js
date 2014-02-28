module.exports = {

	build: {
		files: [{
			expand: true,
			cwd: 'assets/img/',
			src: ['**/*.{png,jpg,gif}'],
			dest: 'assets/build/img/'
		}]
	}

};

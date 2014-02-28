module.exports = {

	options: {
		jshintrc: '.jshintrc',
		ignores: ['assets/js/plugins.js','assets/js/plugins.processed.js']
	},
	beforeconcat: ['assets/js/*.js']

};

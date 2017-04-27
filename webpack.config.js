var webpack = require('webpack');

module.exports = {
	watch: true,
	output: {
		filename: 'main.js',
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
};

const webpack = require('webpack');
const path = require('path');
module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'amplitude.js',
		library: 'Amplitude',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	}
}
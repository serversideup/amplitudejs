const webpack = require('webpack');
const path = require('path');
module.exports = {
	entry: {
		'amplitude': './src/index.js',
		'amplitude.min': './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
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
	},
	plugins: [
	    new webpack.optimize.UglifyJsPlugin({
	      include: /\.min\.js$/,
	      minimize: true
	    })
	],
	devtool: 'source-map'
}

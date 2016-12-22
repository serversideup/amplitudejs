const webpack = require('webpack');

module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: './dist',
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
	},
	//plugins: [
	//	new webpack.optimize.UglifyJsPlugin({
	//		compress: {
	//			warnings: false,
	//		},
	//		output: {
	//			comments: false,
	//		}
	//	}),
	//]
}
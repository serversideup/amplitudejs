const path = require('path');

module.exports = {
	mode: 'production',
	entry: path.resolve(__dirname, "src/index.js"),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'amplitude.min.js',
		library: {
			name: 'Amplitude',
			type: 'umd',
			umdNamedDefine: true
		}
	},
	module: {
		rules: [
		  	{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
		],
	},
	resolve: {
		alias: {
			'@': 'src',
		}
	},
	devtool: 'source-map'
}

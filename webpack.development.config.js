const path = require('path');

module.exports = {
	mode: 'development',
	watch: true,
	entry: path.resolve(__dirname, "src/index.js"),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'amplitude.js',
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
	devtool: 'source-map'
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	devtool: "source-map",
	module:{
		rules:[
			{ 
				test: /\.js$/, 
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
		       	use: [
		         "style-loader", // creates style nodes from JS strings
		         "css-loader", // translates CSS into CommonJS
		         "sass-loader" // compiles Sass to CSS
		       	],
      			exclude: /node_modules/
     		}
		]
	},
	plugins	: [
		new HtmlWebpackPlugin({
			template: 'index.html'
		})
	],
	mode: 'development'
};
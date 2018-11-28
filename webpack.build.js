const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const config = {
	src:    path.resolve(__dirname, 'src'),
	dist:   path.resolve(__dirname, 'web')
};

module.exports = {
	resolve: {
		modules: [config.src, 'node_modules'],
		extensions: ['.js', '.jsx', '.css', '.styl']
	},
	entry: [
		path.resolve(config.src, 'index.jsx')
	],
	output: {
		path: config.dist,
		filename: 'index.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.styl$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader',
						{
							loader: 'stylus-loader',
							options: {
								use: []
							}
						}
					]
				})
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(config.src, 'index.html')
		}),
		new ExtractTextPlugin('index.css'),
		new webpack.NamedModulesPlugin(),
		new FriendlyErrorsWebpackPlugin()
	],
	mode: 'production'
};

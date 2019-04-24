const webpack = require('webpack')
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const PATH = {
	src:    path.resolve(__dirname, 'src'),
	dist:   path.resolve(__dirname, 'web'),
};

module.exports = (env, argv) => {
	return {
		resolve: {
			modules: [PATH.src, 'node_modules'],
			extensions: ['.js', '.jsx', '.css', '.styl']
		},
		entry: [
			path.resolve(PATH.src, 'index.jsx')
		],
		output: {
			path: PATH.dist,
			filename: 'index.js',
			publicPath: '/'
		},
		devServer: {
			contentBase: PATH.dist,
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
									use: [],
									include: PATH.src,
								}
							}
						]
					})
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({}),
			new ExtractTextPlugin({
				filename: 'index.css',
				disable: argv.mode === 'development',
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(PATH.src, 'index.html')
			}),
			new webpack.NamedModulesPlugin(),
			new FriendlyErrorsWebpackPlugin()
		],
		mode: argv.mode,
		devtool: (argv.mode === 'development') ? 'cheap-module-eval-source-map' : false
	}
};

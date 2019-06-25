const webpack = require('webpack')
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
			extensions: ['.js', '.jsx', '.css', '.styl'],
			symlinks: false,
			alias: {
				'react-dom': '@hot-loader/react-dom'
			}
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
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: argv.mode === 'development',
							}
						},
						'css-loader',
						{
							loader: 'stylus-loader',
							options: {
								use: [],
								include: PATH.src
							}
						}
					]
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({}),
			new MiniCssExtractPlugin({
				filename: 'index.css',
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

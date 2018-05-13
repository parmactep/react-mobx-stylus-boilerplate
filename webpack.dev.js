const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const config = {
	src:    path.resolve(__dirname, 'src'),
	entry:  'index.jsx',
	dist:   path.resolve(__dirname, 'web'),
	output: 'app.js'
};

module.exports = {
	resolve: {
		modules: [config.src, 'node_modules'],
		extensions: [".js", ".jsx", ".css", ".styl"]
	},
	entry: [
		path.resolve(config.src, config.entry)
	],
	output: {
		path: config.dist,
		filename: config.output,
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['react-hmre']
				}
			},
			{
				test: /\.styl$/,
				use: ['style-loader', 'css-loader',
					{
						loader: 'stylus-loader',
						options: {
							use: []
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			'React':        'react',
			'ReactDOM':     'react-dom',
			'PropTypes':    'prop-types'
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(config.src, 'index.html')
		}),
		new webpack.NamedModulesPlugin(),
		new FriendlyErrorsWebpackPlugin()
	],
	mode: 'development',
	devtool: 'cheap-module-eval-source-map'
};
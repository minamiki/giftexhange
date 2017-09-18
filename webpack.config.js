const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './client/index.html',
	filename: 'index.html',
	inject: 'body'
})

module.exports = {
	entry: {
		app: ["./client/index.js"]
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js"
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } },
			{ test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
			{ test: /\.css$/, loaders: 'style-loader!css-loader'}
		]
	},
	plugins: [
		HtmlWebpackPluginConfig,
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jquery': 'jquery',
			Popper: ['popper.js', 'default'],
			Util: 'exports-loader?Util!bootstrap/js/dist/util',
			Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown'
		})
	]
}


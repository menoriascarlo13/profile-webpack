const HtmlWebpackPlugin = require("html-webpack-plugin"); // include plugin file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const path = require('path');
const globImporter = require('node-sass-glob-importer');
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";


module.exports = {
	entry: {
		main: [
			path.resolve(__dirname, './src/scripts/app.js'), //import js to process
			path.resolve(__dirname, './src/styles/style.scss') //import scss to process
		], // file to target
	},
	output: {
		filename: '[name].[contenthash].bundle.js', // output file name of the targeted file
		path: path.resolve(__dirname, 'dist') // folder location on which to 
	},
	module: {
		rules: [{
				test: /\.js$/, //test describes what kind of files need to be transformed
				exclude: /node_modules/, // exclude, what files shouldn't be include in the process
				use: { // use, tells which loader will be used againts match modules.
					loader: 'babel-loader',
					options: { // here, we can also set the loader options
						presets: ['@babel/preset-env']
					}
				},
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				exclude: [
					path.resolve(__dirname, './node_modules'),
				],
				use: [{
					loader: ImageMinimizerPlugin.loader,
					options: {
						severityError: "warning", // Ignore errors on corrupted images
						minimizerOptions: {
							plugins: ["gifsicle"],
						},
					},
				}, ],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						context: path.resolve(__dirname, "src/"),
						publicPath: "../",
					}
				}]
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
				]
			}, {
				test: /\.css$/,
				use: [{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "../",
						},
					},
					"css-loader",
				],
			},

		]
	},
	plugins: [ // Plugins to be used
		new HtmlWebpackPlugin({
			title: "Webpack Output",
			meta: {
				'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
				'charset': 'utf-8',
				'X-UA-Compatible': {
					'http-equiv': 'X-UA-Compatible',
					'content': 'IE=edge'
				},
			},

			template: path.resolve(__dirname, './src/views/index.html')
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css"
		}),
	],
};
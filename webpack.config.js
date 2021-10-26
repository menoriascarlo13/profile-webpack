const HtmlWebpackPlugin = require("html-webpack-plugin"); // include plugin file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const path = require('path');
const globImporter = require('node-sass-glob-importer');


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
				test: /\.s?css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					// "sass-loader"
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								importer: globImporter()
							}
						}
					}
				] //loaders are important, they are evaluated in reverse order, from right to left and from bottom to top
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.css$/i,
				exclude: /node_modules/,
				use: [
					process.env.NODE_ENV !== "production" ? "style-loader" :
					MiniCssExtractPlugin.loader, "css-loader"
				],
			}
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
		})
	],
};
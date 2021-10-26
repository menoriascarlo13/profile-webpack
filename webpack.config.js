const HtmlWebpackPlugin = require("html-webpack-plugin"); // include plugin file
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/app.js'), // file to target
    },
    output: {
        filename: '[name].bundle.js', // output file name of the targeted file
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
                test: /\.css$/,
                use: ["style-loader", "css-loader"] //loaders are important, they are evaluated in reverse order, from right to left and from bottom to top
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"] //loaders are important, they are evaluated in reverse order, from right to left and from bottom to top
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [ // Plugins to be used
        new HtmlWebpackPlugin({
            title: "Webpack Output",
        }),
        new CleanWebpackPlugin()
    ],
};
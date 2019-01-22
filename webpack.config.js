const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const webpack = require('');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: '.\\frontend\\src\\main\\js\\container\\app.js',
    output: {
        path: path.resolve('.\\webapp\\src\\main\\web-app\\'),
        filename: 'bundle.js',
        sourceMapFilename: "[name].js.map",
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader', use: ['css-loader']
                    })
            }, {
                test: /\.woff$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 50000,
                    },
                },
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
],
    devtool: false,
    //new webpack.SourceMapDevToolPlugin({})

};
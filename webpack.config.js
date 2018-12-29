const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '.\\controller\\src\\main\\web-app\\app.js',
    output: {
        path: path.resolve('.\\controller\\src\\main\\web-app', 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets :["@babel/env", "@babel/react"],
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '.\\controller\\src\\main\\web-app\\index.html',
            inject: "body"
        })
    ]
};
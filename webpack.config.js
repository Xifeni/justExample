const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '.\\controller\\src\\main\\web-app\\app.js',
    output: {
        path: path.resolve('.\\controller\\src\\main\\web-app', 'script'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js|.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        /*new HtmlWebpackPlugin({
            template: '.\\controller\\src\\main\\web-app\\WEB-INF\\main.html',
            inject: "body"
        })*/
    ]
};
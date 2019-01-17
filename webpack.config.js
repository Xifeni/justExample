const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: '.\\frontend\\src\\main\\js\\container\\app.js',
    output: {
        path: path.resolve('.\\webapp\\src\\main\\web-app\\'),
        filename: 'bundle.js',
        publicPath: '\\public\\'
    },
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
            }
        ]
    },
    plugins: [
        /*new HtmlWebpackPlugin({
            template: '.\\controller\\src\\main\\web-app\\index.html',
            inject: "body"
        }),*/
        new ExtractTextPlugin("styles.css"),
    ],
    devtool: NODE_ENV === 'development' ? 'source-map' : false

};
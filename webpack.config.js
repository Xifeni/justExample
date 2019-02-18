const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env, arg) => ({
    entry: path.resolve('./frontend/src/main/js/app.js'),
    output: {
        path: path.resolve('./webapp/src/main/web-app/'),
        filename: 'bundle.js'
    },
    performance: {
        hints: false
    },
    watch: arg.mode === 'development',
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
                        limit: 25000,
                    },
                },
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")],
    devtool: arg.mode === 'development' ? 'source-map' : false
});
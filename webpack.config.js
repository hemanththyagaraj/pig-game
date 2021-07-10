const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function (config, options) {
    const { mode } = options
    const configuration = {
        entry: './src/index.js',
        output: {
            filename: 'js/[name].[hash].bundle.js',
            path: path.join(__dirname, 'bundle'),
            environment: {
                arrowFunction: false
            }
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
                { test: /\.png$/, type: 'asset/resource', generator: {
                    filename: 'assets/[name][ext]'
                } },
                { test: /\.html$/, use: ['html-loader'] },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(__dirname, 'public/index.html')
            })
        ],
        devServer: {
            port: 9000,
            contentBase: './build',
            // hot: true
        },
        devtool: 'source-map',
    }

    if (mode === 'production') {
        return {
            ...configuration,
            module: {
                rules: [
                    ...configuration.module.rules,
                    { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }
                ]
            },
            plugins: [
                ...configuration.plugins,
                new MiniCssExtractPlugin({
                    filename: 'css/[name].[hash].bundle.css'
                })
            ]
        }
    } else {
        return {
            ...configuration,
            devtool: 'source-map',
            module: {
                rules: [
                    ...configuration.module.rules,
                    { test: /\.css$/, use: ['style-loader', 'css-loader'] }
                ]
            }
        }
    }
}
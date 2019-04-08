// webpack
const webpack = require('webpack');
// path
const path = require('path');
// html 模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包前清除原文件夹
const cleanWebpackPlugin = require('clean-webpack-plugin');
// css 单独打包
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        main: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'cdj'),
        filename: 'js/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: extractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        },
                        'postcss-loader',
                        'less-loader'
                    ],
                })
            },
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            publicPath: '../',
                            name: 'img/[name].[ext]', // 将要打包的哪个文件夹下
                            limit: 1
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            publicPath: '../',
                            name: 'font/[name].[ext]', // 将要打包的哪个文件夹下
                            limit: 1
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-withimg-loader',
                    }
                ]
            }
        ]
    },
    plugins: [
        // 每次打包都会清除上一次打包的源文件
        // new cleanWebpackPlugin(['cdj']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        // 代码压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        // 将css单独打包 用extractTextWebpackPlugin标签引入
        new extractTextWebpackPlugin({
            filename: getPath => {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ],
    // webpack 服务器
    devServer: {
        port: 8888,
    }
}

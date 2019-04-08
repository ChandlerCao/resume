// webpack
const webpack = require('webpack');
// path
const path = require('path');
// html 模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包前清除原文件夹
const cleanWebpackPlugin = require('clean-webpack-plugin');
// 模式
const isDev = process.env.mode === 'development';
// css 单独打包
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

const lessExtract = new extractTextWebpackPlugin({
    filename: 'css/[name]-[hash:8].css'
});
const config = {
    entry: {
        main: './resume.js',
    },
    output: {
        path: path.join(__dirname, 'production'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: lessExtract.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' },
                        { loader: 'less-loader' }
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: path.join(__dirname, 'node_modules'),
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
                use: [{
                    loader: 'html-loader'
                }]
            }
        ]
    },
    plugins: [
        // 将css单独打包 用extractTextWebpackPlugin标签引入
        lessExtract,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body',
            favicon: './src/img/logo.ico',
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
}

// 如果当前模式为开发模式
if (isDev) {
    config.mode = 'development';
    config.devServer = {
        port: 8888,
        host: '0.0.0.0',
        overlay: true,
        compress: true,
        hot: true
    };
    config.plugins.push(
        // 热模块替换功能，可以实现局部刷新，节省等待时间
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
} else {
    config.mode = 'production';
    config.plugins.push(new cleanWebpackPlugin(['resume']));
}
module.exports = config
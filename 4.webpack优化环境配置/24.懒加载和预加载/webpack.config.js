const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // 单入口：
    entry: './src/js/index.js',

    output: {
        // [name]：取文件名
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname,'build')
    },

    plugins: [
        //js文件中的图片处理
        new HtmlWebpackPlugin({
            template: './src/index.html',
            //压缩html
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],

    optimization: {
        splitChunks: {
           chunks: 'all'
        }
    },

    mode: 'production',
}
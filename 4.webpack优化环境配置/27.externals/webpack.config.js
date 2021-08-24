const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/js/index.js',

    output: {
        filename: 'js/built.js',
        path: resolve(__dirname,'build')
    },

    module: {
        rules: [
            
        ]
    },

    plugins: [
        // html-webpack-plugin：默认创建一个空html文件，自动引入打包输出的所有资源（JS/CSS）
        new HtmlWebpackPlugin({
            // 复制这个./src/index.html文件，并自动引入打包输出的所有资源（JS/CSS）
            template: './src/index.html',
        })
    ],

    mode: 'production',
    externals: {
        // 拒绝jQuery被打包进来
        jquery: 'jQuery'
    }
}
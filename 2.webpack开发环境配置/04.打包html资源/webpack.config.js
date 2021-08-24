/*
    loader 和 plugin 的不同：（plugin 一定要先引入才能使用）

    loader：   1.下载 2. 使用（配置 loader）
​    plugins：  1.下载 2. 引入 3. 使用
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/index.js',

    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build')
    },

    module: {
        rules: [
            
        ]
    },

    plugins: [
        // html-webpack-plugin：默认创建一个空html文件，自动引入打包输出的所有资源（JS/CSS）
        new HtmlWebpackPlugin({
            // 以 ./src/index.html文件为模板，引入打包输出的所有资源（JS/CSS）
            template: './src/index.html',
        })
    ],

    mode: 'development'
}
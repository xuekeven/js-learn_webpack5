const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
    entry: 入口起点
    
    1. string 单入口 --> './src/index.js'
        打包形成一个chunk, 输出一个bundle文件。
        此时chunk的名称默认是 main

    2. array 多入口 --> ['./src/index.js', './src/add.js']
        多个入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件。
        --> 只在HMR功能中让html文件热更新生效

    3. object 多入口 --> {index: './src/index.js', add: './src/add.js'}
        有几个入口文件就形成几个chunk，输出几个bundle文件。
        此时chunk名称是 key

    特殊用法
    {
        // 所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件。
        index: ['./src/index.js', './src/count.js'], 
        // 形成一个chunk，输出一个bundle文件。
        add: './src/add.js'
    }
*/

module.exports = {

    // 特殊用法
    entry: {
        index: ['./src/index.js', './src/count.js'], 
        add: './src/add.js'
    },

    output: {
        filename: '[name].js',
        path: resolve(__dirname,'build')
    },

    plugins: [
        new HtmlWebpackPlugin()
    ],

    mode: 'development'
}
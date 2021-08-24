const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/index.js',

    output: {
        // 文件名称（指定名称+目录）
        filename: 'js/[name].js',
        // 输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname,'build'),
        // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
        // 一般用于生产环境
        publicPath: '/',
        // 非入口的 chunk 的名称。上面 entry 指定的文件为 入口chunk。
        // 不是单入口和多入口，额外的 chunk 的命名由 chunkFilename 决定
        chunkFilename: 'js/[name]_chunk.js', 
        // 整个库向外暴露的变量名
        library: '[name]',
        // 变量名添加到哪个上 browser
        libraryTarget: 'window',
        // 变量名添加到哪个上 node
        // libraryTarget: 'global',
        // 变量名添加到哪个上 browser
        // libraryTarget: 'commonjs',
    },

    plugins: [
        new HtmlWebpackPlugin()
    ],

    mode: 'development'
}
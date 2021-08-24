const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    
    entry: './src/js/index.js',

    output: {
        filename: 'js/built.js',
        path: resolve(__dirname,'build'),
    },

    module: {
        rules: [
            {
                test: /\.css$/,               
                use: [
                    // 'style-loader'：创建style标签，将样式放入
                    // 这个loader取代 style-loader 作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    // 将css文件整合到js文件中
                    'css-loader'
                ],
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        // 提取css为单独文件
        new MiniCssExtractPlugin({
            //输出文件重命名
            filename: 'css/built.css'
        })
    ],

    mode: 'development',
}
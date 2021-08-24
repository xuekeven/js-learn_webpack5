/* 
    开发环境配置：代码能够运行即可
    启动devServer指令为：npx webpack-dev-server
*/

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/js/index.js',

    output: {
        filename: 'js/built.js',
        path: resolve(__dirname,'build'),
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule: false,
                    outputPath: 'images',
                },
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule: false,
                },
            },
            {
                exclude: /\.(html|js|css|less|jpg|png|gif|)$/,
                loader: 'file-loader',
                options: {
                    name:'[hash:10].[ext]',
                    outputPath: 'media',
                },
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],

    mode: 'development',

    devServer: {
        contentBase: resolve(__dirname,'build'),
        compress: true,
        port: 3000,
        open: true,
    },

    target: 'web'
}
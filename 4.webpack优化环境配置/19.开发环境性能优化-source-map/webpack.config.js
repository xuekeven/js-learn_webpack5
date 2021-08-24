/*
  source-map: 一种提供源代码到构建后代码映射的技术（若构建后代码出错，通过映射可追踪源代码）

    以下参数可以任意组合
    [inline-|hidden-|eval-][nosources-][cheap-[module-]] source-map

    source-map：（外部）
        错误代码准确信息 和 源代码的错误位置  
    inline-source-map：（内联）
        只生成一个内联source-map
        错误代码准确信息 和 源代码的错误位置
    hidden-source-map：（外部）
        错误代码错误原因，但是没有任何源代码信息（防止代码泄露）
        不能追踪源代码错误，只能提示到构建后代码的错误位置
    eval-source-map：（内联）
        每一个文件都生成对应的source-map，都在eval
        错误代码准确信息 和 源代码的错误位置
    nosources-source-map：（外部）
        错误代码准确信息, 但是没有任何源代码信息（防止代码泄露）
    cheap-source-map：（外部）
        错误代码准确信息 和 源代码的错误位置（只能精确到行）
    cheap-module-source-map：（外部）
        错误代码准确信息 和 源代码的错误位置 
        module：会将loader的source map加入

    内联和外部的区别：
    1. 外部生成了文件，内联没有 2. 内联构建速度更快

    开发环境：速度快，调试更友好

        速度快(eval>inline>cheap>...)
            eval-cheap-souce-map
            eval-source-map
        调试更友好  
            souce-map
            cheap-module-souce-map
            cheap-souce-map

        --> eval-source-map  / eval-cheap-module-souce-map

    生产环境：源代码要不要隐藏? 调试要不要更友好?

        内联会让代码体积变大，所以在生产环境不用内联
        nosources-source-map 全部隐藏
        hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

        --> source-map / cheap-module-souce-map
*/

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: ['./src/js/index.js','./src/index.html'],

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
        // 开启HMR功能
        // 当修改了webpack配置，新配置要想生效，必须重新webpack服务
        hot: true
    },

    target: 'web',
    devtool: 'eval-source-map'
}

/*
  source-map: 一种提供源代码到构建后代码映射的技术（若构建后代码出错，通过映射可追踪源代码）

    以下参数可以任意组合
    [inline-|hidden-|eval-][nosources-][cheap-[module-]] source-map

    source-map：（外部）
        错误代码准确信息 和 源代码的错误位置  
    inline-source-map：（内联）
        只生成一个内联source-map
        错误代码准确信息 和 源代码的错误位置
    hidden-source-map：（外部）
        错误代码错误原因，但是没有任何源代码信息（防止代码泄露）
        不能追踪源代码错误，只能提示到构建后代码的错误位置
    eval-source-map：（内联）
        每一个文件都生成对应的source-map，都在eval
        错误代码准确信息 和 源代码的错误位置
    nosources-source-map：（外部）
        错误代码准确信息, 但是没有任何源代码信息（防止代码泄露）
    cheap-source-map：（外部）
        错误代码准确信息 和 源代码的错误位置（只能精确到行）
    cheap-module-source-map：（外部）
        错误代码准确信息 和 源代码的错误位置 
        module：会将loader的source map加入

    内联和外部的区别：
    1. 外部生成了文件，内联没有 2. 内联构建速度更快

    开发环境：速度快，调试更友好

        速度快(eval>inline>cheap>...)
            eval-cheap-souce-map
            eval-source-map
        调试更友好  
            souce-map
            cheap-module-souce-map
            cheap-souce-map

        --> eval-source-map  / eval-cheap-module-souce-map

    生产环境：源代码要不要隐藏? 调试要不要更友好?

        内联会让代码体积变大，所以在生产环境不用内联
        nosources-source-map 全部隐藏
        hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

        --> source-map / cheap-module-souce-map
*/
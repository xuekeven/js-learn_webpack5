/*
    webpack.config.js 是 webpack 的配置文件

    作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）

    所有构建工具都是基于 nodejs 平台运行的，模块化默认采用 commonjs
*/

// resolve用来拼接绝对路径方法
const { resolve } = require('path');

// webpack配置
module.exports = {

    // 入口
    entry: './src/index.js',

    // 输出
    output: {
        // 输出文件名
        filename: 'built.js',
        // 输出路径
        // __dirname是Node.js的变量，代表当前文件目录的绝对路径
        path: resolve(__dirname,'build')
    },

    // loader配置
    module: {
        rules:[
            // 详细Loader配置
            // 不同的文件匹配不同loader处理
            {
                // 匹配哪些文件
                test: /\.css$/,
                // 使用多个loader处理
                // 数组中loader执行顺序：从右到左，从下到上，依次执行(先执行css-loader)
                use: ['style-loader','css-loader'],

            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader'],

            }
        ]
    },

    //plugins配置
    plugins: [

    ],

    //模式
    mode: 'development',   // 开发模式
    //mode: 'production'
}
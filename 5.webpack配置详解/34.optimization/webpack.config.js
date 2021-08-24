const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {

    entry: './src/js/index.js',

    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build'),
        chunkFilename: 'js/[name].[contenthash:10]_chunk.js'
    },

    module: {
        rules: [

            {
                test: /\.css$/,
                // 多个loader用use
                use: ['style-loader', 'css-loader']
            },

        ]
    },

    plugins: [new HtmlWebpackPlugin()],

    mode: 'production',

    resolve: {
        // 配置解析模块路径别名。优点:简写路径 缺点:路径没有提示
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        // 配置省略文件路径的后缀名
        extensions: ['.js', '.json', '.css', 'jsx'],
        // 告诉 webpack 解析模块是去找哪个目录
        modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
    },

    optimization: {

        // 提取公共代码成 chunk 打包
        splitChunks: {

            chunks: 'all',

            // 以下都是默认值，可以不写
            // minSize: 30 * 1024,   // 分割的 chunk 最小为30kb
            // maxSize: 0 ,   // 最大没有限制
            // minChunks: 1,   // 要提取的chunk最少被引用1次
            // maxAsyncRequests: 5,   // 按需加载时并行加载的文件的最大数量
            // maxInitialRequests: 3,   // 入口js文件最大并行请求数量
            // automaticNameDelimiter: '~',   // 名称连接符
            // name: true,   // 可以使用命名规则

            // cacheGroups: {
            //     // 分割chunk的组的规则如下
            //     // 除下面的规则，还需满足上面公共规则，如：大小超过30kb，至少被引用一次
                
            //     // vendors组
            //     vendors: {
            //         // 检测文件
            //         // node_modules文件会被打包到 vendors 组的 chunk 中。命名：vendors~xxx.js
            //         test: /[\\/]node_modules[\\/]/,
            //         // 优先级
            //         priority: -10
            //     },

            //     // 默认组
            //     default: {
            //         // 要提取的chunk最少被引用2次，（覆盖上面公共规则）
            //         minChunks: 2,
            //         // 优先级低一点
            //         priority: -20,
            //         // 如果当前要打包的模块，和之前已经被提取的模块是同一个就复用，而不是重新打包模块
            //         reuseExistingChunk: true
            //     }
            // }
        },

        // 将当前模块的记录其他模块的 hash 单独打包为单独文件 runtime
        // 解决：修改 a 文件导致 b 文件的 contenthash 变化
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        },

        // 生产环境下压缩 js 代码的优化
        minimizer: [
            // 配置生产环境的压缩方案：js 和 css
            new TerserWebpackPlugin({
                // 开启缓存
                cache: true,
                // 开启多进程打包
                parallel: true,
                // 启动source-map
                sourceMap: true
            })
        ]
    }
}
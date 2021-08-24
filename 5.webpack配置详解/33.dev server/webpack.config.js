const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/js/index.js',

    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname,'build'),
    },

    module: {
        rules: [

            // loader的配置

            {
                test: /\.css$/,
                // 多个loader用use
                use: ['style-loader', 'css-loader']
            },

        ]
    },

    plugins: [new HtmlWebpackPlugin()],
    mode: 'development',

    resolve: {
        alias: {
            $css: resolve(__dirname,'src/css')
        },
        extensions: ['.js', '.json', '.css', 'jsx'],
        modules:[resolve(__dirname,'../../node_modules'),'node_modules']
    },

    // 用于开发服务器，不能用于生产环境，用于开发环境
    devServer: {
        // 运行代码的目录
        contentBase: resolve(__dirname,'build'),
        // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload（重新打包）
        watchContentBase: true,
        // 忽略监视文件
        watchOptions: {
            ignored: /node_modules/
        },
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 5000,
        // 域名
        host: 'localhost',
        // 自动打开浏览器
        open: true,
        // 开启HMR功能
        hot: true,
        // 不要显示启动服务器日志信息
        clientLogLevel: 'none',
        // 除了基本启动信息以外，其他内容都不要显示
        quiet: true,
        // 如果出错不要全屏提示
        overlay: false,
        // 服务器代理:解决开发环境跨域问题
        proxy: {
            // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另一个服务器(3000)
            '/api': {
                target: 'http://localhost:3000',
                // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
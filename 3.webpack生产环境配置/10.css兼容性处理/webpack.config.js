const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs环境变量
//process.env.NODE_ENV = 'development';

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
            
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    /*
                        CSS兼容性处理： postess-loader 和 postess-preset-env
                        postess-preset-env：帮postess-loader找到package.json中browserslist里配置，通过配置加载指定的css兼容性样式
                    
                        "browserslist": {
                            开发环境（设置node环境变量：process.env.NODE_ENV = development）
                            "development": [
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                            ],
                            生产环境（默认）
                            "production": [
                            ">0.2%",
                            "not dead",
                            "not op_mini all"
                            ]
                        }
                    */
                    /* 
                        使用loader的默认配置：
                        'postcss-loader',
                    */
                    // css兼容性处理
                    // 修改loader的配置s
                    {
                        loader: 'postcss-loader',
                        options: {
                          ident: 'postcss',
                          plugins: () => [
                            // postcss的插件
                            require('postcss-preset-env')()
                          ]
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            //输出文件重命名
            filename: 'css/built.css'
        })
    ],

    mode: 'development'
}
const { resolve } = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
    //css文件单独提取
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        //css兼容性处理
        // 在package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
];

module.exports = {

    entry: './src/js/index.js',

    output: {
        filename: 'js/built.js',
        path: resolve(__dirname,'build')
    },

    module: {
        rules: [
            //css文件处理
            {
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            //less文件处理
            {
                test: /\.less$/,
                use: [...commonCssLoader,'less-loader']
            },

            /*
            正常来讲，一个文件只能被一个loader处理。
            当一个文件要被多个loader处理，那么要指定loader执行的先后顺序：
            先执行 eslint 后执行 babel
            */

            //js文件语法检查
            {
                // 在package.json中eslintConfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            //js文件兼容性处理
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {version: 3},
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    safari: '10'
                                }
                            }
                        ]
                    ]
                }
            },
            //css文件中的图片处理
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'images',
                    esModule: false
                }
            },
            //html文件中的图片处理
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule: false
                }
            },
            //其它文件的处理
            {
                exclude: /\.(html|css|less|js|jpg|gif|png)$/,
                loader: 'file-loader',
                options: {
                    name:'[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },

    plugins: [
        //css单独提取
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        //压缩css
        new OptimizeCssAssetsPlugin(),
        //css文件中的图片处理
        new HtmlWebpackPlugin({
            template: './src/index.html',
            //压缩html
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],

    //压缩js
    mode: 'production'
}
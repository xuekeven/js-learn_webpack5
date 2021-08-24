/*
    index.js：webpack入口起点文件

    运行指令：

        开发环境：
            webpack ./src/index.js -o ./build --mode=development
            webpack会以 ./src/index.js 为入口文件打包，打包后输出到 ./build/main.js 
            整体打包环境，为开发环境
        生成环境：
            webpack ./src/index.js -o ./build --mode=production
            webpack会以 ./src/index.js 为入口文件打包，打包后输出到 ./build/main.js 
            整体打包环境，为生产环境

    结论：

        webpack 本身能处理 js/json 资源，不能处理 css/img 等其他资源

        生产环境和开发环境将 ES6 模块化编译成浏览器能识别的模块化，但是不能处理 ES6 的基本语法转化为 ES5（需要借助 loader）

        生产环境比开发环境多一个压缩 js 代码
*/

import data from './data.json';
console.log(data);

function sum(x,y) {
    return x + y;
}
console.log(sum(1,2));

import print from './print';
import '../css/index.less';
import '../css/iconfont.css';

console.log('index.js被加载了');

print();

function add(a,b) {
    return a + b;
}

console.log(add(1,19));

if (module.hot) {
    // module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
    module.hot.accept('./print.js',function(){
        // 方法会监听 print.js 文件的变化，一旦发生变化，
        // 其他模块不会重新打包构建。会执行后面的回调函数
        print();
    })
}
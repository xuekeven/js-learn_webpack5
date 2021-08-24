import count from './count'

console.log('index.js文件被打印了！');

import ('./add').then(({default: add}) => {
    console.log(add(15,15));
})

console.log(count(15,14));
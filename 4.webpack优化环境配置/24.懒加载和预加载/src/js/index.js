
console.log('index.js文件被加载了！');

// import { mul } from './test';

document.getElementById('btn').onclick = function () {

  // 正常加载：并行加载（同一时间加载多个文件）
  // 懒加载：当文件需要使用时才加载
  // 预加载 prefetch 技术：会在使用之前，提前加载js文件
  // 预加载 prefetch 技术：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
};
//import '@babel/polyfill'

const add = (x, y) => {
  return x + y;
};

console.log(add(5, 48));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('OK');
    resolve();
  },1000)
})

console.log(promise);

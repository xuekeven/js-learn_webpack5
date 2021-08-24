import $ from 'jquery';

function add(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(add(1, 2, 3, 4));

// eslint-disable-next-line
console.log($);

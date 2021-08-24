import '../css/index.css';
import { mul } from './test';

function add(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(mul(5,15));

// eslint-disable-next-line
console.log(add(1, 2, 3, 4));

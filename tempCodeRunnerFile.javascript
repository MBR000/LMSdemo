
let read_line = require('readline')

let arr = [];
let line;
let line0;
line0 = read_line();
let num = parseInt(line0);

line = read_line();
arr.push(line.split(' ').map(v=>parseInt(v)));

// console.log(arr.length)

let min = arr[1][0];
let max = arr[1][0];
for(let i = 0; i < num; i++){
  if(arr[1][i] > max)
    max = n;
  if(arr[1][i] < min)
    min = n;
}
console.log(max - min);
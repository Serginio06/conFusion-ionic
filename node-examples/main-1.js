//var express = require ('express');
//var morgan = require ('morgan');

//var app = express ();
//app.use (morgan('dev'));

var md1 = require('./module-1');

console.log(' ');
console.log(md1);
console.log('=====');
console.log('md1.x= ' + md1.x);
console.log('===== addX(5) with x = 5');
console.log('md1.addX= ' + md1.addX(5));
//console.log('===== x = 5');
//console.log(md1.addX(5));
md1.x = 10;
console.log('===== change x = 10');
console.log('md1.x= ' + md1.x);
console.log('===== addX with x = 10');
console.log('md1.addX= ' + md1.addX(5));

var md2 = require('./module-1');
console.log(' ');
console.log('===== second require for module (x should be 5 again)');
console.log('md2.x= ' + md2.x);

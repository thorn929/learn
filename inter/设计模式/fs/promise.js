/**
 * Created by zcy on 2019-03-10
 */
// let fs = require('fs')

// function readFile(url) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(url, 'utf-8', function(err, data){
//       console.log(err) 
//       console.log(data)
//       // if (err) reject(err)
//       // resolve(data)
//     })
//   })
// }

// 1. 作为一个普通返回值  就会把这个值返回给下一个then中作为成功的结果
// 2. 不是普通值 (promise 或者报错了)
// 3. 如果返回的是一个promise 会根据返回的promise 是成功或者失败 决定下一个then 的 成功和失败
// 4. 补货错误机制 (1. 默认会找最近的错误的then 找不到继续往下找)
// 5. jquery  链式调用 会返回this  promise 调用then后 会返回一个新的promise
// readFile('./aa.txt').then((data)=>{
//   console.log(data)
// }).then(data=>{
//   return 100;
// })

var fs = require('fs'); 
var path = require('path');
console.log(path.resolve(__dirname, './aa.txt'))
console.log(path.resolve(__dirname))
console.log(path.resolve(__filename))
console.log(path.resolve("a.txt",'./aa.txt'))
fs.readFile(path.resolve(__dirname,'./aa.txt'),'utf8', function(err,data){
 if(err){ 
  console.log(err); 
 }else{ 
  console.log(data);
 } 
})
// promise 是一个类  解决异步
// 自己实现这个流程
// new promise 需要传递一个executor  执行器   同步执行 会立即被调用   所以 先走  start
// 默认的状态   等待 pending
// 每一个promise 都有一个实例方法  then
// 我们可以从等待态  转换成成功 / 失败   但是 不能从成功/ 失败 进行转化   只会认第一个

let  Promise = require('./Promise')
let p = new Promise(function(resolve, reject){
  console.log('start')
  resolve('情人节到了')
  reject('不过了')
})
p.then((value) =>{
    console.log('success', value)
},
(reason)=>{
  console.log('error', reason)
})
console.log('end')
/**
 * Created by zcy on 2019-03-12
 */

let  Promise = require('./subscribe')
let p = new Promise(function(resolve, reject){
    // resolve('情人节到了')
    reject('不过了')
})
  // 实现链式调用
let promise2 = p.then((data) =>{
   throw data
})
  promise2.then(data => {
  console.log(data)
},err =>{
    console.log('err',err)
})

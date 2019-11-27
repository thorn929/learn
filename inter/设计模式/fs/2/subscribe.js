/**
 * Created by zcy on 2019-03-12
 */
function Promise (executor){
  // 在promise内部定义一个状态 当前promise的状态
  let self = this;
  self.value = undefined;
  self.reason = undefined
  self.status = 'pending'; // 默认promise的状态是pengding
  self.onResolevedCallbacks = []; // 存放所有成功的回调
  self.onRejectedCallbacks = []; // 存放所有失败的回调
  function resolve(value){
    if(self.status === 'pending'){
      self.value = value;
      self.status = 'resolved'; // 成功态
      // 发布
      self.onResolevedCallbacks.forEach(fn=>{
        fn(self.value)
      });
    }
  }
  function reject(reason){
    if(self.status === 'pending'){
      self.reason = reason;
      self.status = 'rejected'; // 失败态
      // 发布
      self.onRejectedCallbacks.forEach(fn =>{
        fn()
      });
    }
  }
  executor(resolve,reject);
}
Promise.prototype.then = function(onFulfilled, onRejected){
  let self = this;
  // 调用then后需要再次返回一个全的promise

  let  promise2 =  new Promise(function (resolve, reject) {
    if(self.status === 'resolved'){
     try{
       let x =  onFulfilled(self.value);
       resolve(x)
     }catch(e){
       reject(e)
     }
    }
    if(self.status === 'rejected'){
      try{
        let x = onRejected(self.reason);
        resolve(x)
      }catch(e){
        reject(e)
      }
    }
    if(self.status === 'pending'){
      self.onResolevedCallbacks.push(function(){
        try{
          let x = onFulfilled(self.value);
          resolve(x)
        }catch(e){
          reject(e)
        }
      });
      self.onRejectedCallbacks.push(function(){
        try{
          let x = onRejected(self.reason);
          resolve(x)
        }catch(e){
          reject(e)
        }
      });
    }
  })
  return promise2
}
module.exports = Promise;

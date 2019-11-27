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
  if(self.status === 'resolved'){
    onFulfilled(self.value);
  }
  if(self.status === 'rejected'){
    onRejected(self.reason);
  }
  if(self.status === 'pending'){

    // 订阅
    // 这里不明白 需要多多理解一下
    // 这里可以 只需要把函数传进去  但是上面foreach 中的 fn中必须传参 而且传参是当前值而且是self.value
    self.onResolevedCallbacks.push(onFulfilled)
     // self.onRejectedCallbacks.push(onRejected)


      // 我的理解是  上面传入
    // self.onResolevedCallbacks.push(function(){
    //   onFulfilled(self.value);
    // });
    // self.onRejectedCallbacks.push(function(){
    //   onRejected(self.reason);
    // });
  }
}
module.exports = Promise;

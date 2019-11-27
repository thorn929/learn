function Promise(executor){

  // 在 promise 定义一个状态   当前Promise 的状态
  let self = this
  self.value = null
  self.resaon = null
  self.status = 'pending' // 默认状态

  function resolve(value){
    if (self.status === 'pending') {
      self.value = value
      self.status = 'resolved'
    }
  }
  function reject(reason){
    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'rejected'
    }
  }

  executor(resolve, reject)
}

Promise.prototype.then = function(onFulfilled, onRejected){
  let self = this;
  if (self.status === 'resolved') {
      onFulfilled(self.value)
  }
  if (self.status === 'rejected') {
      onRejected(self.reason)
  }
}

module.exports = Promise
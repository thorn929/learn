 let  EventEmitter = require('events')

let e = new EventEmitter()

// on方法 [fn, fn, fn]  维护一对象

// 
e.on('吃饭', () => {
    console.log('这里是值s')
})
e.emit('吃饭')
e.off('吃饭')

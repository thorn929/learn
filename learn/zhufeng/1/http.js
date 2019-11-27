let http = require('http')

// 创建 服务端 需要提供一个监听函数, 这个函数只有当请求到来时触发
// 用的时候不要用3000

// 请求分为三部分 1) 请求行 方法 路径  协议  
  //              2) 请求头 浏览器信息 + 自定义
    //            3) 请求体
let server = http.createServer(function(request, response) {
    console.log(request.method)
    console.log(request.url)
    // response 相应的内容
    response.write('222')
    response.end()
})
server.listen(3010, 'localhost', () => {
    console.log('3022201 starts')
})

// nodemon
 

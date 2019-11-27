 let fs = require('fs')

 let  path = require('path')
// 文件拷贝  不能处理大文件
 fs.readFile(path.resolve(__dirname, '../name.txt'),(err, data) => {
   fs.writeFile(path.resolve(__dirname, './name1.txt'), data, (data) => {
        console.log('写入成功')
   })
 })
 
// 流 边读边写 (可以控制读取的速率)  流基于事件


//  console.log(path.resolve(__dirname, '../name.txt'))
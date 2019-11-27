/**
 * Created by zcy on 2019-03-31
 */
setTimeout(() =>{
  console.log('setTimeout1')
  process.nextTick(() => {
    console.log('nextTick2')
  })
})

console.log('start21')

process.nextTick(() => {
  console.log('nextTick1')
  setTimeout(()=> {
    console.log('setTImetout2')
  })
})
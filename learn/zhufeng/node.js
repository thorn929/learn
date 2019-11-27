setTimeout(() =>{
    console.log('setTimeout1')
    process.nextTick(() => {
        console.log('nextTick2')
    })
})

console.log('start')

process.nextTick(() => {
    console.log('nextTick1')
    setTimeout(()=> {
        console.log('setTImetout2')
    })
})   
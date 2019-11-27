/**
 * Created by zcy on 2019-03-24
 */
function fns(){
  console.log(Array.isArray([...arguments]))
  console.log(arguments)
}

fns(1,2,3,4,5)
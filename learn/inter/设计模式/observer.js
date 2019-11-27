// 观察  和 被观察者   被观察者   要存放在观察者中
// 被观察者需要提供一个更新方法  观察者  的数据发生改变   需要执行观察者 的update 方法

// 感觉注释写反了  已经改正
// 被观察者
function Subject() {
  this.state = '不开心的'
  this.arr = []

}
Subject.prototype.attach = function(s){
  this.arr.push(s)
}
Subject.prototype.setState = function(newState){
  this.state = newState;
  this.arr.forEach(s=>{
    console.log(s)  // s 指代的是  observer的实例
    s.update(this.state)})
}

// 观察者
function Observer(name, target) {
  this.name = name
  // this.target = target
}
Observer.prototype.update = function(newState) {
  console.log(this.name + '监听到了'+newState + '变化')
}

let o = new Subject();
let s1 = new Observer('我', o)
let s2 = new Observer('他', o)
o.attach(s1)
o.attach(s2)

// 这里更新啊  观察是有关系  (基于发布订阅的)
o.setState('111')
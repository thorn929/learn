import Dep from "./dep.js";

export default class Watcher {
  /**
   *
   * @param {*} vm vue 实例
   * @param {*} key data 中的属性名
   * @param {*} cb   负责更新视图的回调函数
   */
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    Dep.target = this;

    // 触发get方法， 在get方法里会去做一些操作
    this.oldValue = vm[key];

    Dep.target = null;
  }

  /** 数据变化时候更新视图 */
  update() {
    let newValue = this.vm[this.key];
    // 下面是回调函数 怎么判断ƒ相等？
    if (this.oldValue === newValue) {
      console.log(newValue, "newValue");
      return;
    }
    this.cb(newValue);
  }
}

// watcher 初始化 获取oldValue 时候， 会去做一些什么操作？
// 通过vm[key] 获取oldValue前， 为什么要将当前的实例挂在dep上，获取之后为什么又置为null了
// update 方法是在什么时候执行的？
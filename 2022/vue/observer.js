import Dep from "./dep.js";

export default class Observer {
  constructor(data) {
    this.traverse(data);
  }

  /** 递归遍历data里的所有属性 */
  traverse(data) {
    if (!data || typeof data != "object") {
      return;
    }

    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
  /** 给传入的数据设置 getter/setter */
  defineReactive(obj, key, val) {
    this.traverse(val);
    const that = this;
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newValue) {
        if (newValue == val) {
          return;
        }
        val = newValue;
        // 设置的时候可能设置了一个对象
        that.traverse(newValue);
        dep.notify();
      },
    });
  }
}

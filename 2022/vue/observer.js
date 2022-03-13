export default class Observer {
  constructor() {
    this.traverse(data);
  }

  /** 递归遍历data里的所有属性 */
  traverse(data) {
    // TODO: 递归遍历
  }
  /** 给传入的数据设置 getter/setter */
  defineReactive(obj, key, val) {}
}

/**
 * 发布订阅模式
 * 存储所有观察者，watcher
 * 每个watcher 都有一个update
 * 通知subs里每个watcher实例，触发update方法
 */

export default class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = [];
  }
  /** 添加观察者 */
  addSub(watcher) {
    if (watcher && watcher.update) {
      this.subs.push(watcher);
    }
  }
  /** 发送通知 */
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  }
}

// Dep 在哪里实例化 ？ 在哪里addSub ? notify 在哪里调用？

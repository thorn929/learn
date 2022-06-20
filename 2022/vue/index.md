### vue 三个核心

1. Observer: 给对象的属性添加 getter 和 setter 用于依赖收集和派发更新
2. Dep: 用于收集当前响应式对象的依赖关系，每个响应式对象都有一个 dep 实例。 dep.subs = watcher[], 当数据发生变更的时候，会有 dep.notify()通知各个 watcher
3. Watcher: 观察者对象， render watcher, computed watcher, user watcher

- 依赖收集

1. initState, 对 computed 属性初始化时，会触发 computed watcher 依赖收集
2. initState, 对监听属性初始化的时候，触发 user watcher 依赖收集
3. render， 触发 render watch 依赖收集

- 派发更新

Object.definedProperty

1. 组件中的对响应式的数据进行了修改，会触发 setter 逻辑
2. dep.notify()
3. 遍历所有的 sub, 调用每一个 watcher 的 update 方法

总结原理：

    当创建vue实例时， vue 会遍历data里的属性， Object.definedProperty 为属性添加getter和setter对数据的读取进行劫持

    getter: 依赖收集
    setter: 派发更新

    每个组件的实例都会有对应的watcher 实例

### 计算属性的实现原理

computed watcher, 计算属性的监听器

computed watcher 持有一个 dep 实例，通过 dirty 属性标记计算属性是否需要重新求值

当 computed 的依赖值改变后，就会通知订阅的 watcher 进行更新，对 computed watcher 会将 dirty 属性设置为 true，并进行计算属性方法的调用

1. computed 缓存是什么？

计算属性是基于他的响应式依赖进行缓存的， 只有依赖发生改变的时候才会重新求值

2. computed 缓存的意义是什么？你经常在什么时候使用

   比如： 计算属性方法内容操作非常耗时， 遍历一个极大的数组，计算一次可能要耗时 1s,

   ```js
    const largeArray = [
        {...},
        {...},
        {...},
    ] // 10w
    data: {
        id: 1
    }
    computed: {
        currentItem: function() {
            return largeArray.find(item => item.id === this.id)
        }
        // 尤雨溪 类型的转化 格式的转化
        stringId: function () {
            return String(this.id)
        }
    }

   ```

### vue

1. 建立目录

- index.html 入口
- vue.js vue 主文件
- compile.js 编译模板 解析指令。 v-model v-html
- dep.js 收集依赖关系， 存储观察者，// 以发布订阅形式实现
- observer.js 数据劫持
- watcher.js 观察者对象的类

2. 初始化 vue class

```js
/**
 * 包括vue 构造函数、接受各种配置参数
 */

export default class Vue {
  constructor(options = {}) {
    this.$options = options;
    this.$data = options.$data;
    this.$methods = options.methods;

    this.initRootElement(options);
  }
  /**
   * 获取根元素， 并存储到vue实例， 简单检查一下传入的 el 是否会报错
   */
  initRootElement(options) {
    if (typeof options.el === "string") {
      this.$el = document.querySelector(options.el);
    } else if (optiosn.el instanceof HTMLElement) {
      this.$el = options.el;
    }

    if (!this.$el) {
      throw new Error("传入的el不合法，请传入正确的");
    }
  }
}
```

3. 验证一下， 新建一个 index.js

```js
import Vue from "./vue.js";

const vm = new Vue({
  el: "#app",
  data: {
    msg: "Hello Vue",
  },
  methods: {
    handler() {
      alert(111);
    },
  },
});

console.log(vm, "vm====");
```

4. vue 里 可以通过 this 来获取 data 里的属性

```js
  _proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          if (data[key] == newValue) {
            return;
          }

          data[key] = newValue;
        },
      });
    });
  }
```

5. 先把几个核心类 声明好

具体的实现先不管，写页面也是如此

- dep.js

```js
export default class Dep {
  constructor() {
    //  存储所有的观察者
    this.subs = [];
  }
  /** 添加观察者 */
  addSub(watacher) {}
  /** 发送通知 */
  notify() {}
}
```

- observer.js

```js
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
```

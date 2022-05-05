import Compiler from "./compiler.js";
import Observe from "./observer.js";

/**
 * 包括vue 构造函数、接受各种配置参数
 */

export default class Vue {
  constructor(options = {}) {
    this.$options = options;
    this.$data = options.data;
    this.$methodes = options.methodes;

    this.initRootElement(options);

    // 利用Object.definedProperty 将data 里的属性注入到vue实例中
    this._proxyData(this.$data);

    // 实例化observe 对象， 监听数据变化
    new Observe(this.$data);

    // 实例化compiler对象，解析指令和模板表达式
    new Compiler(this);
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
}

import Watcher from "./watcher.js";

export default class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;

    // 需要获取模板中的事件 如 click
    this.methods = vm.$methods;
    this.compile(vm.$el);
  }

  /** 编译模板 */
  compile(el) {
    // 伪数组
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      // 文本节点
      if (this.isTextNode(node)) {
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        // 元素节点
        this.compileElement(node);
      }
      // 有子节点， 递归调用
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }

  /** 文本节点更新视图操作 */
  compileText(node) {
    // {{msg}} msg : hello vue
    const reg = /\{\{(.+?)\}\}/;
    const value = node.textContent;

    if (reg.test(value)) {
      const key = RegExp.$1.trim(); // msg
      console.log(key, "key");
      node.textContent = value.replace(reg, this.vm[key]);

      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue;
      });
    }
  }
  /** 元素节点更新视图操作 */
  compileElement(node) {
    if (node.attributes.length) {
      Array.from(node.attributes).forEach((attr) => {
        // 遍历元素节点的所有属性
        const attrName = attr.attrName; // v-model v-html  v-on:click
        if (this.isDirective(attrName)) {
          let directiveName =
            attrName.indexOf(":") > -1
              ? attrName.substr(5)
              : attrName.substr(2);
          let key = attr.value;
          console.log(key, "key-----");
          // TODO： 更新dom节点
          this.updata(node, key, directiveName);
        }
      });
    }
  }
  updata(node, key, directiveName) {
    // v-model v-text v-html v-on:click
    const updateFn = this[directiveName + "Updater"];
    updateFn && updateFn.call(this, node, key, directiveName);
  }

  /** 更新文本 */
  textUpdater(node, value, key) {}

  /** 更新 */
  modelUpdater(node, value, key) {}

  /** 更新文本 */
  htmlUpdater(node, value, key) {}

  /** 判断元素指令是否是指令 */
  isDirective(attrName) {
    // v-
    // TODO: startsWith
    console.log(attrName, "attrName=====");
    return attrName.startsWith("v-");
  }
  /** 判断是否是文本节点 */
  isTextNode(node) {
    return node.nodeType === 3;
  }

  /** 判断是否是元素节点 */
  isElementNode(node) {
    return node.nodeType === 1;
  }
}

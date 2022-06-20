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
        const attrName = attr.name; // v-model v-html  v-on:click
        if (this.isDirective(attrName)) {
          let directiveName =
            attrName.indexOf(":") > -1
              ? attrName.substr(5)
              : attrName.substr(2);
          let key = attr.value;
          // 更新dom节点
          this.updata(node, key, directiveName);
        }
      });
    }
  }
  updata(node, key, directiveName) {
    // v-model v-text v-html v-on:click
    const updateFn = this[directiveName + "Updater"];
    updateFn && updateFn.call(this, node, this.vm[key], key, directiveName);
  }
  /** 解析v-text */
  textUpdater(node, value, key) {
    // console.log(value, 'value')
    node.textContent = value;
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue;
    });
  }
  /** 解析v-model */
  modelUpdater(node, value, key) {
    console.log(node, 'node=-')
    console.log(value, 'value=--')
    console.log(key, 'key')
    node.value = value;
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    });

    node.addEventListener("input", () => {
      this.vm[key] = node.value;
    });
  }
  /** 解析v-html */
  htmlUpdater(node, value, key) {
    node.innerHTML = value;
    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue;
    });
  }
  clickUpdater(node, value, key, directiveName) {
    node.addEventListener(directiveName, this.methods[key]);
  }
  /** 判断元素指令是否是指令 */
  isDirective(attrName) {
    // v-
    // TODO: startsWith
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

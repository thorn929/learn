// 让vscode 和 webpack 等知道 把后缀带vue的可以当做一个组件定义文件来使用
/* eslint-disalbe */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
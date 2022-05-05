import Vue from "./vue.js";

const vm = new Vue({
  el: "#app",
  data: {
    msg: "Hello Vue",
    count: 11,
    testHtml: "<ul><li>v-html测试</li></ul>",
  },
  methods: {
    handler() {
      alert(111);
    },
  },
});

console.log(vm, "vm====");

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

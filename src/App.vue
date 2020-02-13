<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="欢迎使用A股上市公司估值应用"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'  // import sub component

export default {                                      // export 一个默认模块，这个模块可以匿名
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

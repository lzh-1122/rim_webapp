<template>
  <div id="app">
    <header>
      <!-- router-link 定义点击后导航到哪个路径下 -->
<!--      <router-link to="/search" tag="button" replace>Search</router-link>-->
<!--      <el-button @click="SearchClick">Search</el-button>-->
<!--      <router-link to="/rim" tag="button" replace>RIM Value</router-link>-->
      <!--  增加两个到user组件的导航，可以看到这里使用了不同的to属性 -->
    </header>
    <!-- 对应的组件内容渲染到router-view中 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {                                      // export 一个默认模块，这个模块可以匿名
  name: 'App',
  data() {
    return {
    }
  },
  methods: {
    SearchClick(){
      // this.$router.push('/search'),
      this.$router.replace('/search'),
      console.log('SearchClick')
    },
    rimClick(){
      // this.$router.push('/rim'),
      this.$router.replace('/rim'),
      console.log('rimClick')
    }
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
  .router-link-active{
    color: red;
  }
</style>

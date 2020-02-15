<template>
  <div id="app">
    <el-container>
      <el-header style="background-color: #2c3e50" ><router-link to="/search" tag="el-button" style="float: left; margin-top: 10px">search</router-link></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
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
  /*margin-top: 60px;*/
}
  .router-link-active{
    color: red;
  }
</style>

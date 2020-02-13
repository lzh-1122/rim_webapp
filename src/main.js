import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;       // block 生产环境中的Tip消息

new Vue({                               // create Vue实例
  render: h => h(App),                  // Refer https://cn.vuejs.org/v2/api/#render
}).$mount('#app');    // load App.vue组件

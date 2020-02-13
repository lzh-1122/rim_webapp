import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';
import VueAxios from 'vue-axios';
import router from "@/router";

Vue.use(ElementUI);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;       // block 生产环境中的Tip消息

new Vue({                               // create Vue实例
  router,                               // inject 把路由注入到根实例中
  render: h => h(App),                  // Refer https://cn.vuejs.org/v2/api/#render
}).$mount('#app');    // load App.vue组件

import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Search from "@/components/Search";
import RimValue from "@/components/RimValue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// 定义 路径到组件的 映射
const routes = [
    {
        path:"/search",
        component: Search
    },
    {
        path: "/rim",
        component: RimValue
    },
    // 重定向
    {
        path: '/',
        redirect: '/home'
    }
];

let router =  new VueRouter({
    routes
});
export default router;
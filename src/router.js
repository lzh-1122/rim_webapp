import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Search from "@/components/Search";
import RIMValue from "@/components/RIMValue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// 定义 路径到组件的 映射
const routes = [
    //重定向
    {
        path:'/',
        redirect:'/search'
    },
    {
        path:"/search",
        component: Search
    },
    {
        path: "/RIMValue/:code",
        component: RIMValue
    }
];

let router =  new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active'
});
export default router;
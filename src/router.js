import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Home from "./view/Home";
import RIMValueNew from "./view/RIMValueNew";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// 定义 路径到组件的 映射
const routes = [
    //重定向
    {
        path: "/",
        name: 'Home',
        component: Home
    },
    {
        path: "/rimvalue-new/:code",
        name: "rimvalue-new",
        component: RIMValueNew
    }
];

let router =  new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active'
});
export default router;

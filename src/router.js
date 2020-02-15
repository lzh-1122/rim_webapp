import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Search from "@/components/Search";
import detail from "./components/detail";

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
    // {
    //     path: "/rim",
    //     component: RimValue
    // },
    // // new user路径，配置了动态的id
    // {
    //     path: "/user/:id",
    //     component: user
    // },
    {
        path: "/detail/:code",
        component: detail
    },
    // redirect 重定向
    // {
    //     path: '/',
    //     redirect: '/home'
    // }
];

let router =  new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active'
});
export default router;
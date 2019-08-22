import Vue from "vue";
import Router from "vue-router";
// import ElementUi from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';
import {Icon,Input,DatePicker,Button} from "element-ui";
import App from "../App.vue";
import "../css/main.scss";
import "../font/iconfont.css";
import List from "../component/List.vue";
import Add from "../component/Add.vue";
import Completed from "../component/Completed.vue";
// import "@babel/polyfill";
// Vue.use(ElementUi);
Vue.use(Icon);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(Button);


Vue.use(Router);
let list = [{
    date: "2019/8/8  16:54",
    todo: "1xxxxxxx"
}, {
    date: "2019/8/8  16:54",
    todo: "2xxxxxxx"
}, {
    date: "2019/8/8  16:54",
    todo: "3xxxxxxx"
}, {
    date: "2019/8/8  16:54",
    todo: "4xxxxxxx"
}, {
    date: "2019/8/8  16:54",
    todo: "5xxxxxxx"
}, {
    date: "2019/8/8  16:54",
    todo: "6xxxxxxx"
}, ];
Vue.prototype.list = list;
Vue.prototype.completedList = [];



let router = new Router({
    routes: [{
        path: "/",
        name: "list",
        component: List
        // component: () => import("../component/List.vue")
    }, {
        path: "/add",
        name: "add",
        // component:Add
        component: () =>
            import ("../component/Add.vue")
    }, {
        path: "/completed",
        name: "completed",
        component: Completed
        // component: () => import("../component/Completed.vue")
    }]
});

new Vue({
    router,
    el: "#app",
    render: h => h(App)
});
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import VueRouter from "vue-router";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     let token = localStorage.getItem("token");
//     if (token) {
//         config.headers.token = token;
//     }
//     console.log("请求拦截");
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     // return Promise.reject(error);
// });

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     let token = response.headers["token"];
//     if (token) {
//         localStorage.setItem("token", token);
//     }
//     // console.log(response);
//     if (response.data.code == 401) {
//         // console.log("test");
//         // alert(response.data.code);
//         // $message.error("帐号未登录！");
//         router.push("/login");
//     }

//     // 2xx 范围内的状态码都会触发该函数。
//     // 对响应数据做点什么
//     return response;
// }, function (error) {
//     console.log("异常");
//     // 超出 2xx 范围的状态码都会触发该函数。
//     // 对响应错误做点什么
//     // return Promise.reject(error);
// });
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

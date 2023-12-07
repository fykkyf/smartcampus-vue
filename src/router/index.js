import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
import loginView from "../views/login/LoginView.vue";
import RecoverPassword from "@/views/login/RecoverPassword.vue";
import MainView from "@/views/MainView.vue";

import FlipClock from "@/components/FlipClock.vue";

import WorkSpace from "@/views/WorkSpace.vue";
import FileUpload from "@/views/FileUpload.vue";
import Grade from "@/views/gradedemo/Grade.vue";
import MyCourse from "@/views/course/MyCourse.vue";
import SkillRegister from "@/views/pay/SkillRegister.vue";
import SkillPay from "@/views/pay/SkillPay.vue";
import LivingRoom from "@/views/pay/LivingRoom.vue";
import Rice from "@/views/pay/Rice.vue";
import RicePay from "@/views/pay/RicePay.vue";
import StudyPay from "@/views/pay/StudyPay.vue";
import AcadePay from "@/views/pay/AcadePay.vue";
import test from "@/views/pay/test.vue";
import MapContainer from "@/views/pay/MapContainer.vue";

import SelectElectiveCourse from "@/views/course/SelectElectiveCourse.vue";
import Examination from "@/views/course/Examination.vue";
import ElectiveCoursePay from "@/views/course/ElectiveCoursePay.vue";
import StudentInterface from "@/views/course/StudentInterface.vue";


//解决使用拦截器时页面有多个请求时出现异常
// 在重写push|replace方法时，先把VueRouter原型对象的push|replace保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
/**参数1：告诉原来的push | replace方法，你往那里跳转（传递哪些参数）、参数2：成功回调、 参数3：失败回调**/
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {
        }, () => {
        })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        })
    }
}
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
//解决使用拦截器时页面有多个请求时出现异常
// 在重写push|replace方法时，先把VueRouter原型对象的push|replace保存一份
/**参数1：告诉原来的push | replace方法，你往那里跳转（传递哪些参数）、参数2：成功回调、 参数3：失败回调**/
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {
        }, () => {
        })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        })
    }
}

const routes = [
    {
        path: '/',
        redirect: '/workSpace'
    },
    {
        path: '/login',
        name: 'login',
        component: loginView
    }, {
        path: '/flipClock',
        name: 'flipClock',
        component: FlipClock
    },
    {
        path: '/recoverPassword',
        name: 'recoverPassword',
        component: RecoverPassword
    },
    {
        path: '/file',
        name: 'fileUpload',
        component: FileUpload
    },
    {
        path: '/mainView',
        name: 'mainView',
        component: MainView,
        children: [
            {
                path: '/',
                redirect: '/workSpace'
            },
            {
                path: "/workSpace",
                name: "workSpace",
                component: WorkSpace,
            },
            {
                // 导航栏点击进入的侧边功能
                path: "/grade",
                name: "grade",
                component: Grade
            },
          {
            // 导航栏点击进入的侧边功能
            path: "/mycourse",
            name: "mycourse",
            component: MyCourse
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/skillregister",
            name: "skillregister",
            component: SkillRegister
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/skillpay",
            name: "skillpay",
            component: SkillPay
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/livingroom",
            name: "livingroom",
            component: LivingRoom
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/rice",
            name: "rice",
            component: Rice
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/ricepay",
            name: "ricepay",
            component: RicePay
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/studypay",
            name: "studypay",
            component: StudyPay
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/acadepay",
            name: "acadepay",
            component: AcadePay
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/test",
            name: "test",
            component: test
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/map",
            name: "map",
            component: MapContainer
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/selectElectiveCourse",
            name: "selectElectiveCourse",
            component: SelectElectiveCourse
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/examination",
            name: "examination",
            component: Examination
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/electiveCoursePay",
            name: "electiveCoursePay",
            component: ElectiveCoursePay
          },
          {
            // 导航栏点击进入的侧边功能
            path: "/studentInterface",
            name: "studentInterface",
            component: StudentInterface
          },
        ]
    },

    {
        path: '/',
        redirect: '/workSpace'
    },
    {
        path: '/login',
        name: 'login',
        component: loginView
    }, {
        path: '/flipClock',
        name: 'flipClock',
        component: FlipClock
    },
    {
        path: '/recoverPassword',
        name: 'recoverPassword',
        component: RecoverPassword
    },
    {
        path: '/file',
        name: 'fileUpload',
        component: FileUpload
    },
    {
        path: '/mainView',
        name: 'mainView',
        component: MainView,
        children: [
            {
                path: '/',
                redirect: '/workSpace'
            },
            {
                path: "/workSpace",
                name: "workSpace",
                component: WorkSpace,
            },
            {
                // 导航栏点击进入的侧边功能
                path: "/grade",
                name: "grade",
                component: Grade
            }
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

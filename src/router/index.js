import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import * as util from '../utils/util'

Vue.use(Router)
const login = r => require.ensure([], () => r(require('../views/auth/login')))  //登录页
const register = r => require.ensure([], () => r(require('../views/auth/register'))) //注册
const password_find = r => require.ensure([], () => r(require('../views/auth/password_find'))) //找回密码
const homePage = r => require.ensure([], () => r(require('../views/homePage')))  //首页
const personal_center = r => require.ensure([], () => r(require('../views/auth/personal_center'))) //个人中心
//打卡考勤部分
const workRecord = r => require.ensure([], () => r(require('../views/workRecord/workRecord')))
//创建项目部分
const project = r => require.ensure([], () => r(require('../views/project/project')))
const project_crew = r => require.ensure([], () => r(require('../views/project/project_crew'))) //创建班组
    //人员管理
const manger = r => require.ensure([], () => r(require('../views/peopleManger/manger')))
    //申峰静态页面人员管理
const manger_management = r => require.ensure([], () => r(require('../views/peopleManger/manger_management')))
    //静态页面班主信息
const manger_ganger = r => require.ensure([], () => r(require('../views/peopleManger/manger_ganger')))
    //静态页面成员信息
const manger_member = r => require.ensure([], () => r(require('../views/peopleManger/manger_member')))
//静态页面编辑资料
const manger_compile = r => require.ensure([], () => r(require('../views/peopleManger/manger_compile')))


//人员管理首页
const routes = [{
        path: '*',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    { path: '/password_find', name: 'password_find', component: password_find },
    { path: '/register', name: 'register', component: register },
    { path: '/homePage', name: 'homePage', component: homePage },
    { path: '/personal_center', name: 'personal_center', component: personal_center },
    { path: '/workRecord', name: 'workRecord', component: workRecord },
    { path: '/project', name: 'project', component: project },
    { path: '/project_crew', name: 'project_crew', component: project_crew },
    { path: '/manger', name: 'manger', component: manger },
    //静态页面人员管理
    { path: '/manger_management', name: 'manger_management', component: manger_management },
    { path: '/manger_ganger', name: 'manger_ganger', component: manger_ganger },
    { path: '/manger_member', name: 'manger_ganger', component: manger_member },
    { path: '/manger_compile', name: 'manger_ganger', component: manger_compile },
]

const router = new Router({
    // mode:'history',//default: hash ,history
    routes,
    linkActiveClass: "my-active",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})


//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
    let toName = to.name;
    let isLogin = store.state.login.isLogin;
    var _userDate = {},
        _user_login = {};
    let userDate = localStorage.getItem('userDate'),
        user_login = sessionStorage.getItem('user_login');
    //登录信息
    if (userDate && typeof userDate == "string") {
        _userDate = util.aes_decrypt(userDate);
    }
    //账户信息
    if (user_login && typeof user_login == "string") {
        _user_login = util.aes_decrypt(user_login);
    }
    let _isMember = false;
    if (isLogin || _user_login.isLogin) {
        _isMember = true;
    }

    if (!isLogin && !_user_login.isLogin && _userDate.type == "login") {
        store.dispatch('doLogin', _userDate);
    } else {
        if (!_isMember && toName !== 'login' && toName !== 'register' && toName !== 'password_find') {
            store.dispatch('doLoginOut');
            next({
                name: 'login'
            })
        } else {
            if (_user_login.isLogin) {
                store.dispatch('doInformation', _user_login);
                if (toName == 'login') {
                     next({
                        name: 'homePage'
                    })
                    // util.pushRouter('/homePage', 'replace');
                    // util.pushRouter('/homePage');
                } else {
                    next()
                }
            } else {
                next()
            }
        }
    }
})



//路由完成之后的操作
// router.afterEach(route => {
// })

export default router

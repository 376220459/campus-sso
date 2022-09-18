/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-04 17:54:28
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 19:03:44
 * @FilePath: \campus-sso\src\router\index.js
 * @Description: 路由配置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ErrorPage from '../views/ErrorPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ForgetPage from '../views/ForgetPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'error',
    component: ErrorPage,
  },
  {
    // 首页重定向到登录页面
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/forget',
    name: 'forget',
    component: ForgetPage,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
export default router

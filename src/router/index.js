import Vue from 'vue'
import VueRouter from 'vue-router'
import ErrorPage from '../views/ErrorPage.vue'
import LoginPage from '../views/LoginPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'error',
    component: ErrorPage,
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

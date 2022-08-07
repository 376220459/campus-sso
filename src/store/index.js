/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-04 17:54:28
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 22:05:05
 * @FilePath: \campus-sso\src\store\index.js
 * @Description: Vuex仓库
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    loadingText: '',
    redirect: 'http://localhost:8081/',
  },
  getters: {},
  mutations: {
    updateLoading(state, { loading, loadingText = state.loadingText }) {
      ;[state.loading, state.loadingText] = [loading, loadingText]
    },
    setRedirect(state, { redirect }) {
      redirect && (state.redirect = redirect)
    },
  },
  actions: {},
  modules: {},
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Header, Main, Button, Link, Container, Form, FormItem, Input, Divider, Tabs, TabPane } from 'element-ui'

Vue.use(Header)
Vue.use(Main)
Vue.use(Button)
Vue.use(Link)
Vue.use(Container)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Divider)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

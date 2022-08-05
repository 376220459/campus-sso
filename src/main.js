/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-04 17:54:28
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-05 21:30:41
 * @FilePath: \campus-sso\src\main.js
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Header,
  Main,
  Button,
  Link,
  Container,
  Form,
  FormItem,
  Input,
  Divider,
  Tabs,
  TabPane,
  Cascader,
  Select,
  Option,
} from 'element-ui'

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
Vue.use(Cascader)
Vue.use(Select)
Vue.use(Option)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

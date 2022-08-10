/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-04 17:54:28
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-11 00:09:02
 * @FilePath: \campus-sso\src\main.js
 * @Description:
 */
/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-04 17:54:28
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-06 17:57:41
 * @FilePath: \campus-sso\src\main.js
 * @Description: 入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

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
  Message,
  Loading,
  Steps,
  Step,
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
Vue.use(Steps)
Vue.use(Step)
Vue.use(Loading.directive)
Vue.use(Loading.directive)
Vue.prototype.$message = Message

Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

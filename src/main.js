import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import '@/assets/styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en' // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import Extends from "@/utils/extends"

import '@/assets/styles/index.scss' // global css
import '@/assets/icons'
import '@/assets/styles/app.scss'
Vue.use(Extends)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// 权限指令
import permission from './components/Permission'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

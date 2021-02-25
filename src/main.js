import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
// import './router/index'
import store from "./store";
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import '@/assets/styles/element-variables.scss'
import Extends from "@/utils/extends"

import '@/assets/styles/index.scss' // global css
import '@/assets/icons'
import '@/assets/styles/app.scss'

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.use(Extends)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

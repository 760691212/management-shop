import permission from './permission'

// 全局注册自定义指令
const install = function (Vue) {
  Vue.directive('permission', permission)
}

if (window.Vue) {
  window['permission'] = permission
  Vue.use(install); 
}

permission.install = install
export default permission

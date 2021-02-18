import { constantRoutes } from '@/router'
import Layout from '@/layout/index'

const state = {
  routes: constantRoutes,
  addRouters: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRouters = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions ={
  generateRoutes({ commit }, asyncRouter) {
    commit('SET_ROUTES', asyncRouter)
  }
}

export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    if (router.name) {
      if (router.name === 'Layout') { // Layout组件特殊处理
        router.name = Layout
      } else {
        const name = router.name
        router.name = loadView(name)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
}

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

import { constantRoutes } from '@/router'

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
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

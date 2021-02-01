import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true, // 导航栏状态
    withoutAnimation: false
  },
}

const mutations = {
  toggle_sidebar: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened){
      Cookies.set('sidebarStatus', 1)
    }else{
      Cookies.set('sidebarStatus', 0)
    }
  },
  close_sidebar: (state,withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  }
}

const actions = {
  toggleSidebar({ commit }){
    commit('toggle_sidebar')
  },
  closeSidebar({ commit }, { withoutAnimation }){
    commit('close_sidebar', withoutAnimation)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

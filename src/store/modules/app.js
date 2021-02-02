import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true, // 导航栏状态
  },
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  toggle_sidebar: state => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened){
      Cookies.set('sidebarStatus', 1)
    }else{
      Cookies.set('sidebarStatus', 0)
    }
  },
  close_sidebar: (state) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSidebar({ commit }){
    commit('toggle_sidebar')
  },
  closeSidebar({ commit } ){
    commit('close_sidebar')
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

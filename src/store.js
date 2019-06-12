import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarOpen: false,
    active: 'June 2019 to August 2019'
  },
  mutations: {
    setActive (state, event) {
      state.active = event
    },
    toggleSideBar (state) {
      state.sidebarOpen = !state.sidebarOpen
    }
  },
  actions: {
    activeSet (context, active) {
      context.commit('setActive', active)
    },
    sideBarToggle (context) {
      context.commit('toggleSideBar')
    }
  }
})

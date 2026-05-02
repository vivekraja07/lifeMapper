import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarOpen: false,
    active: 'June 2021 to Present',
    /** Left panel tab: 'Map' | 'Profile' | 'Projects' | 'Skills' — matches LeftSide dynamic component name */
    leftSidePick: 'Profile'
  },
  mutations: {
    setActive (state, event) {
      state.active = event
    },
    toggleSideBar (state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setLeftSidePick (state, pick) {
      state.leftSidePick = pick
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

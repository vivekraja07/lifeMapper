import Vue from 'vue'
import Vuex from 'vuex'
import eventOrder from '@/data/eventOrder.json'

Vue.use(Vuex)

const defaultActive =
  Array.isArray(eventOrder) && eventOrder.length > 0
    ? eventOrder[eventOrder.length - 1]
    : 'June 2021 to Present'

export default new Vuex.Store({
  state: {
    sidebarOpen: false,
    active: defaultActive,
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

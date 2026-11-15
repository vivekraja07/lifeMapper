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
    /** Wide-layout right panel tab: 'Period' | 'Skills' | 'Projects' */
    panelTab: 'Period',
    /** Wide layout: full-screen profile view over the map/story layout */
    profileOpen: false
  },
  mutations: {
    setActive (state, event) {
      state.active = event
    },
    toggleSideBar (state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setPanelTab (state, tab) {
      state.panelTab = tab
    },
    setProfileOpen (state, open) {
      state.profileOpen = !!open
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

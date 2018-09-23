import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    active: 'June 2018 to August 2018'
  },
  mutations: {
    setActive(state, event) {
      state.active = event
    },
  },
  actions: {
    activeSet (context, active) {
      context.commit('setActive', active)
    }
  }
})

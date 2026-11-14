import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initAnalytics } from './analytics'

import VueMq from 'vue-mq'


Vue.config.productionTip = false

initAnalytics({ router, store })

Vue.use(VueMq, {
  breakpoints: {
    sm: 450,
    md: 1250,
    lg: Infinity,
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

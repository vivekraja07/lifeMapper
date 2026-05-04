import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Welcome from './views/Welcome.vue'

Vue.use(Router)

/** App routes. `/editor` is appended only in development (see `NODE_ENV` block below). */
const routes = [
  // {
  //   path: '/',
  //   name: 'welcome',
  //   component: Welcome
  // },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/thrivent',
    name: 'thrivent',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/Thrivent.vue')
  },
  {
    path: '/slides',
    name: 'slides',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/Powerpoint.vue')
  }
]

if (process.env.NODE_ENV === 'development') {
  routes.push({
    path: '/editor',
    name: 'editor',
    component: () => import(/* webpackChunkName: "data-editor" */ './views/DataEditor.vue')
  })
}

export default new Router({
  routes
})

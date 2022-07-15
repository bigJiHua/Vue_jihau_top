import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterMap from './RouterMap'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: RouterMap,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const address = to.path
  if (address.match(/^\/CtrlView\//)) {
    if (token) {
      next()
    } else {
      next('Login')
    }
  } else if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next('Login')
    }
  } else {
    next()
  }
})

export default router

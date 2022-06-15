import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/components/Search/Search'
import CenterBox from '@/components/ContentArticle'
import Yszc from '@/components/my/隐私政策'
import Article from '@/components/Article/article'
import Login from '@/components/my/Login'
import Register from '@/components/my/Register'
import CtrlView from '@/components/Ctrl_menu/Ctrl_view'
import Users from '@/components/Ctrl_menu/menu/Users'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: CenterBox
  },
  {
    path: '/Search',
    component: Search
  },
  {
    path: '/隐私政策',
    component: Yszc
  },
  {
    path: '/article/:id',
    component: Article
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/CtrlView',
    name: 'CtrlView',
    component: CtrlView,
    redirect: '/CtrlView/Users',
    children: [
      { path: 'Users', component: Users }
    ]
  }
]
const router = new VueRouter({
  routes
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
  } else {
    next()
  }
  next()
})
export default router

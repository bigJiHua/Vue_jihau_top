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
import Authority from '@/components/Ctrl_menu/menu/Authority'
import Articles from '@/components/Ctrl_menu/menu/Article'
import Setting from '@/components/Ctrl_menu/menu/Setting'
import Collection from '@/components/Ctrl_menu/menu/Collection'
import ArticleIndex from '@/components/Ctrl_menu/menu/Article_elpage/Article_index'
import cagArticle from '@/components/Ctrl_menu/menu/Article_elpage/cagArticle'
import addArticle from '@/components/Ctrl_menu/menu/Article_elpage/addArticle'

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
    meta: {
      requireAuth: true
    },
    children: [
      { path: 'Users', component: Users },
      { path: 'Authority', component: Authority },
      {
        path: 'Article',
        component: Articles,
        redirect: '/ArticleIndex',
        children: [
          {
            path: '/ArticleIndex',
            component: ArticleIndex,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/cagArticle',
            component: cagArticle,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/addArticle',
            component: addArticle,
            meta: {
              requireAuth: true
            }
          }
        ]
      },
      { path: 'Collection', component: Collection },
      { path: 'Setting', component: Setting }
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

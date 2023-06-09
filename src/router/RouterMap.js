import CenterBox from '@/components/ContentArticle'
import Article from '@/components/Article/article'
// Page
import Search from '@/components/Page/Search'
import Page from '@/components/Page/Page'
import checkVer from '@/components/Page/checkVer'
import Login from '@/components/Page/Login'
import Register from '@/components/Page/Register'
import DevProcess from '@/components/Page/DevProcess'
import SpsList from '@/components/Page/SpsList'
// Ctrl_menu
import CtrlView from '@/components/Ctrl_menu/Ctrl_view'
import Users from '@/components/Ctrl_menu/menu/Users'
import Authority from '@/components/Ctrl_menu/menu/Authority'
import Articles from '@/components/Ctrl_menu/menu/Article'
import Setting from '@/components/Ctrl_menu/menu/Setting'
import Collection from '@/components/Ctrl_menu/menu/Collection'
import ArticleIndex from '@/components/Ctrl_menu/menu/Article_elpage/Article_index'
import cagArticle from '@/components/Ctrl_menu/menu/Article_elpage/cagArticle'
import addArticle from '@/components/Ctrl_menu/menu/Article_elpage/addArticle'

export default [
  {
    path: '/',
    component: CenterBox
  },
  {
    path: '/Search',
    component: Search
  },
  {
    path: '/page/:id',
    component: Page
  },
  {
    path: '/checkVer/',
    component: checkVer
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
    path: '/DevProcess',
    name: 'DevProcess',
    component: DevProcess
  },
  {
    path: '/SpsList',
    name: 'SpsList',
    component: SpsList
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
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/components/Page/404.vue')
  },
  {
    name: '10010.html',
    path: '/html/goods/10010.html',
    component: () => import('@/components/Page/10010.vue')
  },
  {
    path: '*', // 此处需特别注意至于最底部
    redirect: '/404'
  }
]

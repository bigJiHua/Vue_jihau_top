import Search from '@/components/Search/Search'
import CenterBox from '@/components/ContentArticle'
import Article from '@/components/Article/article'
import Page from '@/components/Page/Page'
import Login from '@/components/my/Login'
import Register from '@/components/my/Register'
import DevProcess from '@/components/my/DevProcess'
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

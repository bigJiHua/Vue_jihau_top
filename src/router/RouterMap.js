import CenterBox from '@/Views/index/ContentArticle'
import Article from '@/components/Article/article'
// Page
import Search from '@/Views/Page/Search'
import Page from '@/Views/Page/Page'
import checkVer from '@/Views/Page/checkVer'
import Login from '@/Views/Page/Login'
import Register from '@/Views/Page/Register'
import DevProcess from '@/Views/Page/DevProcess'
import SpsList from '@/Views/Page/SpsList'
import NotifyPage from '@/Views/Page/Notify.vue'
// Ctrl_menu
import CtrlView from '@/Views/Ctrl_menu/Ctrl_view'
import Users from '@/Views/Ctrl_menu/menu/Users'
import Authority from '@/Views/Ctrl_menu/menu/Authority'
import Articles from '@/Views/Ctrl_menu/menu/Article'
import Setting from '@/Views/Ctrl_menu/menu/Setting'
import Collection from '@/Views/Ctrl_menu/menu/Collection'
import ArticleIndex from '@/Views/Ctrl_menu/menu/Article_elpage/Article_index'
import cagArticle from '@/Views/Ctrl_menu/menu/Article_elpage/cagArticle'
import addArticle from '@/Views/Ctrl_menu/menu/Article_elpage/addArticle'

export default [
  {
    path: '/',
    component: CenterBox,
    name: '主页'
  },
  {
    path: '/Search',
    component: Search,
    name: '搜索'
  },
  {
    path: '/page/:id',
    component: Page,
    name: '通知'
  },
  {
    path: '/checkVer/',
    component: checkVer,
    name: '激活用户'
  },
  {
    path: '/article/:id',
    component: Article,
    name: '文章'
  },
  {
    path: '/DevProcess',
    name: '站点日志',
    component: DevProcess
  },
  {
    path: '/SpsList',
    name: '友链列表',
    component: SpsList
  },
  {
    path: '/Notify',
    name: '通知查询',
    component: NotifyPage
  },
  {
    path: '/Login',
    name: '登录',
    component: Login
  },
  {
    path: '/register',
    name: '注册',
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
      { path: 'Users', component: Users, name: '我的信息' },
      { path: 'Authority', component: Authority, name: '权限管理' },
      {
        path: 'Article',
        component: Articles,
        redirect: '/ArticleIndex',
        name: '文章列表',
        children: [
          {
            path: '/ArticleIndex',
            component: ArticleIndex,
            meta: {
              requireAuth: true
            },
            name: '我的文章'
          },
          {
            path: '/cagArticle',
            component: cagArticle,
            meta: {
              requireAuth: true
            },
            name: '编辑文章'
          },
          {
            path: '/addArticle',
            component: addArticle,
            meta: {
              requireAuth: true
            },
            name: '添加文章'
          }
        ]
      },
      {
        path: 'Collection',
        component: Collection,
        name: '我的消息'
      },
      {
        path: 'Setting',
        component: Setting,
        name: '我的系统设置'
      }
    ]
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/Views/Page/404.vue')
  },
  {
    name: '10010.html',
    path: '/html/goods/10010.html',
    component: () => import('@/Views/Page/10010.vue')
  },
  {
    path: '*', // 此处需特别注意至于最底部
    redirect: '/404'
  }
]

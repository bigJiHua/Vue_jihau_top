import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/components/Search/Search'
import CenterBox from '@/components/ContentArticle'
import Yszc from '@/components/my/隐私政策'
import Article from '@/components/Article/article'

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
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  next()
})
export default router

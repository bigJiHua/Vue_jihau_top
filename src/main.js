import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import router from '@/router/router'
import Meta from 'vue-meta'
import store from '@/store'
import HeaderM from '@/layout/Header/Header'
import ArtList from './components/ArticleListCount/Artlist.vue'
import RightM from '@/Views/index/Content_Area/Right.vue'
import Card from '@/components/Ctrl_menu/Collection_Card'
import 'vant/lib/index.css'
import '@/assets/css/index.css'
import '@/assets/css/typeface.css'
import '@/assets/js/index.js'
import CKEditor from 'ckeditor4-vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import VueTouch from 'vue-touch'
VueTouch.registerCustomEvent('doubletap', {
  taps: 2
})
VueTouch.registerCustomEvent('onetap', {
  type: 'tap',
  taps: 1
})

Vue.component('ArtList', ArtList)
Vue.component('HeaderM', HeaderM)
Vue.component('RightM', RightM)
Vue.component('CardM', Card)
Vue.use(Vant)
Vue.use(Meta)
Vue.use(CKEditor)
Vue.use(VueTouch, { name: 'v-touch' })

// 自定义一个代码高亮指令
Vue.directive('highlight', function (el) {
  const highlight = el.querySelectorAll('pre code')
  highlight.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.config.productionTip = false

export const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

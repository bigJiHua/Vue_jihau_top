import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import router from '@/router/router'
import Meta from 'vue-meta'
import store from './store'
import HeaderM from '@/components/Header/Header'
import ArtList from '../src/components/Module/Artlist.vue'
import RightM from '@/components/CenterBox/Right.vue'
import Card from '@/components/Module/Article_Card'
import 'vant/lib/index.css'
import '@/assets/css/index.css'
import '@/assets/css/typeface.css'
import '@/assets/js/index.js'
import CKEditor from 'ckeditor4-vue'

Vue.component('ArtList', ArtList)
Vue.component('HeaderM', HeaderM)
Vue.component('RightM', RightM)
Vue.component('CardM', Card)
Vue.use(Vant)
Vue.use(Meta)
Vue.use(CKEditor)

Vue.config.productionTip = true
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import router from '@/router/router'
import Meta from 'vue-meta'
import HeaderM from '@/components/Header/Header'
import ArtList from '../src/components/Module/Artlist.vue'
import RightM from '@/components/CenterBox/Right.vue'
// import store from 'store'
import 'vant/lib/index.css'
import '@/assets/css/index.css'
import '@/assets/css/typeface.css'
import '@/assets/js/index.js'

Vue.component('ArtList', ArtList)
Vue.component('HeaderM', HeaderM)
Vue.component('RightM', RightM)
Vue.use(Vant)
Vue.use(Meta)

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

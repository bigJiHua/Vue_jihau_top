import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  // 状态 全局数据 调用this.$store.state.***
  state: {
    Userdata: [],
    ArticleData: [],
    token: localStorage.getItem('token')
  },
  mutations: {
    cagArtData (state, ArticleData) {
      state.ArticleData = ArticleData
    }
  },
  actions: {
  }
})

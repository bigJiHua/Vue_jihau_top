import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  // 状态 全局数据 调用this.$store.state.***
  state: {
    Userdata: [],
    token: localStorage.getItem('token')
  },
  mutations: {
    addUserdata (state, userdata) {
      state.User = userdata
    }
  },
  actions: {
  }
})
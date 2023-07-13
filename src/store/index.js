import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  // 状态 全局数据 调用this.$store.state.***
  state: {
    Userdata: {},
    ArticleData: [],
    bgc: '',
    token: localStorage.getItem('token'),
    CountNum: [],
    indexArticleData: [],
    ArchiveList: {
      ArchiveListData: [],
      YearListData: []
    },
    LunBoList: []
  },
  mutations: {
    // 修改文章
    cagArtData (state, ArticleData) {
      state.ArticleData = ArticleData
    },
    // 改变用户数据
    cagUserData (state, Data) {
      state.Userdata = Data
    },
    // 改变颜色
    cagColor (state, bgc) {
      state.bgc = bgc
    },
    // 首页文章
    setArticle (state, ArticleData) {
      state.indexArticleData = ArticleData
    },
    // 文章归档
    setArchive (state, Data) {
      state.ArchiveList.ArchiveListData = Data.Archive
      state.ArchiveList.YearListData = Data.YearListData
    },
    // 轮播图
    setLunBoList (state, LunBoData) {
      state.LunBoList = LunBoData
    }
  },
  actions: {
  }
})

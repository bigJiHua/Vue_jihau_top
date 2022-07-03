<template>
  <div id="" class="Article">
  <div class="minheader">
    <h1>{{title}}</h1>
    <van-button @click="comback" >{{btntags}}</van-button>
  </div>
  <router-view @cagpage="cagtitle"></router-view>
  </div>
</template>

<script>

export default {
  props: [],
  data () {
    return {
      title: '文章管理',
      btntags: '新增文章',
      isGo: false
    }
  },
  // 生命周期初始化函数
  // created () {
  //
  // },
  // 方法
  methods: {
    cagtitle (val) {
      this.title = val
    },
    comback () {
      this.isGo = !this.isGo
      if (this.isGo) {
        this.title = '新增文章'
        this.btntags = '返回'
        this.$router.push('/addArticle')
      } else {
        this.title = '文章管理'
        this.btntags = '新增文章'
        this.$router.push('/ArticleIndex')
      }
    }
  },
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'ArticleM',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
.Article{
  padding: 20px;
}
.minheader{
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
}
</style>

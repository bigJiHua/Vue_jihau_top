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
      title: '我的文章',
      btntags: '新增文章',
      isGo: false
    }
  },
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
        this.title = '我的文章'
        this.btntags = '新增文章'
        this.$router.push('/ArticleIndex')
      }
    }
  },
  name: 'ArticleM'
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

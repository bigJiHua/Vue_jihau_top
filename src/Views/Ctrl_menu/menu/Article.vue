<template>
  <div id="" class="Article">
    <div class="minheader">
      <h1>{{ this.$route.name }} </h1>
      <van-button @click="comback" v-if="!isGo">{{ btntags }}</van-button>
      <van-button @click="comback" type="danger" size="small" v-else>取消编辑</van-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  props: [],
  data () {
    return {
      btntags: '新增文章',
      isGo: false
    }
  },
  methods: {
    comback () {
      this.isGo = !this.isGo
      if (this.isGo) {
        this.btntags = '返回'
        this.$router.push('/addArticle')
        this.$store.commit('cagArtData', '')
      } else {
        this.btntags = '新增文章'
        this.$router.push('/ArticleIndex')
      }
    }
  },
  name: 'ArticleM'
}
</script>

<style lang="less" scoped>
.Article {
  padding: 20px;
}

.minheader {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
}
</style>

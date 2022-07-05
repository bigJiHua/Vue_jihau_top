<template>
  <div id="" class="left_box">
    <Lunbo></Lunbo>
    <div class="article_ListView">
      <p class="article_alltitle st">
        <span>最新文章</span>
        <span>New article</span>
      </p>
      <ArticleList
        v-for="article in artlist"
        :key="article.id"
        :article="article"
      >
      </ArticleList>
    </div>
  </div>
</template>

<script>
import Lunbo from './Lunbo.vue'
import ArticleList from './ArticleList'
import getArtList from '../api/getArticleList'

export default {
  props: [],
  data () {
    return {
      artlist: []
    }
  },
  created () {
    this.getArtList()
  },
  // 方法
  methods: {
    async getArtList () {
      const { data: res } = await getArtList.getArticleList()
      this.artlist = res.data
    }
  },
  name: 'LeftBox',
  components: {
    Lunbo,
    ArticleList
  }
}
</script>

<style lang="less" scoped>
.left_box {
  .article_ListView {
    margin-top: 20px;
  }
}
  .article_alltitle {
    font-weight: bolder;
    font-size: 3rem;
  }
@media only screen and (min-width: 755px) {
  .left_box{
    width: 100%;
  }
  .article_alltitle span:nth-child(2) {
    top: 18px;
  }
}
@media only screen and (max-width: 755px) {
  .article_alltitle span:nth-child(2) {
    top: 18px;
  }
}
</style>

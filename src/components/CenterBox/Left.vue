<template>
  <div id="" class="left_box">
    <Lunbo class="lunbo_box"></Lunbo>
    <div class="article_ListView">
      <p class="article_alltitle st">
        <span>最新文章</span>
        <span>New article</span>
      </p>
      <ArticleList
        v-for="article in artlist"
        :key="article.id"
        :title="article.title"
        :authorId="article.author_id"
        :content="article.content"
        :goodnum="article.goodnum"
        :pubDate="article.pub_date"
        :coverImg="article.cover_img"
        :articleId='article.article_id'
      >
      </ArticleList>
    </div>
  </div>
</template>

<script>
import Lunbo from './Lunbo.vue'
import ArticleList from './ArticleList'
import { getArticleList } from '../api/getArticleList'

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
      const { data: res } = await getArticleList()
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
@media only screen and (min-width: 755px) {
  .article_alltitle {
    font-weight: bolder;
  }
  .article_alltitle span:nth-child(2) {
    top: 18px;
  }
}
@media only screen and (max-width: 755px) {
  .article_alltitle {
    font-weight: bolder;
  }
  .article_alltitle span:nth-child(2) {
    top: 18px;
  }
}
</style>

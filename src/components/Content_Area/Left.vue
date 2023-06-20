<template>
  <div id="" class="left_box">
    <Lunbo></Lunbo>
    <div class="article_ListView">
      <p class="article_alltitle st">
        <span>最新文章</span>
        <span>New article</span>
      </p>
      <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <ArticleList v-for="article in artlist" :key="article.id" :article="article">
          </ArticleList>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Lunbo from './Lunbo.vue'
import ArticleList from './indexArticleList'
import getArtList from '../api/getArticleList'

export default {
  props: [],
  data () {
    return {
      // 页码值
      page: 0,
      // 每页显示多少条数据
      artlist: [],
      loading: true,
      // 所有数据是否加载完毕了，如果没有更多数据了，一定要把 finished 改成 true
      finished: false,
      // 是否正在下拉刷新
      isLoading: false
    }
  },
  created () {
    this.artlist = this.$store.state.indexArticleData
    if (this.artlist.length === 0) {
      this.getArtList()
    }
  },
  methods: {
    async getArtList (isRefresh) {
      const { data: res } = await getArtList.getArticleList(this.page)
      if (res.status === 204) {
        this.isLoading = false
        this.finished = true
      } else {
        if (res.data !== undefined) {
          if (isRefresh) {
            const data = [...res.data, ...this.$store.state.indexArticleData]
            this.$store.commit('setArticle', data)
            this.isLoading = false
          } else {
            const data = [...this.$store.state.indexArticleData, ...res.data]
            this.$store.commit('setArticle', data)
            this.loading = false
          }
        } else {
          this.isLoading = false
          this.finished = true
        }
      }
      this.artlist = this.$store.state.indexArticleData
    },
    onLoad () {
      setTimeout(() => {
        this.page += 10
        this.getArtList()
      }, 800)
    },
    onRefresh () {
      setTimeout(() => {
        this.page += 10
        this.getArtList(true)
      }, 800)
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
  font-size: 2rem;
}

@media only screen and (min-width: 755px) {
  .left_box {
    width: 100%;
  }

  .article_alltitle span:nth-child(2) {
    top: 18px;
  }
}

@media only screen and (max-width: 755px) {
  .article_alltitle span:nth-child(2) {
    top: 18px;
    margin-left: 10px;
  }
}
</style>

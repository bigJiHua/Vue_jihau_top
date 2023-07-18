<!-- 通知页面-->
<template>
  <div>
    <HeaderM></HeaderM>
    <div id="" class="article">
      <div class="leftContent">
        <h1 v-if="goodpage" style="text-align: center">很抱歉，您没有查看的权限</h1>
        <div v-else>
          <div class="content">
            <p v-html="ArticleData.content" v-highlight></p>
          </div>
          <div class="tabmenu">
            <ul>
              <li v-for="(item, index) in tab" :key="index">{{ item }}：</li>
            </ul>
            <ul>
              <li>{{ ArticleData.title }}</li>
              <li>{{ ArticleData.username }}</li>
              <li>{{ ArticleData.pub_date }}</li>
              <li>{{ ArticleData.lable }}</li>
              <li>{{ ArticleData.read_num }}</li>
            </ul>
          </div>
        </div>
      </div>
      <RightM></RightM>
    </div>
  </div>
</template>

<script>
import getArticle from '@/API/indexAPI/getArticle'
export default {
  data () {
    return {
      ArticleData: [],
      goodpage: true,
      tab: ['标题', '管理员', '发布日期', '标签', '浏览数']
    }
  },
  created () {
    this.getArticle(this.$route.params.id)
  },
  methods: {
    async getArticle (id) {
      const { data: res } = await getArticle.getPageData(id)
      if (res.status !== 404) {
        this.goodpage = false
        this.ArticleData = res.data
      } else {
        this.goodpage = true
      }
    }
  },
  metaInfo () {
    return {
      title: this.ArticleData.article.title,
      meta: [
        {
          name: 'keywords',
          content: this.ArticleData.article.keyword
        },
        {
          name: 'description',
          content: this.ArticleData.article.lable
        },
        {
          name: 'robots',
          content: 'all'
        },
        {
          name: 'author',
          content: 'JiHua'
        }
      ]
    }
  },
  watch: {
    $route (to, from) {
      if (to.path !== from.path) {
        this.getArticle(this.$route.params.id)
      }
    }
  },
  name: 'ArticleM'
}
</script>

<style lang="less" scoped>
.article {
  word-wrap: break-word;
  margin: 0 auto;
  background-color: #fff;
}

@media only screen and (min-width: 755px) {
  .article {
    display: flex;
    justify-content: space-between;
    width: 80vw;
  }

  .leftContent {
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    margin-right: 20px;
    width: 50vw;
  }
}

@media only screen and (max-width: 755px) {
  .leftContent {
    background-color: rgba(243, 245, 248, 0.8);
    border-radius: 5px;
    margin-bottom: 30px;
    padding: 10px;
  }
}

.tabmenu {
  display: flex;
}

.btn_active {
  button {
    margin: 10px;
  }
}

</style>

<template>
  <div id="" class="article">
    <div class="leftContent">
      <h1 v-show="goodpage" style="text-align: center">404 NOT FOUNT</h1>
      <div v-show="!goodpage">
        <div class="content">
          <p v-html="ArticleData.article.content" v-highlight></p>
        </div>
        <div class="tabmenu">
          <ul>
            <li v-for="(item, index) in tab" :key="index">{{ item }}</li>
          </ul>
          <ul>
            <li>{{ ArticleData.article.title }}</li>
            <li>{{ ArticleData.article.username }}</li>
            <li>{{ ArticleData.article.pub_date }}</li>
            <li>{{ ArticleData.article.lable }}</li>
          </ul>
        </div>
      </div>
    </div>
    <RightM></RightM>
  </div>
</template>

<script>
import getArticle from '@/components/api/getArticle'
export default {
  data () {
    return {
      ArticleData: {
        article: '',
        goodnum: '',
        collect: '',
        commont: []
      },
      goodpage: false
    }
  },
  created () {
    this.getArticle(this.$route.params.id)
  },
  methods: {
    async getArticle (id) {
      const { data: res } = await getArticle.getArchives(id)
      if (res.status !== 404) {
        this.ArticleData.article = res.data.article
      } else {
        this.goodpage = !this.goodpage
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
.article{
  word-wrap: break-word;
  width: 80vw;
  margin: 0 auto;
}
@media only screen and (min-width: 755px) {
  .article {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .leftContent {
    background-color: rgba(243, 245, 248, 0.5);
    padding: 20px;
    border-radius: 12px;
    margin-right:20px;
    width: 50vw;
  }
}

@media only screen and (max-width: 755px) {
  .article{
    margin-top: 20px;
  }
  .leftContent {
    background-color: rgba(243, 245, 248, 0.8);
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 30px;
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
.goodnum,
.collect {
  letter-spacing: 5px;
}
.selc,.selg{
  color: red;
}
.commentArea {
  margin-top: 20px;
  padding: 10px 20px 20px 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  p {
    font-size: 2rem;
    font-weight: bolder;
  }
  #comtext {
    border-radius: 8px;
    border: 2px rgba(243, 245, 248, 0.8) solid;
    padding: 5px;
    width: 100%;
    height: 80px;
    resize: none;
  }
  .comment {
    background-color: rgba(201,227,243,.4);
    border-radius: 4px;
    padding: 5px;
    margin-bottom: 10px;
    p {
      margin: 0;
      color: rgba(6, 52, 122, 0.8);
    }
    .comment_user {
      font-size: 1.3rem;
    }
    .comment_text {
      font-size: 1.6rem;
      margin: 2px;
    }
    .comment_time {
      font-size: 1rem;
      text-align: right;
    }
  }
}
</style>

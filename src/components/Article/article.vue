<template>
  <div id="" class="article container">
    <div class="leftContent col-md-8">
      <div class="content">
        <p v-html="Article.content"></p>
      </div>
      <div class="tabmenu">
        <ul>
          <li v-for="(item, index) in tab" :key="index">{{ item }}</li>
        </ul>
        <ul>
          <li>{{ Article.title }}</li>
          <li>{{ Article.username }}</li>
          <li>{{ Article.pub_date }}</li>
          <li>{{ Article.lable }}</li>
        </ul>
      </div>
      <div class="btn_active">
        <van-button
          type="info"
          class="goodnum"
          @click="goodnum(Article.article_id)"
        >
          <span>点赞</span>
          <span :class="{selg:this.Active.goodnum}">
            <i class="glyphicon glyphicon-thumbs-up"></i>
          </span>
        </van-button>
        <van-button
          type="info"
          class="collect"
          @click="collect(Article.article_id)"
        >
          <span>收藏</span>
          <span :class="{selc:this.Active.collect}"><i class="glyphicon glyphicon-star-empty"></i></span
        ></van-button>
      </div>
    </div>
    <RightM class="col-md-4"></RightM>
  </div>
</template>

<script>
import getArticle from '@/components/api/getArticle'
import UserAction from '@/components/api/UserActionAPI/UserActiveGet'
export default {
  props: [],
  data () {
    return {
      Article: '',
      tab: ['标题', '作者：', '时间：', '标签：'],
      Active: {
        goodnum: false,
        collect: false
      }
    }
  },
  created () {
    this.getArticle(this.$route.params.id)
  },
  methods: {
    async getArticle (id) {
      const { data: res } = await getArticle.getArchives(id)
      this.$toast({
        message: res.message,
        position: 'top'
      })
      this.Article = res.data
    },
    async goodnum (artid) {
      if (localStorage.getItem('Username') === null) {
        this.$toast({
          message: '登录才能点赞哦！',
          position: 'top'
        })
      } else {
        const data = {
          username: localStorage.getItem('Username'),
          articleid: artid,
          actmenthos: 'goodnum'
        }
        const { data: res } = await UserAction.UserActive(data)
        console.log(res.data)
        this.$toast({
          message: res.message,
          position: 'top'
        })
        if (res.status === 200) {
          this.Active.goodnum = !this.Active.goodnum
        }
      }
    },
    async collect (artid) {
      if (localStorage.getItem('Username') === null) {
        this.$toast({
          message: '登录才能点赞收藏哦！',
          position: 'top'
        })
      } else {
        const data = {
          username: localStorage.getItem('Username'),
          article_id: artid,
          actmenthos: 'collect'
        }
        const { data: res } = await UserAction.UserActive(data)
        this.$toast({
          message: res.message,
          position: 'top'
        })
        if (res.status === 200) {
          this.Active.collect = !this.Active.collect
        }
      }
    }
  },
  metaInfo () {
    return {
      title: this.Article.title,
      meta: [
        {
          name: 'keywords',
          content: this.Article.keyword
        },
        {
          name: 'description',
          content: this.Article.lable
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
  name: 'ArticleM'
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .article {
    display: flex;
    justify-content: space-between;
  }
  .leftContent {
    background-color: rgba(243, 245, 248, 0.8);
    padding: 20px;
    border-radius: 12px;
    margin: 30px;
  }
}

@media only screen and (max-width: 755px) {
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
</style>

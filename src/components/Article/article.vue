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
          <span>{{ArticleData.goodnum}}</span>
        </van-button>
        <van-button
          type="info"
          class="collect"
          @click="collect(Article.article_id)">
          <span>收藏</span>
          <span :class="{selc:this.Active.collect}"><i class="glyphicon glyphicon-star-empty"></i></span>
          <span>{{ArticleData.collect}}</span>
          </van-button>
      </div>
      <div class="commentArea">
      <p>评论</p>
      <div class="comment" v-for="(item,index) in ArticleData.commont" :key="index">
          <p class="comment_user">用户:{{item.username}} 评论：</p>
          <p class="comment_text">{{item.comment}}</p>
          <p class="comment_time">时间:{{item.pub_date}}</p>
      </div>
      <div class="textarea">
      <textarea
      name=""
      id="comtext"
      placeholder="友善发言，留下美好瞬间   (最多输入150个字符)"
      maxlength="150" @keyup.enter="commont(Article.article_id)"
      v-model="Active.comTXT"
      ></textarea>
      <van-button @click="commont(Article.article_id)">留言</van-button>
      </div>
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
        collect: false,
        comTXT: ''
      },
      ArticleData: {
        goodnum: '',
        collect: '',
        commont: []
      }
    }
  },
  created () {
    this.getArticle(this.$route.params.id)
  },
  methods: {
    async getArticle (id) {
      const { data: res } = await getArticle.getArchives(id)
      this.Article = res.data
      const { data: res0 } = await getArticle.getArticleData(id)
      if (res0.data.goodnum !== 0) {
        const goodnum = res0.data.reduce((sum, item) => sum + parseInt(item.goodnum), 0)
        const collect = res0.data.reduce((sum, item) => sum + parseInt(item.collect), 0)
        this.ArticleData.goodnum = goodnum
        this.ArticleData.collect = collect
      } else {
        this.ArticleData.goodnum = 0
        this.ArticleData.collect = 0
      }
      const { data: res1 } = await getArticle.getArticleCom(id)
      this.ArticleData.commont = res1.data
      this.$toast({
        message: res.message,
        position: 'top'
      })
    },
    async goodnum (artid) {
      if (localStorage.getItem('Username') === null) {
        this.$toast({
          message: '登录才能点赞哦！',
          position: 'top'
        })
      } else {
        if (artid === undefined) {
          this.$toast({
            message: '获取文章id错误，请刷新当前页面',
            position: top
          })
        } else {
          const data = {
            username: localStorage.getItem('Username'),
            articleid: artid,
            actmenthos: 'goodnum'
          }
          const { data: res } = await UserAction.UserActive(data)
          console.log(res)
          this.$toast({
            message: res.message,
            position: 'top'
          })
          if (res.status === 200) {
            this.Active.goodnum = !this.Active.goodnum
            location.reload()
          }
        }
      }
    },
    async collect (artid) {
      console.log(artid)
      if (localStorage.getItem('Username') === null) {
        this.$toast({
          message: '登录才能点赞收藏哦！',
          position: 'top'
        })
      } else {
        if (artid === undefined) {
          this.$toast({
            message: '获取文章id错误，请刷新当前页面',
            position: top
          })
        } else {
          const data = {
            username: localStorage.getItem('Username'),
            articleid: artid,
            actmenthos: 'collect'
          }
          const { data: res } = await UserAction.UserActive(data)
          this.$toast({
            message: res.message,
            position: 'top'
          })
          if (res.status === 200) {
            this.Active.collect = !this.Active.collect
            location.reload()
          }
        }
      }
    },
    async commont (artid) {
      console.log(artid)
      if (localStorage.getItem('Username') === null) {
        this.$toast({
          message: '登录才能评论哦！',
          position: 'top'
        })
      } else {
        if (artid === undefined) {
          this.$toast({
            message: '获取文章id错误，请刷新当前页面',
            position: top
          })
        } else {
          if (this.Active.comTXT === '') {
            this.$toast({
              message: '留言输入内容不能为空哦',
              position: 'top'
            })
          } else {
            const comtxt = this.Active.comTXT.match(/((\p{sc=Han})|([a-zA-Z]))/gu).join('')
            const data = {
              username: localStorage.getItem('Username'),
              articleid: artid,
              actmenthos: 'comment',
              comment: comtxt
            }
            const { data: res } = await UserAction.UserActive(data)
            this.$toast({
              message: res.message,
              position: 'top'
            })
            if (res.status === 200) {
              this.Active.collect = !this.Active.collect
              location.reload()
            }
          }
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
.commentArea{
  margin-top: 20px;
  padding: 10px 20px 20px 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  p{
    font-size: 2rem;
    font-weight: bolder;
  }
  #comtext{
    border-radius: 12px;
    border: 2px rgba(243, 245, 248, 0.8) solid;
    padding: 5px;
    width: 100%;
    height: 80px;
    resize: none;
  }
  .comment{
    background-color: rgba(201, 227, 243, 0.4);
    border-radius: 4px;
    padding: 5px;
    margin-bottom: 10px;
    p{
      margin: 0;
      color: rgba(6, 52, 122, 0.8);
    }
    .comment_user{
      font-size: 1.3rem;
    }
    .comment_text{
      font-size: 1.6rem;
      margin: 2px;
    }
    .comment_time{
      font-size: 1rem;
      text-align: right;
    }
  }
}
</style>

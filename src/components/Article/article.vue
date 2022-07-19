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
        <div class="btn_active">
          <van-button
            type="info"
            class="goodnum"
            @click="goodnum(ArticleData.article.article_id)"
          >
            <span>点赞</span>
            <span :class="{ selg: this.Move.goodnum }">
              <i class="glyphicon glyphicon-thumbs-up"></i>
            </span>
            <span>{{ ArticleData.goodnum }}</span>
          </van-button>
          <van-button
            type="info"
            class="collect"
            @click="collect(ArticleData.article.article_id)"
          >
            <span>收藏</span>
            <span :class="{ selc: this.Move.collect }">
              <i class="glyphicon glyphicon-star-empty"> </i
            ></span>
            <span>{{ ArticleData.collect }}</span>
          </van-button>
        </div>
        <div class="commentArea">
          <p>留言</p>
          <div
            class="comment"
            v-for="(item, index) in ArticleData.commont"
            :key="index"
          >
            <p class="comment_user">{{ item.username }}用户 留言：</p>
            <p class="comment_text">{{ item.comment }}</p>
            <p class="comment_time">时间:{{ item.pub_date }}</p>
          </div>
          <div class="textarea">
            <textarea
              name=""
              id="comtext"
              placeholder="友善发言，留下美好瞬间   (最多输入150个字符)"
              maxlength="150"
              @keyup.enter="commont(ArticleData.article.article_id)"
              v-model="Active.comTXT"
            ></textarea>
            <van-button @click="commont(ArticleData.article.article_id)"
              >留言</van-button
            >
          </div>
        </div>
      </div>
    </div>
    <RightM></RightM>
    <Login @close="close" v-if="this.showLogin"></Login>
  </div>
</template>

<script>
import getArticle from '@/components/api/getArticle'
import UserAction from '@/components/api/UserActionAPI/UserActiveGet'
import Login from './ArticleLogin/ArticleLogin.vue'
export default {
  props: ['isdemo'],
  data () {
    return {
      tab: ['标题', '作者：', '时间：', '标签：'],
      Active: {
        goodnum: false,
        collect: false,
        comTXT: ''
      },
      ArticleData: {
        article: '',
        goodnum: '',
        collect: '',
        commont: []
      },
      goodpage: false,
      page: this.$route.params.id,
      Move: {
        goodnum: false,
        collect: false
      },
      showLogin: false
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
        this.ArticleData.goodnum = res.data.goodnum
        this.ArticleData.collect = res.data.collect
        this.ArticleData.commont = res.data.comment
        this.Move.goodnum = res.data.acgoodnum
        this.Move.collect = res.data.accollect
      } else {
        this.goodpage = !this.goodpage
      }
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
        this.showLogin = true
        localStorage.setItem('met', 'goodnum')
      } else {
        if (artid === undefined) {
          this.$toast({
            message: 'Page ID undefine',
            position: top
          })
        } else {
          const data = {
            username: localStorage.getItem('Username'),
            articleid: artid,
            actmenthos: 'goodnum'
          }
          const { data: res } = await UserAction.UserActive(data)
          this.$toast({
            message: res.message,
            position: 'top'
          })
          if (res.status === 200) {
            if (this.Move.goodnum === false) {
              this.ArticleData.goodnum += 1
              this.Move.goodnum = !this.Move.goodnum
            } else if (this.Move.goodnum === true) {
              this.ArticleData.goodnum -= 1
              this.Move.goodnum = !this.Move.goodnum
            }
          }
        }
      }
    },
    async collect (artid) {
      if (localStorage.getItem('Username') === null) {
        this.$toast({
          message: '登录才能点赞收藏哦！',
          position: 'top'
        })
        this.showLogin = true
        localStorage.setItem('met', 'collect')
      } else {
        if (artid === undefined) {
          this.$toast({
            message: 'Page ID undefine',
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
            if (this.Move.collect === false) {
              this.ArticleData.collect += 1
              this.Move.collect = !this.Move.collect
            } else if (this.Move.collect === true) {
              this.ArticleData.collect -= 1
              this.Move.collect = !this.Move.collect
            }
          }
        }
      }
    },
    async commont (artid) {
      if (localStorage.getItem('Username') === null) {
        this.$toast({
          message: '登录才能评论哦！',
          position: 'top'
        })
        this.showLogin = true
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
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
            const comtxt = this.Active.comTXT
              .match(/((\p{sc=Han})|([a-zA-Z0-9]))/gu)
              .join('')
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
              this.getArticle(this.$route.params.id)
            }
          }
        }
      }
    },
    close (val) {
      this.showLogin = val
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
  name: 'ArticleM',
  components: { Login }
}
</script>

<style lang="less" scoped>
.article {
  word-wrap: break-word;
  position: relative;
}
.leftContent {
  overflow: hidden;
}
.content > p > p > img {
  max-width: 350px;
}
@media only screen and (min-width: 755px) {
  .article {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    margin: 20px auto;
  }
  .leftContent {
    background-color: rgba(243, 245, 248, 0.5);
    padding: 20px;
    border-radius: 12px;
    margin-right: 20px;
    width: 50vw;
  }
}

@media only screen and (max-width: 755px) {
  .leftContent {
    background-color: rgba(243, 245, 248, 0.8);
    padding: 10px;
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
.selc,
.selg {
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
    background-color: rgba(201, 227, 243, 0.4);
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

<template>
  <div>
    <HeaderM></HeaderM>
    <div id="" class="article">
      <div class="leftContent">
        <h1 v-show="goodpage" style="text-align: center">404 NOT FOUNT</h1>
        <div v-show="!goodpage">
          <h1>{{ ArticleData.article.title }}</h1>
          <div class="artData">
            <div>
              {{ ArticleData.article.username }}
            </div>
            <div>
              <van-icon name="eye-o" />
              <span style="margin-left: 5px;">{{ ArticleData.article.read_num }}</span>
            </div>
            <div>
              <van-icon name="clock-o" />
              <span style="margin-left: 5px;">{{ ArticleData.article.pub_date }}</span>
            </div>
          </div>
          <div class="content">
            <p v-if="!isMd" v-html="ArticleData.article.content" v-highlight></p>
            <ViewMd v-else :content="ArticleData.article.content"></ViewMd>
          </div>
          <div class="tabmenu">
            <div>
              标签：
              <van-tag plain type="primary" class="lableTag" v-for="(item, index) in ArticleData.article.lable"
                :key="index">{{ item }}</van-tag>
            </div>
          </div>
          <div class="btn_active">
            <van-button type="info" class="goodnum" @click="goodnum(ArticleData.article.article_id)">
              <span>点赞</span>
              <span :class="{ selg: this.Move.goodnum }">
                <i class="glyphicon glyphicon-thumbs-up"></i>
              </span>
              <span>{{ ArticleData.goodnum }}</span>
            </van-button>
            <van-button type="info" class="collect" @click="collect(ArticleData.article.article_id)">
              <span>收藏</span>
              <span :class="{ selc: this.Move.collect }">
                <i class="glyphicon glyphicon-star-empty"> </i></span>
              <span>{{ ArticleData.collect }}</span>
            </van-button>
            <van-button type="info" class="collect" @click="share">分享</van-button>
          </div>
          <div class="commentArea">
            <p>留言</p>
            <div class="comment" v-for="(item, index) in ArticleData.commont" :key="index">
              <p class="comment_user">
                <router-link to="#">{{ item.username }}</router-link>
                用户 留言：
              </p>
              <p class="comment_text">{{ item.comment }}</p>
              <p class="comment_time">时间:{{ item.pub_date }}</p>
            </div>
            <div class="textarea">
              <textarea name="" id="comtext" placeholder="友善发言，留下美好瞬间   (最多输入150个字符)" maxlength="150"
                @keyup.enter="commont(ArticleData.article.article_id)" v-model="Active.comTXT"></textarea>
              <van-button @click="commont(ArticleData.article.article_id)">留言</van-button>
            </div>
          </div>
        </div>
      </div>
      <autorPanel></autorPanel>
      <Login @close="close" v-if="this.showLogin"></Login>
    </div>
  </div>
</template>

<script>
import getArticle from '@/API/indexAPI/getArticle'
import UserAction from '@/API/UserActionAPI/UserActiveGet'
import Login from './ArticleLogin/ArticleLogin.vue'
import autorPanel from './autorPanel.vue'
import ViewMd from './ViewMd.vue'
export default {
  props: ['isdemo'],
  data () {
    return {
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
      showLogin: false,
      isMd: false
    }
  },
  created () {
    if (/\bmd[A-Z0-9]+\b/g.test(this.$route.params.id)) this.isMd = true
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
        this.ArticleData.article.lable = res.data.article.lable.split('、')
        this.$store.commit('setAuthorName', res.data.article.username)
        // 5秒后请求增加阅读数
        setTimeout(async () => {
          await getArticle.UpdatedReadNum(id)
        }, 5000)
      } else {
        this.goodpage = !this.goodpage
      }
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
            message: 'Page ID is undefine',
            position: top
          })
        } else {
          const data = {
            username: localStorage.getItem('Username'),
            articleid: artid,
            type: 'goodnum'
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
            type: 'collect'
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
        if (this.Active.comTXT !== '') {
          localStorage.setItem('commont', this.Active.comTXT)
        }
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
              .match(/((\p{sc=Han})|([a-zA-Z0-9])|([\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]))/gu)
              .join('')
            const data = {
              username: localStorage.getItem('Username'),
              articleid: artid,
              type: 'comment',
              comment: comtxt
            }
            const { data: res } = await UserAction.UserActive(data)
            if (res.status === 200) {
              this.Active.collect = !this.Active.collect
              this.getArticle(this.$route.params.id)
              this.Active.comTXT = ''
            }
          }
        }
      }
    },
    close (val) {
      this.showLogin = val
    },
    share () {
      const copyw = `https://jihau.top/article/${this.ArticleData.article.article_id}`
      navigator.clipboard.writeText(copyw).then(
        () => {
          this.$toast.success({
            message: '复制成功,赶快去分享吧!'
          })
        },
        () => {
          this.$toast.fail({
            message: '复制失败,请刷新页面后重试吧'
          })
        }
      )
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
          content: this.ArticleData.article.username
        }
      ]
    }
  },
  name: 'ArticleM',
  components: { Login, autorPanel, ViewMd }
}
</script>

<style lang="less" scoped>
.artData {
  display: flex;
  align-items: center;
  padding: 10px 0;

  >div {
    margin-left: 15px;
  }
}

.article {
  word-wrap: break-word;
  position: relative;
}

.leftContent {
  overflow: hidden;
  background-color: #fff;
}

.content>p>p>img {
  max-width: 350px;
}

@media only screen and (min-width: 755px) {
  .article {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    margin: 20px auto;
    max-width: 1200px;
    min-height: 100vh;
  }

  .leftContent {
    padding: 20px;
    border-radius: 12px;
    margin-right: 20px;
    width: 50vw;
  }
}

@media only screen and (max-width: 755px) {
  .content {
    letter-spacing: 1px;
  }

  .leftContent {
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

.lableTag {
  display: inline-block;
  margin-right: 10px;
}
</style>

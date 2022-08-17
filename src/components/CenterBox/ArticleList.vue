<template>
  <div
    :class="[{ article_demo: isdemo, article_demos: !isdemo }, 'article_item']"
  >
    <p class="article_doc_title">
      <router-link
        class="togolink"
        :to="{ path: '/article/' + article.article_id }"
      >
        {{ article.title }}
      </router-link>
    </p>
    <div class="article_area">
      <div class="article_img" v-if="ifcov">
        <img class="article_img_item" :src="article.cover_img" />
      </div>
      <div class="article_doc">
        <router-link
          class="article_doc_txt togolink"
          :to="{ path: '/article/' + article.article_id }"
        >
          {{
            article.content
              | newcontent(article.content, article.title, article.keyword)
          }}
        </router-link>
      </div>
    </div>
    <div class="artmethod">
      <div class="shareBox">
        <van-button type="info" @click="Goto(article.article_id)"
          >阅读</van-button
        >
        <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
          placement="top"
        >
          <template #reference>
            <van-button type="info">分享</van-button>
          </template>
        </van-popover>
      </div>
      <div class="article_span_time">
        <span>作者:{{ article.username }}</span>
        &nbsp;
        <span>时间:{{ article.pub_date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showPopover: false,
      actions: [
        { text: '复制链接', icon: 'link', id: 2 }
      ],
      cz: true,
      isdemo: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.demotodo()
    }, 200)
  },
  methods: {
    // TODO 完成复制和分享到微信功能 还有文章的点赞数和收藏数
    onSelect () {
      const copyw = `https://jihau.top/article/${this.article.article_id}`
      navigator.clipboard.writeText(copyw).then(
        () => {
          this.$toast.success({
            message: '复制成功'
          })
        },
        () => {
          this.$toast.fail({
            message: '复制失败'
          })
        }
      )

      this.showShare = false
    },
    Goto (id) {
      this.$router.push(`/article/${id}`)
    },
    demotodo () {
      this.isdemo = true
    }
  },
  filters: {
    newcontent (content) {
      const newArr = []
      for (const k in content) {
        if (content[k].match(/\p{sc=Han}/gu)) {
          newArr.push(content[k])
        }
      }
      if (newArr.length === 0) {
        newArr.push(
          content
            .replace(/(<([^>]+)>)/gi, '')
            .replace(/[\r\n]/g, '')
            .replace('&nbsp;', '')
        )
      }
      return newArr.splice(0, 100).join('')
    }
  },
  computed: {
    ifcov () {
      if (this.article.cover_img.match(/^http/)) {
        return true
      }
      return false
    }
  },
  name: 'ArticleList'
}
</script>

<style lang="less" scoped>
.artmethod {
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
}
.article_item {
  margin-bottom: 10px;
  background-color: rgba(240, 242, 245, 0.3);
  border-radius: 0 0 12px 12px;
  max-height: 226px;
  padding: 8px;
  top: 10px;
}
.article_doc_txt {
  text-indent: 3.6rem;
  font-size: 1.8rem;
  overflow: hidden;
}
.togolink {
  color: rgba(0, 0, 0, 0.692);
  text-decoration: none;
}
@media only screen and (min-width: 755px) {
  .article_area {
    display: flex;
    padding-left: 10px;
  }

  .article_img {
    flex: 0.5;
    max-width: 166px;
    max-height: 95px;
    overflow: hidden;
    border-radius: 12px;
  }

  .article_img_item {
    width: 100%;
    height: 100%;
  }

  .article_doc {
    flex: 1;
    padding: 0 10px;
  }

  .article_doc_title {
    font-size: 2.2rem;
    font-weight: bolder;
    font-family: '微软雅黑';
    margin: 8px;
  }

  .article_doc_txt {
    font-size: 1.8rem;
    margin: 0;
  }
  /* 文章动效 */
  .article_img_item:hover {
    transform: scale(1.35);
    transition: 1s;
  }
  .right_btn {
    display: flex !important;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .artmethod {
    padding: 0 20px;
  }
  .shareBox {
    button {
      margin-left: 15px;
    }
  }
}
@media only screen and (max-width: 755px) {
  /* 最新文章 */
  .article_box {
    position: relative;
  }
  .article_area {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .article_img {
    padding: 0 6px;
    height: 90px;
    min-width: 160px;
    max-width: 170px;
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 10px;
  }
  .article_img_item {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
  }
  .article_doc {
    max-height: 100px;
    min-width: 50%;
    overflow: hidden;
  }
  .article_doc_title {
    font-size: 2rem;
    font-weight: bolder;
    margin: 8px;
  }
  /* 文章动效 */
  .article_img_item:hover {
    transform: scale(1.35);
    transition: 1s;
  }
  .shareBox {
    width: 50%;
    display: flex;
    align-content: center;
    button {
      margin-left: 10px;
    }
  }
  .article_item {
    padding: 8px;
  }
  .article_demos {
    margin-top: 80px;
  }
  .article_demo {
    margin-top: 8px;
    transition: all 0.3s;
  }
}
.article_doc {
  width: 100%;
  overflow: hidden;
}
</style>

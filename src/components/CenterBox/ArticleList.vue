<template>
  <div id="index_article_items">
    <div class="article_item">
      <a class="article_doc_title togolink" @click="Goto(article.article_id)">
        {{ article.title }}
      </a>
      <div class="article_area">
        <div class="article_img" v-if="ifcov">
          <img class="article_img_item" :src="article.cover_img" />
        </div>
        <div class="article_doc">
          <a class="article_doc_txt togolink" @click="Goto(article.article_id)">
            {{article.content | newcontent(article.content)}}
          </a>
        </div>
      </div>
      <div class="artmethod">
        <div class="shareBox">
          <van-button type="info" @click="Goto(article.article_id)">阅读</van-button>
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
        { text: '微信', icon: 'wechat', id: 1 },
        { text: '复制链接', icon: 'link', id: 2 }
      ]
    }
  },
  mounted () {
    window.onload = () => {
      const docWidth =
        document.body.clientWidth ||
        document.body.offsetWidth ||
        document.body.scrollWidth
      if (docWidth >= 970) {
        this.window = true
      } else this.window = true
    }
  },
  methods: {
    onSelect (option) {
      switch (option.id) {
        case 1: {
          console.log(this)
          break
        }
        case 2: {
          console.log(this)
          break
        }
      }
      this.showShare = false
    },
    Goto (id) {
      this.$router.push(`/article/${id}`)
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
.togolink{
  color: rgba(0, 0, 0, 0.692);
}
@media only screen and (min-width: 755px) {
  .artmethod{
  padding: 0 20px;
  }
  .shareBox{
  button {
    margin-left: 15px;
  }
}
}
@media only screen and (max-width: 755px) {
  .shareBox{
    width: 50%;
    display: flex;
    align-content: center;
    button {
      margin-left: 10px;
    }
  }
}
</style>

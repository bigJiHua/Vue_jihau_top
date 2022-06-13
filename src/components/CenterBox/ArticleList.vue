<template>
  <div id="index_article_items">
    <div class="article_item">
      <p class="article_doc_title">
        {{ title }}
      </p>
      <div class="article_area">
        <div class="article_img">
          <img class="article_img_item" src="https://jihau.top/img/logo.png" />
        </div>
        <div class="article_doc">
          <p class="article_doc_txt">
            {{
              content
            }}
          </p>
        </div>
      </div>
      <div class="artmethod">
        <div class="shareBox">
          <van-button type="info" @click="Goto">开始阅读</van-button>
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
          <span>作者:{{ authorId }}</span>
          &nbsp;
          <span>{{ pubDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入组件
// import  from ''

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    authorId: {
      type: [Number, String],
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    goodnum: {
      type: Number,
      default: 0
    },
    pubDate: {
      type: [Number, String],
      default: ''
    },
    coverImg: {
      type: String,
      default: ''
    },
    articleId: {
      type: [Number, String],
      default: ''
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
    Goto () {
      console.log(this)
      console.log(this.$router)
      console.log(this.articleId)
      const id = this.articleId
      this.$router.push(`/article/${id}`)
    }
  },
  name: 'ArticleList',
  components: {
    // 导入组件
  }
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
</style>

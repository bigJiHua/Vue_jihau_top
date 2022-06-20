<template>
  <div id="" class="cagArticle">
    <div class="btn">
      <van-button @click="comback" type="danger" size="small"
        >取消编辑</van-button
      >
      <van-button color="#1989FA" size="small" @click="saveArticle">保存</van-button>
    </div>
    <div class="cagArea">
      <aside
        :class="{
          cagAside: !Asidestate.isChange,
          opAside: Asidestate.isChange,
        }"
      >
        <div class="astate" @click="cagastate">
          <i
            :class="{
              'glyphicon glyphicon-chevron-left': !Asidestate.isChange,
              'glyphicon glyphicon-resize-horizontal': Asidestate.isChange,
            }"
          ></i>
        </div>
        <h1 class="title">
          标题:<input
            type="text"
            v-model="Article.data.title"
            class="form-control"
          />
        </h1>
        <h4>作者:{{ Article.data.username }}</h4>
        <h4>发表日期:{{ Article.data.pub_date }}</h4>
        <h4>
          标签:<input
            type="text"
            v-model="Article.data.lable"
            class="form-control"
          />
        </h4>
        <h4>
          关键词:<input
            type="text"
            v-model="Article.data.keyword"
            class="form-control"
          />
        </h4>
      </aside>
      <div class="cagcontent">
        <ckeditor v-model="Article.data.content" :config="editorConfig" :editor-url="editorUrl"></ckeditor>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      Article: {
        data: [],
        newdata: []
      },
      Asidestate: {
        isChange: false
      },
      editorConfig: {
        // The configuration of the editor.
        height: 450,
        skin: 'moono-lisa',
        extraPlugins: ['quicktable', 'codesnippet', 'button'],
        removePlugins: 'easyimage,cloudservices,exportpdf',
        codeSnippet_theme: 'monokai_sublime'
      },
      editorUrl: '../ckeditor/ckeditor.js'
    }
  },
  // 生命周期初始化函数
  created () {
    this.Article.data = this.$store.state.ArticleData
  },
  // 方法
  methods: {
    cagastate () {
      this.Asidestate.isChange = !this.Asidestate.isChange
    },
    comback () {
      const cagpage = '文章管理'
      this.$emit('cagpage', cagpage)
      this.$router.push('/ArticleIndex')
    },
    saveArticle () {
      console.log(this.$store.state.ArticleData)
    }
  },
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'cagArticle',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
.cagArea {
  display: flex;
}
.cagAside {
  flex: 0.5;
  background-color: rgb(5, 0, 105);
  color: white;
  padding: 5px;
  position: relative;
  max-width: 16vw;
}
.opAside {
  background-color: rgb(5, 0, 105);
  color: white;
  width: 3.5rem;
  overflow: hidden;
  position: relative;
  animation: down 0.5s;
}
@keyframes down {
  from {
    width: 16vw;
  }
  to {
    width: 3rem;
  }
}
.cagcontent {
  flex: 2;
  background-color: rgb(209, 184, 184);
}
.astate {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  font-size: 3rem;
}
</style>

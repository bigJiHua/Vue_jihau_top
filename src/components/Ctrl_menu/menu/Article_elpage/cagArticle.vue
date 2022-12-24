<template>
  <div id="" class="cagArticle">
    <div class="btn">
      <van-button @click="comback" type="danger" size="small"
        >取消编辑</van-button
      >
      <van-button color="#1989FA" size="small" @click="saveArticle"
        >保存</van-button
      >
      <van-button @click="getimg">获取图库</van-button>
    </div>
    <div class="cagArea">
      <div class="astate" @click="cagastate">
        <i
          :class="{
            'glyphicon glyphicon-chevron-left': !Asidestate.isChange,
            'glyphicon glyphicon-resize-horizontal': Asidestate.isChange,
          }"
        ></i>
      </div>
      <aside
        :class="{
          cagAside: !Asidestate.isChange,
          opAside: Asidestate.isChange,
        }"
      >
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
        <h4>
          封面：
          <input
            type="text"
            v-model="Article.data.cover_img"
            class="imgurl form-control"
          />
          预览
          <img :src="Article.data.cover_img" alt="文章封面" class="pvimg" />
        </h4>
        <p>⚠ 图片嵌入 需要点击获取图片才能查阅已经上传的本账户内的图片</p>
      </aside>
      <div class="cagcontent">
        <ckeditor
          v-model="Article.data.content"
          :config="editorConfig"
          :editor-url="editorUrl"
        ></ckeditor>
      </div>
    </div>
    <gallery ref="imageM"></gallery>
  </div>
</template>

<script>
import setArticle from '@/components/api/Ctrl_menuAPI/ArticleAPI'
import gallery from '@/components/Module/gallery.vue'
import getArticleCotent from '@/components/api/getArticle'

export default {
  components: { gallery },
  data () {
    return {
      Article: {
        data: []
      },
      Asidestate: {
        isChange: false
      },
      editorConfig: {
        // 编辑器设定.
        height: 500,
        skin: 'moono-lisa',
        extraPlugins: ['quicktable', 'codesnippet', 'button'],
        removePlugins: 'easyimage,cloudservices,exportpdf',
        codeSnippet_theme: 'monokai_sublime'
      },
      editorUrl: '../ckeditor/ckeditor.js',
      isOpenimg: false
    }
  },
  // 生命周期初始化函数
  created () {
    this.getArticle(this.$store.state.ArticleData)
  },
  // 方法
  methods: {
    cagastate () {
      this.Asidestate.isChange = !this.Asidestate.isChange
    },
    async getArticle (id) {
      if (id.length === 0) {
        this.$router.back()
      } else {
        const { data: res } = await getArticleCotent.getArchives(id)
        this.Article.data = res.data.article
      }
    },
    comback () {
      const cagpage = '文章管理'
      this.$emit('cagpage', cagpage)
      this.$router.push('/ArticleIndex')
      this.$store.commit('cagArtData', '')
    },
    async saveArticle () {
      const data = this.Article.data
      const { data: res } = await setArticle.UsercagArticle(data)
      if (res.status === 200) {
        this.$router.push('/article/' + this.$store.state.ArticleData)
      }
    },
    getimg () {
      this.$refs.imageM.toge()
    }
  },
  name: 'cagArticle'
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .cagArea {
    display: flex;
    position: relative;
  }
  .cagAside {
    max-width: 16vw;
  }
  .imgarea {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 500px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    overflow: scroll;
    .atitle {
      font-size: 3rem;
      font-weight: bolder;
      border-bottom: 2px gray solid;
    }
  }
  .kuimgarea {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .imgcopy {
      display: flex;
      flex-direction: column;
    }
    .kuimg {
      width: 100px;
      height: 100px;
      margin: 5px;
    }
  }
}
@media only screen and (max-width: 755px) {
  .cagArea {
    position: relative;
  }
  .imgarea {
    position: absolute;
    top: 22%;
    left: 33%;
    transform: translate(-30%, -30%);
    width: 365px;
    height: 500px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    overflow: scroll;
    .atitle {
      font-size: 3rem;
      font-weight: bolder;
      border-bottom: 2px gray solid;
    }
  }
  .kuimgarea {
    display: flex;
    overflow: scroll;
    width: 100%;
    .imgcopy {
      display: flex;
      flex-direction: column;
    }
    .kuimg {
      width: 100px;
      height: 100px;
      margin: 5px;
    }
  }
}
.cagAside {
  flex: 0.5;
  background-color: rgb(5, 0, 105);
  color: white;
  padding: 5px;
  position: relative;
  overflow: hidden;
  transform: scaleY(1);
  transition: transform 0.5s;
  transform-origin: top center;
}
.opAside {
  transform: scaleY(0);
  transition: transform 0.2s;
  transform-origin: top center;
  width: 0;
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
.btn {
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
}
.imgurl {
  color: black;
}
.pvimg {
  width: 80%;
  max-height: 100px;
}
</style>

<template>
  <div id="" class="cagArticle">
    <div class="btn">
      <van-button @click="comback" type="danger" size="small"
        >取消编辑</van-button
      >
      <van-button color="#1989FA" size="small" @click="saveArticle"
        >确认发布</van-button
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
            v-model="newArticleData.title"
            class="form-control"
          />
        </h1>
        <h4>
          标签:<input
            type="text"
            v-model="newArticleData.lable"
            class="form-control"
          />
        </h4>
        <h4>
          关键词:<input
            type="text"
            v-model="newArticleData.keyword"
            class="form-control"
          />
        </h4>
        <h4>
          封面：
          <input
            type="text"
            v-model="newArticleData.cover_img"
            class="imgurl form-control"
          />
          预览
          <img :src="newArticleData.cover_img" alt="文章封面" class="pvimg" />
        </h4>
        <p>⚠ 图片嵌入 需要点击获取图片才能查阅已经上传的本账户内的图片</p>
      </aside>
      <div class="cagcontent">
        <ckeditor
          v-model="newArticleData.content"
          :config="editorConfig"
          :editor-url="editorUrl"
        ></ckeditor>
      </div>
    </div>
    <div class="imgarea" v-show="isOpenimg">
      <div class="close" @click="isOpenimg = false">
        <i class="glyphicon glyphicon-remove"></i>
      </div>
      <p class="atitle">图库</p>
      <div class="tip">
        <ul v-if="Article.img" class="kuimgarea">
          <li v-for="(item, index) in Article.img" :key="index">
              <van-button @click="delimg(item.id)">
              <i class="glyphicon glyphicon-trash"></i>
              </van-button>
              <img :src="item.userimage" alt="" class="kuimg" />
              <input type="text" :value="item.userimage" class="form-control"/>
          </li>
        </ul>
        <div class="upload">
          <h3>上传文件</h3>
          <input type="file" accept="image/*" ref="imgfile" class="fileup" />
          <van-button @click="up_pic">上传</van-button>
          <p>
            <strong>⚠如果没反应，未提示上传成功消息，请刷新页面重新上传</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setdata from '@/components/api/Ctrl_menuAPI/getPicAPI'
import setArticle from '@/components/api/Ctrl_menuAPI/ArticleAPI'

export default {
  props: [],
  data () {
    return {
      Article: {
        img: []
      },
      newArticleData: {
        username: localStorage.getItem('Username'),
        title: '',
        lable: '',
        keyword: '',
        cover_img: '',
        content: ''
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
      isOpenimg: false,
      rules: {
        username: {
          rule: /\S/,
          msg: '用户名不能为空'
        },
        title: {
          rule: /\S/,
          msg: '文章标题不能为空'
        },
        content: {
          rule: /\S/,
          msg: '不能发布空白文章哦！'
        },
        lable: {
          rule: /\S/,
          msg: '忘记填标签咯！'
        },
        keyword: {
          rule: /\S/,
          msg: '填一下关键字吧！'
        }
      }
    }
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
      this.$store.commit('cagArtData', '')
    },
    async saveArticle () {
      // const data = this.newArticleData
      if (this.validata('username')) {
        if (this.validata('title')) {
          if (this.validata('lable')) {
            if (this.validata('keyword')) {
              if (this.validata('content')) {
                const { data: res } = await setArticle.UseraddArticle(this.newArticleData)
                this.$toast({
                  message: res.message,
                  position: 'top'
                })
              }
            }
          }
        }
      }
    },
    async getimg () {
      this.isOpenimg = !this.isOpenimg
      const usdata = localStorage.getItem('Username')
      const { data: res } = await setdata.getImage(usdata)
      this.$toast({
        message: res.message,
        position: 'top'
      })
      this.Article.img = res.data
    },
    up_pic () {
      const picfile = this.$refs.imgfile
      picfile.addEventListener('change', async (e) => {
        console.log('object')
        const file = e.target.files[0]
        const { data: res } = await setdata.upImage(
          file,
          localStorage.getItem('Username')
        )
        this.$toast({
          message: res.message,
          position: 'top'
        })
        this.getimg()
      })
    },
    async delimg (id) {
      const condel = confirm('确认删除这张图片吗？')
      const data = {
        picusername: localStorage.getItem('Username'),
        id: id
      }
      if (condel) {
        const { data: res } = await setdata.delImage(data)
        this.$toast({
          message: res.message,
          position: 'top'
        })
        this.getimg()
        this.isOpenimg = true
      }
    },
    validata (key) {
      let bool = true
      if (!this.rules[key].rule.test(this.newArticleData[key])) {
        this.$toast({
          message: this.rules[key].msg,
          position: 'top'
        })
        bool = false
        return false
      }
      return bool
    }
  },
  name: 'addArticle'
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
}
.opAside {
  background-color: rgb(5, 0, 105);
  color: white;
  overflow: hidden;
  position: relative;
  width: 0px;
  height: 0px;
  animation: down 0.5s;
}
@keyframes down {
  from {
    width: 16vw;
  }
  to {
    width: 0px;
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

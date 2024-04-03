<template>
  <div class="imgarea" v-show="Article.isOpen">
    <div class="close" @click="toge">
      <i class="glyphicon glyphicon-remove"></i>
    </div>
    <p class="atitle">图库</p>
    <div class="tip">
      <ul class="kuimgarea">
        <li v-for="(item, index) in Article.img" :key="index">
          <van-button @click="delimg(item.id)">
            <i class="glyphicon glyphicon-trash"></i>
          </van-button>
          <img :src="item.userimage" alt="" class="kuimg" />
          <input type="text" :value="item.userimage" class="form-control" />
        </li>
      </ul>
      <div class="upload">
        <h3>上传文件</h3>
        <input type="file" accept="image/*" ref="imgfile" class="fileup" @change="up_pic" />
        <van-button @click="upPicrequest">上传</van-button>
        <p>
          <strong>⚠如果没反应或者未提示上传成功消息，请重新上传</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import setdata from '@/API/Ctrl_menuAPI/getPicAPI'
import Compressor from 'compressorjs'

export default {
  data () {
    return {
      Article: {
        img: [],
        isOpen: false,
        fileData: ''
      }
    }
  },
  methods: {
    // 压缩
    async compressor (file, quality) {
      return new Promise(resolve => {
        // eslint-disable-next-line no-new
        new Compressor(file, {
          quality: quality,
          success: resolve,
          error (err) {
            this.$toast({
              message: err.message,
              position: 'top'
            })
          }
        })
      })
    },
    async getimg () {
      const usdata = {
        picusername: localStorage.getItem('Username')
      }
      const { data: res } = await setdata.getImage(usdata)
      this.Article.img = res.data
    },
    async up_pic () {
      const picfile = this.$refs.imgfile
      const file = picfile.files[0]
      let qNum = 0
      if (file.size > 1024 * 1024) {
        qNum = 0.4
      } else {
        qNum = 0.6
      }
      this.fileData = await this.compressor(file, qNum)
      if (this.fileData !== '') {
        this.upPicrequest()
      }
    },
    async upPicrequest () {
      if (!this.fileData) return
      const { data: res } = await setdata.upImage(
        this.fileData,
        localStorage.getItem('Username')
      )
      if (res.status === 200) {
        setTimeout(() => {
          this.getimg()
        }, 800)
      }
    },
    async delimg (id) {
      const condel = confirm('确认删除这张图片吗？')
      const data = {
        picusername: localStorage.getItem('Username'),
        id: id
      }
      if (condel) {
        await setdata.delImage(data)
        setTimeout(() => {
          this.getimg()
        }, 1000)
      }
    },
    toge () {
      this.Article.isOpen = !this.Article.isOpen
      this.getimg()
    }
  },
  mounted () {
    this.up_pic()
  },
  name: 'galleryM',
  components: {
    // 导入组件
  }
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
    top: 35%;
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
</style>

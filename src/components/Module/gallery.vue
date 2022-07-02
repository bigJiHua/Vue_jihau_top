<template>
    <div class="imgarea" v-show="Article.isOpen" >
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
              <input type="text" :value="item.userimage" class="form-control"/>
          </li>
        </ul>
        <div class="upload">
          <h3>上传文件</h3>
          <input type="file" accept="image/*" ref="imgfile" class="fileup" @click="up_pic" />
          <van-button @click="up_pic">上传</van-button>
          <p>
            <strong>⚠如果没反应或者未提示上传成功消息，请重新上传</strong>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
import setdata from '@/components/api/Ctrl_menuAPI/getPicAPI'

export default {
  data () {
    return {
      Article: {
        img: [],
        isOpen: false
      }
    }
  },
  methods: {
    async getimg () {
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
      }
    },
    toge () {
      this.Article.isOpen = !this.Article.isOpen
      this.getimg()
    }
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

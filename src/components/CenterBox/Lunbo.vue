<template>
  <div id="" class="lunbo_box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image,index) in images" :key="index" class="LunboArea">
        <img :src="image | setimg(image)" class="lunbo_img" />
        <a :href="image.set_url" class="Lunbo_title">{{image.set_title}}</a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import getLunbo from '../api/getSetting'

export default {
  data () {
    return {
      images: []
    }
  },
  created () {
    this.getLunbotu()
  },
  methods: {
    async getLunbotu () {
      const val = 'Lunbo'
      const { data: res } = await getLunbo.getSetting(val)
      this.images = res.data
    }
  },
  filters: {
    setimg (val) {
      if (val.set_change === '0' && val.set_change !== '') {
        return val.set_difault
      } else {
        return val.set_change
      }
    }
  },
  name: 'LunBO',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .my-swipe{
    width: 100%;
  }
  .article_alltitle {
    font-weight: bolder;
  }
  .article_alltitle span:nth-child(2) {
    top: 18px;
  }
  .lunbo_img {
    width: 52vw !important;
    height: 250px;
  }
.lunbo_box {
  height: 250px;
  .my-swipe {
    color: #fff;
    font-size: 20px;
    height: 100%;
    text-align: center;
  }
}
}
.lunbo_img {
  width: 100%;
  height: 100%;
}
.lunbo_box {
  .my-swipe {
    color: #fff;
    font-size: 20px;
    height: 100%;
    text-align: center;
  }
}

.LunboArea {
  position: relative;
}
.Lunbo_title{
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 4rem;
  color: rgba(11, 87, 227, 0.8);
  display: inline-block;
  background-color: #fff;
}
</style>

<template>
  <!-- <div id="" class="lunbo_box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image,index) in images" :key="index" class="LunboArea">
        <img :src="image | setimg(image)" class="lunbo_img" />
        <a :href="image.set_url" class="Lunbo_title">{{image.set_title}}</a>
      </van-swipe-item>
    </van-swipe>
  </div> -->
  <div class="lunbo_box">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide LunboArea"
          v-for="(image, index) in images"
          :key="index"
        >
          <img :src="image | setimg(image)" class="lunbo_img" />
          <a :href="image.set_url" class="Lunbo_title">{{ image.set_title }}</a>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev swbtn"></div>
      <div class="swiper-button-next swbtn"></div>
      <!-- 如果需要滚动条 -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import getLunbo from '../api/getSetting'
import 'swiper/css/swiper.css'
import 'swiper/js/swiper.js'

export default {
  data () {
    return {
      images: []
    }
  },
  created () {
    this.getLunbotu()
  },
  updated () {
    /* eslint-disable */
    new Swiper('.swiper-container', {
      // direction: 'vertical', // 垂直切换选项
      effect: 'fade',
      autoplay:true,
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      }
    })
  },
  methods: {
    async getLunbotu() {
      const val = 'Lunbo'
      const { data: res } = await getLunbo.getSetting(val)
      this.images = res.data
    },
  },
  filters: {
    setimg(val) {
      if (val.set_change === '0' && val.set_change !== '') {
        return val.set_difault
      } else {
        return val.set_change
      }
    },
  },
  name: 'LunBO',
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .swiper-container {
    width: 100%;
    height: 250px;
  }
  .lunbo_box {
    position: relative;
  }
  .lunbo_img {
    height: 100%;
    width: 100%;
  }
  .LunboArea {
    position: relative;
  }
  .Lunbo_title {
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 4rem;
    color: rgba(11, 87, 227, 0.8);
    display: inline-block;
    background-color: #fff;
  }
}
@media only screen and (max-width: 755px) {
  .swiper-container {
    width: 100%;
    height: 150px;
  }
  .lunbo_box {
    position: relative;
  }
  .lunbo_img {
    height: 100%;
    width: 100%;
  }
  .LunboArea {
    position: relative;
  }
  .Lunbo_title {
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 2.8rem;
    color: rgba(11, 87, 227, 0.8);
    display: inline-block;
    background-color: #fff;
  }
  .swbtn:after{
    font-size: 3.0rem;
    color: white;
  }
}
</style>

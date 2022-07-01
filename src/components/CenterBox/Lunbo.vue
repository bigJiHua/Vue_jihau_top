<template>
  <div id="" class="lunbo_box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" class="lunbo_img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// 导入组件
// import  from ''

export default {
  data () {
    return {
      images: [
        'https://d.da4.cc/img/3color.png',
        'https://d.da4.cc/img/c.png',
        'https://d.da4.cc/img/sjcxsj.png',
        'https://d.da4.cc/img/jihaucom.png',
        'https://d.da4.cc/img/3wwwcom.png'
      ]
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
  .article_alltitle {
    font-weight: bolder;
  }
  .article_alltitle span:nth-child(2) {
    top: 18px;
  }
  .lunbo_img {
    width: 100%;
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
</style>

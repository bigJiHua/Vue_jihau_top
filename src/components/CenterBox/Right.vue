<template>
  <div id="" class="right_box">
    <div class="RightMoudle" ref="RightMoudle" v-if="!isLogin">
      <AboutM></AboutM>
    </div>
    <div class="RightMoudle" ref="RightMoudle" v-else>
      <Users></Users>
    </div>
    <div :class="['icpArea', { icpAreatop: istop }]" ref="RightArea">
      <ArtList></ArtList>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from '../FooterBar/Footer.vue'
import AboutM from '../my/AboutM.vue'
import Users from '../my/Users.vue'

export default {
  props: [],
  data () {
    return {
      istop: false,
      isLogin: localStorage.getItem('token') !== null
    }
  },
  mounted () {
    window.addEventListener('scroll', this.RightBox)
  },
  // 方法
  methods: {
    RightBox () {
      const RightBox = this.$refs.RightArea
      const boxHeight = this.$refs.RightMoudle
      if (RightBox) {
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        const docWidth = document.body.clientWidth || document.body.offsetWidth || document.body.scrollWidth
        if (docWidth > 970) {
          if (scrollTop >= boxHeight.clientHeight) {
            this.istop = true
          }
          if (scrollTop <= boxHeight.clientHeight) {
            this.istop = false
          }
        }
      }
    }
  },
  name: 'RightBox',
  components: {
    Footer,
    AboutM,
    Users
  }
}
</script>

<style lang="less" scoped>
.icpArea{
  width: 100%;
}

@media only screen and (min-width: 755px) {
  .right_box{
    width: 25vw;
    max-width: 500px;
  }
  .icpAreatop{
    position: fixed;
    top: 56px;
    z-index:999;
    width: 25vw;
    max-width: 500px;
  }
}
</style>

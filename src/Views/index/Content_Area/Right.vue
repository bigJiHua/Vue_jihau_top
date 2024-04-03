<template>
  <div id="" class="right_box">
    <div ref="RightMoudle">
      <AboutM></AboutM>
    </div>
    <div :class="['icpArea', { icpAreatop: istop }]" ref="RightArea">
      <Notify></Notify>
      <ArtList></ArtList>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from '@/layout/FooterBar/Footer.vue'
import AboutM from '@/components/Index/AboutM.vue'
import Notify from '@/components/Index/Notify.vue'

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
            console.log(1)
            this.istop = true
          } else if (scrollTop <= boxHeight.clientHeight) {
            console.log(2)
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
    Notify
  }
}
</script>

<style lang="less" scoped>
.icpArea {
  width: 100%;
}

.RightMoudle {
  background-color: rgba(240, 243, 246, 0.4);
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
  border-radius: 5px;
}

@media only screen and (min-width: 755px) {
  .right_box {
    width: 25vw;
    max-width: 500px;
  }

  .icpAreatop {
    position: fixed;
    top: 56px;
    z-index: 99;
    width: 25vw;
    max-width: 439px;
    max-height: 100vh;
    overflow: scroll;
  }

  .icpAreatop::-webkit-scrollbar {
    display: none;
  }
}
</style>

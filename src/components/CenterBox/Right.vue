<template>
  <div id="" class="right_box">
    <div class="RightMoudle" ref="RightMoudle">
      <AboutM></AboutM>
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

export default {
  props: [],
  data () {
    return {
      istop: false
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
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'RightBox',
  components: {
    Footer,
    AboutM
  }
}
</script>

<style lang="less" scoped>
.right_box{
  width: 100%;
}
.icpArea{
  width: 100%;
}
.icpAreatop{
  position: fixed;
  top: 56px;
  z-index:999;
  max-width: 25.5%;
}
</style>

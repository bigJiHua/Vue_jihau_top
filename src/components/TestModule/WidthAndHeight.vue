<template>
  <div v-if="showDimensions" class="dimensions">
    <p>{{ viewportWidth }}px * {{ viewportHeight }}px : {{ pixelRatio }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDimensions: true,
      viewportWidth: 0,
      viewportHeight: 0,
      pixelRatio: 1,
      neverShow: false,
      setBgcAndFont: null
    }
  },
  mounted () {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
    this.checkNeverShow()
    // 统一的设置样式方法 接收 demo 和 样式
    const setcolor = (demo, color) => {
      const demos = document.querySelectorAll(`${demo}`)
      for (let i = 0; i < demos.length; i++) {
        demos[i].style.color = `${color}`
      }
    }
    // 设置主题样式
    this.setBgcAndFont = setInterval(() => {
      const Ctrldemo = document.querySelectorAll('.Ctrldemo')
      const style = localStorage.getItem('bgc')
      const imgUrl = localStorage.getItem('imgUrl')
      const bgc = this.$store.state.bgc
      const defaultStyle = ['.headerTitle > h1', '.menu-item > a', '.article_alltitle > span', '.nav > li > a', '#User > p > span', '#cagUsers > p > span', '#introduce_doc > p', '.UserselfArea > p', '.card > p', '.Content_Area']
      if (style) {
        // 如果自定义颜色，除了前面的样式设置为style剩下的字体全都设置为 240240240白色
        for (let i = 0; i < Ctrldemo.length; i++) {
          Ctrldemo[i].style.background = `${style}`
        }
        for (let i = 0; i < defaultStyle.length; i++) {
          setcolor(defaultStyle[i], 'rgb(240,240,240)')
        }
        setcolor('.ararc_title', 'rbg(0,0,0)')
      }
      if (imgUrl) {
        // 如果自定义颜色，除了前面的样式设置为style剩下的字体全都设置为 240240240白色
        Ctrldemo[0].style.backgroundImage = `url(${imgUrl})`
        Ctrldemo[0].style.backgroundSize = 'cover'
        Ctrldemo[0].style.backgroundPosition = 'center'
        Ctrldemo[0].style.backgroundRepeat = 'no - repeat'
        Ctrldemo[0].style.backgroundAttachment = 'fixed'
        setcolor('.ararc_title', 'rbg(0,0,0)')
      } else if (!style && bgc !== '' && bgc !== null) {
        for (let i = 0; i < Ctrldemo.length; i++) {
          Ctrldemo[i].style.background = `${bgc}`
        }
      }
    }, 200)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  },
  methods: {
    updateDimensions () {
      this.viewportWidth = window.innerWidth
      this.viewportHeight = window.innerHeight
      this.pixelRatio = window.devicePixelRatio
    },
    hideDimensions () {
      if (this.neverShow) {
        localStorage.setItem('hideDimensions', 'true')
      }
      this.showDimensions = false
    },
    checkNeverShow () {
      const hideDimensions = localStorage.getItem('hideDimensions')
      if (hideDimensions === 'true') {
        this.showDimensions = false
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.setBgcAndFont)
  }
}
</script>

<style scoped>
.dimensions {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  font-size: 12px;
  z-index: 99;
}

.close-button {
  margin-top: 10px;
}
</style>

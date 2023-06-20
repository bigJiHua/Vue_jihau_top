<template>
  <div v-if="showDimensions" class="dimensions">
    检测当前屏幕宽高以及像素
    <p>Viewport Width: {{ viewportWidth }}px</p>
    <p>Viewport Height: {{ viewportHeight }}px</p>
    <p>Pixel Ratio: {{ pixelRatio }}</p>
    <button class="close-button" @click="hideDimensions">关闭该弹窗</button>
    <label>
      <input type="checkbox" v-model="neverShow"> 永不显示
    </label>
    <p>
      (测试阶段不涉及收集数据)
    </p>
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
      neverShow: false
    }
  },
  mounted () {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
    this.checkNeverShow()
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
  }
}
</script>

<style scoped>
.dimensions {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  font-size: 12px;
  z-index: 9999;
}

.close-button {
  margin-top: 10px;
}
</style>

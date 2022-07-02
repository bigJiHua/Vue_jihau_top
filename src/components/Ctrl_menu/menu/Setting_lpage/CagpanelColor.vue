<template>
  <div class="Scard">
    <p>设置面板颜色</p>
    <div class="select_color">
      <input type="color" v-model="rgb" />
      <div
        class="colorbox"
        style="background: rgb(0, 0, 0)"
        @click="cagcolorbox('rgb(0,0,0)')"
      ></div>
      <div
        class="colorbox"
        style="background: rgb(27, 52, 92)"
        @click="cagcolorbox('rgb(27,52,92)')"
      ></div>
      <div
        class="colorbox"
        style="background: rgb(147, 81, 82)"
        @click="cagcolorbox('rgb(147,81,82)')"
      ></div>
      <div
        class="colorbox"
        style="background: rgb(132, 156, 200)"
        @click="cagcolorbox('rgb(132,156,200)')"
      ></div>
      <div
        class="colorbox"
        style="background: rgb(18, 32, 102)"
        @click="cagcolorbox('rgb(18,32,102)')"
      ></div>
    </div>
    <div class="box" :style="{ backgroundColor: rgb }">
      {{ rgb }}
    </div>
    <van-button @click="cagcolor">改变颜色</van-button>
    <van-button @click="delcagcolor">恢复默认</van-button>
  </div>
</template>

<script>
// 导入组件
// import  from ''

export default {
  props: [],
  data () {
    return {
      rgb: localStorage.getItem('bgc')
    }
  },
  methods: {
    cagcolor () {
      const condel = confirm('要永久保存这个颜色吗？')
      if (condel) {
        localStorage.setItem('bgc', this.rgb)
        location.reload()
      } else {
        if (this.rgb !== null) {
          this.$store.commit('cagColor', this.rgb)
        }
      }
    },
    cagcolorbox (color) {
      const condel = confirm('要永久保存这个颜色吗？')
      if (condel) {
        localStorage.setItem('bgc', color)
        location.reload()
      } else {
        if (localStorage.getItem('bgc')) {
          localStorage.removeItem('bgc')
          this.$store.commit('cagColor', color)
        } else {
          this.$store.commit('cagColor', color)
        }
      }
    },
    delcagcolor () {
      const condel = confirm('确定要恢复默认吗？')
      if (condel) {
        localStorage.removeItem('bgc')
        location.reload()
      } else {
        this.$store.commit('cagColor', this.rgb)
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
  name: 'CagpanelColor',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>

@media only screen and (min-width: 755px) {
  .select_color {
    display: flex;
  }
  .colorbox {
    width: 50px;
    height: 25px;
    border: 3px white solid;
    margin-left: 5px;
  }
}
@media only screen and (max-width: 755px) {
  .select_color {
    display: flex;
  }
  .colorbox {
    width: 50px;
    height: 25px;
    border: 3px white solid;
    margin-left: 5px;
  }
}
</style>

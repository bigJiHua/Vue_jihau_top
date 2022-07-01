<template>
  <div id="" class="setting">
    <div class="Scard">
      <p>设置面板颜色</p>
      <input type="color" v-model="rgb">
      <div class="box" :style="{backgroundColor:rgb}">
          {{ rgb }}
      </div>
      <van-button @click="cagclolor" >改变颜色</van-button>
      <van-button @click="delclolor" >恢复默认</van-button>
    </div>
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
  // 生命周期初始化函数
  // created: {
  //
  // },
  // 方法
  methods: {
    cagclolor () {
      const condel = confirm('要永久保存这个颜色吗？')
      if (condel) {
        localStorage.setItem('bgc', this.rgb)
      } else {
        if (this.rgb !== null) {
          this.$store.commit('cagColor', this.rgb)
        }
      }
    },
    delclolor () {
      if (localStorage.getItem('bgc')) {
        const condel = confirm('确定要恢复默认吗？')
        if (condel) {
          localStorage.removeItem('bgc')
          location.reload()
        } else {
          this.$store.commit('cagColor', this.rgb)
        }
      }
    }
  },
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'SettingM',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
.Scard{
  width: 350px;
  padding: 10px;
  border-radius: 5px;
  margin: 15px;
  background-color: rgba(255,255,255,0.4);
  p{
    text-align: center;
    font-size: 2rem;
  }
  button{
    margin-left: 15px;
  }
}
</style>

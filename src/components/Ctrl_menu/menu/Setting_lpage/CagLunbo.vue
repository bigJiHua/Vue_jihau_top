<template>
  <div class="Scard">
      <p>设置轮播图</p>
      <div class="setitem" v-for="(item,index) in item" :key="index">
      <p>第一章图片：<img :src="item.img" alt=""></p>
      <p>文字：<input type="text" :value="item.title"></p>
      <p>链接：<input type="link" :value="item.link"></p>
      </div>
  </div>
</template>

<script>
// TODO获取轮播设置然后改变
export default {
  props: [],
  data () {
    return {
      item: []
    }
  },
  // 生命周期初始化函数
  // created: {
  //
  // },
  // 方法
  methods: {},
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'CagLumbo',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
</style>

<template>
  <div id="" class="cagArticle">
  <van-button @click="comback" type="danger">取消编辑</van-button>
  <van-button type="primary">主要按钮</van-button>
<van-button type="success">成功按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>

  </div>
</template>

<script>
// 导入组件
// import  from ''

export default {
  props: [],
  data () {
    return {}
  },
  // 生命周期初始化函数
  created () {
  },
  // 方法
  methods: {
    comback () {
      const cagpage = '文章管理'
      this.$emit('cagpage', cagpage)
      this.$router.push('/ArticleIndex')
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
  name: 'cagArticle',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
</style>

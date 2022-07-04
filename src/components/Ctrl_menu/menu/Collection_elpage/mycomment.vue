<template>
  <div id="" class="">
  <CardM :item="comment" :istrue="true"  :met="'comm'"></CardM>
  </div>
</template>

<script>

export default {
  props: {
    comment: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
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
  name: 'myComment',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
</style>

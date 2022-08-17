<template>
  <div id="" class="">
    <CardM :item="goodnum" :met="'gdn'" @reload="reload" v-if="goodnum.length > 0 ? true:false"></CardM>
    <div v-else class="none-box"><h2>空空如也,神马也没有</h2></div>
  </div>
</template>

<script>

export default {
  props: {
    goodnum: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    reload () {
      this.$emit('reload')
    }
  },
  name: 'myGoodnum',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
</style>

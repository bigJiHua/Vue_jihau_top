<template>
    <div class="countpage">
      <van-button @click="updo('up')">上一页</van-button>
      <span>共{{ length | lengthcount(length)}}页</span>
      <van-button @click="updo('next')">下一页</van-button>
    </div>
</template>

<script>
export default {
  props: {
    length: {
      type: Number, String
    }
  },
  data () {
    return {}
  },
  methods: {
    updo (mes) {
      if (mes === 'up') {
        if (this.n === 0) {
          alert('这就是第一页！')
        } else {
          this.n -= 5
          this.getUserinfo(this.n)
        }
      } else if (mes === 'next') {
        this.n += 5
        this.getUserinfo(this.n)
      }
    }
  },
  computed: {},
  filters: {
    lengthcount (le) {
      return le / 5
    }
  },
  name: 'pageUadM',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
</style>

<template>
  <div id="" class="article container">
  {{this.$route.params.id}}
  </div>
</template>

<script>

export default {
  props: [],
  data () {
    return {
      content: ''
    }
  },
  method () {
    // const id = this.$route.params.id
  },
  methods: {
  },
  directives: {},
  name: 'ArticleM',
  components: {
  }
}
</script>

<style lang="less" scoped>
</style>

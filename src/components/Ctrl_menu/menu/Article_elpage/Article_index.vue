<template>
  <div class="table_area">
    <table class="table table-bordered">
      <thead>
        <tr class="thovs">
          <th v-for="(item,index) in article.thead" :key="index">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="tdovs">产品1</td>
          <td class="tdovs">23/11/2013</td>
          <td class="tdovs">待发货</td>
          <td class="tdovs">jjjjjjjjjj</td>
          <td class="tdovs">jjjjjjjjjj</td>
          <td class="tdovs">jjjjjjjjjj</td>
          <td class="tdovs">jjjjjjjjjj</td>
          <td class="tdovs">jjjjjjjjjj</td>
          <td class="tdovs">jjjjjjjjjj</td>
          <td class="tdovs">jjjjjjjjjj</td>
          <td>
          <van-button @click="comback" type="primary">修改</van-button>
          <van-button type="danger">删除</van-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  props: [],
  data () {
    return {
      article: {
        thead: ['文章ID', '作者', '标题', '发表日期', '点赞数', '浏览次数', '标签', '关键词', '是否置顶', '状态', '操作']
      }
    }
  },
  // 生命周期初始化函数
  // created: {
  //
  // },
  // 方法
  methods: {
    comback () {
      const cagpage = '编辑文章'
      this.$emit('cagpage', cagpage)
      this.$router.push('/cagArticle')
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
  name: 'ArticleIndex',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
</style>

<template>
  <div class="table_area">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="(item,index) in article.thead" :key="index"  class="thovs">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="(item,index) in article.list" :key="index">
          <td class="tdovs">{{item.id}}</td>
          <td class="tdovs">{{item.username}}</td>
          <td class="tdovs">{{item.title}}</td>
          <td class="tdovs">{{item.pub_date}}</td>
          <td class="tdovs">{{item.goodnum}}</td>
          <td class="tdovs">{{item.artLookCount}}</td>
          <td class="tdovs">{{item.lable}}</td>
          <td class="tdovs">{{item.keyword}}</td>
          <td class="tdovs">{{item.is_top}}</td>
          <td class="tdovs">{{item.state}}</td>
          <td class="btn">
          <van-button @click="comback(item)" color="#1989FA" size="small">编辑</van-button>
          <van-button type="danger" size="small">删除</van-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UArticlelist from '@/components/api/Ctrl_menuAPI/ArticleAPI'

export default {
  data () {
    return {
      article: {
        thead: ['文章ID', '作者', '标题', '发表日期', '点赞数', '浏览次数', '标签', '关键词', '是否置顶', '状态', '操作'],
        list: []
      }
    }
  },
  // 生命周期初始化函数
  created () {
    this.getarticle(localStorage.getItem('Username'))
  },
  // 方法
  methods: {
    async getarticle (username) {
      const { data: res } = await UArticlelist.UsergetArticle(username)
      const article = res.data
      this.article.list = article
    },
    comback (data) {
      const cagpage = '编辑文章'
      this.$emit('cagpage', cagpage)
      this.$store.commit('cagArtData', data)
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
.thovs{
  text-align: center;
}
.btn{
  display: flex;
  justify-content: space-between;
}
</style>

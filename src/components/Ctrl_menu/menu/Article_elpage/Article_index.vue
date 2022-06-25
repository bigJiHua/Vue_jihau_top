<template>
  <div class="table_area">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="(item, index) in article.thead" :key="index" class="thovs">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in article.list" :key="index">
          <td class="tdovs"><a @click="togo(item.article_id)">{{ item.article_id }}</a></td>
          <td class="tdovs">{{ item.username }}</td>
          <td class="tdovs">{{ item.title }}</td>
          <td class="tdovs">{{ item.pub_date }}</td>
          <td class="tdovs">{{ item.lable }}</td>
          <td class="tdovs">{{ item.keyword }}</td>
          <td class="tdovs">{{ item.state }}</td>
          <td class="btn">
            <van-button @click="cagArticle(item)" color="#1989FA" size="small"
              >编辑</van-button
            >
            <van-button type="danger" size="small" @click="delArticle(item.id)">删除</van-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Articleset from '@/components/api/Ctrl_menuAPI/ArticleAPI'

export default {
  data () {
    return {
      article: {
        thead: [
          '文章ID',
          '作者',
          '标题',
          '发表日期',
          '标签',
          '关键词',
          '状态',
          '操作'
        ],
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
      const { data: res } = await Articleset.UsergetArticle(username)
      const article = res.data
      this.article.list = article
      this.$toast({
        message: res.message,
        position: 'top'
      })
    },
    cagArticle (data) {
      const cagpage = '编辑文章'
      this.$emit('cagpage', cagpage)
      this.$store.commit('cagArtData', data)
      this.$router.push('/cagArticle')
    },
    async delArticle (id) {
      const condel = confirm('确认删除这篇文章吗？')
      const _this = this
      if (condel) {
        const { data: res } = await Articleset.UserdelArticle(id)
        this.$toast({
          message: res.message,
          position: 'top'
        })
        _this.getarticle(localStorage.getItem('Username'))
      }
    },
    togo (path) {
      this.$router.push('/article/' + path)
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
@media only screen and (max-width: 755px) {
  .table_area {
    overflow: scroll;
  }
}
.thovs {
  text-align: center;
}
.btn {
  display: flex;
  justify-content: space-between;
}
</style>

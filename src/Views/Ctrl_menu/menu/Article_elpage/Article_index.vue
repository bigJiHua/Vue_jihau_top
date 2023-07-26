<template>
  <div class="table_area">
    <table class="table-hover table table-bordered table-striped tab-content">
      <thead>
        <tr>
          <th v-for="(item, index) in article.thead" :key="index" class="thovs">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in article.list" :key="index">
          <td class="tdovs"><router-link :to="'/article/' + item.article_id">{{ item.article_id }}</router-link></td>
          <td class="tdovs">{{ item.title }}</td>
          <td class="tdovs">{{ item.username }}</td>
          <td class="tdovs">{{ item.pub_date }}</td>
          <td class="tdovs">{{ item.lable }}</td>
          <td class="tdovs">{{ item.keyword }}</td>
          <td class="tdovs">{{ item.read_num }}</td>
          <td class="tdovs">{{ isState(item.state, item.is_delete) }}</td>
          <td class="btn">
            <van-button @click="cagArticle(item.article_id)" color="#1989FA" size="small">编辑</van-button>
            <van-button type="danger" size="small" @click="delArticle(item.id)">删除</van-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Articleset from '@/API/Ctrl_menuAPI/ArticleAPI'

export default {
  data () {
    return {
      article: {
        thead: [
          '文章ID',
          '标题',
          '作者',
          '发表日期',
          '标签',
          '关键词',
          '阅读数',
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
      if (condel) {
        const { data: res } = await Articleset.UserdelArticle(id)
        this.$toast({
          message: res.message,
          position: 'top'
        })
      }
      this.getarticle(localStorage.getItem('Username'))
    }
  },
  computed: {
    isState () {
      return (state, isDelete) => {
        return parseInt(state) + parseInt(isDelete) === 0 ? '正常' : '已删除/被驳回'
      }
    }
  },
  name: 'ArticleIndex'
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .table_area {
    overflow: overlay;
    max-height: 70vh;
  }
}
@media only screen and (max-width: 755px) {
  .table_area {
    overflow: scroll;
    width: 100%;
    height: 100%;
  }
}

.tdovs {
  max-width: 150px;
}

.table_area::-webkit-scrollbar {
  display: none;
}

.thovs {
  text-align: center;
}

.btn {
  display: flex;
  justify-content: space-between;
}
</style>

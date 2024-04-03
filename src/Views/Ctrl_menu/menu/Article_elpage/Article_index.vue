<template>
  <div class="ShowArticleList">
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
    <div class="countpage">
      <van-button @click="updo('up')" :disabled="this.isUp">上一页</van-button>
      <span>第{{ page }}页</span>&nbsp;
      <span>共{{ AllNum | lengthcount(this.AllNum) }}页</span>
      <van-button @click="updo('next')" :disabled="this.isNext">下一页</van-button>
    </div>
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
      },
      AllNum: 0,
      page: 1,
      n: 0,
      isUp: false,
      isNext: false
    }
  },
  // 生命周期初始化函数
  created () {
    this.getarticle(0)
  },
  // 方法
  methods: {
    async getarticle (num) {
      this.article.list = []
      const { data: res } = await Articleset.UsergetArticle(num)
      this.article.list = res.data
      this.AllNum = res.Num
      this.isUp = false
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
    },
    updo (mes) {
      if (mes === 'up') {
        if (this.n === 0) {
          this.$toast({
            message: '这就是第一页！',
            position: 'top'
          })
          this.isUp = true
        } else {
          this.isNext = false
          this.page -= 1
          this.n -= 10
          this.getarticle(this.n)
        }
      } else if (mes === 'next') {
        if (this.page === Math.ceil(this.AllNum / 10)) {
          this.isNext = true
          this.$toast({
            message: '已经是最后一页了！',
            position: 'top'
          })
          return
        }
        this.page += 1
        this.n += 10
        this.getarticle(this.n)
      }
    }
  },
  // 过滤器
  filters: {
    lengthcount (Num) {
      return Math.ceil(Num / 10)
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
  .ShowArticleList {
    width: 100%;
    height: calc(100vh - 120px);
  }

  .table_area {
    overflow: scroll;
    width: 100%;
    height: 85%;
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

.countpage {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 10px;
}
</style>

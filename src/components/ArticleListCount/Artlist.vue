<template>
  <div class="ararc">
    <p class="ararc_title Cookie">文章归档</p>
    <div class="ararc_list" v-for="(year, index) in yearlist" :key="index">
      <Articlezkm :index="index" :year="year" :AllData="AllArticleData[index].slice()"></Articlezkm>
    </div>
  </div>
</template>

<script>
import Articlezkm from './YearItem.vue'
import getArc from '@/API/indexAPI/getArticleList'

export default {
  props: [],
  data () {
    return {
      newList: [],
      monthlist: [],
      yearlist: [],
      ArticleData: [],
      AllArticleData: []
    }
  },
  // 生命周期初始化函数
  created () {
    this.AllArticleData = this.$store.state.ArchiveList.ArchiveListData
    this.yearlist = this.$store.state.ArchiveList.YearListData
    if (this.AllArticleData.length === 0 || this.yearlist.length === 0) {
      this.getdata()
    }
  },
  // 方法
  methods: {
    async getdata () {
      const { data: res } = await getArc.getArchive()
      const ArticleData = res.data
      // 筛出年份
      const articleListYear = [...new Set(ArticleData.map(data => data.year))].filter(year => year !== 0)
      // 筛出月份
      const articleListMonth = [...new Set(ArticleData.map(data => data.month))]
      // 筛出不同年份
      for (let i = 0; i < articleListYear.length; i++) {
        const filterYearData = ArticleData.filter(word => word.year === articleListYear[i])
        if (filterYearData.length !== 0) {
          this.ArticleData.push({
            year: articleListYear[i],
            data: filterYearData
          })
        }
      }
      // 根据年份更新数据
      const filterData = []
      for (let i = 0; i < articleListYear.length; i++) {
        for (let j = 1; j <= 12; j++) {
          const Data = this.ArticleData[i].data.filter(data => Number(data.month) === j)
          if (Data.length !== 0) {
            filterData.push({
              year: articleListYear[i],
              month: j,
              data: Data
            })
          }
        }
        this.AllArticleData.push(filterData.filter(data => Number(data.year) === Number(articleListYear[i])))
      }
      this.yearlist = articleListYear
      this.monthlist = articleListMonth
      this.$store.commit('setArchive', { Archive: this.AllArticleData, YearListData: articleListYear })
      this.AllArticleData = this.$store.state.ArchiveList.ArchiveListData
    }
  },
  name: 'ArtListModule',
  // 导入组件
  components: {
    Articlezkm
  }
}
</script>

<style lang="less" scoped>
.ararc {
  min-height: 120px;
  background-color: #fff;
  margin: 10px 0 15px 0;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
  border-radius: 5px;
  border-radius: 5px;
  padding: 10px;
  max-height: 250px;
  overflow: scroll;
}

.ararc_title {
  text-align: center;
  font-size: 2rem;
  font-weight: bolder;
  font-family: 'songti';
}

.ararc_list {
  margin-top: 10px;
  background-color: rgb(231 243 255 / 60%);
  border-radius: 11px;
  padding: 0 10px;
  overflow: scroll;
}

.ararc_list::-webkit-scrollbar {
  display: none;
}
.ararc::-webkit-scrollbar {
  display: none;
}
</style>

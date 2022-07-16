<template>
  <div class="ararc">
    <p class="ararc_title Cookie">文章归档</p>
    <div class="ararc_list">
      <span class="list_year" @click.prevent="listod()">2022年</span>
      <div :class="{ list_down: isOpen,'list_open': !isOpen }" id="new_article_list_m">
        <div class="month" v-for="(art, index) in monthlist" :key="index">
          <Articlezkm
          :index=index
          :newList="newList"
          :art="art"
          ></Articlezkm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Articlezkm from './article_zk_m.vue'
import getArc from '../api/getArticleList'

export default {
  props: [],
  data () {
    return {
      newList: [],
      monthlist: [],
      isOpen: true
    }
  },
  // 生命周期初始化函数
  created () {
    this.getdata()
  },
  // 方法
  methods: {
    listod () {
      this.isOpen = !this.isOpen
    },
    async getdata () {
      const { data: res } = await getArc.getArchive()
      const newres = res.data
      const articleList = [...new Set(newres.map((word) => word.month))]
      const newalist = []
      for (let i = 0; i < articleList.length; i++) {
        const newarr = newres.filter((word) => word.month === articleList[i])
        newalist.push(newarr)
      }
      this.monthlist = articleList
      this.newList = newalist
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
  name: 'ArtListModule',
  components: {
    Articlezkm
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
.ararc{
  min-height: 120px;
  background-color: rgba(240, 243, 246, 0.5);
  margin: 10px 0 15px 0;
  border-radius: 12px;
}
.ararc_title {
  text-align: center;
  font-size: 3rem;
  font-weight: bolder;
  font-family: 'songti';
}
span.list_year {
  font-size: 3rem;
  font-weight: 600;
  font-style: oblique;
  color: rgb(34, 32, 30);
}
.ararc_list {
  margin-top: 10px;
  background-color: rgb(167 182 194 / 60%);
  border-radius: 11px;
  padding: 10px;
  opacity: 0.9;
}
.list_down {
  height: 0;
  overflow: hidden;
}
.list_open {
  font-weight: 500;
}
</style>

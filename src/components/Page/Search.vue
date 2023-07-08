<template>
  <div>
    <HeaderM></HeaderM>
    <div id="" class="search">
      <div class="Content_Area">
        <p>让我康康</p>
        <div class="search_area">
          <input type="text" v-model="k" id="search_input" placeholder="让我康康" @click="search">
          <button class="search_btn" @click="search">
            <span class="glyphicon glyphicon-search" style="font-size: 20px ;color: black"></span>
          </button>
        </div>
        <div class="value_area">
          <ul>
            <li v-for="(item, index) in search(this.k)" :key="index">
              <Pageuad :item="item"></Pageuad>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getArticle from '../api/getArticleList'
import Pageuad from '../Module/PageCad.vue'

export default {
  props: [],
  data () {
    return {
      k: '',
      Articles: []
    }
  },
  // 生命周期初始化函数
  created () {
    this.Article()
  },
  methods: {
    async Article () {
      const { data: res } = await getArticle.getArticleList('all')
      this.Articles = res.data
    },
    search (key) {
      if (key !== '') {
        const newList = []
        this.Articles.forEach(item => {
          if (item.article_id.indexOf(key) !== -1) {
            newList.push(item)
          } else if (item.content.indexOf(key) !== -1) {
            newList.push(item)
          } else if (item.keyword.indexOf(key) !== -1) {
            newList.push(item)
          } else if (item.lable.indexOf(key) !== -1) {
            newList.push(item)
          } else if (item.pub_date.indexOf(key) !== -1) {
            newList.push(item)
          } else if (item.title.indexOf(key) !== -1) {
            newList.push(item)
          } else if (item.username.indexOf(key) !== -1) {
            newList.push(item)
          }
        })
        return newList
      } else {
        return []
      }
    }
  },
  name: 'SearchM',
  components: {
    Pageuad
  }
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .search {
    width: 100%;
    height: 87vh;
    overflow: hidden;
  }

  .Content_Area {
    padding: 0 18vw;

    p:first-child {
      text-align: center;
      font-size: 13rem;
      letter-spacing: 4rem;
    }
  }

  .search_area {
    padding: 0 18vw;
    border-radius: 12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
    background-color: rgba(244, 244, 244, 0.4);
    border-radius: 12px;
    box-shadow: 0 25px 45px rgb(0 0 0 / 20%);
    display: flex;
    justify-content: space-between;

    #search_input {
      width: 96%;
      height: 50px;
      border: 0;
      padding: 20px;
      background-color: rgba(244, 244, 244, 0.4);
    }

    .search_btn {
      height: 45px;
      width: 45px;
      border: 0;
      padding: 11px;
      border-radius: 50%;
    }
  }

  .value_area {
    overflow: overlay;
    padding: 10px 20px;
    margin: 7px 30px 7px 5px;
    max-height: 38vh;
  }
}

@media only screen and (max-width: 755px) {
  .search {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .Content_Area {
    height: 100%;
    background-color: rgba(240, 240, 240, 0.4);
    padding: 20px;

    p:first-child {
      font-weight: 600;
      text-align: center;
      font-size: 4rem;
      color: rgb(14, 14, 14) !important;
      letter-spacing: 2rem;
    }
  }

  .search_area {
    background-color: #fff;
    border-radius: 46px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
    overflow: hidden;

    #search_input {
      width: 96%;
      height: 50px;
      border: 0;
    }

    .search_btn {
      height: 45px;
      width: 45px;
      border: 0;
      padding: 11px;
      border-radius: 50%;
    }
  }

  .value_area {
    overflow: overlay;
    padding: 10px 20px;
    margin: 7px 0;
    max-height: 70vh;
  }
}</style>

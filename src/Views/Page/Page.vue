<!-- 通知页面-->
<template>
  <div>
    <HeaderM></HeaderM>
    <div id="" class="article">
      <div class="leftContent">
        <h1 v-show="goodpage" style="text-align: center">很抱歉，您没有查看的权限</h1>
        <div v-show="!goodpage" >
          <div class="content">
          <header class="headerText">
            <h1>{{ NotifyData.title }}</h1>
            <p class="ContentMessage">
              <span>管理员：{{ NotifyData.username }}</span>
              <span>时间：{{ NotifyData.pub_date }}</span>
            </p>
          </header>
            <p v-html="NotifyData.content" v-highlight></p>
          </div>
          <div class="tabmenu">
            <ul>
              <li>标签：</li>
              <li>阅读次数：</li>
            </ul>
            <ul>
              <li>{{ NotifyData.lable }}</li>
              <li>{{ NotifyData.read_num }}</li>
            </ul>
          </div>
        </div>
      </div>
      <RightM></RightM>
    </div>
  </div>
</template>

<script>
import GetNotifyData from '@/API/indexAPI/getArticle'
export default {
  data () {
    return {
      NotifyData: [],
      goodpage: true
    }
  },
  created () {
    this.getNotify(this.$route.params.id)
  },
  methods: {
    async getNotify (id) {
      const { data: res } = await GetNotifyData.getPageData(id)
      if (res.status !== 404) {
        this.goodpage = false
        this.NotifyData = res.data
      } else {
        this.goodpage = true
      }
    }
  },
  metaInfo () {
    return {
      title: this.NotifyData.title,
      meta: [
        {
          name: 'keywords',
          content: this.NotifyData.keyword
        },
        {
          name: 'description',
          content: this.NotifyData.lable
        },
        {
          name: 'robots',
          content: 'all'
        },
        {
          name: 'author',
          content: this.NotifyData.username
        }
      ]
    }
  },
  watch: {
    $route (to, from) {
      if (to.path !== from.path) {
        this.getArticle(this.$route.params.id)
      }
    }
  },
  name: 'ArticleM'
}
</script>

<style lang="less" scoped>
.article {
  word-wrap: break-word;
  margin: 0 auto;
  background-color: #fff;
}
.ContentMessage>span:first-child {
  margin-right: 10px;
}

.headerText {
  text-align: center;
}

@media only screen and (min-width: 755px) {
  .article {
    display: flex;
    justify-content: space-between;
    width: 80vw;
  }

  .leftContent {
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    margin-right: 20px;
    width: 50vw;
  }
}

@media only screen and (max-width: 755px) {
  .leftContent {
    background-color: rgba(243, 245, 248, 0.8);
    border-radius: 5px;
    margin-bottom: 30px;
    padding: 10px;
  }

  .ContentMessage>span {
    font-size: 1rem;
  }
}

.tabmenu {
  display: flex;
}

.btn_active {
  button {
    margin: 10px;
  }
}

</style>

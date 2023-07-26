<template>
  <div>
    <HeaderM></HeaderM>
    <div id="" class="DevProcess">
      <div class="Tree">
        <div class="Tree_dome" v-for="(item, index) in notifyList" :key="index">
          <div class="Tree_Area">
            <span class="set_title">通知:</span>
            <router-link :to="'/page/' + item.notify_id">{{ item.title }}</router-link>
            <span class="set_time">发布日期：{{ item.pub_date }}</span>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import getNotifyAPI from '@/API/indexAPI/getArticleList'
import Footer from '@/layout/FooterBar/Footer.vue'
export default {
  props: [],
  data () {
    return {
      notifyList: []
    }
  },
  created () {
    this.getDevP()
  },
  methods: {
    async getDevP () {
      const { data: res } = await getNotifyAPI.getNotifyList()
      this.notifyList = res.data
    }
  },
  computed: {
  },
  filters: {},
  name: 'NotifyPage',
  components: {
    Footer
  }
}
</script>

<style lang="less" scoped>
.DevProcess {
  position: relative;
  width: 85vw;
  margin: 0 auto;
}

.Tree {
  display: flex;
  flex-wrap: wrap;
}

@media only screen and (min-width: 755px) {
  .Tree_dome {
    padding: 15px 5px;
    border-radius: 8px;
    margin: 5px;
  }

  .Tree_Area {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

  .set_title {
    font-weight: bolder;
    display: inline-block;
    margin-right: 15px;
  }

  .set_time {
    float: right;
    margin-left: 8px;
    font-size: 1.5rem;
    color: #657ddd;
    font-weight: bolder;
  }

  .Tree_dome:nth-child(even) {
    background-color: rgb(#B5BCD8);
  }

  .Tree_dome:nth-child(odd) {
    background-color: rgb(#C9D5E9);
  }
}

@media only screen and (max-width: 755px) {
  .Tree_dome {
    padding: 25px;
    border-radius: 8px;
    margin-top: 15px;
    position: relative;
  }

  .Tree_Area {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .set_title {
    font-weight: bolder;
    display: inline-block;
    margin-right: 15px;
  }

  .set_time {
    float: right;
    font-size: 1.2rem;
    color: #657ddd;
    font-weight: bolder;
  }

  .Tree_dome:nth-child(even) {
    background-color: rgb(#B5BCD8);
  }

  .Tree_dome:nth-child(odd) {
    background-color: rgb(#C9D5E9);
  }

}
</style>

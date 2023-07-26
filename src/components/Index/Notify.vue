<template>
  <div class="ararc">
    <p class="ararc_title Cookie">
      <router-link to="/Notify">通知</router-link>
    </p>
      <van-notice-bar left-icon="volume-o" :scrollable="false">
        <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="(data, index) in notifyList" :key="index">
            <router-link :to="'/page/' + data.notify_id">{{ data.title }}</router-link>
          </van-swipe-item>
        </van-swipe>
      </van-notice-bar>
  </div>
</template>

<script>
import getNotifyAPI from '@/API/indexAPI/getArticleList'

export default {
  props: [],
  data () {
    return {
      notifyList: []
    }
  },
  // 生命周期初始化函数
  created () {
    this.getdata()
  },
  // 方法
  methods: {
    async getdata () {
      const { data: res } = await getNotifyAPI.getNotifyList()
      this.notifyList = res.data
    }
  },
  name: 'NotifyListModule',
  // 导入组件
  components: {

  }
}
</script>

<style lang="less" scoped>
.ararc {
  background-color: #fff;
  margin: 10px 0 15px 0;
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
  border-radius: 5px;
  border-radius: 5px;
  padding: 10px;
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
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>

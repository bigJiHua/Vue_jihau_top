<template>
  <div id="" class="">
    <!-- 用户头像区域 用户名 -->
    <div class="phone_Viewset">
      <div class="author_logobox">
        <img :src="$store.state.Userdata.user_pic" class="author_logo" alt="logo" />
      </div>
      <div class="author_name coker">
        <router-link to="/CtrlView/Users">{{ $store.state.Userdata.username }}</router-link>
      </div>
    </div>
    <!-- 用户文章信息 -->
    <p class="Mypanel">功能面板</p>
    <div class="UserArticle">
      <div class="Articles">
        <p class="panel_item_title">文章</p>
        <router-link to="/ArticleIndex" class="panel_Count">{{$store.state.CountNum.articles}}</router-link>
      </div>
      <div class="Article_GN">
        <p class="panel_item_title">点赞</p>
        <router-link to="/CtrlView/Collection" class="panel_Count">{{$store.state.CountNum.goodnums}}</router-link>
      </div>
      <div class="Article_CL">
        <p class="panel_item_title">收藏</p>
        <router-link to="/CtrlView/Collection" class="panel_Count">{{$store.state.CountNum.collects}}</router-link>
      </div>
      <div class="Article_CM">
        <p class="panel_item_title">评论</p>
        <router-link to="/CtrlView/Collection" class="panel_Count">{{$store.state.CountNum.comments}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import GetUData from '@/components/api/Ctrl_menuAPI/UserData'
export default {
  props: [],
  data () {
    return {
    }
  },
  created () {
    this.getUsersdata()
  },
  methods: {
    async getUsersdata () {
      if (this.$store.state.Userdata.length === 0 || this.$store.state.CountNum.length === 0) {
        const { data: res } = await GetUData.GetUserData()
        if (res.status === 401) {
          this.$toast({
            message: res.message,
            position: 'top'
          })
          localStorage.removeItem('token')
          localStorage.removeItem('Username')
          localStorage.removeItem('Useridentity')
          location.reload()
        } else {
          this.$store.commit('cagUserData', res.data.Users)
          this.$store.commit('cagCountNum', res.data)
          this.$toast({
            message: res.message,
            position: 'top'
          })
        }
      }
    }
  },
  watch: {},
  computed: {},
  filters: {},
  name: 'UsersItem',
  components: {}
}
</script>

<style lang="less" scoped>
.phone_Viewset {
  display: flex;
  justify-content: center;
}
.author_logobox {
  width: 80px;
  height: 80px;
}
.author_logo {
  width: 100%;
  height: 100%;
}

@media only screen and (min-width: 755px) {
  .author_name {
    padding: 8px;
  }
  .author_name > a {
    color: rgb(251, 114, 153);
    font-size: 5.5rem;
  }
  .author_name > a:hover {
    color: rgb(251, 114, 153);
    text-decoration: none;
  }
}

@media only screen and (max-width: 755px) {
  .author_name {
    padding: 8px;
  }
  .author_name > a {
    color: rgb(251, 114, 153);
    font-size: 5.5rem;
  }
  .author_name > a:hover {
    color: rgb(251, 114, 153);
    text-decoration: none;
  }
}
.Mypanel {
  margin-left: 45px;
  font-size: 2.5rem;
  font-weight: bolder;
}
.UserArticle {
  display: flex;
  > div {
    margin: 10px;
    width: 150px;
    height: 120px;
    background-color: rgba(240, 243, 246, 0.4);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    border-radius: 8px;
  }
  .panel_item_title {
    text-align: center;
    font-size: 2.4rem;
    font-weight: 430;
    margin: 8px;
  }
  > div:hover {
    background-color: rgba(240, 243, 246, 0.7);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    border-radius: 8px;
    > .panel_item_title {
      font-weight: bolder;
    }
  }
}
.panel_Count{
  text-align: center;
  font-size: 3.8rem;
  display: block;
}
</style>

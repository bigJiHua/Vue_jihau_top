<template>
  <div id="" class="UserArea" v-if="JSON.stringify(this.$store.state.Userdata) !== '{}'">
    <!-- 用户头像区域 用户名 -->
    <div class="phone_Viewset">
      <div class="author_logobox">
        <img :src="this.$store.state.Userdata.Users.user_pic" class="author_logo" alt="logo" />
      </div>
      <div class="author_name coker">
        <router-link to="/CtrlView/Users">{{ this.$store.state.Userdata.Users.username }}</router-link>
      </div>
    </div>
    <!-- 用户文章信息 -->
    <div class="UserArticle">
      <div>
        <div class="PageItem">
          <p class="panel_item_title">文章</p>
          <router-link to="/ArticleIndex" class="panel_Count">{{ $store.state.Userdata.articles }}</router-link>
        </div>
        <div class="PageItem">
          <p class="panel_item_title">点赞</p>
          <router-link to="/CtrlView/Collection" class="panel_Count">{{ $store.state.Userdata.goodnums }}</router-link>
        </div>
      </div>
      <div>
        <div class="PageItem">
          <p class="panel_item_title">收藏</p>
          <router-link to="/CtrlView/Collection" class="panel_Count">{{ $store.state.Userdata.collects }}</router-link>
        </div>
        <div class="PageItem">
          <p class="panel_item_title">评论</p>
          <router-link to="/CtrlView/Collection" class="panel_Count">{{ $store.state.Userdata.comments }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      token: localStorage.getItem('token') !== null
    }
  },
  created () {
  },
  methods: {
  },
  watch: {},
  computed: {},
  filters: {},
  name: 'UsersItem',
  components: {}
}
</script>

<style lang="less" scoped>
.UserArea {
  background-color: #fff;
  border-radius: 5px;
}

.phone_Viewset {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}

.author_logobox {
  height: 100px;
  width: 100px;
  padding: 15px 10px;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(220, 220, 220, 0.8);
}

.author_logo {
  width: 100%;
  height: 100%;
}

@media only screen and (min-width: 755px) {
  .author_name {
    padding: 8px;
  }

  .author_name>a {
    color: rgb(251, 114, 153);
    font-size: 5.5rem;
  }

  .author_name>a:hover {
    color: rgb(251, 114, 153);
    text-decoration: none;
  }
  .PageItem {
    padding: 5px;
  }
}

@media only screen and (max-width: 755px) {
  .author_name {
    padding: 8px;
  }

  .author_name>a {
    color: rgb(251, 114, 153);
    font-size: 5.5rem;
  }

  .author_name>a:hover {
    color: rgb(251, 114, 153);
    text-decoration: none;
  }
  .PageItem {
    padding: 10px;
  }
}

.UserArticle {
  display: flex;
  .PageItem {
    margin: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    height: 65px;
    flex: 1;
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

  >div {
    flex: 1;
  }

  >div>div:hover {
    background-color: rgba(240, 243, 246, 0.7);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    border-radius: 8px;

    >.panel_item_title {
      font-weight: bolder;
    }
  }
}

.panel_Count {
  text-align: center;
  font-size: 2.2rem;
  display: block;
}
</style>

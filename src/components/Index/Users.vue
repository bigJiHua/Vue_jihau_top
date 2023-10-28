<template>
  <div id="" class="UserArea" v-if="this.$store.state.authorName !== ''">
    <!-- 背景板 -->
    <div class="background">
      <!-- 背景板 -->
      <div class="image">
      </div>
      <!-- logo -->
      <div class="authorLogo" v-if="Users.user_pic">
        <img :src="Users.user_pic" alt="logo" class="logo">
      </div>
      <div class="username">
        <router-link :to="'/space/' + Users.username">{{ Users.username }}</router-link>
      </div>
    </div>
    <!-- 数据展示 -->
    <div class="dataNum">
      <div class="showNumDataItem">
        <p class="Num">{{ Userdata.articles }}</p>
        <p class="NumText">文章数</p>
      </div>
      <div class="showNumDataItem">
        <p class="Num">{{ Userdata.collects }}</p>
        <p class="NumText">收藏数</p>
      </div>
      <div class="showNumDataItem">
        <p class="Num">{{ Users.fans }}</p>
        <p class="NumText">粉丝数</p>
      </div>
    </div>
  </div>
</template>

<script>
import getAuthorApi from '@/API/UserActionAPI/UserActiveGet'
export default {
  props: [],
  data () {
    return {
      token: localStorage.getItem('token') !== null,
      Users: {
        fans: 0,
        user_content: '',
        user_id: '',
        user_pic: '',
        useridentity: '',
        username: ''
      },
      Userdata: {
        articles: 0,
        goodnums: 0,
        collects: 0,
        comments: 0
      },
      get: ''
    }
  },
  created () {
    this.get = setInterval(() => {
      if (this.$store.state.authorName !== '') {
        this.getAuthorData()
      }
      clearInterval(this.get)
    }, 200)
  },
  methods: {
    async getAuthorData () {
      const { data: res } = await getAuthorApi.getAuthData(this.$store.state.authorName)
      this.Users.fans = res.data.Users.fans
      this.Users.user_content = res.data.Users.user_content
      this.Users.user_id = res.data.Users.user_id
      this.Users.user_pic = res.data.Users.user_pic
      this.Users.useridentity = res.data.Users.useridentity
      this.Users.username = res.data.Users.username
      this.Userdata.articles = res.data.articles
      this.Userdata.goodnums = res.data.goodnums
      this.Userdata.collects = res.data.collects
      this.Userdata.comments = res.data.comments
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
.UserArea {
  background-color: #fff;
  border-radius: 5px;
}

.background {
  height: 250px;
  width: 100%;
  position: relative;
}

.image {
  height: 60%;
  border-radius: 5px 5px 0 0;
  background-color: #ECF4FD;
  color: #1c1c1c;
  text-align: center;
  white-space: break-spaces;
  padding: 15px;
}

.image::after {
  content: "⁶⁶ ⁶⁶⁶⁶⁶⁶   ⁶⁶66⁶⁶⁶⁶   ₆₆₆₆  可以啊.这 波  ₆₆₆₆ ⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶  66⁶⁶⁶⁶ 卧槽⁶⁶⁶⁶⁶⁶  ⁶⁶⁶⁶⁶⁶⁶ 666₆₆₆₆ ₆₆₆ 666 666 ⁶⁶⁶⁶ ⁶⁶₆₆₆ ₆₆₆₆⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶⁶⁶ ⁶⁶⁶⁶ ⁶⁶⁶⁶";
}

.authorLogo {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  padding: 30px;
  border-radius: 50%;
  background-color: #e3e3e364;
  border: 1px gray inset;
}

.logo {
  width: 100%;
  height: 100%;
}

.username {
  text-align: center;
  margin-top: 65px;
  font-size: 2.5rem;

  >a {
    color: #1c1c1c;
  }
}

.dataNum {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  .showNumDataItem {
    margin: 0 15px;

    >p:first-child {
      font-size: 2rem;
      font-weight: 600;
    }

    >p:last-child {
      color: rgba(146, 146, 146, 0.82);
      font-size: 1.8rem;
      font-weight: 300;
    }
  }
}

.UserActionArea {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  >div>button {
    margin: 25px;
  }
}
</style>

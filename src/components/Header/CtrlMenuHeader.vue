<template>
  <div class="navbar-default Ctrldemo" id="indexHeader" ref="headertotop">
    <div class="navbar-header coker">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
        aria-expanded="false" aria-controls="navbar" ref="btn_list">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <router-link class="navbar-brand headerTitle" to="/CtrlView/users">
        <h1>作者管理面板</h1>
      </router-link>
      <a href="https://jihau.top"><img src="https://www.jihau.top/img/logo.png" class="logo" alt="logo" /></a>
    </div>
    <div id="navbar" class="navbar-collapse collapse Ctrldemo" ref="menubox">
      <ul class="nav navbar-nav">
        <li class="menu-item" @click="closeMenu">
          <router-link to="/CtrlView/users" class="tolink">个人信息</router-link>
        </li>
        <li class="menu-item" v-if="UidState" @click="closeMenu">
          <router-link to="/CtrlView/Authority" class="tolink">权限管理</router-link>
        </li>
        <li class="menu-item" @click="closeMenu">
          <router-link to="/CtrlView/article" class="tolink">文章管理</router-link>
        </li>
        <li class="menu-item" @click="closeMenu">
          <router-link to="/CtrlView/Collection" class="tolink">我的消息</router-link>
        </li>
        <li class="menu-item" @click="closeMenu">
          <router-link to="/CtrlView/Setting" class="tolink">系统设置</router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right right_btn">
        <li @click="closeMenu" class="UserNL" v-if="JSON.stringify(this.$store.state.Userdata) != '{}'">
          <router-link to="/">主页</router-link>
          <img :src="this.$store.state.Userdata.Users.user_pic" class="author_logo" alt="logo" />
          <router-link to="/CtrlView">{{ this.$store.state.Userdata.Users.username }}</router-link>
        </li>
        <li class="HeaderbtnArea">
          <button @click="login" class="btn" v-if="!token">登录</button>
          <button @click="outlogin" class="btn" v-else>退出登录 </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import GetUData from '@/components/api/Ctrl_menuAPI/UserData'
export default {
  props: [],
  data () {
    return {
      istop: false,
      UidState: false,
      token: localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== 'undefined'
    }
  },
  created () {
    if (JSON.stringify(this.$store.state.Userdata) === '{}' && localStorage.getItem('token') !== null) {
      this.getUsersdata()
    }
  },
  // 方法
  methods: {
    closeMenu () {
      const btnList = this.$refs.btn_list
      const menubox = this.$refs.menubox
      btnList.setAttribute('aria-expanded', 'flase')
      btnList.setAttribute('class', 'navbar-toggle collapsed')
      menubox.setAttribute('class', 'navbar-collapse collapse')
    },
    HeaderTop () {
      const indexHeader = this.$refs.headertotop
      if (indexHeader) {
        const scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop
        if (scrollTop >= 10) {
          this.istop = true
        }
        if (scrollTop === 0) {
          this.istop = false
        }
      }
    },
    login () {
      this.closeMenu()
      if (this.token) {
        this.$router.push('/CtrlView')
      } else {
        this.$router.push('/Login')
      }
    },
    outlogin () {
      this.closeMenu()
      localStorage.removeItem('token')
      localStorage.removeItem('Username')
      localStorage.removeItem('Useridentity')
      localStorage.removeItem('UserData')
      this.$store.commit('cagUserData', [])
      location.reload()
    },
    async getUsersdata () {
      if (localStorage.getItem('Username') !== null) {
        const { data: res } = await GetUData.GetUserData()
        this.$store.commit('cagUserData', res.data)
      }
    }
  },
  name: 'CtrlMenuHeader'
}
</script>

<style lang="less" scoped>
#navbar {
  font-size: 1.5rem;
  font-weight: bolder;
  background-color: rgba(255, 255, 255, 0);
}

.UserNL {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

}

.author_logo {
  width: 30px;
  height: 30px;
}

// windows设备
@media only screen and (min-width: 755px) {
  #indexHeader {
    transition: all 0.5s;
    margin: 0 auto;
    width: 95vw;
    height: 50px;
    overflow: hidden;
  }

  .logo {
    width: 45px;
    height: 40px;
    margin: 5px 0 10px 0;
  }

  .coker>a>h1 {
    font-size: 3rem;
    padding: 0;
    margin: 0;
  }

  .right_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .menu-item {
    display: none;
  }
}

// 移动端样式
@media only screen and (max-width: 755px) {
  #indexHeader {
    position: fixed;
    width: 100vw;
    z-index: 999;
    top: 0;
    left: 0;
  }

  .logo {
    width: 35px;
    height: 27px;
    margin: 7px 0 10px;
  }

  .headerTitle {
    padding: 10px;
  }

  .headerTitle>h1 {
    font-size: 2.5rem;
    padding: 0;
    margin: 5px 0 0 0;
  }

  #navbar {
    position: absolute;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.9);
    width: 100%;
  }

  .HeaderbtnArea {
    text-align: right;
    margin-right: 20px;
  }
}

@media only screen and (max-width: 370px) {
  .coker>a>h1 {
    font-size: 2rem;
  }
}

@media only screen and (max-width: 280px) {
  .logo {
    display: none;
  }

  .coker>a>h1 {
    font-size: 1.6rem;
  }
}
</style>

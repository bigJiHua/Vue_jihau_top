<template>
  <div id="" class="aside">
    <v-touch v-on:onetap="dbcagList($event)">
      <div class="menudemo" @click="to_top">
        <span class="title">设置菜单</span>
        <div>
          <p :class="{ icon_up: isup, 'isdn': !isup }" @click="to_top"></p>
        </div>
      </div>
    </v-touch>
    <ul :class="[{ ismenu: isup, 'menu': !isup }, 'user-select-none']">
      <li class="menu-item" @click="to_top">
        <router-link to="/CtrlView/users" class="tolink">个人信息</router-link>
      </li>
      <li class="menu-item" v-if="UidState" @click="to_top">
        <router-link to="/CtrlView/Authority" class="tolink">权限管理</router-link>
      </li>
      <li class="menu-item" @click="to_top">
        <router-link to="/CtrlView/article" class="tolink">文章管理</router-link>
      </li>
      <li class="menu-item" @click="to_top">
        <router-link to="/CtrlView/Collection" class="tolink">我的消息</router-link>
      </li>
      <li class="menu-item" @click="to_top">
        <router-link to="/CtrlView/Setting" class="tolink">系统设置</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      UidState: false,
      isup: false
    }
  },
  // 生命周期初始化函数
  created () {
    this.UserUidState()
  },
  // 方法
  methods: {
    UserUidState () {
      const state = localStorage.getItem('Useridentity')
      switch (state) {
        case '用户':
          this.UidState = false
          break
        case '管理员':
          this.UidState = true
      }
    },
    to_top () {
      if (this.isup) {
        this.isup = false
      } else {
        this.isup = true
      }
    },
    dbcagList (e) {
      const cage = e.target
      document.addEventListener('click', (e) => {
        const ele = e.target
        if (ele !== cage) {
          setTimeout(() => {
            this.isup = false
          }, 250)
        }
      })
    }
  },
  name: 'CtrlViewAside'
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .aside {
    border-right: 2px rgba(214, 210, 210, 0.9) solid;
    height: 100%;
  }
  .menudemo {
    display: none;
  }
}

@media only screen and (max-width: 755px) {
  .aside {
    width: 100vw;
    position: relative;
  }

  .menudemo {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }

  span.title {
    font-size: 2rem;
    font-weight: bolder;
  }

  .user-select-none {
    position: absolute;
    top: 30px;
    background-color: rgb(240, 240, 240);
    z-index: 999;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }

  .menu-item {
    width: 30vw;
  }

  .icon_up {
    width: 20px;
    height: 20px;
    border-left: 4px black solid;
    border-top: 4px black solid;
    transition: all 0.3s;
    transform: rotate(45deg);
    float: right;
    margin: 8px 25px 0 0;
  }

  .isdn {
    width: 20px;
    height: 20px;
    border-left: 4px black solid;
    border-top: 4px black solid;
    transition: all 0.3s;
    transform: rotate(-135deg);
    float: right;
    margin: -6px 25px 0 0;
  }

  .menu {
    transform: scaleY(0);
    transition: transform 0.2s;
    transform-origin: top center;
    height: 0;
  }
}

.user-select-none {
  padding: 0;

  >li {
    >a {
      text-decoration: none;
      color: rgb(0, 0, 0);
      font-size: 1.5rem;
    }

    display: block;
    text-align: center;
    padding: 10px;
    margin-top: 10px;
  }

  >li:hover {
    background-color: rgba(214, 210, 210, 0.5);

    >a {
      color: white;
    }
  }
}

.tolink {
  font-size: 1.8rem !important;
}
</style>
<!-- background-color: rgb(49,65,85); -->

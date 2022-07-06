<template>
  <div id="" class="aside">
    <ul class="user-select-none menu">
      <li class="menu-item">
        <router-link to="/CtrlView/users" class="tolink">个人信息</router-link>
      </li>
      <li class="menu-item" v-show="UidState">
        <router-link to="/CtrlView/Authority" class="tolink">权限管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/CtrlView/article" class="tolink">文章管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/CtrlView/Collection" class="tolink">我的消息</router-link>
      </li>
      <li class="menu-item">
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
      UidState: false
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
    }
  },
  name: 'CtrlViewAside'
}
</script>

<style lang="less" scoped>
.aside {
  border-right: 2px rgba(214, 210, 210, 0.9) solid;
  height: 100%;
  width: 15vw;
}

@media only screen and (max-width: 755px) {
.aside {
  border-right: 2px rgba(214, 210, 210, 0.9) solid;
  min-height: 89vh;
  min-width: 23vw;
}
}
.user-select-none {
  padding: 0;
  > li {
    > a {
      text-decoration: none;
      color: rgb(0, 0, 0);
      font-size: 1.5rem;
    }
    display: block;
    text-align: center;
    padding: 10px;
    margin-top: 10px;
  }
  > li:hover {
    background-color: rgba(214, 210, 210, 0.5);
    > a {
      color: white;
    }
  }
}
.tolink{
  font-size: 1.8rem !important;
}
</style>
<!-- background-color: rgb(49,65,85); -->

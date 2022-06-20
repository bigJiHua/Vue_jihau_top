<template>
  <div id="" class="aside">
    <ul class="user-select-none menu">
      <li class="menu-item">
        <router-link to="/CtrlView/users">个人信息</router-link>
      </li>
      <li class="menu-item" v-show="UidState">
        <router-link to="/CtrlView/Authority">权限管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/CtrlView/article">文章管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/CtrlView/Collection">我的收藏</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/CtrlView/Setting">系统设置</router-link>
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
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'CtrlViewAside',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
.aside {
  border-right: 2px rgba(214, 210, 210, 0.9) solid;
  background-color: rgba(214, 210, 210, 0.2);
  min-height: 92vh;
  margin-right: 3vw;
  min-width: 11vw;
}

@media only screen and (max-width: 755px) {
.aside {
  border-right: 2px rgba(214, 210, 210, 0.9) solid;
  background-color: rgba(214, 210, 210, 0.2);
  flex: 0.5;
  min-height: 92vh;
  margin-right: 3vw;
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
</style>

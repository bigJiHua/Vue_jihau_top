<template>
  <div id="" class="aside">
  <ul class="user-select-none menu">
      <li class="menu-item">
        <router-link to="/CtrlView/users">个人信息</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/CtrlView/rights">权限管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/CtrlView/article">文章管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/CtrlView/goodnum">点赞管理</router-link>
      </li>
        <li class="menu-item">
      <router-link to="/CtrlView/settings">系统设置</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: [],
  data () {
    return {}
  },
  // 生命周期初始化函数
  // created: {
  //
  // },
  // 方法
  methods: {},
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
.aside{
  border-right: 2px rgba(214, 210, 210, 0.9) solid;
  background-color: rgba(214, 210, 210, 0.2);
  flex: 0.5;
  min-height: 92vh;
  margin-right: 3vw;
}
.user-select-none{
  padding: 0;
    >li{
      >a{
        text-decoration: none;
        color: rgb(0, 0, 0);
        font-size: 1.5rem;
      }
      display: block;
      text-align: center;
      padding: 10px;
      margin-top: 10px;
    }
    >li:hover{
      background-color: rgba(214, 210, 210, 0.5);
      >a{
        color: white;
      }
    }
}
</style>

<template>
  <div id="" class="yszc_box container">
    <div class="col-md-8">
      <h1>隐私政策</h1>
      <p class="tiwen">我是谁？</p>
      <p class="huida">我是JiHua的Web和Js开发数据（jihau.top）的开发站长.
      是在校大学生，目前正在学习和开发html网站以及C语言程序和Web设计的开发，更多站点请点击上方菜单栏的更多即可查看。
      </p>
      <p class="tiwen">我们将会对您的浏览做什么、隐私、数据收集</p>
      <p class="huida">
        不久之后我会开发用户登录记录token和Cookie进行收集和处理包括但不限于用户身份、用户名、用户头像等除密码之外的用户基本信息。
      </p>
      <p class="tiwen">网站安全</p>
      <p class="huida">
        任何人不得以不正当或者非法手段入侵站点或对本站点源代码进行恶意篡改！
      </p>
    </div>
    <div class="col-md-4">
      <RightM></RightM>
    </div>
  </div>
</template>

<script>
// 导入组件
// import  from ''

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
  metaInfo: {
    title: '隐私政策'
  },
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'YSZC',
  components: {
  }
}
</script>

<style lang="less" scoped>
.yszc_box{
  div>h1{
    text-align: center;
  }
}
.tiwen{
  font-size: 2rem;
  font-weight: bolder;
}
</style>

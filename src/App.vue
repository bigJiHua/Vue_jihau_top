<template>
  <div id="app">
    <HeaderM></HeaderM>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  metaInfo: {
    title: 'JiHua的web和js开发数据',
    meta: [
      {
        name: 'keywords',
        content:
          'JiHua,jihua,JiHua·Web和JS开发数据,JiHua的Web和JS开发数据,个人网站,C语言程序,Web语言,个人网站搭建'
      },
      {
        name: 'description',
        content:
          'JiHua•Web和js开发数据 一个神奇的个人网站，里面展现个人魅力，程序设计语言站点导航，以及软件使用方法和事件处理方法，包括但不限于C语言、C语言程序设计书籍、题型、作品等，网页逐渐搭建，不断更新中。一个神奇的个人网站！里面将有超多的内容知识。'
      },
      {
        name: 'robots',
        content: 'all'
      },
      {
        name: 'author',
        content: 'JiHua'
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'jihua的web和js开发数据'
      },
      {
        name: 'Copyright',
        content: '本页版权归JiHua所有。All Rights JiHua'
      },
      {
        name: 'referrer',
        content: 'no-referrer-when-downgrade'
      }
    ]
  },
  components: {
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}
</style>

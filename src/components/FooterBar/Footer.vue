<template>
  <div id="" class="footer">
    <div id="icp">
      <router-link to="/">
        <img
          src="https://jihau.top/img/logo.png"
          alt="站点logo"
          width="30"
          height="30"
        />
      </router-link>
      网页所有人: <span class="coker">JiHua</span>(化名)&nbsp;邮编: 536000<br />
      ICP备案号:<a href="https://beian.miit.gov.cn">桂ICP备2021005093号-1</a
      ><br />
      <p class="icp_alt">
        建议您使用Chrome、Firefox、Edge、IE10及以上版本等浏览器并把缩放倍率调整为110-125%浏览本网站
        |
        <router-link to="/隐私政策">隐私政策</router-link>
      </p>
      <a href="#" title="返回顶部" @click="totop"
        ><img
          src="https://jihau.top/img/zujian/upupday.png"
          alt="top"
          width="40px"
          height="40px"
          class="nonetop"
          ref="totop"
      /></a>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  // 方法
  methods: {
    totop () {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    },
    handleScroll () {
      const indexHeader = this.$refs.totop
      if (indexHeader) {
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop >= 650) {
          indexHeader.setAttribute('class', 'top')
        }
        if (scrollTop === 0) {
          indexHeader.setAttribute('class', 'nonetop')
        }
      }
    }
  },
  name: 'FooTer'
}
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  text-align: center;
  color: white;
  font-size: 15px;
  background-color: rgb(37, 51, 62);
  .top {
    right: 15px;
    position: fixed;
    bottom: 100px;
    z-index: 99;
    width: 50px;
    height: auto;
    text-align: center;
  }
  .nonetop{
    display: none;
  }
}
</style>

<!--

.footer {
  margin: 0 auto;
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  color: white;
  font-size: 15px;
  background-color: rgb(37, 51, 62);
  .top {
    right: 15px;
    position: fixed;
    bottom: 100px;
    z-index: 99;
    width: 50px;
    height: auto;
    text-align: center;
  }
  .nonetop{
    display: none;
  }
}

-->

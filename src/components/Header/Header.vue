<template>
  <div class="navbar-default container" id="indexHeader" ref="headertotop">
    <div class="navbar-header coker">
      <button
        type="button"
        class="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#navbar"
        aria-expanded="false"
        aria-controls="navbar"
        ref="btn_list"
        @mouseleave.once="closeMenu"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <router-link class="navbar-brand headerTitle" to="/">
        <h1>JiHua的web和js开发数据</h1>
      </router-link>
      <a href="https://jihau.top"
        ><img src="https://www.jihau.top/img/logo.png" class="logo" alt="logo"
      /></a>
    </div>
    <div id="navbar" class="navbar-collapse collapse" ref="menubox" @mouseout="closeMenu">
      <ul class="nav navbar-nav">
        <li><router-link to="/" ><span @click="closeMenu">主页</span></router-link></li>
        <li><a href="https://about.jihau.top"><span @click="closeMenu">关于</span></a></li>
        <li class="dropdown">
          <a
            class="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            @mousemove.once="listMenu"
            ref="more_something"
            >更多<span class="caret"></span
          ></a>
          <ul class="dropdown-menu" ref="dropdown_menu">
            <li><a href="https://www.jihau.com">主站博客页面</a></li>
            <li><a href="https://d0tc.com">C语言程序与设计</a></li>
          </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <router-link to="/Search">
            <span class="glyphicon glyphicon-search" style="font-size: 20px"  @click="closeMenu"></span>
          </router-link>
        </li>
        <li><a href="https://jihau.com/POP/">测试</a></li>
        <!-- <li><a href="#" >返回顶部</a></li> -->
        <li><router-link to="/隐私政策"><span @click="closeMenu">隐私政策</span></router-link></li>
      </ul>
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
  mounted () {
    window.addEventListener('scroll', this.HeaderTop)
  },
  // 方法
  methods: {
    listMenu () {
      // eslint-disable-next-line camelcase
      const more_site = this.$refs.more_something
      // eslint-disable-next-line camelcase
      const more_site_son = this.$refs.dropdown_menu
      more_site.addEventListener('mouseenter', function () {
        more_site.setAttribute('aria-expanded', 'ture')
        // eslint-disable-next-line no-global-assign
        open = more_site.parentNode
        open.className = 'dropdown open'
      })
      more_site.addEventListener('mouseleave', function () {
        more_site.setAttribute('aria-expanded', 'flase')
        // eslint-disable-next-line no-global-assign
        open = more_site.parentNode
        open.className = 'dropdown'
      })
      more_site_son.addEventListener('mouseenter', function () {
        more_site.setAttribute('aria-expanded', 'ture')
        // eslint-disable-next-line no-global-assign
        open = more_site.parentNode
        open.className = 'dropdown open'
      })
      more_site_son.addEventListener('mouseleave', function () {
        more_site.setAttribute('aria-expanded', 'flase')
        // eslint-disable-next-line no-global-assign
        open = more_site.parentNode
        open.className = 'dropdown'
      })
    },
    closeMenu () {
      const btnList = this.$refs.btn_list
      const menubox = this.$refs.menubox
      const moresite = this.$refs.more_something
      btnList.setAttribute('aria-expanded', 'flase')
      moresite.setAttribute('aria-expanded', 'flase')
      btnList.setAttribute('class', 'navbar-toggle collapsed')
      menubox.setAttribute('class', 'navbar-collapse collapse')
    },
    HeaderTop () {
      const indexHeader = this.$refs.headertotop
      if (indexHeader) {
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop >= 10) {
          indexHeader
            .setAttribute(
              'style',
              `position: fixed;
              top: -1px;
              z-index:999;
              width:100vw;
              height:50px;
              `
            )
        }
        if (scrollTop === 0) {
          indexHeader.removeAttribute('style')
        }
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
  name: 'HeaderM',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
#navbar{
  font-size: 1rem;
  font-weight: bolder;
}
@media only screen and (min-width: 755px) {
  .logo {
    width: 45px;
    height: 40px;
    margin: 5px 0 10px 0;
  }
  .coker > a > h1 {
    font-size: 3rem !important;
    padding: 0;
    margin: 0;
  }
}
@media only screen and (max-width: 755px) {
  .logo {
    width: 34px;
    height: 28px;
    margin: 10px 0 10px 0;
  }
  .coker > a > h1 {
    font-size: 2.5rem !important;
    padding: 0;
    margin: 0;
  }
  #navbar {
    position: absolute;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.9);
    width: 100vw;
  }
}
</style>

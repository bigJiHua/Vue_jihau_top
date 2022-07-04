<template>
  <div
  :class="['navbar-default','Ctrldemo', {header: istop} ]"
  id="indexHeader" ref="headertotop">
    <div class="navbar-header coker">
      <button
        type="button"
        class="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#navbar"
        aria-expanded="false"
        aria-controls="navbar"
        ref="btn_list"
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
    <div id="navbar" class="navbar-collapse collapse Ctrldemo" ref="menubox" >
      <ul class="nav navbar-nav">
        <li @click="closeMenu">
          <router-link to="/">主页</router-link>
        </li>
        <li @click="closeMenu">
          <a href="https://about.jihau.top">关于</a>
        </li>
        <li @click="closeMenu">
          <router-link to="/DevProcess">发展历程</router-link>
        </li>
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
            <li><router-link to="/隐私政策"><span @click="closeMenu">隐私政策</span></router-link></li>
            <li><a href="https://jihau.com/POP/">测试</a></li>
          </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right right_btn">
        <li @click="closeMenu">
          <router-link to="/Search">
            <span
              class="glyphicon glyphicon-search"
              style="font-size: 20px"
              @click="closeMenu"
            ></span>
          </router-link>
        </li>
        <li @click="closeMenu"><router-link to="/CtrlView" v-show="token">欢迎{{User}}{{Useridentity}}</router-link></li>
        <li >
          <button @click="login" class="btn" v-show="!token">登录</button>
          <button @click="outlogin" class="btn" v-show="token"><a>退出登录</a></button>
          <button v-show="token" class="btn" @click="closeMenu">
            <router-link to="/CtrlView">后台</router-link>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      token: localStorage.getItem('token'),
      User: localStorage.getItem('Username'),
      Useridentity: localStorage.getItem('Useridentity'),
      istop: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.HeaderTop)
    const setcolor = (demo, color) => {
      const demos = document.querySelectorAll(`${demo}`)
      for (let i = 0; i < demos.length; i++) {
        demos[i].style.color = `${color}`
      }
    }
    // 设置主题样式
    setTimeout(() => {
      setInterval(() => {
        const Ctrldemo = document.querySelectorAll('.Ctrldemo')
        const style = localStorage.getItem('bgc')
        const bgc = this.$store.state.bgc
        if (style) {
          for (let i = 0; i < Ctrldemo.length; i++) {
            Ctrldemo[i].style.background = `${style}`
            setcolor('h1', 'rgb(240,240,240)')
            setcolor('.menu-item > a', 'rgb(240,240,240)')
            setcolor('.article_alltitle > span', 'rgb(240,240,240)')
            setcolor('.nav > li > a', 'rgb(240,240,240)')
            setcolor('#User > p > span', 'rgb(240,240,240)')
            setcolor('#cagUsers > p > span', 'rgb(240,240,240)')
            setcolor('.ararc_title', 'rgb(240,240,240)')
          }
        } else if (!style && bgc !== '' && bgc !== null) {
          for (let i = 0; i < Ctrldemo.length; i++) {
            Ctrldemo[i].style.background = `${bgc}`
            setcolor('h1', 'rgb(240,240,240)')
            setcolor('.menu-item > a', 'rgb(240,240,240)')
            setcolor('.article_alltitle > span', 'rgb(240,240,240)')
            setcolor('.nav > li > a', 'rgb(240,240,240)')
            setcolor('#User > p > span', 'rgb(240,240,240)')
            setcolor('#cagUsers > p > span', 'rgb(240,240,240)')
            setcolor('.ararc_title', 'rgb(240,240,240)')
            setcolor('#introduce_doc > p', 'rgb(240,240,240)')
          }
        }
      }, 200)
    }, 200)
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
      location.reload()
    }
  },
  name: 'HeaderM',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
#navbar {
  font-size: 1.5rem;
  font-weight: bolder;
}
.header{
  position: fixed;
  top: -1px;
  z-index:999;
  height:50px;
  width: 81%;
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
.header{
  position: fixed;
  top: -1px;
  z-index:999;
  height:50px;
  width: 90%;
}
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
    width: 100%;
  }
}
</style>

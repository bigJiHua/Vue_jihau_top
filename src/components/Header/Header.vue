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
        @click="closeMenu"
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
    <div id="navbar" class="navbar-collapse collapse" ref="menubox" >
      <ul class="nav navbar-nav">
        <li>
          <router-link to="/"><span @click="closeMenu">主页</span></router-link>
        </li>
        <li>
          <a href="https://about.jihau.top"><span @click="closeMenu">关于</span></a>
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
        <li>
          <router-link to="/Search">
            <span
              class="glyphicon glyphicon-search"
              style="font-size: 20px"
              @click="closeMenu"
            ></span>
          </router-link>
        </li>
        <li @click="closeMenu"><router-link to="/CtrlView" v-show="token">欢迎{{User}}{{Useridentity}}</router-link></li>
        <li>
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
    const getTag = (roots, map = {}) => {
      if (!roots?.length) return []
      Array.from(roots).forEach(node => {
        map[node.tagName] = ''
        getTag(node.children, map)
      })
      return Object.keys(map)
    }
    setTimeout(() => {
      setInterval(() => {
        const Ctrldemo = document.getElementsByClassName('Ctrldemo')
        const style = localStorage.getItem('bgc')
        // 本地值不存在且未发生改变
        if (!style && this.$store.state.bgc !== '' && this.$store.state.bgc !== undefined) {
          console.log(this.$store.state.bgc)
          for (let i = 0; i < Ctrldemo.length; i++) {
            Ctrldemo[i].style.background = `${this.$store.state.bgc}`
            const alldemo = getTag(document.getElementsByTagName('html'))
            for (let i = 0; i < alldemo.length; i++) {
              const alldemom = alldemo[i].toLowerCase()
              // eslint-disable-next-line no-empty
              if (alldemom === 'input' || alldemom === 'textarea' || alldemom === 'button' || alldemom === 'a' || alldemom === 'p' || alldemom === 'h1' || alldemom === 'li') {
                const demo = document.getElementsByTagName(`${alldemom}`)
                const demobtn = document.getElementsByTagName('button')
                for (let i = 0; i < demo.length; i++) {
                  demo[i].style.color = 'rgb(255,255,255)'
                }
                for (let i = 0; i < demobtn.length; i++) {
                  demobtn[i].style.background = `${this.$store.state.bgc}`
                }
              }
            }
          } // 本地值存在 优先处理本地值
        } else if (style) {
          for (let i = 0; i < Ctrldemo.length; i++) {
            Ctrldemo[i].style.background = `${localStorage.getItem('bgc')}`
            const alldemo = getTag(document.getElementsByTagName('html'))
            for (let i = 0; i < alldemo.length; i++) {
              const alldemom = alldemo[i].toLowerCase()
              if (alldemom === 'p' || alldemom === 'input' || alldemom === 'textarea' || alldemom === 'button') {
                const demo = document.getElementsByTagName(`${alldemom}`)
                const demobtn = document.getElementsByTagName('button')
                for (let i = 0; i < demo.length; i++) {
                  demo[i].style.color = 'rgb(0,0,0)'
                }
                for (let i = 0; i < demobtn.length; i++) {
                  demobtn[i].style.background = `${localStorage.getItem('bgc')}`
                }
              } else if (alldemom === 'h1' || alldemom === 'li' || alldemom === 'a' || alldemom === 'span') {
                const demo = document.getElementsByTagName(`${alldemom}`)
                for (let i = 0; i < demo.length; i++) {
                  demo[i].style.color = 'rgb(255,255,255)'
                }
              }
            }
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

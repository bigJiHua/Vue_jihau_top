<template>
  <div id="" class="showLogin">
    <!-- 遮罩层 -->
    <div class="overlay" @click="close"></div>
    <div class="login_conten_box">
      <img class="login_img" src="https://jihau.top/api/public/uploads/undraw_Login_re_4vu2.png" />
      <div class="user_input_eara">
        <div class="close" @click="close">
          <i class="glyphicon glyphicon-remove"></i>
        </div>
        <h2>登录 <small>Login</small></h2>
        <form class="form-horizontal">
          <label for="al_title" class="login_lable"> 用户名:</label>
          <input type="text" v-model="username" class="form-control login_input" placeholder="请输入用户名" require />
          <label for="al_title" class="login_lable"> 密码:</label>
          <input type="password" class="form-control login_input" placeholder="请输入密码" required v-model="password"
            @keydown.enter="login" />
        </form>
        <div class="btnmenu">
          <van-button @click="register">注册</van-button>
          <van-button @click="login" v-show="!loading">登录</van-button>
          <van-button loading type="primary" loading-text="登录中..." v-show="loading" />
        </div>
      </div>
    </div>
    <van-popup v-model="show" round class="popup">{{ msg }}</van-popup>
  </div>
</template>

<script>
import PostLogin from '@/API/Ctrl_menuAPI/LoginAPI'

export default {
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      show: false,
      msg: '正在登录',
      setTime: 2000,
      rules: {
        username: {
          rule: /^\S/,
          msg: '用户名不能为空!且长度为6-12位'
        },
        password: {
          rule: /^\S{6,12}/,
          msg: '密码不能为空!且长度为6-12位'
        }
      }
    }
  },
  methods: {
    async login () {
      // 验证是否已经拥有token
      if (!localStorage.getItem('token')) {
        // 验证输入的用户名是否合法
        if (this.validata('username')) {
          // 验证输入的密码是否合法
          if (this.validata('password')) {
            // 发起请求
            const { data: res } = await PostLogin.LoginMenu(
              this.username,
              this.password
            )
            // 打开开关
            this.show = true
            this.loading = true
            // 判断返回状态码是否成功
            if (res.token !== undefined && res.token !== '') {
              localStorage.setItem('token', res.token)
              localStorage.setItem('Username', res.User.username)
              localStorage.setItem('Useridentity', res.User.useridentity)
              this.$store.commit('cagUserData', res.User)
              const timer = setInterval(() => {
                this.msg = res.message
              }, 100)
              setTimeout(() => {
                clearInterval(timer)
                this.show = false
                this.loading = false
                this.close()
                location.reload()
              }, this.setTime)
            } else {
              this.showPopup(res.message)
            }
          }
        }
      } else {
        this.showPopup('已经登录啦！请勿重复提交表单！')
      }
    },
    register () {
      if (localStorage.getItem('token')) {
        this.showPopup('已经登录啦！')
        this.close()
        location.reload()
      } else {
        this.$router.push('/register')
      }
    },
    validata (key) {
      let bool = true
      if (!this.rules[key].rule.test(this[key])) {
        this.show = true
        this.msg = this.rules[key].msg
        bool = false
        return false
      }
      return bool
    },
    showPopup (msg) {
      const timer = setInterval(() => {
        this.show = true
        this.msg = msg
      }, 100)
      setTimeout(() => {
        clearInterval(timer)
        this.show = false
        this.loading = false
      }, this.setTime)
    },
    close () {
      this.$emit('close', false)
    }
  },
  name: 'ArticleLogin'
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

.login_conten_box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.showLogin {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.user_input_eara {
  position: relative;
}

@media only screen and (min-width: 755px) {

  .login_conten_box {
    width: 50%;
  }

  .login_img {
    width: 50%;
    border-radius: 12px 0 0 12px;
  }

  .user_input_eara {
    width: 100%;
    padding: 20px 25px;
  }

  .user_input_eara>h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .login_lable:first-child {
    margin: 10px 0;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }

  .user_input_eara>form>[name='button'] {
    float: right;
  }
}

@media only screen and (max-width: 755px) {

  .login_conten_box {
    width: 90%;
  }

  .login_img {
    display: none;
  }

  .user_input_eara {
    flex: 1;
    padding: 20px 25px;
  }

  .user_input_eara>h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .login_lable:first-child {
    margin: 10px 0;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }
}

.btnmenu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}</style>

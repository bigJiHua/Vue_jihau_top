<template>
  <div>
    <HeaderM></HeaderM>
    <div class="container">
      <div class="login_conten_box">
        <img class="login_img" src="https://jihau.top/api/public/uploads/undraw_Login_re_4vu2.png" />
        <div class="user_input_eara">
          <h2>登录 <small>Login</small></h2>
          <form class="form-horizontal">
            <label for="al_title" class="login_lable"> 用户名:</label>
            <input type="text" v-model="username" class="form-control login_input" placeholder="请输入用户名" require />
            <label for="al_title" class="login_lable"> 密码:</label>
            <input type="password" class="form-control login_input" placeholder="请输入密码" required v-model="password"
              @keydown.enter="login" />
          </form>
          <div class="btnmenu">
            <button @click="register" class="res-btn">注册</button>
            <van-button loading type="primary" loading-text="登录中..." v-show="loading" />
            <button @click="login" v-show="!loading" class="res-btn">登录</button>
          </div>
        </div>
      </div>
      <van-popup v-model="show" round class="popup">{{ msg }}</van-popup>
    </div>
  </div>
</template>

<script>
import PostLogin from '../api/Ctrl_menuAPI/LoginAPI'

export default {
  data () {
    return {
      username: 'JiHua',
      password: '58239641ok.com',
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
          rule: /^\S/,
          msg: '密码不能为空!且长度为6-12位'
        }
      }
    }
  },
  methods: {
    async login () {
      // 验证是否已经拥有token 输入的用户名是否合法 输入的密码是否合法
      if (!localStorage.getItem('token')) {
        // 验证
        if (this.validata('username') && this.validata('password')) {
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
            localStorage.setItem('Username', res.data.Users.username)
            localStorage.setItem('Useridentity', res.data.Users.useridentity)
            this.$store.commit('cagUserData', res.data)
            const timer = setInterval(() => {
              this.msg = res.message
            }, 100)
            setTimeout(() => {
              clearInterval(timer)
              this.show = false
              this.loading = false
              localStorage.removeItem('VerCode')
              this.$router.push('/CtrlView')
            }, this.setTime)
          } else {
            this.showPopup(res.message)
          }
        }
      } else {
        this.showPopup('已经登录啦！请勿重复提交表单！')
        setTimeout(() => {
          this.$router.push('/CtrlView/Users')
        }, 800)
      }
    },
    register () {
      if (localStorage.getItem('token')) {
        this.showPopup('已经登录啦！')
        this.$router.push('/CtrlView/Users')
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
    }
  },
  name: 'LoginPage'
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

@media only screen and (min-width: 755px) {
  .login_conten_box {
    background-color: rgba(244, 244, 244, 0.4);
    width: 55vw;
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    background-color: rgba(244, 244, 244, 0.4);
    width: 80vw;
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    margin: 15vh auto;
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

.res-btn {
  padding: 10px 15px;
  border: 0;
  border-radius: 8px;
}
</style>

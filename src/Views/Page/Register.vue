<template>
  <div>
    <HeaderM></HeaderM>
    <div id="logonCon" class="container">
      <div class="login_conten_box">
        <div class="user_input_eara">
          <h2>注册 <small>Register</small></h2>
          <p class="newuser">用户名:<small class="wran">⚠必填</small></p>
          <input type="text" v-model="newUser.username" class="form-control login_input" placeholder="请输入用户名 (6-12位且唯一)"
            required />
          <p class="newuser">密码:<small class="wran">⚠必填</small></p>
          <input type="password" class="form-control login_input" placeholder="请输入密码 (6-12位)" required
            v-model="newUser.password" />
          <p class="newuser">确认密码:<small class="wran">⚠必填</small></p>
          <input type="password" class="form-control login_input" placeholder="请输重新输入确认密码" required
            v-model="elsepassword" />
          <p class="newuser">邮箱:<small class="wran">⚠必填</small></p>
          <input type="email" class="form-control login_input" placeholder="请输入你的邮箱" required v-model="newUser.email" />
          <div class="btnmenu">
            <button @click="comeback" class="res-btn">返回</button>
            <van-button loading type="primary" loading-text="注册中..." v-show="loading" />
            <button @click="newuser" v-show="!loading" class="res-btn">注册</button>
          </div>
        </div>
      </div>
      <van-popup v-model="show" round class="popup">{{ msg }}</van-popup>
    </div>
  </div>
</template>

<script>
import PostNewUser from '@/API/Ctrl_menuAPI/UserData'
export default {
  data () {
    return {
      loading: false,
      showup: false,
      show: false,
      msg: '',
      elsepassword: '',
      newUser: {
        username: '',
        password: '',
        email: ''
      },
      rules: {
        username: {
          rule: /^\w{6,12}$/,
          msg: '用户名必须为字母开头6-12位'
        },
        password: {
          rule: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
          msg: '密码不能位空,必须为8-16位非空、非纯字符密码'
        },
        email: {
          rule: /^\w+@\w+\.\w+$/g,
          msg: '邮箱格式错误'
        }
      }
    }
  },
  methods: {
    async newuser () {
      // 异步操作，设置loading为true
      this.loading = true
      // 如果用户名、密码、邮箱都有值，判断密码是否一致
      if (this.validata('username')) {
        if (this.validata('password')) {
          if (this.newUser.password === this.elsepassword) {
            if (this.validata('email')) {
              // 发送post请求，更新用户信息
              const { data: res } = await PostNewUser.UpnewUser(this.newUser)
              // 设置定时器，每100ms更新一次
              const timer = setInterval(() => {
                this.show = true
                this.msg = res.message
              }, 100)
              // 设置定时器，每2秒更新一次
              setTimeout(() => {
                this.loading = false
                clearInterval(timer)
                this.show = false
                this.loading = false
                // 如果响应状态码为200，则跳转到登录页面
                if (res.status === 200) {
                  this.$router.push('/Login')
                // 如果响应状态码不为202，则设置验证码，跳转到检查验证码页面
                } else if (res.status !== 202) {
                  localStorage.setItem('VerCode', res.data.code)
                  localStorage.setItem('Username', res.data.user)
                  this.$router.push(`/checkVer/?code=${res.data.code}&user=${res.data.user}`)
                }
              }, 2000)
            }
          } else this.showPopup('两次密码不一致，请检查')
        }
      }
    },
    validata (key) {
      let bool = true
      if (!this.rules[key].rule.test(this.newUser[key])) {
        this.showPopup(this.rules[key].msg)
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
      }, 2000)
    },
    comeback () {
      this.$dialog
        .confirm({
          message: '放弃注册吗？'
        })
        .then(() => {
          this.$router.back()
        })
        .catch(() => {
        })
    }
  },
  name: 'RegisterPage'
}
</script>

<style scoped>
#logonCon {
}

@media only screen and (min-width: 755px) {
  .login_conten_box {
    width: 60vw;
    background-color: rgba(244, 244, 244, 0.4);
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .user_input_eara {
    padding: 20px 25px;
    width: 100%;
  }

  .user_input_eara>h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .newuser:first-child {
    margin: 10px 0;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }

  .user_input_eara>form>[name='button'] {
    float: right;
  }

  .select_city {
    width: 8vw;
  }

  .fileup {
    width: 100%;
    height: 70%;
  }
}

@media only screen and (max-width: 755px) {
  .login_conten_box {
    width: 80vw;
    background-color: rgba(244, 244, 244, 0.4);
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    position: absolute;
    top:45vh;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .user_input_eara {
    height: 100%;
    padding: 10px 25px;
  }

  .user_input_eara>h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }

  .select_city,
  .select {
    width: 35vw;
  }

  .fileup {
    width: 100%;
    height: 70%;
  }
}

.newuser {
  color: #0049c7;
  font-size: 2rem;
  font-weight: bolder;
}

.wran {
  color: red;
  font-size: 0.8rem;
}

.btnmenu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.selectsex {
  margin: 0 20px 0 20px;
}

.selectcity {
  display: flex;
}

.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.cagarea {
  width: 60vw;
  height: 45vh;
  background-color: #fff;
  text-align: center;
  border-radius: 12px;
}

.res-btn {
  padding: 10px 15px;
  border: 0;
  border-radius: 8px;
}
</style>

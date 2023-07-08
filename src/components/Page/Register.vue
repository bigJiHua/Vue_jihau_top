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
          <p class="newuser">生日:</p>
          <input type="date" class="select" v-model="newUser.birthday" />
          <p class="newuser">性别:</p>
          <p>
            <label class="radio-inline selectsex">
              <input type="radio" name="sex" value="男" v-model="newUser.sex" />男
            </label>
            <label class="radio-inline selectsex">
              <input type="radio" name="sex" value="女" v-model="newUser.sex" />女
            </label>
          </p>
          <p class="newuser">城市:</p>
          <p class="selectcity">
            <input class="form-control select_city" v-model="newUser.city" placeholder="输入或者右方选择" />
            <select name="" class="form-control select_city" v-model="newUser.city">
              <option v-for="(item, index) in city" :key="index">
                {{ item }}
              </option>
            </select>
          </p>
          <p class="newuser">个性签名:</p>
          <textarea class="usercontent form-control" v-model="newUser.user_content" maxlength="255"></textarea>
          <p class="newuser" @click="up_pic">头像</p>
          <van-button @click="up_pic">上传头像</van-button>
          <van-overlay :show="showup" @click="showup = false">
            <div class="wrapper" @click.stop>
              <div class="cagarea">
                <h1>上传头像</h1>
                <input type="file" accept="image/*" ref="imgfile" class="fileup" @click="up_pic" />
                <van-button @click="
                up_pic">确认上传头像</van-button>
              </div>
            </div>
          </van-overlay>
          <div class="btnmenu">
            <button @click="comback" class="res-btn">返回</button>
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
import PostNewUser from '../api/Ctrl_menuAPI/UserData'
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
        email: '',
        birthday: '',
        sex: '',
        city: '',
        user_content: '',
        user_pic: ''
      },
      city: [
        '北京',
        '上海',
        '天津',
        '重庆',
        '深圳',
        '武汉',
        '长沙'
      ],
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
    up_pic () {
      this.showup = !this.showup
      const picfile = this.$refs.imgfile
      const _this = this
      picfile.addEventListener(
        'change',
        function () {
          // 当没选中图片时，清除预览
          if (this.files.length === 0) {
            _this.newUser.user_pic = ''
            return
          }
          // 实例化一个FileReader
          const reader = new FileReader()
          reader.onload = function (e) {
            _this.newUser.user_pic = e.target.result
            _this.$toast({
              message: '上传成功',
              position: 'top'
            })
          }
          reader.readAsDataURL(this.files[0])
        },
        false
      )
    },
    async newuser () {
      this.loading = !this.loading
      if (this.validata('username')) {
        if (this.validata('password')) {
          if (this.newUser.password === this.elsepassword) {
            if (this.validata('email')) {
              const { data: res } = await PostNewUser.UpnewUser(this.newUser)
              const timer = setInterval(() => {
                this.show = true
                this.msg = res.message
              }, 100)
              setTimeout(() => {
                clearInterval(timer)
                this.show = false
                this.loading = false
                if (res.status === 200) {
                  this.$router.push('/Login')
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
    comback () {
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
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100%;
  overflow: scroll;
}

@media only screen and (min-width: 755px) {
  .login_conten_box {
    margin: 20vh auto;
    width: 60vw;
    background-color: rgba(244, 244, 244, 0.4);
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
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
    margin: 10px 20px;
    min-height: 1000px;
    background-color: rgba(244, 244, 244, 0.4);
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
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

<template>
  <div id="logonCon" class="container">
    <div class="login_conten_box">
      <img
        class="login_img"
        :src="pic"
      />
      <div class="user_input_eara">
        <h2>注册 <small>Register</small></h2>
          <p class="newuser"> 用户名:<small class="wran">⚠必填</small></p>
          <input
            type="text"
            v-model="newUser.username"
            class="form-control login_input"
            placeholder="请输入用户名 (3-12位且唯一)"
            required
          />
          <p class="newuser"> 密码:<small class="wran">⚠必填</small></p>
          <input
            type="password"
            class="form-control login_input"
            placeholder="请输入密码 (6-12位)"
            required
            v-model="newUser.password"
          />
          <p class="newuser"> 确认密码:<small class="wran">⚠必填</small></p>
          <input
            type="password"
            class="form-control login_input"
            placeholder="请输重新输入确认密码"
            required
            v-model="elsepassword"
          />
          <p class="newuser"> 邮箱:<small class="wran">⚠必填</small></p>
          <input
            type="email"
            class="form-control login_input"
            placeholder="请输入你的邮箱"
            required
            v-model="newUser.email"
          />
          <p class="newuser">生日:</p>
          <input type="date" value="" v-model="newUser.birthday">
          <p class="newuser"> 性别:</p>
          <p>
            <label class="radio-inline selectsex">
              <input
                type="radio"
                name="sex"
                value="男"
                v-model="newUser.sex"
              />男
            </label>
            <label class="radio-inline selectsex">
              <input
                type="radio"
                name="sex"
                value="女"
                v-model="newUser.sex"
              />女
            </label>
          </p>
          <p  class="newuser"> 城市:</p>
          <p class="selectcity">
            <input class="form-control select_city" v-model="newUser.city" placeholder="输入或者右方选择"/>
            <select
              name=""
              class="form-control select_city"
              v-model="newUser.city"
            >
              <option v-for="(item, index) in city" :key="index">
                {{ item }}
              </option>
            </select>
          </p>
          <p class="newuser"> 个性签名:</p>
          <textarea
            class="usercontent form-control"
            v-model="newUser.user_content"
            maxlength="255"
          ></textarea>
          <p class="newuser">头像</p>
          <van-button @click="up_pic">上传头像</van-button>
          <van-overlay :show="showup" @click="showup = false">
            <div class="wrapper" @click.stop>
              <div class="cagarea">
                <h1>上传头像</h1>
                <input
                  type="file"
                  accept="image/*"
                  ref="imgfile"
                  class="fileup"
                  @click="up_pic"
                />
                <van-button @click="up_pic">确认上传头像</van-button>
              </div>
            </div>
          </van-overlay>
        <div class="btnmenu">
          <van-button @click="newuser" v-show="!loading">注册</van-button>
          <van-button
            loading
            type="primary"
            loading-text="注册中..."
            v-show="loading"
          />
          <van-button @click="comback">返回</van-button>
        </div>
      </div>
    </div>
    <van-popup v-model="show" round class="popup">{{ msg }}</van-popup>
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
      pic: 'http://127.0.0.1/uploads/undraw_Login_re_4vu2.png',
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
        '长沙',
        '台湾',
        '香港',
        '澳门'
      ],
      rules: {
        username: {
          rule: /^\w{6,12}$/,
          msg: '用户名必须为字母开头6-12位'
        },
        password: {
          rule: /^\w{6,12}$/,
          msg: '密码不能位空，且要求为6-12位'
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
            _this.pic = e.target.result
            console.log(_this.pic)
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
                this.$router.push('/Login')
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
      this.$router.back()
    }
  },
  name: 'RegisterPage'
}
</script>

<style scoped>
#logonCon {
  width: 100%;
  background-image: linear-gradient(
    to right top,
    #caf8ec,
    #94e1e2,
    #5ac7df,
    #18acdf,
    #008dd9,
    #5f80dd,
    #966dd3,
    #c254b9,
    #ff5495,
    #ff7468,
    #ffa63c,
    #f6d92a
  );
}
* {
  margin: 0;
  padding: 0;
}

.login_conten_box {
  margin: 20vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (min-width: 755px) {
  .login_conten_box {
    background-color: rgba(244, 244, 244, 0.4);
    width: 55vw;
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
  }

  .login_img {
    width: 50%;
    border-radius: 12px 0 0 12px;
  }

  .user_input_eara {
    width: 50%;
    padding: 20px 25px;
  }

  .user_input_eara > h2 {
    margin-bottom: 15px;
    font-weight: bolder;
    color: rgb(240, 239, 244);
  }

  .newuser:first-child {
    margin: 10px 0;
  }

  .login_input {
    margin: 5px 0 20px 0;
  }

  .user_input_eara > form > [name='button'] {
    float: right;
  }
}

@media only screen and (max-width: 755px) {
  .login_conten_box {
    background-color: rgba(244, 244, 244, 0.4);
    width: 80vw;
    border-radius: 12px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  }
  .login_img {
    display: none;
  }
  .user_input_eara {
    flex: 1;
    padding: 20px 25px;
  }

  .user_input_eara > h2 {
    margin-bottom: 15px;
    font-weight: bolder;
    color: rgb(240, 239, 244);
  }
  .login_input {
    margin: 5px 0 20px 0;
  }
}
.newuser{
  color: #0049c7;
  font-size: 2rem;
  font-weight: bolder;
}
.wran{
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
.select_city {
  width: 8vw;
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
.fileup {
  width: 100%;
  height: 70%;
  border: 136px rgba(0, 45, 207, 0.8) ridge;
}
</style>

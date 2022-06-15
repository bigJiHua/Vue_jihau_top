<template>
  <div id="" class="Users">
      <div class="col-md-2">
        <ul id="myTab" class="nav">
          <li class="active nav-tabs">
            <a href="#User" data-toggle="tab">基本信息</a>
          </li>
          <li class="nav-tabs">
            <a href="#cagUsers" data-toggle="tab">修改信息</a>
          </li>
        </ul>
      </div>
      <div class="col-md-10">
        <div id="myTabContent" class="tab-content">
          <div class="tab-pane fade in active" id="User">
            <p><span class="userheader">名字:</span><span class="userdata">{{Users.username}}</span></p>
            <p><span class="userheader">身份:</span><span class="userdata">{{Users.useridentity}}</span></p>
            <p><span class="userheader">用户名:</span><span class="userdata">{{Users.nickname}}</span></p>
            <p><span class="userheader">生日:</span><span class="userdata">{{Users.birthday}}</span></p>
            <p><span class="userheader">城市:</span><span class="userdata">{{Users.city}}</span></p>
            <p><span class="userheader">性别:</span><span class="userdata">{{Users.sex}}</span></p>
            <p><span class="userheader">邮箱:</span><span class="userdata">{{Users.email}}</span></p>
            <p class="usercontent"><span class="userheader">个性签名:</span><span class="userdata">{{Users.user_content}}</span></p>
            <div class="userpic">
                <img :src="Users.user_pic" alt="头像"  class="pic" v-show="Users.user_pic">
            </div>
          </div>
          <div class="tab-pane" id="cagUsers">
            <p><span class="userheader">名字:</span>  <span class="userdata">{{cagUser.username}}</span></p>
            <p><span class="userheader">身份:</span>  <span class="userdata">{{cagUser.useridentity}}</span></p>
            <p><span class="userheader">用户名:</span><input class="userdata" v-model="cagUser.nickname" @keyup.enter="cagdata"></p>
            <p><span class="userheader">生日:</span> <input type="date" value="" v-model="cagUser.birthday"></p>
            <p><span class="userheader">城市:</span>
            <input class="userdata" v-model="cagUser.city">
            <select name="" class="form-control" v-model="cagUser.city">
              <option v-for="(item,index) in city" :key="index">{{item}}</option>
            </select>
            </p>
            <p><span class="userheader">性别:</span>
            <label class="radio-inline">
              <input type="radio" name="sex" value="男" v-model="cagUser.sex" />男
            </label>
            <label class="radio-inline">
              <input type="radio" name="sex" value="女" v-model="cagUser.sex" />女
            </label>
            </p>
            <p><span class="userheader">邮箱:</span>  <input class="userdata" v-model="cagUser.email" type="email"   @keyup.enter="cagdata"></p>
            <p><span class="userheader">个性签名:</span><br><textarea class="usercontent" :value="cagUser.user_content" maxlength="255"></textarea></p>
            <van-button type="primary" @click="cagdata">提交更改</van-button>
            &nbsp;&nbsp;&nbsp;
            <van-button type="danger">取消更改</van-button>
            <div class="userpic">
                <img :src="cagUser.user_pic" alt="头像"  class="pic" v-show="Users.user_pic" >
            </div>
            <button class="cagpic" @click="cag_pic">更换头像</button>
          </div>
        </div>
      </div>
    <!-- <van-popup v-model="show" round class="popup">{{ msg }}</van-popup> -->
    <van-overlay :show="showup" @click="showup = false">
      <div class="wrapper" @click.stop>
        <div class="cagarea">
          <h1>上传头像</h1>
          <input type="file" accept="image/*" ref="imgfile">
          <van-button @click="cag_pic">确认修改头像</van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import GetUData from '@/components/api/UserData'

export default {
  props: [],
  data () {
    return {
      Users: [],
      cagUser: [],
      msg: '',
      show: false,
      showup: false,
      city: ['北京', '上海', '天津', '重庆', '深圳', '武汉', '长沙', '台湾', '香港', '澳门']
    }
  },
  // 生命周期初始化函数
  created () {
    this.getUsersdata()
  },
  method () {
  },
  methods: {
    getCookie (name) {
      const arr = document.cookie.match(
        new RegExp('(^|)' + name + '=([^;]*)(;|$)')
      )
      if (arr != null) return unescape(arr[2])
      return null
    },
    async getUsersdata () {
      const username = this.getCookie('Username')
      const { data: res } = await GetUData.GetUserData(username)
      this.Users = res.data
      this.cagUser = res.data
      this.showPopup(res.message)
    },
    cagdata () {
      console.log(this.cagUser)
    },
    cag_pic () {
      this.showup = !this.showup
      const picfile = this.$refs.imgfile
      const _this = this
      picfile.addEventListener('change', function () {
        // 当没选中图片时，清除预览
        if (this.files.length === 0) {
          _this.Users.user_pic = _this.cagUser.user_pic
          return
        }
        // 实例化一个FileReader
        const reader = new FileReader()
        reader.onload = function (e) {
          _this.cagUser.user_pic = e.target.result
        }
        reader.readAsDataURL(this.files[0])
      }, false)
    },
    showPopup (msg) {
      const timer = setInterval(() => {
        this.show = true
        this.msg = msg
      }, 100)
      setTimeout(() => {
        clearInterval(timer)
        this.show = false
      }, 1000)
    }
  },
  name: 'UsersM',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
#User,#cagUsers{
  position: relative;
  padding-top: 20px;
  >p>span{
    font-size: 2rem;
  }
  .userheader{
    display: inline-block;
    padding: 5px 10px;
    margin-right: 10px;
    width: 12rem;
  }
  .usercontent{
    background-color: rgba(220, 124, 124, 0.8);
    padding: 20px;
    border-radius: 12px;
  }
  .userpic{
    position: absolute;
    top: 0;
    right: 5vw;
    height: 100px;
    width: 100px;
    padding: 15px 10px;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgba(220, 220, 220, 0.8);
    .pic{
      width: 100%;
      height: 100%;
    }
  }
  .cagpic{
    position: absolute;
    height: 40px;
    width:  100px;
    border-radius: 12px;
    top: 100px;
    right: 5vw;
    background-color: rgba(220, 220, 220, 0.8);
    text-align: center;
    font-size: 1.5rem;
    font-weight: bolder;
  }
  .pic:hover .userheader{
    color: red;
  }
}
.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.cagarea {
  width: 60vw;
  height: 45vh;
  background-color: #fff;
}
</style>

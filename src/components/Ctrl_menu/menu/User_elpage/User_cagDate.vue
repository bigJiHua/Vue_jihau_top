<template>
  <div id="" class="UserselfArea">
    <div class="userpic" @click="cag_pic">
      <img :src="cagUser.user_pic" alt="头像" class="pic" />
    </div>
    <button class="cagpic" @click="cag_pic">更换头像</button>
    <p>
      <span class="userheader">名字:</span>
      <span class="userdata">{{ cagUser.username }}</span>
    </p>
    <p>
      <span class="userheader">身份:</span>
      <span class="userdata">{{ cagUser.useridentity }}</span>
    </p>
    <p class="selectcity">
      <span class="userheader">用户名:</span>
      <input
        class="userdata form-control"
        v-model="cagUser.nickname"
        @keyup.enter="cagdata"
      />
    </p>
    <p>
      <span class="userheader">生日:</span>
      <input type="date" value="" v-model="cagUser.birthday" />
    </p>
    <p class="selectcity">
      <span class="userheader">城市:</span>
      <input class="userdata form-control" v-model="cagUser.city" />
      <select name="" class="form-control select_city" v-model="cagUser.city">
        <option v-for="(item, index) in city" :key="index">{{ item }}</option>
      </select>
    </p>
    <p>
      <span class="userheader">性别:</span>
      <label class="radio-inline">
        <input type="radio" name="sex" value="男" v-model="cagUser.sex" />男
      </label>
      <label class="radio-inline">
        <input type="radio" name="sex" value="女" v-model="cagUser.sex" />女
      </label>
    </p>
    <p class="selectcity">
      <span class="userheader">邮箱:</span>
      <span>{{cagUser.email}}</span>
    </p>
    <p>
      <span class="userheader">个性签名:</span><br />
      <textarea
        class="usercontent form-control"
        v-model="cagUser.user_content"
        maxlength="255"
      ></textarea>
    </p>
    <van-button type="primary" @click="cagdata">提交更改</van-button>
    <van-overlay :show="showup" @click="showup = false">
      <div class="wrapper" @click.stop>
        <div class="cagarea">
          <h2>上传头像</h2>
          <input type="file" accept="image/*" ref="imgfile" class="fileup" />
          <h2>填写头像URL</h2>
          <input type="text" v-model="cagUser.user_pic" class="fileup-url" @keyup.enter="cagdata">
          <van-button @click="cagdata">确认修改头像</van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import GetUData from '@/components/api/Ctrl_menuAPI/UserData'
export default {
  props: ['Users'],
  data () {
    return {
      cagUser: this.Users,
      showup: false,
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
      ]
    }
  },
  created () {},
  method () {},
  methods: {
    async cagdata () {
      const data = this.cagUser
      const { data: res } = await GetUData.CagUserData(data)
      this.$toast({
        message: res.message,
        position: 'top'
      })
    },
    cag_pic () {
      this.showup = !this.showup
      const picfile = this.$refs.imgfile
      const _this = this
      picfile.addEventListener(
        'change',
        function () {
          const reader = new FileReader()
          reader.onload = function (e) {
            _this.cagUser.user_pic = e.target.result
          }
          reader.readAsDataURL(this.files[0])
        },
        false
      )
    }
  },
  // 监听器
  watch: {
    Users: function (value) {
      this.cagUser = value
    }
  },
  computed: {},
  filters: {},
  name: 'UsersCagData',
  components: {}
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .userheader {
    display: inline-block;
    padding: 5px 10px;
    margin-right: 10px;
    width: 12rem;
  }
  .usercontent {
    background-color: rgba(208, 224, 237, 0.4);
    padding: 20px;
    border-radius: 12px;
  }
  .userpic {
    position: absolute;
    top: 0;
    right: 5vw;
    height: 100px;
    width: 100px;
    padding: 15px 10px;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgba(220, 220, 220, 0.8);
    .pic {
      width: 100%;
      height: 100%;
    }
  }
  .cagpic {
    position: absolute;
    height: 40px;
    width: 100px;
    border-radius: 12px;
    top: 100px;
    right: 5vw;
    background-color: rgba(220, 220, 220, 0.8);
    text-align: center;
    font-size: 1.5rem;
    font-weight: bolder;
  }
  .pic:hover .userheader {
    color: red;
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
    .fileup {
      width: 100%;
      max-height: 280px;
      background-color: rgba(255, 255, 255, 0.8);
    }
    .fileup-url {
      width: 80%;
      height: 50px;
      margin: 15px;
      padding: 15px;
    }
  }
  .selectcity {
    display: inline-flex;
    width: 40rem;
  }
  .select_city {
    width: 12vw;
    height: 4rem;
  }
  .userdata {
    max-width: 15vw;
  }
}
@media only screen and (max-width: 755px) {
  .userheader {
    display: inline-block;
    padding: 5px 10px;
    width: 11rem;
  }
  .usercontent {
    background-color: rgba(220, 124, 124, 0.8);
    padding: 20px;
    border-radius: 12px;
  }
  .userpic {
    height: 100px;
    width: 100px;
    padding: 15px 10px;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgba(220, 220, 220, 0.8);
    .pic {
      width: 100%;
      height: 100%;
    }
  }
  .cagpic {
    height: 40px;
    width: 100px;
    border-radius: 12px;
    top: 100px;
    right: 5vw;
    background-color: rgba(220, 220, 220, 0.8);
    text-align: center;
    font-size: 1.5rem;
    font-weight: bolder;
  }
  .pic:hover .userheader {
    color: red;
  }
  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .cagarea {
    width: 80vw;
    height: 60vh;
    background-color: #fff;
    text-align: center;
    border-radius: 12px;
    padding: 15px;
    .fileup {
      width: 100%;
      height: 90px;
      background-color: rgba(255, 255, 255, 0.8);
      border: 2px black solid;
    }
    .fileup-url {
      width: 90%;
      height: 50px;
      margin: 15px;
      padding: 15px;
    }
  }
  .selectcity {
    display: inline-flex;
  }
  .select_city {
    width: 19vw;
    height: 4rem;
  }
  .userdata {
    max-width: 22vw;
  }
}
</style>

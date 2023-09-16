<template>
  <div id="" class="UserselfArea">
    <div class="userpic" @click="cag_pic">
      <img :src="cagUser.user_pic" alt="头像" class="pic" />
    </div>
    <button class="cagpic" @click="cag_pic">更换头像</button>
    <p class="cagDataP">
      <span class="userheader">用户名:</span>
      <span class="userdata">{{ cagUser.username }}</span>
    </p>
    <p class="cagDataP">
      <span class="userheader">UID:</span>
      <span class="userdata">{{ cagUser.user_id }}</span>
    </p>
    <p class="cagDataP">
      <span class="userheader">身份:</span>
      <span class="userdata">{{ cagUser.useridentity }}</span>
    </p>
    <p class="cagDataP">
      <span class="userheader">生日:</span>
      <input type="date" value="" v-model="cagUser.birthday" />
      <van-button plain hairline type="info" size="mini" class="cagDataBtn" @click="cagdata('bir')">变更</van-button>
    </p>
    <p class="selectcity">
      <span class="userheader">城市:</span>
      <input class="select_city form-control" v-model="cagUser.city" />
      <select name="" class="form-control select_city" v-model="cagUser.city">
        <option v-for="(item, index) in city" :key="index">{{ item }}</option>
      </select>
      <van-button plain hairline type="info" size="mini" class="cagDataBtn" @click="cagdata('city')">变更</van-button>
    </p>
    <p class="cagDataP">
      <span class="userheader">性别:</span>
      <label class="radio-inline">
        <input type="radio" name="sex" value="男" v-model="cagUser.sex" />男
      </label>
      <label class="radio-inline">
        <input type="radio" name="sex" value="女" v-model="cagUser.sex" />女
      </label>
      <van-button plain hairline type="info" size="mini" class="cagDataBtn" @click="cagdata('sex')">变更</van-button>
    </p>
    <p class="cagDataP">
      <span class="userheader">邮箱:</span>
      <span>{{ cagUser.email }}</span>
    </p>
    <p>
      <span class="userheader">个性签名:</span><br />
      <textarea class="usercontent form-control" v-model="cagUser.user_content" maxlength="255"></textarea>
    </p>
    <van-button type="primary" @click="cagdata('cont')">提交更改</van-button>
    <!-- 用户上传头像区域 -->
    <van-overlay :show="showup" @click="showup = false">
      <div class="wrapper" @click.stop>
        <div class="cagarea">
          <div class="mb-3">
            <label for="formFile" class="form-label">上传头像</label>
            <input class="form-control fileup" type="file" accept="image/*" ref="imgfile" />
          </div>
          <h2>填写头像URL</h2>
          <input type="text" v-model="cagUser.user_pic" class="fileup-url" @keyup.enter="cagdata">
          <van-button @click="cagdata('img')">确认修改头像</van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import GetUData from '@/API/Ctrl_menuAPI/UserData'
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
  created () { },
  method () { },
  methods: {
    async cagdata (type) {
      // 获取用户信息
      const data = {}
      const userId = this.cagUser.user_id
      switch (type) {
        case 'img':
          data.user_pic = this.cagUser.user_pic
          break
        case 'bir':
          data.birthday = this.cagUser.birthday
          break
        case 'sex':
          data.sex = this.cagUser.sex
          break
        case 'city':
          data.city = this.cagUser.city
          break
        case 'cont':
          data.user_content = this.cagUser.user_content
          break
        default:
          break
      }
      // 调用GetUData.CagUserData方法获取用户信息
      const { data: res } = await GetUData.CagUserData(userId, data)
      // 显示用户信息
      this.$toast({
        message: res.message,
        position: 'top'
      })
    },
    // 图片上传
    cag_pic () {
      // 是否显示图片
      this.showup = !this.showup
      // 获取图片文件
      const picfile = this.$refs.imgfile
      // 定义_this
      const _this = this
      // 监听图片文件的change事件
      picfile.addEventListener(
        'change',
        function () {
          // 定义文件读取器
          const reader = new FileReader()
          // 监听文件读取器的onload事件
          reader.onload = function (e) {
            // 设置用户头像
            _this.cagUser.user_pic = e.target.result
          }
          // 读取文件
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
    background-color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 10px;

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
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 57%;
  }

  .select_city {
    width: 20%;
  }

  .userdata {
    max-width: 15vw;
  }

  .cagDataP {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: space-between;
    justify-content: space-between;
    align-items: center;
    width: 29%;
  }
}

@media only screen and (max-width: 755px) {
  .userheader {
    display: inline-block;
    padding: 5px 10px;
    width: 11rem;
  }

  .usercontent {
    background-color: rgba(208, 224, 237, 0.4);
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
    background-color: #fff;
    text-align: center;
    border-radius: 5px;
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
    width: 20%;
  }

  .userdata {
    max-width: 22vw;
  }

  .cagDataP {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: space-between;
    justify-content: flex-start;
    align-items: center;
  }

.cagDataBtn {
  margin-left: 15px;
}
}
</style>

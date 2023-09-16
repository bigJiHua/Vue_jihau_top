<template>
  <div>
    <div class="mask" @click="toge"></div>
    <div class="cagArea">
      <p class="title">正在更改 {{ cagUser.username }} 的用户信息</p>
      <div class="close" @click="toge">
        <i class="glyphicon glyphicon-remove"></i>
      </div>
      <div class="cag">
        <div class="userpic">
          <img :src="cagUser.user_pic" alt="头像" class="pic" />
        </div>
        <p>
          <span class="userheader">用户名:</span>
          <input class="userdata form-control" v-model="cagUser.username" @keyup.enter="cagdata" />
        </p>
        <p>
          <span class="userheader">身份:</span>
          <span>{{ cagUser.useridentity }}</span>
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
          <input class="userdata form-control" v-model="cagUser.email" type="email" @keyup.enter="cagdata" />
        </p>
        <p>
          <span class="userheader">个性签名:</span><br />
          <textarea class="usercontent form-control" v-model="cagUser.user_content" maxlength="255"></textarea>
        </p>
        <van-button type="primary" @click="cagdata">提交更改</van-button>
        &nbsp;&nbsp;&nbsp;
        <van-button type="danger" @click="delUser(cagUser.username, cagUser.useridentity, cagUser.state)">注销用户</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import GetUData from '@/API/Ctrl_menuAPI/UserData'
export default {
  props: {
    user: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      cagUser: this.user,
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
  methods: {
    async delUser (deluser, useridentity, state) {
      if (Number(state) !== 0) {
        return this.$toast({
          message: '该账户已注销！无法进行操作',
          position: 'top'
        })
      }
      if (localStorage.getItem('Useridentity') === 'manager') {
        if (useridentity !== 'manager') {
          const user = localStorage.getItem('Username')
          const { data: res } = await GetUData.DelUser(user, deluser)
          this.$toast({
            message: res.message,
            position: 'top'
          })
        } else {
          this.$toast({
            message: '无法注销管理员账号',
            position: 'top'
          })
        }
      } else {
        this.$toast({
          message: '您不是管理员无法进行此操作',
          position: 'top'
        })
      }
    },
    async cagdata () {
      if (this.cagUser.username !== localStorage.getItem('Username')) {
        const data = this.cagUser
        const { data: res } = await GetUData.CagUserData(data)
        this.$toast({
          message: res.message,
          position: 'top'
        })
      } else {
        this.$toast({
          message: '您不能在这里修改自己的用户信息',
          position: 'top'
        })
      }
    },
    toge () {
      this.$emit('toge', false)
    }
  },
  name: 'cagUserData'
}
</script>

<style lang="less" scoped>
.cagArea {
  position: relative;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (min-width: 755px) {
  .cagArea {
    width: 60vw;
    height: 60vh;
    position: absolute;
    top: 45%;
    left: 43%;
    transform: translate(-50%, -50%);
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    color: rgba(9, 52, 178, 0.648);
    padding: 20px;
    overflow: scroll;
    border: 2px black solid;

    .title {
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
    }

    .cag {
      width: 100%;
      height: 100%;
      padding: 0 20px;
    }

    .userheader {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  .userpic {
    width: 80px;
    height: 80px;

    .pic {
      width: 100%;
      height: 100%;
    }
  }

  .close {
    position: absolute;
    top: 15px;
    right: 35px;
  }
}

@media only screen and (max-width: 755px) {
  .cagArea {
    width: 100vw;
    height: 60vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 1000;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    color: rgba(9, 52, 178, 0.648);
    padding: 20px;
    overflow: scroll;

    .title {
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
    }

    .cag {
      width: 100%;
      height: 100%;
      padding: 0 20px;
    }

    .userheader {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  .userpic {
    width: 80px;
    height: 80px;

    .pic {
      width: 100%;
      height: 100%;
    }
  }

  .close {
    position: absolute;
    top: 15px;
    right: 35px;
  }
}
</style>

<template>
  <div>
    <HeaderM></HeaderM>
    <div id="" class="CheckBox">
      <h1 v-if="user">正在激活{{ user }}账户 ...</h1>
      <div v-else class="subCodeBox">
        <h1>输入验证码以激活您的账户</h1>
        <div class="inputBox">
          <div>
            <label for="user">用户名</label>
            <input type="text" v-model="data.user" id="user" />
          </div>
          <div>
            <label for="code">验证码</label>
            <input type="text" v-model="data.code" id="code" />
          </div>
          <div class="subBtn">
            <router-link to="/Login"><van-button>登录</van-button></router-link>
            <van-button @click="subCheckCode">验证</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkMail from '@/API/Email/Email'

export default {
  props: [],
  data () {
    return {
      user: 0,
      data: {
        code: '',
        user: ''
      }
    }
  },
  created () {
    this.CheckCode(this.$route.query)
  },
  methods: {
    async CheckCode (SendArry) {
      this.user = SendArry.user
      const data = {
        code: SendArry.code,
        user: SendArry.user
      }
      if (SendArry.code !== undefined && SendArry.user !== undefined) {
        const { data: res } = await checkMail.checkVer(data)
        if (res.status === 200) {
          setTimeout(() => {
            this.$router.push('/Login')
          }, 2000)
        }
      } else {
        this.$toast({
          message: '输入内容不能为空',
          position: 'top'
        })
      }
    },
    async subCheckCode () {
      if (this.data.code !== undefined && this.data.user !== undefined) {
        const { data: res } = await checkMail.checkVer(this.data)
        if (res.status === 200) {
          setTimeout(() => {
            this.$router.push('/Login')
          }, 2000)
        }
      } else {
        this.$toast({
          message: '输入内容不能为空',
          position: 'top'
        })
      }
    }
  },
  name: 'checkVer'
}
</script>

<style lang="less" scoped>
.CheckBox {
  padding: 50px;
  background-color: rgba(240, 240, 240, 0.8);
  height: calc(100vh - 55px);
}

.subCodeBox {
  text-align: center;
}

.inputBox {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;

  div>label {
    display: block;
    width: 5rem;
    margin-right: 20px;
  }

  div>input {
    padding: 5px;
    border-radius: 5px;
  }

  .subBtn {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}</style>

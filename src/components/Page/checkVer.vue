<template>
  <div id="" class="CheckBox">
    <h1 v-if="user">正在激活{{ user }}账户 ...</h1>
    <div v-else class="subCodeBox">
      <h1>输入验证码以激活您的账户</h1>
      <div>
        <label for="code">验证码</label>
        <input type="text" v-model="data.code" id="code" />
      </div>
      <div>
        <label for="user">用户名</label>
        <input type="text" v-model="data.user" id="user" />
      </div>
      <div class="subBtn">
        <van-button><router-link to="/Login">登录</router-link></van-button>
        <van-button @click="subCheckCode">验证</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import checkMail from '@/components/api/Email/Email'

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
          this.$toast({
            message: res.message,
            position: 'top'
          })
        } else {
          this.$toast({
            message: res.message,
            position: 'top'
          })
        }
        setTimeout(() => {
          this.$router.push('/Login')
        }, 2000)
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
          this.$toast({
            message: res.message,
            position: 'top'
          })
        } else {
          this.$toast({
            message: res.message,
            position: 'top'
          })
        }
        setTimeout(() => {
          this.$router.push('/Login')
        }, 2000)
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
}
.subCodeBox {
  text-align: center;
  > div {
    margin: 0 auto;
    display: flex;
    margin-top: 25px;
  }
  div > label {
    display: block;
    width: 5rem;
    margin-right: 20px;
  }
  div > input {
    padding: 5px;
    border-radius: 5px;
  }
  .subBtn {
    button {
      margin-left: 20vw;
    }
  }
}
</style>

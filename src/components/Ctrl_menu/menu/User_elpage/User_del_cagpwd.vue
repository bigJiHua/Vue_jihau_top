<template>
  <div id="" class="">
    <div class="deluser">
      <div class="cagpwd">
        <label for="oldpwd">旧密码</label>
        <input type="password" id="oldpwd" v-model="oldpwd" class="form-control" @input="checkpwd">
        <label for="newpwd">新密码</label>
        <input type="password" id="newpwd" v-model="newpwd" class="form-control">
        <van-button>确认修改</van-button>
      </div>
      <van-button type="danger" @click="delUser">注销用户</van-button>
      &nbsp;&nbsp;&nbsp;
      <small style="color: red"
        >⚠注销后 你的数据并不会马上删除， 可以在登录页面申请找回账号
      </small>
    </div>
  </div>
</template>

<script>
import GetUData from '@/components/api/Ctrl_menuAPI/UserData'
export default {
  props: ['Users'],
  data () {
    return {
      newpwd: '',
      oldpwd: '',
      n: 0
    }
  },
  methods: {
    async delUser () {
      const user = this.Users.username
      const deluser = localStorage.getItem('Username')
      if (user !== undefined && deluser !== undefined) {
        const condel = confirm('确认注销该账户吗？')
        if (condel) {
          if (localStorage.getItem('Useridentity') === '管理员') {
            const condel = confirm('确认注销你的管理员账户吗？')
            if (condel) {
              const { data: res } = await GetUData.DelUser(user, deluser)
              this.$toast({
                message: res.message,
                position: 'top'
              })
              localStorage.removeItem('token')
              localStorage.removeItem('Username')
              localStorage.removeItem('Useridentity')
              location.reload()
            }
          } else {
            const { data: res } = await GetUData.DelUser(user, deluser)
            this.$toast({
              message: res.message,
              position: 'top'
            })
            localStorage.removeItem('token')
            localStorage.removeItem('Username')
            localStorage.removeItem('Useridentity')
            location.reload()
          }
        }
      } else {
        alert('无法获取用户名，请刷新页面后再试')
      }
    },
    async cagpwd () {
      const { data: res } = await GetUData.CagPassword()
      this.$toast({
        message: res.message,
        position: 'top'
      })
    },
    checkpwd () {
      // TODO 修改密码
      this.n += 1
      setTimeout(() => {
        console.log(this.n)
      }, 5000)
    }
  },
  // 监听器
  watch: {},
  computed: {},
  filters: {},
  name: 'UserdelCagpwd',
  components: {
  }
}
</script>

<style lang="less" scoped>
.colpwd{
  margin-bottom: 20px;
}
#oldpwd,#newpwd{
  width: 20vw;
}
</style>

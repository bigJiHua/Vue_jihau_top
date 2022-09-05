<template>
  <div id="" class="">
    <div class="cagArea">
      <div class="cagpwd cagAreabox UserselfArea">
        <p for="oldpwd">旧密码</p>
        <input
          type="password"
          id="oldpwd"
          v-model.lazy="oldpwd"
          class="form-control"
        />
        <p for="newpwd">新密码</p>
        <input
          type="password"
          id="newpwd"
          v-model="newpwd"
          class="form-control"
        />
        <van-button @click="cagPwd">确认修改</van-button>
      </div>
      <div class="delUser cagAreabox">
        <van-button type="danger" @click="delUser">注销用户</van-button>
        <p style="color: red; margin-top: 10px">
          <small
            >⚠注销后 你的数据并不会马上删除， 可以在登录页面申请找回账号 (Beta)</small
          >
        </p>
      </div>
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
    async cagPwd () {
      if (this.oldpwd === '') {
        this.$toast({
          message: '旧密码不能为空!',
          position: 'top'
        })
      } else if (this.newpwd === '') {
        this.$toast({
          message: '新密码不能为空!',
          position: 'top'
        })
      } else {
        const { data: res } = await GetUData.CagPassword(
          this.oldpwd,
          this.newpwd
        )
        if (res.status === 200) {
          this.$toast({
            message: res.message,
            position: 'top'
          })
          localStorage.removeItem('token')
          localStorage.removeItem('Username')
          localStorage.removeItem('Useridentity')
          location.reload()
        } else {
          this.$toast({
            message: res.message,
            position: 'top'
          })
        }
      }
    }
  },
  // 监听器
  watch: {},
  computed: {},
  filters: {},
  name: 'UserdelCagpwd',
  components: {}
}
</script>

<style lang="less" scoped>
.cagpwd > input {
  display: block;
  margin-bottom: 15px;
}
.colpwd {
  margin-bottom: 20px;
}
#oldpwd,
#newpwd {
  width: 20vw;
}
.cagAreabox {
  margin-bottom: 25px;
}

@media only screen and (max-width: 755px) {
  #oldpwd,
  #newpwd {
    width: 100%;
  }
}
</style>

<template>
  <div id="" class="Users">
    <ul id="myTab" class="nav">
      <li class="active nav-tabs">
        <a href="#User" data-toggle="tab">基本信息</a>
      </li>
      <li class="nav-tabs">
        <a href="#cagUsers" data-toggle="tab">修改信息</a>
      </li>
      <li class="nav-tabs">
        <a href="#cagpwd" data-toggle="tab">密码更改</a>
      </li>
    </ul>
    <div id="myTabContent" class="tab-content">
      <div class="tab-pane fade in active" id="User">
        <Userself :Users="this.Users"></Userself>
      </div>
      <div class="tab-pane" id="cagUsers">
        <UsercagDate :Users="this.Users"></UsercagDate>
      </div>
      <div class="tab-pane" id="cagpwd">
        <Userdelpwd :Users="this.Users"></Userdelpwd>
      </div>
    </div>
  </div>
</template>

<script>
import GetUData from '@/components/api/Ctrl_menuAPI/UserData'
import Userself from './User_elpage/User_self.vue'
import UsercagDate from './User_elpage/User_cagDate.vue'
import Userdelpwd from './User_elpage/User_del_cagpwd.vue'

export default {
  props: [],
  data () {
    return {
      Users: this.$store.state.Userdata,
      count: 0
    }
  },
  // 生命周期初始化函数
  created () {
    if (this.Users.length === 0) {
      this.getUsersdata()
    }
  },
  method () {
  },
  methods: {
    async getUsersdata () {
      const { data: res } = await GetUData.GetUserData()
      this.cagUser = res.data
      this.$store.commit('cagUserData', res.data)
      this.Users = this.$store.state.Userdata
      this.$toast({
        message: res.message,
        position: 'top'
      })
      if (res.status === 401) {
        this.getUsersdata()
        this.count += 1
        if (this.count >= 5) {
          alert('身份验证已过期，请重新登录')
          this.count = 0
          localStorage.removeItem('token')
          localStorage.removeItem('Username')
          localStorage.removeItem('Useridentity')
          location.reload()
        }
      }
    }
  },
  name: 'UsersM',
  components: {
    Userself,
    UsercagDate,
    Userdelpwd
  }
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  #User,#cagUsers{
    position: relative;
    padding-top: 20px;
    >p>span{
      font-size: 2rem;
    }
  }
  .Users{
    display: flex;
  }
  #myTab{
    min-width: 10vw;
    margin-right: 10px;
    text-align: center;
  }
  #myTabContent{
    padding: 15px;
    min-width: 78%;
  }
}
@media only screen and (max-width: 755px) {
  #myTabContent{
    margin-top: 15px;
  }
  #myTab{
    text-align: center;
  }
}
</style>

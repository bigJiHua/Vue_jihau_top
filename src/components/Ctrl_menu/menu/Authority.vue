<template>
  <div id="" class="userinfo">
  <small style="color: red">注意：双击后 请在5秒内完成修改</small>
    <table class="table-hover table table-bordered table-striped tab-content userinfotable">
      <thead>
        <tr>
          <th v-for="(item, index) in Userinfo.thead" :key="index" class="thovs">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in Userinfo.list" :key="index">
        <td>{{item.id}}</td>
        <td @dblclick="tabcli($event,'username', item.id)" class="tdval">{{item.username}}</td>
        <td @dblclick="tabcli($event,'nickname', item.id)" class="tdval">{{item.nickname}}</td>
        <td @dblclick="tabcli($event,'useridentity', item.id)" class="tdval">{{item.useridentity}}</td>
        <td @dblclick="tabcli($event,'email', item.id)" class="tdval">{{item.email}}</td>
        <td @dblclick="tabcli($event,'sex', item.id)" class="tdval">{{item.sex}}</td>
        <td @dblclick="tabcli($event,'birthday', item.id)" class="tdval">{{item.birthday}}</td>
        <td @dblclick="tabcli($event,'city', item.id)" class="tdval">{{item.city}}</td>
        <td class="tdval">
          <img :src="item.user_pic" alt="" style="width: 50px">
        </td>
        <td @dblclick="tabcli($event,'user_content', item.id)" class="tdval">{{item.user_content}}</td>
        <td @dblclick="tabcli($event,'state', item.id)" class="tdval">{{item.state | state(item.state)}}</td>
        <td class="tdval">
          <van-button color="#1989FA" size="small" class="tdbtn">编辑</van-button>
          <van-button type="danger" size="small"   class="tdbtn" @click="delUser(item.username,item.useridentity)">注销</van-button>
        </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Userinfo from '@/components/api/main/GetUserInfo'
import GetUData from '@/components/api/Ctrl_menuAPI/UserData'

export default {
  props: [],
  data () {
    return {
      Userinfo: {
        thead: ['id', '用户', '用户名', '用户身份', '邮箱', '性别', '生日', '城市', '用户头像', '个性签名', '状态', '操作'],
        list: []
      },
      newval: ''
    }
  },
  // 生命周期初始化函数
  created () {
    this.getUserinfo()
  },
  method () {
  },
  // 方法
  methods: {
    async getUserinfo () {
      if (localStorage.getItem('Useridentity') === '管理员') {
        const { data: res } = await Userinfo.getUserinfo(localStorage.getItem('Username'))
        this.Userinfo.list = res.data
        this.$toast({
          message: res.message,
          position: 'top'
        })
        if (res.status === 403) {
          this.$router.push('/')
          localStorage.setItem('Useridentity', '用户')
          location.reload()
        }
      } else {
        alert('非法用户！')
      }
    },
    tabcli (event, met, id) {
      const demo = event.target
      // contenteditable
      demo.setAttribute('contenteditable', 'true')
      demo.addEventListener('mouseout', () => {
        setTimeout(() => {
          demo.removeAttribute('contenteditable')
          this.newval = demo.innerHTML
          demo.style.color = 'red'
          console.log(this.newval, met, id)
        }, 5000)
      })
    },
    async delUser (deluser, useridtity) {
      if (localStorage.getItem('Useridentity') === '管理员' && useridtity === '用户') {
        const user = localStorage.getItem('Username')
        const { data: res } = await GetUData.DelUser(user, deluser)
        this.$toast({
          message: res.message,
          position: 'top'
        })
      } else {
        alert('非法操作！')
      }
    }
  },
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {
    state (st) {
      if (st === 0) {
        return '正常'
      } else {
        return '已注销'
      }
    }
  },
  // Vue 中自定义属性
  directives: {},
  name: 'AuthorityM',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
.userinfo {
  max-height: 90vh;
  overflow: scroll;
  userinfotable{
    width: 100%;
    height: 100%;
  }
  .thovs{
    min-width: 120px;
    max-width: 130px;
    text-align: center;
  }
}
/deep/.van-button {
  margin-left: 8px;
}
</style>

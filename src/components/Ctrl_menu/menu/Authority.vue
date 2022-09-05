<template>
  <div id="" class="userinfo" v-if="isg">
  <h1>用户管理</h1>
    <table
      class="table-hover table table-bordered table-striped tab-content userinfotable"
    >
      <thead>
        <tr>
          <th
            v-for="(item, index) in Userinfo.thead"
            :key="index"
            class="thovs"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in Userinfo.list" :key="index">
          <td style="text-align: center;" class="tdval">{{ item.id }}</td>
          <td class="tdval">{{ item.username }}</td>
          <td class="tdval">{{ item.nickname }}</td>
          <td class="tdval">{{ item.useridentity }}</td>
          <td class="tdval">{{ item.email }}</td>
          <td class="tdval">{{ item.sex }}</td>
          <td class="tdval">{{ item.birthday }}</td>
          <td class="tdval">{{ item.city }}</td>
          <td class="tdval">
            <img :src="item.user_pic" alt="" style="width: 50px" />
          </td>
          <td class="tdval">{{ item.user_content }}</td>
          <td class="tdval">{{ item.state | state(item.state) }}</td>
          <td class="tdval">
            <van-button
              color="#1989FA"
              size="small"
              class="tdbtn"
              @click="cagUser(item)"
              >编辑</van-button
            >
            <van-button
              type="danger"
              size="small"
              class="tdbtn"
              @click="delUser(item.username, item.useridentity,item.state)"
            >
              {{ item.state | btnstate(item.state) }}
            </van-button>
          </td>
        </tr>
      </tbody>
    </table>
    <cag-user-data
      v-if="cagUdata.cagArea"
      :user="cagUdata.item"
      @toge="toge"
    ></cag-user-data>
    <div class="countpage">
      <van-button @click="updo('up')">上一页</van-button>
      <span>第{{page}}页</span>&nbsp;
      <span>共{{ length | lengthcount(this.length)}}页</span>
      <van-button @click="updo('next')">下一页</van-button>
    </div>
  </div>
</template>

<script>
import Userinfo from '@/components/api/main/GetUserInfo'
import GetUData from '@/components/api/Ctrl_menuAPI/UserData'
import CagUserData from '@/components/Ctrl_menu/menu/Authority_elpage/cagUserData.vue'

export default {
  props: [],
  data () {
    return {
      Userinfo: {
        thead: [
          'id',
          '用户',
          '用户名',
          '用户身份',
          '邮箱',
          '性别',
          '生日',
          '城市',
          '用户头像',
          '个性签名',
          '状态',
          '操作'
        ],
        list: []
      },
      cagUdata: {
        cagArea: false,
        item: []
      },
      n: 0,
      length: 0,
      page: 1,
      isg: false
    }
  },
  // 生命周期初始化函数
  created () {
    this.getUserinfo(0)
  },
  // 方法
  methods: {
    async getUserinfo (n) {
      if (localStorage.getItem('Useridentity') === '管理员') {
        const { data: res } = await Userinfo.getUserinfo(
          localStorage.getItem('Username'), n
        )
        if (res.status === 403) {
          this.isg = false
          localStorage.setItem('Useridentity', '用户')
          alert('非法用户！请勿修改本地存储值试图变更用户身份')
          location.reload()
        } else if (res.status === 200) {
          this.isg = true
          this.Userinfo.list = res.data
          this.length = res.length
          this.$toast({
            message: res.message,
            position: 'top'
          })
          localStorage.setItem('Useridentity', '管理员')
        }
        if (res.message === '404') {
          this.n -= 5
          this.page -= 1
          this.getUserinfo(this.n)
          alert('已经是最大限度了！')
        }
      } else {
        alert('非法用户！请勿修改本地存储值试图变更用户身份')
      }
    },
    cagUser (user) {
      this.cagUdata.cagArea = true
      this.cagUdata.item = user
    },
    async delUser (deluser, useridtity, state) {
      const condel = confirm('确认注销该账户吗？')
      if (condel) {
        if (state !== 1) {
          if (
            localStorage.getItem('Useridentity') === '管理员' &&
        useridtity === '管理员'
          ) {
            const user = localStorage.getItem('Username')
            const { data: res } = await GetUData.DelUser(user, deluser)
            this.$toast({
              message: res.message,
              position: 'top'
            })
            location.reload()
          } else {
            alert('您不能注销管理员的账号')
          }
        } else {
          alert('用户已注销，请勿重复操作')
        }
      }
    },
    toge (val) {
      this.cagUdata.cagArea = val
    },
    updo (mes) {
      if (mes === 'up') {
        if (this.n === 0) {
          alert('这就是第一页！')
        } else {
          this.page -= 1
          this.n -= 5
          this.getUserinfo(this.n)
        }
      } else if (mes === 'next') {
        this.page += 1
        this.n += 5
        this.getUserinfo(this.n)
      }
    }
  },
  // 过滤器
  filters: {
    btnstate (st) {
      if (st === 0) {
        return '注销'
      } else {
        return '已注销'
      }
    },
    state (st) {
      if (st === 0) {
        return '正常'
      } else {
        return '已注销'
      }
    },
    lengthcount (le) {
      return Math.ceil(le / 5)
    }
  },
  name: 'AuthorityM',
  components: {
    CagUserData
  }
}
</script>

<style lang="less" scoped>
.userinfo {
  position: relative;
}
.countpage{
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  button:first-child{
    margin-right: 8px;
  }
  button:last-child{
    margin-left: 8px;
  }
  > button {
    z-index: 1;
  }
}

@media only screen and (max-width: 755px) {
  .thovs,.tdval{
    height: 50px !important;
    width: 50px !important;
  }
  .countpage{
    position: absolute;
    right: 0;
    top: 33px;
  }
}
</style>

<template>
  <div id="" class="Scard" v-if="isg">
    <div class="header card" @click="to_top">
      <p class="title">添加修改历程</p>
      <div @click="to_top">
        <p :class="{ icon_up: isup, isdn: !isup }"></p>
      </div>
    </div>
    <div :class="{ DevP_item: isup, DevP_down: !isup }">
      <div class="setitem" v-for="(item, index) in Dev" :key="index">
        <label for="set_name" class="setlable">名字</label>
        <span>{{ item.set_name }}{{ index + 1 }}</span><br />
        <label for="set_title" class="setlable">标题</label>
        <input type="text" id="set_title" class="setinput" v-model="item.set_title" /><br />
        <label for="set_url" class="setlable">链接</label>
        <input type="text" id="set_url" class="setinput" v-model="item.set_url" /><br />
        <label for="set_difault" class="setlable">默认文字</label>
        <input type="text" id="set_difault" class="setinput" v-model="item.set_difault" /><br />
        <label for="set_change" class="setlable">时间</label>
        <input type="Date" id="set_change" class="setinput" v-model="item.set_change" /><br />
        <van-button class="setbtn" @click="cagDevP(item)">确认修改</van-button>
        <div class="delbox" @click="delDevP(item.id)">
          <i class="glyphicon glyphicon-remove"></i>
        </div>
      </div>
      <div>
        <label for="set_name" class="setlable">名字</label>
        <span>添加 DevP</span><br />
        <label for="set_title" class="setlable">标题</label>
        <input type="text" id="set_title" v-model="newDevP.set_title" /><br />
        <label for="set_url" class="setlable">链接</label>
        <input type="text" id="set_url" v-model="newDevP.set_url" /><br />
        <label for="set_difault" class="setlable">默认文字</label>
        <input type="text" id="set_difault" v-model="newDevP.set_difault" /><br />
        <label for="set_change" class="setlable">时间</label>
        <input type="Date" id="set_change" class="setinput" v-model="newDevP.set_change" /><br />
        <van-button class="setbtn" @click="addDevP()">添加</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// TODO获取轮播设置然后改变
import getDevP from '@/components/api/getSetting'
export default {
  props: [],
  data () {
    return {
      Dev: [],
      newDevP: {
        set_name: 'DevP',
        set_title: '',
        set_url: '',
        set_difault: '',
        set_change: ''
      },
      isg: false,
      isup: false
    }
  },
  created () {
    if (localStorage.getItem('Useridentity') === '管理员') {
      this.getDevP()
    }
  },
  methods: {
    async getDevP () {
      const { data: res } = await getDevP.getSettingDevP('get', localStorage.getItem('Username'))
      this.Dev = res.data
      if (res.status === 200) {
        this.isg = true
      } else {
        this.isg = false
        localStorage.setItem('Useridentity', '用户')
        location.reload()
      }
    },
    async cagDevP (item) {
      const { data: res } = await getDevP.getSettingDevP('cag', localStorage.getItem('Username'), JSON.stringify(item))
      this.$toast({
        message: res.message,
        position: 'top'
      })
    },
    async addDevP () {
      const { data: res } = await getDevP.getSettingDevP('add', localStorage.getItem('Username'), JSON.stringify(this.newDevP))
      this.$toast({
        message: res.message,
        position: 'top'
      })
      this.getDevP()
    },
    async delDevP (id) {
      const condel = confirm('真的要删除这条发展历程吗？')
      if (condel) {
        const data = {
          id: id
        }
        const { data: res } = await getDevP.getSettingDevP('del', localStorage.getItem('Username'), JSON.stringify(data))
        if (res.status === 200) {
          this.newDevP.set_name = 'DevP'
          this.newDevP.set_title = ''
          this.newDevP.set_url = ''
          this.newDevP.set_difault = ''
          this.newDevP.set_change = ''
          this.getDevP()
        }
      }
    },
    to_top () {
      this.isup = !this.isup
    }
  },
  // 监听器
  watch: {},
  computed: {},
  filters: {},
  name: 'CagDevP',
  components: {}
}
</script>

<style lang="less" scoped>
.setlable {
  width: 6vw;
}

.setbtn {
  margin-left: 6vw;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

.icon_up {
  width: 20px;
  height: 20px;
  border-left: 4px black solid;
  border-top: 4px black solid;
  transition: all 0.3s;
  transform: rotate(45deg);
  float: right;
  margin: -6px 25px 0 0;
}

.isdn {
  width: 20px;
  height: 20px;
  border-left: 4px black solid;
  border-top: 4px black solid;
  transition: all 0.3s;
  transform: rotate(-135deg);
  float: right;
  margin: -6px 25px 0 0;
}

.DevP_down {
  transform: scaleY(0);
  transition: transform 0.2s;
  transform-origin: top center;
  height: 0;
}

p.title {
  font-size: 2rem;
  text-align: center;
}

.setitem {
  margin-right: 10px;
  position: relative;
}

.setinput {
  width: 12vw;
}

.delbox {
  padding: 0 20px 0 -20px;
  position: absolute;
  right: 0;
  top: 0;
}

.DevP_item {
  display: flex;
  flex-wrap: wrap;
  transform: scaleY(1);
  transition: transform 0.2s;
  transform-origin: top center;
}

@media only screen and (max-width: 755px) {
  .setlable {
    width: 100%;
  }

  .setbtn {
    margin-top: 5px;
  }

  .setitem {
    padding-bottom: 10px;
    margin: 10px 0;
    border-bottom: 1px grey solid;
    width: 100%;
  }

  .setinput {
    width: 100%;
  }

  .delbox {
    font-size: 2rem;
  }
}
</style>

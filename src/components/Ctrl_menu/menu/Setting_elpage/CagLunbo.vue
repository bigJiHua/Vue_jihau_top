<template>
  <div class="Scard" v-if="isg">
      <div class="header card" @click="to_top">
        <p class="title">设置轮播图</p>
        <div @click="to_top"><p :class="{ icon_up: isup , 'isdn': !isup }"></p></div>
      </div>
      <div :class="{ Lunbo_item: isup , 'Lunbo_down': !isup }">
        <div class="setitem" v-for="(item,index) in item" :key="index">
        <p>封面：{{index+1}}<img :src="item.set_difault" alt="" class="LunboImg"></p>
        <p>更换：<input type="link" v-model="item.set_difault"></p>
        <p>标题：<input type="text" v-model="item.set_title"></p>
        <p>链接：<input type="link" v-model="item.set_url"></p>
        <van-button @click="cagLunbo(item)" class="cli_btn">确认修改</van-button>
        </div>
      </div>
  </div>
</template>

<script>
// TODO获取轮播设置然后改变
import getLunbo from '@/components/api/getSetting'
export default {
  props: [],
  data () {
    return {
      item: [],
      isg: false,
      isup: false
    }
  },
  // 生命周期初始化函数
  created () {
    if (localStorage.getItem('Useridentity') === 'manager') {
      this.getLunbotu()
    }
  },
  // 方法
  methods: {
    async getLunbotu () {
      const { data: res } = await getLunbo.getSettingLunbo('get', localStorage.getItem('Username'))
      this.item = res.data
      if (res.status === 200) {
        this.isg = true
      } else {
        this.isg = false
        this.$toast({
          message: res.message + '  禁止修改本地用户身份造假！',
          position: 'top'
        })
        localStorage.setItem('Useridentity', 'user')
        location.reload()
      }
    },
    async cagLunbo (item) {
      const { data: res } = await getLunbo.getSettingLunbo('cag', localStorage.getItem('Username'), JSON.stringify(item))
      this.$toast({
        message: res.message,
        position: 'top'
      })
    },
    to_top () {
      this.isup = !this.isup
    }
  },
  name: 'CagLumbo'
}
</script>

<style lang="less" scoped>
  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }
  .icon_up{
    width: 20px;
    height: 20px;
    border-left: 4px black solid;
    border-top: 4px black solid;
    transition: all 0.3s;
    transform: rotate(45deg);
    float: right;
    margin: -6px 25px 0 0;
  }
  .isdn{
    width: 20px;
    height: 20px;
    border-left: 4px black solid;
    border-top: 4px black solid;
    transition: all 0.3s;
    transform: rotate(-135deg);
    float: right;
    margin: -6px 25px 0 0;
  }
  .Lunbo_down{
    transform: scaleY(0);
    transition: transform 0.2s;
    transform-origin: top center;
    height: 0;
  }
  p.title{
    font-size: 2rem;
    text-align: center;
  }
  .setitem{
    margin: 15px;
  }
  .Lunbo_item{
    display: flex;
    flex-wrap: wrap;
    transform: scaleY(1);
    transition: transform 0.2s;
    transform-origin: top center;
  }
  .LunboImg{
    width: 100px;
    height: 60px;
  }
  .cli_btn{
    margin-left: 42px;
  }
@media only screen and (max-width: 755px) {
  .setitem{
    margin: 15px;
    width: 100%;
  }
}
</style>

<template>
  <div class="Scard" v-if="isg">
      <p class="title">设置轮播图</p>
      <div class="Lunbo_item">
        <div class="setitem" v-for="(item,index) in item" :key="index">
        <p>封面：<img :src="item.set_difault" alt="" class="LunboImg"></p>
        <p>更换：<input type="link" v-model="item.set_difault"></p>
        <p>标题：<input type="text" v-model="item.set_title"></p>
        <p>链接：<input type="link" v-model="item.set_url"></p>
        <van-button @click="cagLunbo(item)">确认修改</van-button>
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
      isg: false
    }
  },
  // 生命周期初始化函数
  created () {
    this.getLunbotu()
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
      }
    },
    async cagLunbo (item) {
      const { data: res } = await getLunbo.getSettingLunbo('cag', localStorage.getItem('Username'), JSON.stringify(item))
      this.$toast({
        message: res.message,
        position: 'top'
      })
    }
  },
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'CagLumbo',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
  p.title{
    font-size: 2.5rem;
    text-align: center;
  }
  .setitem{
    margin-right: 15px;
  }
  .Lunbo_item{
    display: flex;
    flex-wrap: wrap;
  }
  .LunboImg{
    width: 100px;
    height: 60px;
  }
</style>

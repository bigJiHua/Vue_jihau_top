<template>
  <div class="setting">
  <cagpanel-color></cagpanel-color>
  <CagLunbo></CagLunbo>
  </div>
</template>

<script>
import CagpanelColor from './Setting_elpage/CagpanelColor.vue'
import CagLunbo from './Setting_elpage/CagLunbo.vue'
// 导入组件
// import  from ''

export default {
  props: [],
  data () {
    return {
    }
  },
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'SettingM',
  components: { // 导入组件
    CagpanelColor,
    CagLunbo
  }
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .Scard {
    padding: 10px;
    border-radius: 5px;
    margin: 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: rgba(255, 255, 255, 0.4);
    p {
      text-align: center;
      font-size: 2rem;
    }
    button {
      margin-left: 15px;
    }
  }
}
@media only screen and (max-width: 755px) {
  .Scard {
    padding: 10px;
    border-radius: 5px;
    margin: 15px;
    background-color: rgba(255, 255, 255, 0.4);
    p {
      text-align: center;
      font-size: 2rem;
    }
    button {
      margin-left: 15px;
    }
  }
}
</style>

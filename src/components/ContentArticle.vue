<template>
  <div id="" class="center_box">
    <Left class="left"></Left>
    <RightM class="right"></RightM>
  </div>
</template>

<script>
import Left from './CenterBox/Left.vue'
// 导入组件
// import  from ''

export default {
  name: 'Content_M',
  components: {
    Left
  }
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .center_box {
    margin-top: 20px;
    padding: 0;
    display: flex;
    width: 80vw;
  }
  .left{
    min-width: 50vw;
    width: 66%;
    margin-right: 2vw;
  }
  .right{
    width: 33%;
  }
}
@media only screen and (max-width: 755px) {
  .center_box {
    margin-top: 20px;
    padding: 0;
  }
}
</style>

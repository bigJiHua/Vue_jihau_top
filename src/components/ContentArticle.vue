<template>
  <div id="" class="center_box">
    <Left class="left"></Left>
    <RightM class="right" :isOpen="true"></RightM>
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
    position: relative;
    width: 80vw;
    margin: 0 auto;
  }
  .left{
    width: 50vw;
    margin-right: 2vw;
  }
  .right{
    width: 30vw;
  }
}
@media only screen and (max-width: 755px) {
  .center_box {
    padding: 0;
  }
}
</style>

<template>
  <div id="" class="center_box container">
    <div class="col-md-8">
      <Left></Left>
    </div>
    <div class="col-md-4">
      <RightM></RightM>
    </div>
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
.center_box {
  margin-top: 20px;
  padding: 0;
}
</style>

<template>
  <div>
    <HeaderM></HeaderM>
    <div id="" class="center_box">
      <Left class="left"></Left>
      <RightM class="right" :isOpen="true"></RightM>
      <WidthAndHeight></WidthAndHeight>
    </div>
  </div>
</template>

<script>
import Left from './Content_Area/Left.vue'
import WidthAndHeight from './Module/TestModule/WidthAndHeight.vue'

export default {
  name: 'Content_M',
  components: {
    Left,
    WidthAndHeight
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
    width: 70vw;
    margin: 0 auto;
    max-width: 1200px;
  }

  .left {
    width: 43vw;
    margin-right: 2vw;
    max-width: 700px;
  }

  .right {
    width: 30vw;
  }
}

@media only screen and (max-width: 755px) {
  .center_box {
    padding: 0;
  }
}</style>

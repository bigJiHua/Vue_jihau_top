<template>
  <div class="CtrlView">
    <ctrl-view-aside></ctrl-view-aside>
    <router-view class="rightView"></router-view>
  </div>
</template>

<script>
import CtrlViewAside from './CtrlViewAside.vue'

export default {
  components: { CtrlViewAside },
  method () {
  },
  name: 'CtrlView'
}
</script>

<style scoped>
.CtrlView{
  display: flex;
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100vh;
}
.rightView{
  padding: 15px;
  width: 85vw;
  height: 100%;
  overflow: overlay;
}
.rightView::-webkit-scrollbar {
  display: none;
}
</style>
<!-- background-color: rgb(240,242,245); -->

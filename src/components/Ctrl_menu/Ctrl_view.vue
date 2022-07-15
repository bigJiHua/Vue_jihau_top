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

@media only screen and (max-width: 755px) {
  .CtrlView{
    position: fixed;
    top: 50px;
    left: 0;
    width: 100vw;
    height: 100%;
    overflow: overlay;
  }
  .rightView{
    min-height: 80vh;
    width: 100%;
    padding: 15px;
    overflow: overlay;
  }

}
@media only screen and (min-width: 755px) {
  .CtrlView{
    display: flex;
    position: fixed;
    top: 50px;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .rightView{
    height: 100%;
    padding: 15px;
    width: 100vw;
    overflow: overlay;
  }
}
.rightView::-webkit-scrollbar {
  display: none;
}
</style>
<!-- background-color: rgb(240,242,245); -->

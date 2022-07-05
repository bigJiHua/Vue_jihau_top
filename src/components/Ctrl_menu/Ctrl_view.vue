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
}
.rightView{
  padding: 15px;
  width: 70vw;
  height: 84vh;
  background-color: rgba(214, 210, 210, 0.2);
}

@media only screen and (max-width: 755px) {
  .rightView{
    width: 70vw;
    height: 84vh;
    background-color: rgba(214, 210, 210, 0.2);
  }
}
</style>

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
  justify-content: space-between;
}
.rightView{
  flex: 2;
}
</style>

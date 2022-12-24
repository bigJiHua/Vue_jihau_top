<template>
  <div class="CtrlView">
    <ctrl-view-aside class="AsideMenu"></ctrl-view-aside>
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
  .CtrlView {
    position: fixed;
    top: 50px;
    left: 0;
    width: 100vw;
    height: 100%;
    overflow: overlay;
  }

  .rightView {
    min-height: 80vh;
    width: 100%;
    padding: 15px;
    overflow: overlay;
  }

}

@media only screen and (min-width: 755px) {
  .CtrlView {
    display: flex;
    width: 110vw;
    height: 90vh;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .AsideMenu {
    width: 15vw;
  }

  .rightView {
    padding: 15px;
    width: 83vw;
    height: 90vh;
    overflow: scroll;
  }
}

.rightView::-webkit-scrollbar {
  display: none;
}
</style>
<!-- background-color: rgb(240,242,245); -->

<template>
  <div class="setting">
    <cagpanel-color ref="totop"></cagpanel-color>
    <CagLunbo ref="totop"></CagLunbo>
    <CagDevP ref="totop"></CagDevP>
    <CagSpsListVue ref="totop"></CagSpsListVue>
  </div>
</template>

<script>
import CagpanelColor from './Setting_elpage/CagpanelColor.vue'
import CagLunbo from './Setting_elpage/CagLunbo.vue'
import CagDevP from './Setting_elpage/CagDevP.vue'
import CagSpsListVue from './Setting_elpage/CagSpsList.vue'

export default {
  props: [],
  data () {
    return {}
  },
  name: 'SettingM',
  components: {
    CagpanelColor,
    CagLunbo,
    CagDevP,
    CagSpsListVue
  }
}
</script>

<style lang="less" scoped>
.setting {
  overflow: auto;
}
.setting::-webkit-scrollbar {
  display: none;
}

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
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 5px;
    margin-bottom: 20px;
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

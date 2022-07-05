<template>
  <div id="" class="DevProcess">
    <van-switch v-model="checked" class="check-btn" v-if="isEdick"/>
    <div class="Tree">
      <div class="Tree_dome" v-for="(item,index) in item" :key="index">
        <div class="Tree_Area">
            <span class="set_title">迭代内容:</span>{{item.set_title}}
              <a :href="item.set_url" v-if="item.set_url">点击查看</a>
            <span class="set_time">{{item.set_change}}</span>
        </div>
        <button class="edit_btn" v-if="checked" @click="OpenEdit(item)">
        <i class="glyphicon glyphicon-edit"></i>
        </button>
      </div>
    </div>
    <DevPcagPanel :Open="cagArea.isOpen" :item="cagArea.item" @toge="toge"></DevPcagPanel>
  </div>
</template>

<script>
import getDevP from '@/components/api/getSetting'
import DevPcagPanel from '@/components/Module/DevP_cagPanel'
export default {
  props: [],
  data () {
    return {
      item: [],
      checked: false,
      cagArea: {
        isOpen: false,
        item: {}
      }
    }
  },
  created () {
    this.getDevP()
    this.isEdick()
  },
  methods: {
    async getDevP () {
      const { data: res } = await getDevP.getSetting('DevP')
      this.item = res.data
    },
    isEdick () {
      if (localStorage.getItem('Username') === '管理员') {
        this.isEdick = true
      }
    },
    OpenEdit (item) {
      this.cagArea.isOpen = true
      this.cagArea.item = item
    },
    toge (val) {
      this.cagArea.isOpen = val
      this.cagArea.item = ''
    }
  },
  computed: {
  },
  filters: {},
  name: 'DevProcess',
  components: {
    DevPcagPanel
  }
}
</script>

<style lang="less" scoped>
.DevProcess{
  position: relative;
}
.Tree{
  display: flex;
  flex-wrap: wrap;
}

@media only screen and (min-width: 755px) {
  .Tree_dome {
    padding: 15px 30px;
    border-radius: 60px;
    margin: 5px;
    position: relative;
  }
  .Tree_Area{
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }
  .set_title{
    font-weight: bolder;
    display: inline-block;
    margin-right: 15px;
  }
  .set_time{
    float: right;
    font-size: 2rem;
    color: #657ddd;
    font-weight: bolder;
  }
  .Tree_dome:nth-child(even){
    background-color: rgb(#B5BCD8);
  }
  .Tree_dome:nth-child(odd){
    background-color: rgb(#C9D5E9);
  }
  .check-btn{
    position: absolute;
    right: 30px;
    top: 8vh;
  }
  .edit_btn{
    font-size: 2rem;
    position: absolute;
    right: 0;
    top: 15px;
  }
}

@media only screen and (max-width: 755px) {
  .Tree_dome {
    padding: 15px;
    border-radius: 60px;
    margin-top: 15px;
    position: relative;
  }
  .Tree_Area{
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }
  .set_title{
    font-weight: bolder;
    display: inline-block;
    margin-right: 15px;
  }
  .set_time{
    float: right;
    font-size: 1.2rem;
    color: #657ddd;
    font-weight: bolder;
  }
  .Tree_dome:nth-child(even){
    background-color: rgb(#B5BCD8);
  }
  .Tree_dome:nth-child(odd){
    background-color: rgb(#C9D5E9);
  }
  .check-btn{
    position: absolute;
    right: 30px;
    top: 12vh;
    right: 2vw;
    z-index: 999;
    background-color: rgb(#C9D5E9);
  }
  .edit_btn{
    font-size: 2rem;
    position: absolute;
    right: 0;
    top: -13px;
  }
}
</style>

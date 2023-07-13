<template>
  <div>
    <HeaderM></HeaderM>
    <div id="" class="DevProcess">
      <van-switch v-model="checked" class="check-btn" v-if="isEdicks" />
      <div class="Tree">
        <div class="Tree_dome" v-for="(item, index) in item" :key="index">
          <div class="Tree_Area">
            <span class="set_title">迭代内容:</span>{{ item.set_title }}
            <a :href="item.set_url" v-if="item.set_url">点击查看</a>
            <span class="set_time">{{ item.set_change }}</span>
          </div>
          <button class="edit_btn" v-if="checked" @click="OpenEdit(item)">
            <i class="glyphicon glyphicon-edit"></i>
          </button>
        </div>
      </div>
      <DevPcagPanel :Open="cagArea.isOpen" :item="cagArea.item" @toge="toge"></DevPcagPanel>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import getDevP from '@/API/Email/getSetting'
import DevPcagPanel from '@/components/Ctrl_menu/DevP_cagPanel'
import Footer from '../../layout/FooterBar/Footer.vue'
export default {
  props: [],
  data () {
    return {
      item: [],
      checked: false,
      cagArea: {
        isOpen: false,
        item: {}
      },
      isEdicks: false
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
    async isEdick () {
      // TODO 鉴别管理员
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('Useridentity') === 'manager') {
          const { data: res } = await getDevP.getSettingDevP('get', localStorage.getItem('Username'))
          if (res.status !== 404) {
            this.isEdicks = true
          } else {
            localStorage.setItem('Useridentity', 'user')
          }
        }
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
    DevPcagPanel,
    Footer
  }
}
</script>

<style lang="less" scoped>
.DevProcess {
  position: relative;
}

.Tree {
  display: flex;
  flex-wrap: wrap;
}

@media only screen and (min-width: 755px) {
  .Tree_dome {
    padding: 15px 30px;
    border-radius: 8px;
    margin: 5px;
    position: relative;
  }

  .Tree_Area {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

  .set_title {
    font-weight: bolder;
    display: inline-block;
    margin-right: 15px;
  }

  .set_time {
    float: right;
    margin-left: 8px;
    font-size: 1.5rem;
    color: #657ddd;
    font-weight: bolder;
  }

  .Tree_dome:nth-child(even) {
    background-color: rgb(#B5BCD8);
  }

  .Tree_dome:nth-child(odd) {
    background-color: rgb(#C9D5E9);
  }

  .check-btn {
    position: absolute;
    right: 30px;
    top: 2vh;
  }

  .edit_btn {
    font-size: 2rem;
    position: absolute;
    right: 7px;
    top: 13px;
    border: 0;
    background-color: rgba(0, 0, 0, 0);
  }
}

@media only screen and (max-width: 755px) {
  .Tree {}

  .Tree_dome {
    padding: 25px;
    border-radius: 8px;
    margin-top: 15px;
    position: relative;
  }

  .Tree_Area {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .set_title {
    font-weight: bolder;
    display: inline-block;
    margin-right: 15px;
  }

  .set_time {
    float: right;
    font-size: 1.2rem;
    color: #657ddd;
    font-weight: bolder;
  }

  .Tree_dome:nth-child(even) {
    background-color: rgb(#B5BCD8);
  }

  .Tree_dome:nth-child(odd) {
    background-color: rgb(#C9D5E9);
  }

  .check-btn {
    position: absolute;
    right: 30px;
    top: 16vh;
    right: 2vw;
    z-index: 999;
    background-color: rgb(#C9D5E9);
  }

  .edit_btn {
    font-size: 2rem;
    position: absolute;
    right: 7px;
    top: 3px;
    border: 0;
    background-color: rgba(0, 0, 0, 0);
  }
}</style>

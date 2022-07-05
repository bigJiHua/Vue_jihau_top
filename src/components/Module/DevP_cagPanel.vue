<template>
  <div v-if="Open" class="Panel" >
      <p><label for="set_name" class="setlable">名字</label>
      <span>{{cagitem.set_name}}</span></p>
      <p><label for="set_title" class="setlable">标题</label></p>
      <p><input type="text" id="set_title" class="setinput" v-model="cagitem.set_title" /></p>
      <p><label for="set_url" class="setlable">链接</label></p>
      <p><input type="text" id="set_url" class="setinput" v-model="cagitem.set_url" /></p>
      <p><label for="set_difault" class="setlable">默认文字</label></p>
      <p><input type="text" id="set_difault" class="setinput" v-model="cagitem.set_difault" /></p>
      <p><label for="set_change" class="setlable">时间</label></p>
      <p><input type="Date" id="set_change" class="setinput" v-model="cagitem.set_change" /></p>
      <div class="todo_btn">
        <van-button class="setbtn" type="primary" @click="cagDevP">确认修改</van-button>
        <van-button class="setbtn" type="danger" @click="toge">取消修改</van-button>
      </div>
      <div class="delbox" @click="toge">
        <i class="glyphicon glyphicon-remove"></i>
      </div>
  </div>
</template>

<script>
import getDevP from '@/components/api/getSetting'
export default {
  props: ['item', 'Open'],
  data () {
    return {
      cagitem: this.item
    }
  },
  methods: {
    async cagDevP () {
      const { data: res } = await getDevP.getSettingDevP('cag', localStorage.getItem('Username'), JSON.stringify(this.cagitem))
      if (res.status === 200) {
        this.$toast({
          message: res.message,
          position: 'top'
        })
        setTimeout(() => {
          this.toge()
        }, 800)
      }
    },
    toge () {
      this.$emit('toge', false)
    }
  },
  watch: {
    item (newitem, olditem) {
      this.cagitem = newitem
    }
  },
  name: 'DevP_cagPanel',
  components: {
  }
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .Panel{
    position: fixed;
    width: 50vw;
    height: 65vh;
    background-color: rgba(255, 255, 255, 0.68);
    top: 15vh;
    left: 50vh;
    padding: 20px;
    border-radius: 12px;
    z-index: 9999;
  }
  .setinput{
    width: 100%;
  }
  .delbox{
    position: absolute;
    top: 5px;
    right: 8px;
    font-size: 2rem;
  }
  .todo_btn{
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
}
@media only screen and (max-width: 755px) {
  .Panel{
    position: fixed;
    width: 80vw;
    height: 55vh;
    background-color: rgb(255, 255, 255);
    top: 15vh;
    left: 10vw;
    padding: 20px;
    border-radius: 12px;
    z-index: 9999;
  }
  .delbox{
    position: absolute;
    top: 5px;
    right: 8px;
    font-size: 2rem;
  }
  .setlable{
    margin: 5px 25px 5px 0;
  }
  .setinput{
    width: 100%;
  }
  .todo_btn{
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
}
</style>

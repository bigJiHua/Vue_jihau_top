<template>
  <div id="" class="collection" ref="coll">
    <div class="col-md-2">
      <ul id="myTab" class="nav">
        <li class="nav-tabs">
          <a href="#goodnum" data-toggle="tab">我的点赞({{Data.goodnums}})</a>
        </li>
        <li class="nav-tabs">
          <a href="#collent" data-toggle="tab">我的收藏({{Data.collects}})</a>
        </li>
        <li class="nav-tabs">
          <a href="#comment" data-toggle="tab">我的评论({{Data.comments}})</a>
        </li>
      </ul>
    </div>
    <div id="myTabContent" class="tab-content">
      <div class="tab-pane fade in active" id="goodnum">
        <mygoodnum :goodnum="Data.goodnum" @reload="reload"></mygoodnum>
      </div>
      <div class="tab-pane" id="collent">
        <mycollect :collect="Data.collect" @reload="reload"></mycollect>
      </div>
      <div class="tab-pane" id="comment">
        <mycomment :comment="Data.comment" @reload="reload"></mycomment>
      </div>
    </div>
  </div>
</template>

<script>
import Mycollect from './Collection_elpage/mycollect.vue'
import Mygoodnum from './Collection_elpage/mygoodnum.vue'
import getdata from '@/components/api/UserActionAPI/UserActiveGet'
import Mycomment from './Collection_elpage/mycomment.vue'

export default {
  props: [],
  data () {
    return {
      Data: [],
      numCount: []
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    async getdata () {
      const { data: res } = await getdata.UserActivedata(localStorage.getItem('Username'))
      this.$toast({
        message: res.message,
        position: 'top'
      })
      this.Data = res.data
    },
    reload () {
      this.getdata()
    }
  },
  name: 'CollectionM',
  components: {
    Mygoodnum,
    Mycollect,
    Mycomment
  }
}
</script>

<style lang="less" scoped>
#myTabContent{
  height: 100%;
  overflow: overlay;
}
@media only screen and (max-width: 755px) {
  #myTab{
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

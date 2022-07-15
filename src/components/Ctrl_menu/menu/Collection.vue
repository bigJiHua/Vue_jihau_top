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
        <mygoodnum :goodnum="Data.goodnum"></mygoodnum>
      </div>
      <div class="tab-pane" id="collent">
        <mycollect :collect="Data.collect"></mycollect>
      </div>
      <div class="tab-pane" id="comment">
        <mycomment :comment="Data.comment"></mycomment>
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
    }
  },
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'CollectionM',
  components: {
    Mygoodnum,
    Mycollect,
    Mycomment
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
.collection{
  padding: 20px 5px;
}
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

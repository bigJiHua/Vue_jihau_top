<template>
  <div id="">
    <span class="mnumber" @click="mdod()">{{ art }}</span>
    <ul v-for="(obj, index) in newList[index]" :key="index">
      <li :class="{ daylists: misOpen, daylist: !misOpen }">
        <a :href="obj.hurl">
          {{ obj.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
// 导入组件
// import  from ''

export default {
  props: {
    index: {
      type: Number,
      default: -1
    },
    art: {
      type: String,
      default: ''
    },
    newList: {
      type: Array
    }
  },
  data () {
    return {
      misOpen: false
    }
  },
  method () {
    this.gettt()
  },
  methods: {
    mdod () {
      this.misOpen = !this.misOpen
    },
    gettt () {
      console.log(this)
    }
  },
  name: 'articleListZk',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
.mnumber {
  font-size: 2rem;
  margin-left: 20px;
  font-weight: 600;
  color: rgb(0, 0, 0);
}
/* 日历和现在时间 */
.daylist {
  display: none;
}
.daylists {
  display: block;
  list-style: none;
  line-height: 2rem;
  text-indent: 2.5rem;
}
.daylists a {
  text-decoration: none;
  color: rgb(38, 130, 221);
  font-weight: bolder;
}
.daylists a li:hover {
  background-color: rgb(148, 171, 194);
}
.daylist {
  display: none;
}

.daylists {
  display: block;
  list-style: none;
  line-height: 2rem;
  text-indent: 2.5rem;
  margin: 0;
  padding: 0;
}

.daylists li a {
  text-decoration: none;
  color: rgb(38, 130, 221);
  font-weight: bolder;
}

.daylists li {
  padding-left: 2rem;
}

.daylists a li:hover {
  background-color: rgb(148, 171, 194);
}
</style>

<template>
  <div id="" class="month">
    <span class="mnumber" @click="mdod()">{{ month }}月</span>
    <ol>
      <li :class="{ daylists: misOpen, daylist: !misOpen }" v-for="(obj, index) in data" :key="index">
        <router-link :to="'/article/' + obj.hurl" @click="mdod()">
          {{ obj.title }}
        </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    month: {
      type: Number,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isOpen: false,
      misOpen: false
    }
  },
  methods: {
    mdod () {
      this.misOpen = !this.misOpen
    }
  },
  name: 'MonthItem'
}
</script>

<style lang="less" scoped>
.mnumber {
  font-size: 2rem;
  margin-left: 20px;
  font-weight: 600;
  color: rgb(0, 0, 0);
  display: block;
  width: 94%;
  background-color: #a8c3ff24;
}

/* 日历和现在时间 */
.daylist {
  display: none;
}

.daylists a {
  text-decoration: none;
  color: rgb(11, 133, 255);
  font-weight: bolder;
}

.daylists:hover {
  background-color: rgb(200, 227, 255);

  >a {
    color: rgb(108, 174, 240);
  }
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

.daylists ol a {
  text-decoration: none;
  color: rgb(38, 130, 221);
  font-weight: bolder;
}
</style>

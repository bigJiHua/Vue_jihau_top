<template>
  <div id="">
    <span class="list_year" @click.prevent="listod()">{{ year }}年</span>
    <div :class="{ list_down: isOpen, 'list_open': !isOpen }" id="new_article_list_m">
        <MonthItem v-for="(art, index) in AllData" :key="index" :month="art.month" :data="art.data"></MonthItem>
    </div>
  </div>
</template>

<script>
import MonthItem from './MonthItem.vue'

export default {
  props: {
    year: {
      type: Number,
      default: 0
    },
    AllData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      misOpen: false,
      isOpen: true
    }
  },
  methods: {
    listod () {
      this.isOpen = !this.isOpen
    }
  },
  name: 'articleListZk',
  components: {
    MonthItem
  }
}
</script>

<style lang="less" scoped>
span.list_year {
  font-size: 2rem;
  font-weight: 600;
  font-style: oblique;
  color: rgb(34, 32, 30);
  display: block;
  width: 100%;
  background-color: #d4dff029;
}

.list_down {
  height: 0;
  overflow: hidden;
}

.list_open {
  font-weight: 500;
}

</style>

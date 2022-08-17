<template>
  <div id="" class="itemarea">
    <div class="card">
      <p class="card_title">
        文章：<router-link :to="{ path: '/article/' + item.article_id }">{{
          item.title
        }}</router-link>
      </p>
      <article>{{ item.content | newcontent(item.content) }}...</article>
      <div class="details">
        <p>作者:{{ item.username }}</p>
        <p>标签:{{ item.lable }}</p>
        <p>关键词:{{ item.keyword }}</p>
        <p>时间:{{ item.pub_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {},
  filters: {
    newcontent (content) {
      const newArr = []
      for (const k in content) {
        if (content[k].match(/\p{sc=Han}/gu)) {
          newArr.push(content[k])
        }
      }
      return newArr.splice(0, 30).join('')
    }
  },
  name: 'PageuadM'
}
</script>

<style lang="less" scoped>
.card {
  background-color: rgba(240, 243, 246, 0.4);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}
@media only screen and (min-width: 755px) {
  .card {
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
  }
  .details {
    display: flex;
    justify-content: left;
    align-items: center;
    p {
      margin-right: 5px;
    }
  }
}
@media only screen and (max-width: 755px) {
  .card {
    border-radius: 10px;
    margin: 8px 0;
  }
  .details {
    display: flex;
    justify-content: left;
    align-items: center;
    p {
      color: black;
    }
  }
}
</style>

<template>
  <div id="" class="itemarea">
    <ul class="card_area">
      <li v-for="(item,index) in item" :key="index" >
        <div class="close" @click="toge(item.id)">
        <i class="glyphicon glyphicon-remove"></i>
        </div>
        <div class="card">
          <div class="card_img" v-if="!istrue">
            <img :src="item.cover_img" alt="文章图片">
          </div>
          <p class="card_title">
            文章：<router-link :to='{path:"/active/"+ item.article_id}'>{{item.title}}</router-link>
          </p>
          <article>
          {{ item.content | newcontent(item.content) }}...
          </article>
          <p v-if="istrue">留言:</p>
          <p class="card_comment" v-if="istrue">{{item.comment}}</p>
          <p class="card_pubdate" v-if="istrue">时间:{{item.pub_date}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    item: {
      type: Array,
      default () {
        return []
      }
    },
    istrue: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
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
  name: 'CardM',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
.card{
  max-width: 230px;
}
  .card_area{
    display: flex;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    .card{
      background-color: rgba(216, 216, 216, 0.276);
      padding: 20px;
      border-radius: 5px;
      margin: 5px;
      p{
        margin: 0;
      }
    }
    .card_img{
      padding: 10px;
      border-radius: 5px;
      background-color: rgb(207 238 249);
      height: 80px;
      width: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media only screen and (max-width: 755px) {
  .card_area{
    .card{
      background-color: rgba(216, 216, 216, 0.276);
      padding: 20px;
      border-radius: 5px;
      margin: 5px;
      p{
        margin: 0;
      }
    }
    .card_img{
      display: none;
    }
  }
}
.card_comment{
  background-color: rgba(201, 227, 243, 0.4);
  padding: 5px;
  border-radius: 5px;
}
</style>

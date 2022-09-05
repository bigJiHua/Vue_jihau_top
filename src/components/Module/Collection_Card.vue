<template>
  <div id="" class="itemarea">
    <ul class="card_area">
      <li v-for="(item,index) in item" :key="index" >
        <div class="close" @click="delgcc(item.article_id,item.id)">
        <i class="glyphicon glyphicon-remove"></i>
        </div>
        <div class="card">
          <div class="card_img" v-if="item.cover_img">
            <img :src="item.cover_img" alt="文章图片">
          </div>
          <p class="card_title">
            <span v-if="istrue">在</span>文章：<router-link :to='{path:"/article/"+ item.article_id}'>{{item.title}}</router-link>
          </p>
          <p v-if="!istrue">
          {{ item.content | newcontent(item.content) }}...
          </p>
          <p v-if="istrue">留言:</p>
          <p class="card_comment" v-if="istrue">{{item.comment}}</p>
          <p class="card_pubdate" v-if="istrue">时间:{{item.pub_date}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import delAction from '@/components/api/UserActionAPI/UserActiveGet'

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
    },
    met: {
      type: String,
      default: ''
    }
  },
  methods: {
    delgcc (artid, id) {
      if (this.met === 'gdn') {
        this.$dialog
          .confirm({
            message: '真的要取消点赞吗？'
          })
          .then(async () => {
            const data = {
              username: localStorage.getItem('Username'),
              articleid: artid,
              actmenthos: 'goodnum'
            }
            const { data: res } = await delAction.UserActive(data)
            this.$toast({
              message: res.message,
              position: 'top'
            })
            if (res.status === 200) {
              this.$toast({
                message: '取消点赞成功',
                position: 'top'
              })
              this.reload()
            }
          })
      } else if (this.met === 'cols') {
        this.$dialog
          .confirm({
            message: '真的要取消收藏吗？'
          })
          .then(async () => {
            const data = {
              username: localStorage.getItem('Username'),
              articleid: artid,
              actmenthos: 'collect'
            }
            const { data: res } = await delAction.UserActive(data)
            this.$toast({
              message: res.message,
              position: 'top'
            })
            if (res.status === 200) {
              this.$toast({
                message: '取消收藏成功',
                position: 'top'
              })
              this.reload()
            }
          })
      } else if (this.met === 'comm') {
        this.$dialog
          .confirm({
            message: '真的要删除这条留言吗？'
          })
          .then(async () => {
            const data = {
              id: id,
              username: localStorage.getItem('Username'),
              article_id: artid
            }
            const { data: res } = await delAction.UserActiveDel(data)
            this.$toast({
              message: res.message,
              position: 'top'
            })
            if (res.status === 200) {
              this.$toast({
                message: '删除评论成功',
                position: 'top'
              })
              this.reload()
            }
          })
      }
    },
    reload () {
      this.$emit('reload')
    }
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
  name: 'CardM'
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
  padding: 5px 5px 15px;
  border-radius: 5px;
  overflow: overlay;
}
</style>

<template>
  <div id="" class="UserselfArea" v-if="Users">
    <div class="userpic">
      <img :src="Users.user_pic" alt="头像" class="pic" />
    </div>
    <p>
      <span class="userheader">名字:</span
      ><span class="userdata">{{ Users.username }}</span>
    </p>
    <p>
      <span class="userheader">身份:</span
      ><span class="userdata">{{ Users.useridentity }}</span>
    </p>
    <p>
      <span class="userheader">用户名:</span
      ><span class="userdata">{{ Users.nickname }}</span>
    </p>
    <p>
      <span class="userheader">生日:</span
      ><span class="userdata">{{ Users.birthday }}</span>
    </p>
    <p>
      <span class="userheader">城市:</span
      ><span class="userdata">{{ Users.city }}</span>
    </p>
    <p>
      <span class="userheader">性别:</span
      ><span class="userdata">{{ Users.sex }}</span>
    </p>
    <p>
      <span class="userheader">邮箱:</span
      ><span class="userdata">{{ Users.email }}</span>
    </p>
    <p class="usercontent">
      <span class="userheader">个性签名:</span
      ><span class="userdata">{{ Users.user_content }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['Users'],
  data () {
    return {}
  },
  methods: {},
  // 监听器
  watch: {},
  computed: {},
  filters: {},
  name: 'UserSelf',
  components: {}
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  .userheader {
    display: inline-block;
    padding: 5px 10px;
    margin-right: 10px;
    width: 10rem;
    font-size: 1.5rem;
    font-weight: bolder;
  }
  .usercontent {
    background-color: rgba(208, 224, 237, 0.4);
    padding: 20px;
    border-radius: 12px;
  }
  .userpic {
    position: absolute;
    top: 0;
    right: 5vw;
    height: 100px;
    width: 100px;
    padding: 15px 10px;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgba(220, 220, 220, 0.8);
    .pic {
      width: 100%;
      height: 100%;
    }
  }
}
@media only screen and (max-width: 755px) {
  #User,
  #cagUsers {
    > p > span {
      font-size: 2rem;
    }
  .userheader {
    display: inline-block;
    padding: 5px 10px;
    margin-right: 10px;
    width: 9rem;
    font-size: 1.5rem;
    font-weight: bolder;
  }
    .usercontent {
      background-color: rgba(220, 124, 124, 0.8);
      padding: 10px;
      border-radius: 12px;
    }
    .userpic {
      height: 100px;
      width: 100px;
      padding: 15px 10px;
      border-radius: 50%;
      overflow: hidden;
      background-color: rgba(220, 220, 220, 0.8);
      .pic {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

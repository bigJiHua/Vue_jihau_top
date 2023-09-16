<template>
  <div id="" class="UserselfArea" v-if="Users">
    <div class="UserBox">
      <div class="userpic">
        <img :src="Users.user_pic" alt="头像" class="pic" />
      </div>
      <span class="name">{{ Users.username }}</span>
    </div>
    <p>
      <span class="userheader">UID:</span><span class="userdata">{{ Users.user_id }}</span>
    </p>
    <p>
      <span class="userheader">身份:</span><span class="userdata">{{ Users.useridentity }}</span>
    </p>
    <p>
      <span class="userheader">注册日期:</span><span class="userdata">{{ registerDay }}</span>
    </p>
    <p>
      <span class="userheader">生日:</span><span class="userdata">{{ Users.birthday }}</span>
    </p>
    <p>
      <span class="userheader">城市:</span><span class="userdata">{{ Users.city }}</span>
    </p>
    <p>
      <span class="userheader">性别:</span><span class="userdata">{{ Users.sex }}</span>
    </p>
    <p>
      <span class="userheader">邮箱:</span><span class="userdata">{{ Users.email }}</span>
    </p>
    <p class="usercontent">
      <span class="userheader">个性签名:</span><span class="userdata">{{ Users.user_content }}</span>
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
  computed: {

    // 计算注册天数
    registerDay () {
      const targetDate = this.Users.registerDate
      const currentDate = new Date() // 获取当前日期和时间
      const timeDifference = currentDate.getTime() - targetDate // 计算时间差（毫秒数）
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) // 计算天数差
      return `${Math.abs(daysDifference)}天`
    }
  },
  filters: {},
  name: 'UserSelf',
  components: {}
}
</script>

<style lang="less" scoped>
.UserBox {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}

.name {
  color: #fb7299;
  font-size: 6rem;
}

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
    >p>span {
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

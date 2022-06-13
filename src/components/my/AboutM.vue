<template>
  <div id="" class="about_m">
    <div class="document_author_introduce">
      <div class="row phone_Viewset">
        <div class="col-md-4 author_logobox">
          <div class="author_logoset">
            <a href="https://about.jihau.top">
              <img
                src="https://www.jihau.top/img/logo.png"
                class="author_logo"
                alt="logo"
              />
            </a>
          </div>
        </div>
        <div class="col-md-3 author_name coker">
          <a href="https://about.jihau.top">JiHua</a>
        </div>
      </div>
      <div class="phone_Viewset introduce_doc" id="introduce_doc">
        <p>站长简介</p>
        <p>
          你好，我是此网站的站长吉华(<a
            href="https://about.jihau.top"
            class="coker"
            >JiHua</a
          >)，很高兴认识你，也很荣幸您能访问我的网站，目前网站正在陆续搭建中，更多新功能等待上线！
        </p>
        <p>站点将陆续完成主页、分页及内容界面搭建，敬请期待！</p>
      </div>
    </div>
  </div>
</template>

<script>
// 导入组件
// import  from ''

export default {
  props: [],
  data () {
    return {}
  },
  // 生命周期初始化函数
  // created: {
  //
  // },
  // 方法
  methods: {},
  // 监听器
  watch: {},
  // 当前组件的计算属性
  computed: {},
  // 过滤器
  filters: {},
  // Vue 中自定义属性
  directives: {},
  name: 'AboutMe',
  components: {
    // 导入组件
  }
}
</script>

<style lang="less" scoped>
/* 右侧作者设置 */
.document_author_introduce {
  border-radius: 11px 11px 0 0;
  background-color: rgba(240, 243, 246, 0.8);
  padding: 0 20px;
}
.author_logobox {
  margin: 10px 0 0 1.5vw;
}
.author_logoset {
  padding: 10px 8px;
  border-radius: 50px;
  width: 80px;
  height: 80px;
  background-color: rgba(220, 221, 221, 0.884);
}

.author_logo {
  width: 60px;
  height: 55px;
}
.author_name {
  padding: 8px;
}
.author_name > a {
  color: rgb(251, 114, 153);
  font-size: 5.5rem;
}
.author_name > a:hover {
  color: rgb(251, 114, 153);
  text-decoration: none;
}
.introduce_doc {
  text-align: justify;
}
.introduce_doc > p {
  font-size: 1.8rem;
  margin: 0;
}
.introduce_doc > p:first-child {
  text-align: center;
  margin: 0;
}
.introduce_doc > p:nth-child(2) {
  text-indent: 3.6rem;
}
.introduce_doc > p:nth-child(3) {
  text-indent: 3.6rem;
}
.phone_Viewset{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

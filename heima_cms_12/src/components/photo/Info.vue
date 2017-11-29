<template>
  <div class="photo-info">
    <header>
      <h2 class="title">{{info.title}}</h2>
      <p class="mui-ellipsis">
        <span>发表时间：{{ info.add_time | date }}</span>
        <span>点击次数：{{ info.click }}次</span>
      </p>
    </header>
    <div class="thumb-img">
      <img class="preview-img" v-for="(item, index) in imgThumbList" :src="item.src" :key="index" height="100" @click="$preview.open(index, imgThumbList)">
    </div>
    <div class="content" v-html="info.content"></div>

    <!-- 评论组件 -->
    <Comment :commentId="id"></Comment>
  </div>
</template>

<script>
// 导入评论组件
import Comment from '../common/Comment.vue'

export default {
  data() {
    return {
      // 图片详情数据
      info: {},
      // 进入到页面，就从路由中取出id
      id: this.$route.params.id,
      // 缩略图数组
      imgThumbList: []
    };
  },

  created() {
    this.getImageInfo()
    this.getThumbImages()
  },

  methods: {
    getImageInfo() {
      // 发送请求获取图片详情数据
      this.$http.get(`api/getimageInfo/${this.id}`).then(res => {
        const body = res.body

        if (body.status === 0) {
          this.info = body.message[0];
        }
      });
    },

    getThumbImages() {
      this.$http.get(`api/getthumimages/${this.id}`)
        .then(res => {
          const body = res.body

          // && 逻辑与
          // 只有第一个表达式的值为true，那么才会计算第二个表达式的值
          // 注意：如果我们书写代码规范是没有分号结尾的，那么注意代码不能以 [] / () 开头，否则会造成语法错误。解决方式：在[]/()前面添加分号即可
          // ;(body.status === 0) && (this.imgThumbList = body.message)
          if(body.status === 0) {
            this.imgThumbList = body.message.map(item => {
              return {
                src: item.src,
                img: item.src,
                url: item.url,
                w: 600,
                h: 400
              }
            })
          }
        })
    }
  },

  components: { Comment }
};
</script>

<style lang="scss">
.photo-info {
  padding-left: 3px;
  padding-right: 3px;

  .thumb-img {
    border-top: 1px solid #ccc;

    img {
      margin: 10px;
      box-shadow: 0 0 15px #ccc;
    }
  }

  .title {
    font-size: 18px;
    color: #26a2ff;
    text-align: center;
  }

  .mui-ellipsis {
    display: flex;
    justify-content: space-between;
    padding: 0 3px;
  }

  .content {
    font-size: 14px;
    line-height: 28px;
    padding-top: 20px;
  }
}
</style>

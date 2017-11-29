<template>
  <div>
    <header>
      <h2>{{ info.title }}</h2>
      <p class="mui-ellipsis">
        <span>发表时间：{{ info.add_time | date }}</span>
        <span>点击次数：{{ info.click }}次</span>
      </p>
    </header>
    <div v-html="info.content" class="news-content"></div>

    <!-- 评论组件 -->
    <!-- 将当前功能的id值，通过组件通讯的方式传递个评论组件 -->
    <!-- 注意：因为 info.id 是异步获取的数据，所以，有可能存在 Comment组件渲染完成了，但是异步请求的数据还没有获取到的，，那么此时，传递给Comment组件的id为：undefined -->
    <Comment :commentId="info.id"></Comment>

    <!-- 第二种思路： -->
    <!-- 给组件添加 v-if 指令，一开始让指令的值为false，表示不渲染组件 -->
    <!-- 等到数据获取到以后，将指令的值设置true，也就是获取到数据以后再渲染组件 -->
    <!-- 此时，一定能够获取到数据中的id值 -->
    <!-- <Comment :commentId="info.id" v-if="isLoaded"></Comment> -->
  </div>
</template>

<script>
// 如何在当前组件中使用 评论组件？？？
// 注意：单文件组件不是全局组件，所以，还是需要按照局部组件的方式来使用
import Comment from '../common/Comment.vue'

export default {
  created() {
    this.getNewsInfo()
  },

  data() {
    return {
      info: {},
      // 表示数据是否加载成功
      isLoaded: false
    }
  },

  methods: {
    getNewsInfo() {
      // this.$http.get('http://182.254.146.100:8899/api/getnew/' + this.$route.params.id)

      this.$http.get(`api/getnew/${this.$route.params.id}`)
        .then(res => {
          const body = res.body
          this.isLoaded = true

          if(body.status === 0) {
            this.info = body.message[0]
          }
        })
    }
  },

  // 在当前组件中，通过 components 来注册评论组件
  components: {
    Comment
  }
}
</script>

<style>
/* scoped 属性：表示这个样式只对当前组件起作用 */
/* scoped 属性：限制了只对当前组件模板的样式其作用，如果是动态获取的HTML结构，那么，我们自己写的样式是不会起作用的！！！ */

header {
  padding: 0 5px;
  border-bottom: 1px solid #ccc;
}

h2 {
  font-size: 18px;
}

.mui-ellipsis {
  color: #26a2ff;
  display: flex;
  justify-content: space-between;
}

.news-content {
  padding: 0 5px;
}
.news-content img {
  width: 100%;
}
</style>

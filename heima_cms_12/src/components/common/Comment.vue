<template>
  <div>
    <!-- 因为 comment 类中，修改了padding属性，而 该组件继承过来的 content 类（App.vue中）中也修改了 padding，因此产生了冲突。因此，在该元素的外面又包裹了一层div，解决这个样式冲突问题 -->
    <div class="comment">
      <h2>发表评论</h2>
      <textarea cols="30" rows="3" placeholder="请输入评论内容，最多输入120字" v-model="content"></textarea>
      <mt-button type="primary" size="large" @click="commit">发表评论</mt-button>

      <ul class="comment-list">
        <li class="comment-item" v-for="(item, index) in list" :key="index">
          <div class="comment-item-header">
            <span>第{{index + 1}}楼</span>
            <span>用户：{{item.user_name}}</span>
            <span>发表时间：{{item.add_time | date}}</span>
          </div>
          <div class="comment-item-content">
            {{ item.content }}
          </div>
        </li>
      </ul>
      <mt-button type="primary" size="large" plain @click="loadMore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  // 如何在子组件中获取父组件传递的数据？？？
  props: ['commentId'],

  created() {
    this.getComments()
  },

  data() {
    return {
      // 评论数据
      list: [],
      // 当前评论页码
      curPage: 1,
      // 获取评论内容
      content: ''
    }
  },

  methods: {
    getComments() {
      // console.log(this.commentId);
      if(!this.commentId) {
        // 如果没有获取到评论功能的id值，那么就不再 发送请求
        return
      }

      const url = `api/getcomments/${this.commentId}?pageindex=${this.curPage}`
      // this.$http.get(url, { needLoading: true })
      // this.$http.get(url)
      this.$axios.get(url)
        .then(res => {
          // const body = res.body
          const body = res.data
          if(body.status === 0) {
            // this.list = body.message
            // 因为加载更多功能需要复用这个方法，所以，我们将原来的list赋值修改为数组合并
            // this.list = this.list.concat(body.message)

            // ES6中的属性扩散 ...
            // 作用：表示将...后面的数组（或对象）中的数据一项一项的出去来，并且放到当前位置
            this.list = [...this.list, ...body.message]
          }
        })
    },

    loadMore() {
      // 加载更多评论数据
      this.curPage++

      this.getComments()
    },

    commit() {
      // 发表评论
      if(this.content.trim() === '') {
        // 可以使用以下形式达到两个目的
        // 1 调用 Toast() 方法
        // 2 停止代码执行
        return Toast({
          message: '评论内容不能为空',
          duration: 1000
        })
      }

      const url = `api/postcomment/${this.commentId}`
      // 第一个参数：表示接口地址
      // 第二个参数：表示发送给接口的数据是一个对象
      // 第三个参数：是一个配置对象，使用 emulateJSON 来设置请求的content-type
      // this.$http.post(url, {content: this.content}, {emulateJSON: true})
      this.$axios.post(url, `content=${this.content}`)
        .then(res => {
          const body = res.data
          if(body.status === 0) {
            this.list.unshift({
              add_time: new Date(),
              content: this.content,
              user_name: '匿名用户'
            })

            Toast({
              message: '恭喜，发表成功',
              duration: 500
            })

            this.content = ''
          }
        })
    }
  },

  watch: {
    // 监视传递过来的id值的变化，当数据发生变化的时候
    // 我们就重新发送请求获取数据
    commentId() {
      this.getComments()
    }
  }
}
</script>

<!-- lang 属性表示当前可以使用 scss 的语法 -->
<style lang="scss" scoped>
  .comment {
    padding: 10px;
    border-top: 1px solid #ccc;

    h2 {
      font-size: 20px;
    }
  }

  .comment-list {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 5px;

    .comment-item-header {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      background-color: #eee;
      line-height: 26px;
      align-items: center;
    }

    .comment-item-content {
      padding: 10px;
      font-size: 14px;
    }
  }
</style>

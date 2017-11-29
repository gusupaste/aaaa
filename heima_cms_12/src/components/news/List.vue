<template>
  <ul class="mui-table-view mui-table-view-chevron">
    <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
      <!-- 注意：我们需要从 item中获取到id属性，然后在前面拼接固定的字符串值，最终得到我们需要的路由地址 -->
      <router-link :to="'/home/newsinfo/' + item.id" class="mui-navigate-right">
        <img class="mui-media-object mui-pull-left" :src="item.img_url">
        <div class="mui-media-body">
          {{ item.title }}
          <p class="mui-ellipsis">
            <span>发表时间：{{item.add_time | date}}</span>
            <span>点击次数：{{item.click}}次</span>
          </p>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
// import moment from 'moment'

export default {
  created() {
    this.getNewsList()
  },

  // 因为其他组件中也要使用这个过滤器，所以，我们需要将该过滤器修改为全局过滤器实现复用！
  /* filters: {
    // ES6中函数默认参数的写法
    // 作用：如果我们调用方法的时候，没有传入format参数，那么就使用指定的默认参数
    //       如果调用方法的时候，传入了fromat参数，那么就以传入的值为准
    date(value, format = 'YYYY-MM-DD HH:mm:ss') {
      // 借助 moment.js 来格式化时间
      // console.log(value);
      // return moment(value).format('YYYY-MM-DD HH:mm:ss')
      return moment(value).format(format)
    }
  }, */

  data() {
    return {
      list: []
    }
  },

  methods: {
    getNewsList() {
      this.$http.get('api/getnewslist')
        .then(res => {
          const body = res.body
          console.log(body);
          if(body.status === 0) {
            this.list = body.message
          }
        })
    }
  }
}
</script>

<style scoped>
/* scoped表示当前style中的样式只对组件中我们写的标签起作用，即便是动态绑定的数据中包含了HTML标签，那么，也是不会起作用的！因为这些HTML内容不是我们自己手动写出来 */

.mui-table-view-chevron .mui-table-view-cell {
    padding-right: 55px;
}

.mui-ellipsis {
  color: #26a2ff;
  font-size: 12px;
  margin-top: 5px;
  /* flex 布局 */
  display: flex;
  /* 对齐方式，两个元素之间有空格 */
  justify-content: space-between;
}

.mui-table-view-cell {
  padding-bottom: 8px;
}

/* 文本溢出 */
.mui-table-view .mui-media, .mui-table-view .mui-media-body {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>

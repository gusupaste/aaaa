<template>
  <!-- 注意：唯一的根元素 -->
  <div>
    <!-- 页头 -->
    <mt-header fixed title="黑马程序员 | 12期Vue项目">
      <a to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </a>
    </mt-header>

    <!-- 内容 -->
    <router-view class="content"></router-view>

    <!-- 页脚 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/vip" class="mui-tab-item">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to="/cart" class="mui-tab-item">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{ cartCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/search" class="mui-tab-item">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
// 导入购物车小图标的样式
import './lib/mui/css/icons-extra.css'

export default {
  computed: {
    cartCount() {
      // 通过这个计算属性，来展示购物车数量
      // 因为只要vuex中的数据发送改变了，这个数量就要被更新，所以，我们使用计算属性
      // 因为 计算属性 依赖于 cart，所以，只要cart中的数据发送变化，那么这个计算属性就会重新计算
      /* let count = 0
      this.$store.state.cart.forEach(item => count += item.count)
      return count */

      // return this.$store.state.cart.reduce(function(prev, item) {
      //   return item.count + prev
      // }, 0)

      return this.$store.state.cart.reduce((prev, item) => item.count + prev, 0)
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #fff;
}

.content {
  padding-top: 40px;
  padding-bottom: 50px;
}
</style>

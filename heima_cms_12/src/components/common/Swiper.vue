<template>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="(item, index) in swipeList" :key="index">
      <img :src="item.img" alt="">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  // 获取到使用该组件的组件传递过来的轮播图数据列表
  props: ['swipeList']
}
</script>

<style>

</style>

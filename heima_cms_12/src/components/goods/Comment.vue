<template>
  <Comment :commentId="$route.params.id"></Comment>
</template>

<script>
// 导入 评论组件
import Comment from '../common/Comment.vue'

export default {
  components: { Comment }
}
</script>

<style>

</style>

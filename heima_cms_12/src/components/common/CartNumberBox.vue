<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" v-model="initCount" @change="changeNum" ref="num">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
// 导入 mui.js
// import mui from '../../lib/mui/js/mui.min.js'

export default {
  // props中的数据，相当于 data 中的数据，因此，可以直接用在 指令中
  props: ['initCount', 'id'],

  mounted() {
    // 初始化 组件
    this.$mui('.mui-numbox').numbox()
  },

  methods: {
    changeNum() {
      // 因为是获取元素的值，页面中可能存在多个，如果按照以下的写法，只能获取到第一个元素的值
      // const count = mui('.mui-numbox').numbox().getValue()
      const count = this.$refs.num.value - 0

      // console.log(count);
      // 将数量的改变同步到store中
      this.$store.commit('changeCart', { id: this.id, count })
    }
  }
}
</script>

<style scoped>
  .mui-numbox {
    height: 26px;
  }
</style>

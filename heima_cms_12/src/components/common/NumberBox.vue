<template>
  <div id="numbox" class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="changeNum">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
// 导入 mui.js
// import mui from '../../lib/mui/js/mui.min.js'

export default {
  props: ['maxNum'],

  mounted() {
    // 初始化 组件
    this.$mui('#numbox').numbox()
  },

  methods: {
    changeNum() {
      // console.log('change event');
      const count = this.$mui('#numbox').numbox().getValue()
      // 触发父组件中的事件
      this.$emit('getCount', count)
    }
  },

  // 此处, 需要监视数据变化才行
  watch: {
    // maxNum 的值是由父组件通过 ajax异步请求获取的数据
    // 在渲染组件的时候, 数据还没有获取到, 此时, 子组件中获取的值为: undefined
    // 通过 监视该数据的变化, 在获取到数据后, 再设置即可!!!
    maxNum() {
      this.$mui('#numbox').numbox().setOption('max', this.maxNum)
    }
  }
}
</script>

<style>

</style>

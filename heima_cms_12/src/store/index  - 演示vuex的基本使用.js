// 1 导入 vue
import Vue from 'vue'
// 2 导入 vuex
import Vuex from 'vuex'
// 安装 vuex 插件
Vue.use(Vuex)

const store = new Vuex.Store({
  // 数据（状态）
  // 读取数据：store.state.count
  state: {
    count: 10
  },

  // 用来操作数据的方法
  // 修改数据：store.commit('addCount', 参数)
  mutations: {
    addCount(state, arg) {
      // 参数：state表示 上面的 state对象
      // 实现 count +1
      // state.count++
      state.count += arg.count
      console.log(arg.abc);
      console.log('这是通过 mutations 中的addCount 方法修改了count值');
    }
  }
})

export default store
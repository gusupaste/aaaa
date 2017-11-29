// 1 导入 vue
import Vue from 'vue'
// 2 导入 vuex
import Vuex from 'vuex'
// 安装 vuex 插件
Vue.use(Vuex)

// 进入页面从 localstorage 中取出存储的商品数据
const cart = JSON.parse(localStorage.getItem('cart')) || []

const store = new Vuex.Store({
  // 数据（状态）
  // 读取数据：store.state
  /* 
    购物车中应该存储什么格式的数据
    1 商品id
    2 商品数量

    数据格式：
    [
      { id: 87, count: 4 },
      { id: 88, count: 1 },
    ]
  */
  state: {
    cart
  },

  // 用来操作数据的方法
  // 修改数据：store.commit('addCount', 参数)
  mutations: {
    addGoods(state, payload) {
      // state 表示上面的状态数据
      // payload 表示调用这个方法传递过来的参数

      // 添加数据的思路：
      // 1 判断传递过来的id，是否包含在state.cart中
      // 2 如果没有，直接push({ id: , count:  })
      // 3 如果有，就找到id对应的count与传递过来的count加起来
      const isExist = state.cart.some(item => {
        item.id = item.id - 0
        payload.id = payload.id - 0

        // 注意：item.id 和 payload.id 类型的问题，又可能是字符串有可能是数值
        if(item.id === payload.id) {
          item.count += payload.count
          // 返回true，让some循环停止
          return true
        }
      })

      // 没有的情况
      if(!isExist) {
        // state.cart.push( payload )
        state.cart.push( payload )
      }

      // 处理state中的cart后，将数据存储到 localstorage 中
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    // 修改购物车数量
    changeCart(state, payload) {
      state.cart.some(item => {
        if(item.id == payload.id) {
          item.count = payload.count
          return true
        }
      })

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    del(state, id) {
      // 根据id 删除数据
      state.cart.some((item, index) => {
        if(item.id == id) {
          state.cart.splice(index, 1)
          return true
        }
      })

      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  }
})

export default store
<template>
  <div>
    <div class="mui-card" v-for="(item, index) in list" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner cart">
          <mt-switch v-model="selectedList[item.id]"></mt-switch>
          <img :src="item.thumb_path" alt="">
          <div>
            <h2>{{item.title}}</h2>
            <div class="info">
              <span>￥{{item.sell_price}}</span>
              <!-- getGoodsCount 是一个计算属性，它的值是：{ 89: 5, 90: 4 } -->
              <CartNumberBox :initCount="getGoodsCount[item.id]" :id="item.id"></CartNumberBox>
              <a href="#" @click.prevent="del(item.id)">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner cart-buy">
          <div>
            <p>总计（不包含运费）</p>
            <p>已勾选商品&nbsp;<span>{{getTotal}}</span>&nbsp;件&nbsp;&nbsp;总价：<span>￥{{ getPrice }}</span></p>
          </div>
          <div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入购物车 numberbox 组件
import CartNumberBox from "../common/CartNumberBox.vue";

export default {
  created() {
    // 获取购买商品信息的接口
    this.getCartList();
  },

  data() {
    return {
      // 购买的商品列表
      list: [],

      // 是否选中（因为购买的是哪些商品我们不知道，所以，这个数据应该是动态的！）
      selectedList: {}
      // selectedList: {
      //   87: true,
      //   90: true
      // }
    };
  },

  methods: {
    getCartList() {
      // 接口地址：api/goods/getshopcarlist/:ids
      // 示例：/api/goods/getshopcarlist/87,88,89

      // 思路：从 store 中获取id，拼接出接口需要的格式
      // const ids = this.$store.state.cart.map(item => item.id).join(",");
      const tempSelectedList = {}
      const ids = this.$store.state.cart.map(item => {
        // 处理每一个商品的选中状态
        tempSelectedList[item.id] = true

        // 这种方式无法实现响应式
        // this.selectedList[item.id] = true
        return item.id
      }).join(",")
      this.selectedList = Object.assign({}, tempSelectedList)

      if (ids.length === 0) {
        // 判断如果购物车中没有数据，就不发送请求
        return;
      }

      this.$http.get(`api/goods/getshopcarlist/${ids}`).then(res => {
        const body = res.body;
        if (body.status === 0) {
          this.list = body.message;

          // 为每一个商品添加一个控制开关的数据（布尔值，默认值为：true）
          // this.list.forEach(() => {
          //   this.selectedList.push(true)
          // })
        }
      });
    },

    del(id) {
      // 删除store中的数据
      this.$store.commit('del', id)

      // 删除购物车商品
      this.list.some((item, index) => {
        if(item.id == id) {
          this.list.splice(index, 1)

          // 注意:还需要将存储的状态 selectedList 中的数据删除
          // 问题: 如何删除对象的属性???
          delete this.selectedList[id]
          return true
        }
      })
    }
  },

  computed: {
    // 计算属性的值，是由当前函数的返回值决定的
    getGoodsCount() {
      // 因为是一个计算属性，所以，无法当做函数调用，否则，会报错！
      // { id: count, id: count }
      // return { 89: 5, 90: 4, 93: 3 }
      const id2Count = {};

      this.$store.state.cart.forEach(item => {
        id2Count[item.id] = item.count;
      });

      return id2Count;
    },

    // 获取商品总数
    getTotal() {
      // 根据每个商品开关的状态，来决定是否处理当前商品的数量
      // 1 如果开关状态为：true，那就计入商品总数
      // 2 如果开关状态为：false，那么就不计入商品总数
      let count = 0
      this.$store.state.cart.forEach(item => {
        if(this.selectedList[item.id]) {
          count += item.count
        }
      })
      return count
    },

    // 商品总价
    getPrice() {
      let totalPrice = 0
      this.$store.state.cart.forEach(item => {
        if(this.selectedList[item.id]) {
          // 商品数量
          const count = item.count
          // 商品单价(  )
          let price = 0
          if(this.list.length !== 0) {
            // price = this.list.find(function(goods) {
            //   return goods.id == item.id
            // }).sell_price

            price = this.list.find(goods => goods.id == item.id).sell_price
          }
          /* let price = 0
          for(var i = 0; i < this.list.length; i++) {
            if(item.id == this.list[i].id) {
              price = this.list[i].sell_price
              break
            }
          } */

          totalPrice += count * price
        }
      })
      return totalPrice
    }
  },

  components: { CartNumberBox }
};
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  align-items: center;

  h2 {
    font-size: 14px;
  }

  img {
    width: 60px;
    height: 60px;
  }

  span {
    color: #f00;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.cart-buy {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #f00;
  }
}
</style>

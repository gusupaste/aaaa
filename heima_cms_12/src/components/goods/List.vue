<template>
  <div class="goods-list">
    <ul>
      <li class="goods-item" v-for="item in list" :key="item.id" @click="goGoodsInfo(item.id)">
        <img :src="item.img_url" alt="">
        <h2>{{item.title}}</h2>
        <div>
          <span class="price-cur">￥{{item.sell_price}}</span>
          <span class="price-prev">￥{{item.market_price}}</span>
        </div>
        <p>
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </li>
    </ul>

    <!-- 加载更多 -->
    <mt-button plain size="large" type="primary" @click="loadMoreGoods" v-if="isShow">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  created() {
    this.getGoodsList()
  },

  data() {
    return {
      // 商品列表
      list: [],
      // 当前页码
      page: 1,
      // 是否显示加载更多按钮
      isShow: true
    }
  },

  methods: {
    getGoodsList() {
      // 获取商品列表
      this.$http.get(`api/getgoods?pageindex=${this.page}`)
        .then(res => {
          const body = res.body

          if(body.status === 0) {
            // this.list = body.message
            this.list = [...this.list, ...body.message]

            // 模拟实现加载更多按钮隐藏
            // 实际上需要根据服务端返回的总页数和当前页数进行判断！！！
            if(body.message.length < 10) {
              this.isShow = false
            }
          }
        })
    },

    loadMoreGoods() {
      // 加载更多商品
      this.page += 1

      this.getGoodsList()
    },

    goGoodsInfo(id) {
      // 通过编程式导航实现路由跳转
      this.$router.push({ name: 'goodsinfo', params: { id } })
    }
  }
}
</script>

<style lang="scss">
  .goods-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .goods-item {
      width: 48%;
      margin: 1%;
      padding: 3px;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px #ccc;

      h2 {
        font-size: 14px;
      }

      div {
        font-size: 14px;
        margin-top: 5px;

        .price-cur {
          color: #f00;
          margin-right: 10px;
        }
        .price-prev {
          text-decoration: line-through;
          color: #ccc;
        }
      }

      img {
        width: 100%;
      }

      p {
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 0 3px;
        color: #ccc;
      }
    }
  }
</style>

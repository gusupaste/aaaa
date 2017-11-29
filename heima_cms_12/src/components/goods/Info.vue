<template>
  <div class="goods-info">
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 轮播图组件 -->
          <Swiper :swipeList="list"></Swiper>
        </div>
      </div>
    </div>

    <!-- 飞舞的小球 -->
    <transition 
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter">
      <div class="ball" v-show="isShow"></div>
    </transition>

    <!-- 商品数据展示 -->
    <div class="mui-card">
      <div class="mui-card-header">{{info.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner info">
          <p>
            <span class="market-price">市场价：<del>￥{{info.market_price}}</del></span>
            <span>
              销售价：
              <span class="sell-price">￥{{info.sell_price}}</span>
            </span>
          </p>
          <div class="numbox-container">
            购买数量：
            <NumberBox :maxNum="info.stock_quantity" @getCount="getCount"></NumberBox>
          </div>
          <div>
            <mt-button type="primary">立即购买</mt-button>
            <mt-button type="danger" @click="addCart">加入购物车</mt-button>

            
            <!-- 测试：
              展示 store 中的数据
              <mt-button type="danger" @click="fn">测试vuex</mt-button>
              {{ $store.state.count }} -->
          </div>
        </div>
      </div>
    </div>
    
    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p>商品货号：{{info.goods_no}}</p>
            <p>库存情况：{{info.stock_quantity}}件</p>
            <p>上架时间：{{info.add_time | date}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDetails">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment">商品评论</mt-button>
      </div>
    </div>
    
  </div>
</template>

<script>
// 导入 Swiper 组件
import Swiper from '../common/Swiper.vue'
// 导入 numberbox 组件
import NumberBox from '../common/NumberBox.vue'

export default {
  created() {
    this.getThumbImages()
    this.getGoodsInfo()
  },
  data() {
    return {
      // 商品的id
      id: this.$route.params.id - 0,
      // 商品轮播图数据
      list: [],
      // 商品详情数据
      info: {},
      // 小球默认隐藏
      isShow: false,
      // 购买数量（子组件传递过来的数据）
      count: 1
    }
  },

  methods: {
    getThumbImages() {
      // 获取商品详情中的轮播图
      this.$http.get(`api/getthumimages/${this.id}`)
        .then(res => {
          const body = res.body

          if(body.status === 0) {
            this.list = body.message
          }
        })
    },

    getGoodsInfo() {
      // 获取商品详情数据
      this.$http.get(`api/goods/getinfo/${this.id}`)
        .then(res => {
          const body = res.body

          if(body.status === 0) {
            this.info = body.message[0]
          }
        })
    },

    // 获取子组件数据的方法
    getCount(count) {
      // count 就是子组件中选择的数量
      // console.log(count);
      this.count = count
    },


    /* // 测试 vuex
    fn() {
      // 调用 store 中的方法
      this.$store.commit('addCount', { count: 2, abc: 'aaa' })
    }, */

    addCart() {
      // 小球
      this.isShow = !this.isShow

      // 调用 store 中添加商品的方法，将当前商品的id以及购买数量传递给mutation
      this.$store.commit('addGoods', { count: this.count, id: this.id })
    },
    // 飞舞的小球
    beforeEnter(el) {
      // el 表示当前DOM对象
      el.style.transform = 'translate(0, 0)'
    },
    enter(el, done) {
      el.offsetWidth

      el.style.transform = `translate(86px, ${window.pageYOffset + 232}px)`
      done()
    },
    afterEnter() {
      this.isShow = !this.isShow
    },

    goDetails() {
      this.$router.push({ name: 'goodsdetail', params: { id: this.id } })
    },
    goComment() {
      this.$router.push({ path: `/home/goodscomment/${this.id}` })
    }
  },

  components: { Swiper, NumberBox }
}
</script>

<style lang="scss">
  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      text-align: center;

      img {
        height: 100%;
        width: auto;
      }
    }
  }

  .info {

    p {
      color: #000;

      .market-price {
        margin-right: 10px;
      }

      .sell-price {
        color: #f00;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .mui-numbox {
      height: 25px;
    }

    .numbox-container {
      margin-bottom: 10px;
    }

    .mint-button {
      font-size: 14px;
      height: 34px;
    }
  }

  .mui-card-footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
  }

  .ball {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #f00;
    position: absolute;
    z-index: 11;
    top: 385px;
    left: 151px;
    /* 通过 贝塞尔曲线 设置动画效果 */
    transition: all 0.6s cubic-bezier(.52,-0.54,.83,.67);
  }
</style>

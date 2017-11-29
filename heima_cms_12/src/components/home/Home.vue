<template>
  <!-- <h1>这是 Home 组件</h1> -->
  <div>
    <!-- 轮播图组件 -->
    <Swiper :swipeList="swipeList"></Swiper>

    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <!-- 注意：此处的to属性我们添加了 /home前缀，目的是为了：让底部的首页菜单高亮 -->
          <router-link to="/home/newslist">
            <span class="mui-icon home-icon-1"></span>
            <div class="mui-media-body">新闻咨询</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photolist">
                <span class="mui-icon home-icon-2"></span>
                <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodslist">
                <span class="mui-icon home-icon-3"></span>
                <div class="mui-media-body">商品购买</div>
         </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon home-icon-4"></span>
                <div class="mui-media-body">留言反馈</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon home-icon-5"></span>
                <div class="mui-media-body">视频专区</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon home-icon-6"></span>
                <div class="mui-media-body">联系我们</div></a></li>
    </ul> 
  </div>
</template>

<script>
// 引入 轮播图 组件
import Swiper from '../common/Swiper.vue'

export default {
  // 获取轮播图数据，通过 vue-resource 包来发送ajax请求，获取数据
  created() {
    this.getLunbo();
  },

  data() {
    return {
      // 轮播图数据
      swipeList: []
      // swipeList: [
      //   "http://www.itcast.cn/images/slidead/BEIJING/2017440109442800.jpg",
      //   "http://www.itcast.cn/images/slidead/BEIJING/2017511009514700.jpg",
      //   "http://www.itcast.cn/images/slidead/BEIJING/2017421414422600.jpg"
      // ]
    };
  },

  methods: {
    getLunbo() {
      // 使用 vue-resource
      // 注意: 此处的接口地址不要使用 / 作为开头
      this.$http.get('api/getlunbo', {aa: false}).then(res => {
        // console.log(res);
        const body = res.body;

        if (body.status === 0) {
          // 说明获取数据成功
          this.swipeList = body.message;
        }
      });
    }
  },

  components: { Swiper }
};
</script>

<style>
.mint-swipe {
  height: 180px;
}

.mint-swipe img {
  /* height: 100%; */
  width: 100%;
}

/* 九宫格样式 */
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}

.mui-icon {
  height: 60px;
  width: 60px;
  background-size: cover;
}
.home-icon-1 {
  background-image: url(../../images/menu3.png);
}
.home-icon-2 {
  background-image: url(../../images/menu4.png);
}
.home-icon-3 {
  background-image: url(../../images/menu5.png);
}
.home-icon-4 {
  background-image: url(../../images/menu6.png);
}
.home-icon-5 {
  background-image: url(../../images/menu9.png);
}
.home-icon-6 {
  background-image: url(../../images/menu10.png);
}
</style>

<template>
  <div>
    <div id="slider" class="mui-slider mui-fullscreen">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<!-- 第二种方式：全部分类单独写，获取到的分类数据单独渲染 -->
					<!-- <a href="">全部</a> -->
					<!-- <a href="" v-for="item in categoryList"></a> -->

					<!-- :class的值是一个数组，第一项一定会添加到当前元素中，第二项如果值为true，那么才会添加这个类 -->
					<!-- 我们手动给分类列表数据中添加了一个全部分类，该分类的id为：0，所以，此处，只有第一项 全部分类，会变为高亮效果 -->
					<!-- <a :class="['mui-control-item', {'mui-active': item.id === 0}]" href="#" data-wid="tab-top-subpage-1.html" v-for="item in categoryList" :key="item.id" @click.prevent="changeCategory(item.id)"> -->
					<a class="mui-control-item" :class="{'mui-active': item.id === 0}" href="#" data-wid="tab-top-subpage-1.html" v-for="item in categoryList" :key="item.id" @click.prevent="changeCategory(item.id)">
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>

		<!-- 图片列表 -->
		<!-- 
			功能实现思路：
			1 页面加载的时候，获取全部分类对应的图片列表数据
			2 通过 v-for 指令，渲染列表数据
	  -->
		<ul class="category-img-list">
			<li class="img-list-item" v-for="item in imgsList" :key="item.id" @click="goPhotoInfo(item.id)">
				<img v-lazy="item.img_url">
				<div>
					<h2>{{ item.title }}</h2>
					<p>{{item.zhaiyao}}</p>
				</div>
			</li>
		</ul>
  </div>
</template>

<script>
// 导入 mui的js文件

// 问题说明：引入 mui.js 以后，这个js文件中通过判断a标签是否包含 mui-tab-item 这个类名
// 					来取消a标签的默认行为（has change）
// 解决方式：1 通过修改 mui.js 的源文件，将这个判断移除
// 					2 去除页面中包含 mui-tab-item 的元素的这个类，使用一个其他的类名代替
// 					3 通过 路由的编程式导航 来实现路由跳转
// import mui from '../../lib/mui/js/mui.min.js'
// import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted() {
    // 因为mui这个方法,需要获取页面中的元素, 所以, 必须将方法调用放到 mounted 钩子函数中
    this.$mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 获取分类数据
    this.getImgCategory();
    // 获取分类对应的图片列表数据
    this.getImages();
  },

  data() {
    return {
      // 图片分类列表
      categoryList: [],
      // 图片分类id
      id: 0,
      // 分类的图片列表
      imgsList: []
    };
  },

  methods: {
    getImgCategory() {
      // 获取图片分类
      this.$http.get("api/getimgcategory").then(res => {
        const body = res.body;
        if (body.status === 0) {
          // 获取到数据，首先在最前面拼接一个全部分类，id为0（约定好的值）
          this.categoryList = [{ id: 0, title: "全部" }, ...body.message];
        }
      });
    },

    getImages() {
      // 获取指定分类的图片列表数据
      this.$http.get(`api/getimages/${this.id}`).then(res => {
        const body = res.body;

        if (body.status === 0) {
          this.imgsList = body.message;
        }
      });
    },

    changeCategory(id) {
      // 获取不同分类的图片数据

      // 设置id为当前分类的id
      this.id = id;
      // 根据分类id，获取图片列表数据
      this.getImages();
    },

    goPhotoInfo(id) {
			// 通过 编程式导航 的方式来实现路由跳转
			// 1 通过 path，拼接path和参数
			// this.$router.push({ path: `/home/photoinfo/${id}` })
			
			// 2 通过 路由规则的name属性，以及params参数
      this.$router.push({ name: 'photoinfo', params: { id } })
    }
  }
};
</script>

<style lang="scss">
.mui-slider-indicator.mui-segmented-control {
  background-color: #fff;
}

.mui-fullscreen {
  position: fixed;
  top: 40px;
  height: 38px;
}

/* scroll滚动警告的处理方式参考：http://www.jianshu.com/p/baf61adc8667 */
* {
  touch-action: none;
}

.category-img-list {
  list-style: none;
  padding: 5px;
  padding-top: 30px;

  .img-list-item {
    position: relative;
    margin-bottom: 5px;

    div {
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;

      h2 {
        font-size: 16px;
      }

      p {
        color: #fff;
        margin-bottom: 0px;
      }
    }

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>

// 在 node环境中，每个js文件都是一个独立的模块，会形成独立的作用域
// 所以，在一个模块中导入的包，不会再另外一个js文件中起作用
import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册组件
Vue.use(VueRouter)

// 导入 自定义组件
import Home from '../components/home/Home.vue'
// import Vip from '../components/vip/Vip.vue'
// import Cart from '../components/cart/Cart.vue'
// import Search from '../components/search/Search.vue'


const Vip = () => import(/* webpackChunkName: "vip" */'../components/vip/Vip.vue')
const Cart = () => import(/* webpackChunkName: "cart" */'../components/cart/Cart.vue')
const Search = () => import(/* webpackChunkName: "search" */'../components/search/Search.vue')

// 导入新闻组件
// import NewsList from '../components/news/List.vue'
// import NewsInfo from '../components/news/Info.vue'

// 将 import 导入组件的方式，修改为一下方式！！！
const NewsList = () => import(/* webpackChunkName: "news" */'../components/news/List.vue')
const NewsInfo = () => import(/* webpackChunkName: "news" */'../components/news/Info.vue')

// 导入图片分享组件
// import PhotoList from '../components/photo/List.vue'
// import PhotoInfo from '../components/photo/Info.vue'
const PhotoList = () => import(/* webpackChunkName: "photo" */'../components/photo/List.vue')
const PhotoInfo = () => import(/* webpackChunkName: "photo" */'../components/photo/Info.vue')

// 导入 商品购买 组件
// import GoodsList from '../components/goods/List.vue'
// import GoodsInfo from '../components/goods/Info.vue'
// import GoodsDetail from '../components/goods/Details.vue'
// import GoodsComment from '../components/goods/Comment.vue'
const GoodsList = () => import(/* webpackChunkName: "goods" */'../components/goods/List.vue')
const GoodsInfo = () => import(/* webpackChunkName: "goods" */'../components/goods/Info.vue')
const GoodsDetail = () => import(/* webpackChunkName: "goods" */'../components/goods/Details.vue')
const GoodsComment = () => import(/* webpackChunkName: "goods" */'../components/goods/Comment.vue')

// 配置路由规则
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/vip', component: Vip },
    { path: '/cart', component: Cart },
    { path: '/search', component: Search },

    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },

    { path: '/home/photolist', component: PhotoList },
    // 可以在创建路由规则的时候，给路由添加一个name属性
    { path: '/home/photoinfo/:id', component: PhotoInfo, name: 'photoinfo' },

    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
    { path: '/home/goodsdetail/:id', component: GoodsDetail, name: 'goodsdetail' },
    { path: '/home/goodscomment/:id', component: GoodsComment },
  ],

  // 修改路由默认高亮的类名，使用mui的类名
  linkActiveClass: 'mui-active'
})

// 导出 路由实例
export default router
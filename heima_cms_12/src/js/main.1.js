// 1 导入 vue
import Vue from 'vue'

// 导入 vue-resource
import VueResource from 'vue-resource'
// 安装插件
Vue.use(VueResource)
// this.$http.get()
// this.$http.post()


// 导入 过滤器
import '../filters'


// 使用 MUI，直接导入样式即可
// 注意：样式覆盖的问题，需要先导入 mui.min.css 样式，再导入 icons-extra.css 的样式
// 否则，会存在覆盖的问题！！！
import '../lib/mui/css/mui.min.css'
// import '../lib/mui/css/icons-extra.css'

// 对于非 Vue 的第三方包来说，我们可以通过以下形式来手动的将 第三方包 改造成插件的形式
import mui from '../lib/mui/js/mui.min.js'
// 将 mui 手动挂载到 Vue 的原型中去
Vue.prototype.$mui = mui

// 2 导入 项目的入口组件
import App from '../App.vue'

// --------------------MintUI的配置 开始------------------------
// 从 mint-ui 中导入组件
import { Header, Button, Swipe, SwipeItem, Indicator, Lazyload, Switch } from 'mint-ui'

// 注册组件
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Switch.name, Switch)

// 安装lazyload插件
Vue.use(Lazyload)

// --------------------MintUI的配置 结束------------------------

// 导入 VueRouter
// 此处的 ../router 表示在这个目录中查找 index.js
import router from '../router'

// 配置 vue-resource 公共请求接口地址
import config from '../config'
// http是由 vue-resource 提供的, 该配置项要放到注册vue-resource之后
Vue.http.options.root = config.API_SERVER_URL

// 通过vue-resource的http拦截器, 在请求发送之前和请求完成以后, 执行 加载中 提示功能
// 参考文档地址: https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
Vue.http.interceptors.push(function (request, next) {
  // console.log(request);

  // 1 通过判断请求的类型，来判断是否展示加载中的效果
  //    GET请求需要加载中的提示
  //    POST请求不需要这个提示
  // 2 我们可以在某些不需要加载中提示的请求中传入 一个自定义属性，通过这个属性来判断是否需要
  //    加载中的提示
  if (request.method === 'GET') {
  // if (!request.needLoading) {
    // 所有请求发送之前, 都要执行该函数
    Indicator.open({
      text: '数据加载中...',
      spinnerType: 'fading-circle'
    })
  }

  next(function (response) {
    if (request.method === 'GET') {
      // 所有请求完成之后, 都要执行该函数
      Indicator.close()
    }
  });
});

// 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入 vuex
import store from '../store'

// 3 将Vue实例与 App 挂到一起
const vm = new Vue({
  el: '#app',
  router,
  // 将 vuex 与实例挂到一起
  store,
  render: c => c(App)
})
import Vue from 'vue'

// 导入 moment
import moment from 'moment'

// 创建全局过滤器
Vue.filter('date', function(value, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(format)
})
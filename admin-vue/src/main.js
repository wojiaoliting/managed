// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import App from './App'
import router from './router'
import myaxios from '@/plugins/MyAxios'

Vue.use(ElementUI)
Vue.use(myaxios)

Vue.filter('fmtDate', (val, str) => {
  return moment(val).format(str)
})
// 当项目切换到生产模式的时候不会显示调试日志
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

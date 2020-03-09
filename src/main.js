import Vue from 'vue'
import App from './App.vue'
import router from '../src/router/router'
import store from '../src/store/store'
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import './registerServiceWorker'

Vue.use(elementUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

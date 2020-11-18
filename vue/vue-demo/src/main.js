import Vue from 'vue'
import App from './App.vue'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import axios from 'axios'
import Qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$axios = axios  

Vue.prototype.qs = Qs;

new Vue({
  render: h => h(App),
}).$mount('#app')

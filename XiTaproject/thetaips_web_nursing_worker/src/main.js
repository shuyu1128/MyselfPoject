import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import http from './api/api'
import globalMethod from './components/globalMethod'
Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$globalMethod = globalMethod
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
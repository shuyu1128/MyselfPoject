// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './btnPermission'
import ElementUI from 'element-ui'
import JsonExcel from 'vue-json-excel'
import 'element-ui/lib/theme-chalk/index.css'
import { MessageBox } from 'element-ui';
import 'font-awesome/css/font-awesome.css'
import App from './App.vue'
import router from './router'
import store from './vuex'
import i18n from './i18n/i18n'
import echarts from 'echarts'
import axios from 'axios'
import { functionarrs } from './api/api.js'
import allMethods from './components/allMethods.js'
import "../static/utf8-jsp/ueditor.config";
import "../static/utf8-jsp/ueditor.all";
import "../static/utf8-jsp/lang/zh-cn/zh-cn";
// 富文本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// pdf下载
import htmlToPdf from './components/htmlToPdf.js'
import './font_1295418_dj9g2undof/iconfont.css'
// 向导功能
import IntroJs from 'intro.js'
import 'intro.js/introjs.css';
Vue.use(IntroJs);
Vue.use(VueQuillEditor)
Vue.use(htmlToPdf)
Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.prototype.$functionarrs = functionarrs
Vue.prototype.$allMethods = allMethods
Vue.prototype.$echarts = echarts
    // axios.defaults.baseURL = process.env.API_HOST
Vue.component('downloadExcel', JsonExcel)
Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    return config;
}, function(error) {
    // 对请求错误做些什么
    MessageBox.alert('服务器开小差，请刷新！', '系统提示', {
        type: 'warning',
        confirmButtonText: '刷新',
        callback: action => {
            let url = router.currentRoute.path
            router.push('/index').then(res => {
                router.push(url)
            })
        }
    });
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    return response;
}, function(error) {
    // 对响应错误做点什么
    MessageBox.alert('服务器开小差，请刷新！', '系统提示', {
        type: 'warning',
        confirmButtonText: '刷新',
        callback: action => {
            let url = router.currentRoute.path
            router.push('/index').then(res => {
                router.push(url)
            })
        }
    });
    return Promise.reject(error);
});
//  获取角色信息，根据用户权限动态加载路由
router.beforeEach((to, from, next) => {

        if (to.path === '/login/milogin' || to.path === '/login/register' || to.path === '/Monitor') {
            next()
        } else {
            if (store.getters.token) {
                store.dispatch('setToken', store.getters.token)
                if (to.path === '/login/milogin') {
                    next({ path: '/' })
                } else {
                    if (!store.getters.info.role) {
                        // const role = ['/markdown', '/erji', '/erji2', '/siji', '/wuji']
                        !async function getAddRouters() {
                            await store.dispatch('getInfo', store.getters.token)
                            await store.dispatch('newRoutes', store.getters.info.role)
                            await router.addRoutes(store.getters.addRouters)
                            next({ path: '/index' })
                        }()
                    } else {
                        if (!to.meta.role && to.name == null) {
                            MessageBox.alert('您无权访问此功能页面，请联系管理员开启！', '系统提示', {
                                type: 'warning',
                                confirmButtonText: '确定',
                                callback: action => {
                                    store.commit("closehospitalshow");
                                    store.state.actives = 0;
                                    store.state.activeNames = "1";
                                }
                            });
                            next(false)
                        } else {
                            console.log('正确跳转');
                            next()
                        }
                    }
                }
            } else {
                if (to.path === '/login/milogin') {
                    next()
                }
                next({ path: '/login/milogin' })
            }
        }
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
    components: { App },
    template: '<App/>',
    created() {},
})
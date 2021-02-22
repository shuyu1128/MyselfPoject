import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import routerData from './modules/routerData'
import role from './modules/role'
import layout from './modules/layout/index'
// 长者档案
import details from './modules/archives/details'
// 长者列表
import archivesList from './modules/archives/list'
// 院内信息
import management from './modules/management/index'
// socket数据
import websocket from './modules/websocket/index'
import mainIndex from './modules/home/mainIndex'
// 电子围栏
import fance from './modules/fance/fance'
// 院内信息录入
import beadhouse from './modules/beadhouse/beadhouse'
// 用户及权限管理
import userAndRole from './modules/userAndRole/userAndRole'
// 功能向导
import introJs from './modules/intorJs/introJs'
// 智能健康评估配置
import Evaluatiomaintenance from './modules/Evaluatiomaintenance/Evaluatiomaintenance'
// 护理管理
import NursingManagement from './modules/NursingManagement/index'
// 护理管理/工作统计
import workStatistics from './modules/NursingManagement/workStatistics'
import { functionarrs } from '../api/api.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        charge: '',
        token: Cookies.get('token'),
        jibi: 'dsfasd',
        allpeopleHealthy: [],
        pei: '希塔',
        fence: [],
        hospitalshow: false,
        hospitalshowactive: false,
        // 一键入院的状态
        actives: 0,
        // 编辑标签页状态
        activeNames: '1',
        // 楼层大小
        floorwh: '11',
        // 是否记住登录状态
        loginif: true,
        // 用户信息
        userinfo: {}
    },
    mutations: {
        // 获取用户名
        getuserinfo(state) {
            functionarrs
                .basic_getUserById(state.token)
                .then(data => {
                    state.userinfo = data;
                });
        },
        setToken(state, token) {
            state.token = token
            Cookies.set('token', token, { expires: 7 });
        },
        setdata: (state, data) => state.jibi = data,
        // 展示一键入院
        sethospitalshow: (state, ) => state.hospitalshow = true,
        // 关闭一键入院
        closehospitalshow: (state) => state.hospitalshow = false,
        setactive: (state) => state.actives++,
        setfence: (state, data) => { state.fence.push(data[0]) },
        reducefence: (state, data) => {
            state.fence.forEach((element, index) => {
                if (element == data) {
                    state.fence.splice(index, 1)
                }
            });
        }
    },
    actions: {
        // 获取同户信息
        getuserinfo({ commit }) {
            commit('getuserinfo')
        },
        setToken({ commit }, token) {
            return new Promise((resolve, reject) => {
                commit('setToken', token)
                resolve()
            })
        }
    },
    getters: {
        addRouters: state => state.routerData.addRouters,
        token: state => state.token,
        info: state => state.role.info,
        routers: state => state.routerData.routers,
        logoShow: state => state.layout.logoShow,
        isCollapse: state => state.layout.isCollapse,
        uniquerouter: state => state.layout.uniquerouter,
        tabnavBox: state => state.layout.tabnavBox,
        visible: state => state.layout.visible,
        left: state => state.layout.left,
        top: state => state.layout.top,
        rightNav: state => state.layout.rightNav,
    },
    modules: {
        management,
        routerData,
        role,
        layout,
        details,
        archivesList,
        websocket,
        // multipleSocket,
        mainIndex,
        fance,
        beadhouse,
        userAndRole,
        introJs,
        Evaluatiomaintenance,
        NursingManagement,
        workStatistics
    },
})

export default store
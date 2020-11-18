import store from '../index'
import router from '../../router/index'
import $ from 'jquery'
export default {
    state: {
        info: '' // 每次刷新都要通过token请求个人信息来筛选动态路由
    },
    mutations: {
        getInfo(state, token) {
            $.ajax({
                url: process.env.API_HOST + '/basic/getRoleByUser',
                type: 'POST', //GET
                async: false, //或false,是否异步
                data: {
                    userid: token
                },
                timeout: 5000, //超时时间
                dataType: 'json', //返回的数据格式：
                beforeSend: function (xhr) { },
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    state.info = data
                    if (state.info.role === "false") {
                        state.info.role = "当前无角色"
                    }
                },
                error: function (xhr, textStatus) { },
                complete: function () { }
            })
            // state.info = {
            //     role: 'a'
            // }
            sessionStorage.setItem('info', JSON.stringify(store.getters.info))
        },
        setRole(state, options) { // 切换角色，测试权限管理
            state.info = {
                role: options.role,
                permissions: options.permissions
            }
            sessionStorage.setItem('info', JSON.stringify(store.getters.info));
            store.dispatch('newRoutes', options.role)
            router.addRoutes(store.getters.addRouters)

        }
    },
    actions: {
        getInfo({ commit }, token) {
            commit('getInfo', token)
        },
        setRole({ commit }, options) {
            // 权限测试
            commit('setRole', options)
        }
    }
}
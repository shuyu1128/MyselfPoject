import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        nowId: '',
        nowdate: null
    },
    mutations: {
        changeNowdate(state, data) {
            state.nowdate = data
        },
        changeNowId(state, data) {
            state.nowId = data
        }
    },
    actions: {},
    modules: {}
})
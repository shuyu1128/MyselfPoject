import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        nowId: '',
        nowdate: null,
        // 当前查看长者id
        nowPeopleId: '00909b482fad47c4bd75469166c5fda4',
        nowPeople: '00909b482fad47c4bd75469166c5fda4',
    },
    mutations: {
        changeNowdate(state, data) {
            state.nowdate = data
        },
        changeNowId(state, data) {
            state.nowId = data
        },
        // 改变当前查看长者id
        changePeopleId: (state, data) => state.nowPeopleId = data,
        // 改变当前查看长者
        changePeople: (state, data) => state.nowPeople = data,
    },
    actions: {},
    modules: {}
})
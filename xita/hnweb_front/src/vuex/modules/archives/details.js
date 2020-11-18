/**
 * Created by peijialong.
 * Date: 2020/04/28
 * Description: 查看老人详情状态
 */
import Vue from 'vue'
import { functionarrs } from '../../../api/api'
export default {
    state: {
        carddata: [],
        chooiscarddata: [],
        cardfield: {},
        fullname: "",
        // 全部人员
        allSeniors: [],
        // 生命体征历史信息
        historicalVitalSignsData: {},
        // 历史健康报表中的生命体征历史数据
        pdfHistoricalVitalSignsData: [],
        // 所有电子围栏组
        electronicFenceGroupData: [],
        // 当前选中老人默认绑定电子围栏组
        nowDefaultElectronicFenceGrou: []
    },
    mutations: {
        // 修改历史健康报表中的生命体征历史数据
        updataPdfHistoricalVitalSignsData(state, data) {
            state.pdfHistoricalVitalSignsData = data
        },
        // 修改生命体征历史信息
        updataHistoricalVitalSignsData(state, data) {
            state.historicalVitalSignsData = data
        },
        // 获取全部老人
        person_getPersonList(state, data) {
            state.allSeniors = data
        },
        // 获取老人简介的全部字段
        changecarddata(state, data) {

            state.chooiscarddata = []
            state.carddata = data;
            data.forEach(element => {
                if (element.state == 1) {
                    state.chooiscarddata.push(element);
                }
            });
            // this.commit('changecardfield', json.id)

        },
        // 修改信息卡片
        person_insertUserProfileSettings(state, data) {

            state.chooiscarddata = []
            data.forEach(element => {
                if (element.state == 1) {
                    state.chooiscarddata.push(element);
                }
            });
            // this.commit('changecardfield', json.id)

        },
        // 通过id获取老人信息
        changecardfield(state, data) {
            state.fullname = data.prnPerson.fullname
            let vv1 = data.prnPerson;
            for (var i = 0; i < state.chooiscarddata.length; i++) {
                let vv2 = state.chooiscarddata[i].code;

                if (eval("vv1." + vv2) != undefined) {
                    state.chooiscarddata[i].value = eval("vv1." + vv2);
                    let lObject = Object.assign({}, state.chooiscarddata[i])
                    Vue.set(state.chooiscarddata, i, lObject)
                        // state.chooiscarddata[i].value = eval("vv1." + vv2);
                } else {
                    state.chooiscarddata[i].value = "";
                    let lObject = Object.assign({}, state.chooiscarddata[i])
                    Vue.set(state.chooiscarddata, i, lObject)
                }
            }
        },
        // 更新所有电子围栏组
        changeElectronicFenceGroup(state, data) {
            state.electronicFenceGroupData = data
        },
        changeNowDefaultElectronicFenceGrou(state, data) {
            state.nowDefaultElectronicFenceGrou = data
        },
    },
    actions: {
        // 获取历史健康报表中的生命体征历史数据
        person_getAllVitalSignsListByPersonId({ commit }, json) {
            functionarrs
                .person_getAllVitalSignsListByPersonId(json.personid, json.type, json.beginDate)
                .then(data => {
                    commit('updataPdfHistoricalVitalSignsData', data)
                });
        },
        // 获取修改生命体征历史信息
        person_getVitalSignsListByPersonId({ commit }, json) {
            functionarrs
                .person_getVitalSignsListByPersonId(json.personid, 8, json.pageNum)
                .then(data => {

                    commit('updataHistoricalVitalSignsData', data)
                });
        },
        // 通过id获取老人信息
        changecardfield({ commit }, id) {
            functionarrs
                .person_getPersonById(id)
                .then(data => {
                    console.log(data);
                    commit('changecardfield', data)
                });
        },
        // 获取全部老人
        person_getPersonList({ commit, state }, data) {
            return functionarrs
                .person_getPersonList(data)
                .then(data => {
                    commit('person_getPersonList', data)
                });

        },
        // 获取老人简介的全部字段
        changecarddata({ commit }, wdata) {
            functionarrs
                .person_getAllProfileSettings(wdata.userid)
                .then(data => {
                    commit('changecarddata', data)
                    this.dispatch("changecardfield", wdata.id)
                });
        },
        // 修改信息卡片
        person_insertUserProfileSettings({ commit }, wdata) {
            functionarrs
                .person_insertUserProfileSettings(wdata.settings, wdata.userid)
                .then(data => {
                    commit('person_insertUserProfileSettings', data)
                    this.dispatch("changecardfield", wdata.id)
                });

        },
        // 获取全部电子围栏组
        rail_getAllRailGroupList({ commit }) {
            return functionarrs
                .rail_getAllRailGroupList()
                .then(data => {
                    commit('changeElectronicFenceGroup', data)
                    return data
                });
        },
        // 获取当前选中老人电子围栏组
        person_getRailGroupsByPerson({ commit }, personid) {
            functionarrs
                .person_getRailGroupsByPerson(personid)
                .then(data => {
                    commit('changeNowDefaultElectronicFenceGrou', data)
                });
        }

    }
}
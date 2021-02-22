/**
 * User: peijialong
 * Date: 2020/04/26
 * Description: 人员档案表格状态
 */
import { functionarrs } from '../../../api/api'
import { Message } from 'element-ui';
export default {
    state: {
        // 未佩戴手环数据
        notWearingEquipment: [],
        // 分页相关
        pageSize: 10,
        currentPage: 1,
        // 搜索表单
        selectFrom: {
            id: "",
            name: "",
            sex: "",
            roomN: "",
            state: "",
            hasDevice: "",
        }
    },
    mutations: {
        changeSelectFrom(state, data) {
            state.selectFrom = data
        },
        // 获取全部未佩戴手环
        person_getDeviceListByPersonId(state, data) {
            state.notWearingEquipment = data
        },
        // 改变当前页
        changeCurrentPage(state, data) {
            state.currentPage = data
        },
        // 改变当前条
        changePageSize(state, data) {
            state.pageSize = data
        },
    },
    actions: {
        // 添加长者
        person_insertPersonData({ commit }, data) {
            return functionarrs
                .person_insertPersonData(data.userid, data.username, data.deviceId, data.hospitalID)
                .then(data => {
                    return data
                });
        },
        // 获取全部未佩戴手环
        person_getDeviceListByPersonId({ commit }, data) {
            return functionarrs
                .person_getDeviceListByPersonId(data)
                .then(data => {
                    commit("person_getDeviceListByPersonId", data)
                });
        },
        // 删除人员
        person_delPersonById({ commit, state }, json) {
            console.log(state);
            functionarrs
                .person_delPersonById(json.id, json.userid)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("person_getPersonList", state.selectFrom);
                        Message.success('删除成功')
                    } else {
                        Message.warning(data.state.msg)
                    }
                });
        },
        // 修改人员状态
        person_updatePerson({ commit, state }, json) {
            console.log(json);
            functionarrs
                .person_updatePerson(json.obj, json.userid)
                .then(data => {
                    if (data == "success") {
                        this.dispatch("person_getPersonList", state.selectFrom);
                        Message.success('修改成功')
                    } else {
                        Message.warning('修改失败')
                    }
                });
        },
        // 人员离院
        person_departurePerson({ commit, state }, json) {
            functionarrs
                .person_departurePerson(json.personid, json.userid)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("person_getPersonList", state.selectFrom);
                        Message.success('离院成功')
                    } else {
                        Message.warning('离院失败')
                    }
                });
        },
        // 批量修改人员状态
        person_updatePersonsInHospital({ commit, state }, json) {
            console.log(json, '批量修改');
            functionarrs
                .person_updatePersonsInHospital(json.personIds, json.userid, json.state, json.oldState)
                .then(data => {
                    console.log(data);
                    if (data.state == "success") {
                        this.dispatch("person_getPersonList", state.selectFrom);
                        if (json.state == '1') {
                            Message.success('外出成功')
                        } else {
                            Message.success('入院成功')
                        }
                    } else {
                        Message.warning('修改失败')
                    }
                });
        },
        // 批量离院
        person_departurePersons({ commit, state }, json) {
            functionarrs
                .person_departurePersons(json.personids, json.userid, json.state)
                .then(data => {
                    console.log(data);
                    if (data.state == "success") {
                        this.dispatch("person_getPersonList", state.selectFrom);
                        Message.success('离院成功')
                    } else {
                        Message.warning('离院失败')
                    }
                });
        },
        // 批量删除人员
        person_delPersonByIds({ commit, state }, json) {
            functionarrs
                .person_delPersonByIds(json.personIds, json.userid)
                .then(data => {
                    console.log(data);
                    if (data.state == "success") {
                        this.dispatch("person_getPersonList", state.selectFrom);
                        Message.success('删除成功')
                    } else {
                        Message.warning(data.msg)
                    }
                });
        },
    }
}
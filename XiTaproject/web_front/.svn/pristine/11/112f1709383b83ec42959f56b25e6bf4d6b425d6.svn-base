/**
 * User: peijialong
 * Date: 2020/10/20
 * Description: 护理管理
 */
import { functionarrs } from '../../../api/api'
import { Message } from 'element-ui';
export default {
    state: {
        // 全部组别
        allGroup: [],
        // 当前查看护工
        nursingUserList: [],
        // 当前选中组别
        nowGroup: [],
        // 无条件人员查询供分组使用
        nonePeople: [],
        // 组别ids查询人员列表供表格展示使用
        idsPelple: [],
        selsctGroupId: '',
    },
    mutations: {
        // 清空护理组管理状态
        clearNursing(state) {
            state.allGroup = []
            state.nursingUserList = []
            state.nowGroup = []
            state.nonePeople = []
            state.idsPelple = []
        },
        // 改变当前查看的组id
        changeSelsctGroupId(state, data) {
            state.selsctGroupId = data
        },
        // 更新全部组别
        changeAllGroup(state, data) {
            state.allGroup = data
        },
        // 更新当前查看护工
        changeNursingUserList(state, data) {
            state.nursingUserList = data
        },
        // 更新无条件人员查询供分组使用列表
        changeNonePeople(state, data) {
            state.nonePeople = data
        },
        // 更新组别ids查询人员列表供表格展示使用
        changeIdsPelple(state, data) {
            state.idsPelple = data
        },
        // 更新当前选中组别
        changeNowGroup(state, data) {
            state.nowGroup = data
        }
    },
    actions: {
        // 组别增删改查
        // 无条件获取全部组别
        basNursingTeam_getNursingTeamList({ commit }) {
            functionarrs
                .basNursingTeam_getNursingTeamList()
                .then(data => {
                    commit('changeAllGroup', data)
                });
        },
        // 新增护工组别
        basNursingTeam_insertNursingTeam({ commit }, data) {
            return functionarrs
                .basNursingTeam_insertNursingTeam(data.json, data.userid)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("basNursingTeam_getNursingTeamList")
                        Message.success("新增成功");
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
        // 修改护工组别
        basNursingTeam_updateNursingTeam({ commit }, data) {
            return functionarrs
                .basNursingTeam_updateNursingTeam(data.json, data.userid)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("basNursingTeam_getNursingTeamList")
                        Message.success("修改成功");
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
        // 删除护工组别
        basNursingTeam_deleteNursingTeam({ commit }, data) {
            return functionarrs
                .basNursingTeam_deleteNursingTeam(data.id, data.userid)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("basNursingTeam_getNursingTeamList")
                        Message.success("删除成功");
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },









        // 护工增删改查
        // ids获取护工账户信息
        sysNursingUser_getNursingUserList({ commit, state }) {
            functionarrs
                .sysNursingUser_getNursingUserList({ teamids: state.nowGroup })
                .then(data => {
                    console.log(data);
                    commit('changeNursingUserList', data)
                });
        },
        // 新增护工
        sysNursingUser_insertNursingUser({ commit }, json) {
            return functionarrs
                .sysNursingUser_insertNursingUser(json, this.state.token)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("sysNursingUser_getNursingUserList")
                        Message.success("新增成功");
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
        // 修改护工
        sysNursingUser_updateNursingUser({ commit }, json) {
            return functionarrs
                .sysNursingUser_updateNursingUser(json, this.state.token)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("sysNursingUser_getNursingUserList")
                        Message.success("修改成功");
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
        // 删除护工
        sysNursingUser_deleteNursingUser({ commit }, id) {
            return functionarrs
                .sysNursingUser_deleteNursingUser(id, this.state.token)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("sysNursingUser_getNursingUserList")
                        Message.success("删除成功");
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
        // 获取所有长者（无条件，未分配组）
        prnPerson_getPersonNoTeamList({ commit }) {
            return functionarrs
                .prnPerson_getPersonNoTeamList()
                .then(data => {
                    console.log(data);
                    commit('changeNonePeople', data)
                });
        },
        // 查询人员信息(ids查询)
        prnPerson_getPersonTeamList({ commit, state }) {
            return functionarrs
                .prnPerson_getPersonTeamList(state.nowGroup)
                .then(data => {
                    commit('changeIdsPelple', data);
                });
        },
        //  添加老人组别
        basNursingTeam_insertPersonTeam({ commit }, json) {
            return functionarrs
                .basNursingTeam_insertPersonTeam(json.personids, json.teamid, this.state.token)
                .then(data => {
                    if (data.state === "success") {
                        // 分配成功后重新获取所有长者（无条件，未分配组），供勾选使用
                        this.dispatch("prnPerson_getPersonNoTeamList")
                        this.dispatch("prnPerson_getPersonTeamList")
                        Message.success("分配成功");
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
        //  切换老人组别
        basNursingTeam_updatePersonTeam({ commit }, json) {
            return functionarrs
                .basNursingTeam_updatePersonTeam(json.id, json.teamid, this.state.token)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("prnPerson_getPersonTeamList")
                        Message.success("分配成功");
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
    }
}
/**
 * User: peijialong
 * Date: 2020/06/03
 * Description: 账户及权限管理
 */
import { functionarrs } from '../../../api/api'
import { Message } from 'element-ui';
export default {
    state: {
        // 全部角色列表
        allRoleData: [],
        // 当前选择编辑的角色信息
        nowUpdataRole: [],
        // 全部责任区域
        allRegionData: [],
        // 到房间的树形结构
        roomsTree: [],
        // 查询条件
        selectform: {
            name: ""
        },
        // 选中用户默认选中发布公告区域
        defaultNoticeSelect: []
    },
    mutations: {
        // 更新全部
        updataAllRoleData(state, data) {
            state.allRoleData = data
        },
        // 更新角色当前信息
        changeNowUpdataRole(state, data) {
            let check = []
            data.forEach(element => {
                check.push(element.rightid);
            });
            state.nowUpdataRole = check
        },
        // 更新全部责任区域
        upadtaAllRegionData(state, data) {
            state.allRegionData = data
        },
        // 更新到房间的树形结构
        updataRoomsTree(state, data) {
            state.roomsTree = data
        },
        // 更改查询条件
        changeSelectformNname(state, data) {
            state.selectform.name = data
        },
        // 更改用户默认选中发布公告区域
        changeDefaultNoticeSelect(state, data) {
            state.defaultNoticeSelect = data
        },
    },
    actions: {
        // 获取全部角色列表
        basic_getAllRightRoleList({ commit }, json) {
            functionarrs
                .basic_getAllRightRoleList(json.roleName, json.userName)
                .then(data => {
                    commit("updataAllRoleData", data)
                });
        },
        // 创建角色
        basic_insertRole({ commit }, json) {
            functionarrs
                .basic_insertRole(json.newRolename)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch('basic_getAllRightRoleList', { roleName: json.roleName, userName: json.userName })
                        Message({
                            message: "角色创建成功",
                            type: "success"
                        });
                    } else {
                        Message({
                            message: data.message,
                            type: "warning"
                        });
                    }
                });
        },
        // 删除角色
        basic_deleteRole({ commit }, json) {
            functionarrs
                .basic_deleteRole(json.id)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch('basic_getAllRightRoleList', { roleName: json.roleName, userName: json.userName })
                        Message({
                            message: "删除成功",
                            type: "success"
                        });
                    } else {
                        Message({
                            message: data.message,
                            type: "warning"
                        });
                    }
                });
        },
        // 根据角色id获取角色权限
        basic_getRightRole({ commit }, roleid) {
            return functionarrs
                .basic_getRightRole(roleid)
                .then(data => {
                    commit("changeNowUpdataRole", data)
                    return data
                });
        },
        // 修改角色信息
        basic_insertRightRole({ commit }, json) {
            return functionarrs
                .basic_insertRightRole(json)
                .then(data => {
                    return data
                });
        },
        // 修改角色名称
        basic_updateRole({ commit }, json) {
            return functionarrs
                .basic_updateRole(json.json)
                .then(data => {
                    if (data.state = "success") {
                        this.dispatch('basic_getAllRightRoleList', { roleName: json.roleName, userName: json.userName })
                        Message.success(data.msg);
                    } else {
                        Message.error(data.msg);
                    }
                    return data
                });
        },
        // 获取到房间的树形结构
        bed_getNursingHomesTree({ commit }) {
            functionarrs
                .bed_getNursingHomesTree()
                .then(data => {
                    commit("updataRoomsTree", data)
                });
        },
        // 获取全部责任区域
        inpatient_getAllInpatientList({ commit, state }) {
            functionarrs
                .inpatient_getAllInpatientList(state.selectform)
                .then(data => {
                    commit("upadtaAllRegionData", data)
                });
        },
        // 添加责任区域
        inpatient_insertInpatient({ commit }, json) {
            return functionarrs
                .inpatient_insertInpatient(json.data, json.userid, json.roomids)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("inpatient_getAllInpatientList");
                        Message({
                            message: "添加成功",
                            type: "success"
                        });
                        return 'yes'
                    } else {
                        Message.error(data.msg);
                        return 'no'
                    }
                });
        },
        // 删除责任区域
        inpatient_delInpatient({ commit }, json) {
            functionarrs
                .inpatient_delInpatient(json.inpatientId, json.userid)
                .then(data => {
                    if (data === "success") {
                        this.dispatch("inpatient_getAllInpatientList");
                        Message({
                            message: "删除成功",
                            type: "success"
                        });
                    } else {
                        Message.error("删除失败");
                    }
                });
        },
        // 修改责任区域
        inpatient_updateInpatient({ commit }, json) {
            return functionarrs
                .inpatient_updateInpatient(json.data, json.userid, json.roomids)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("inpatient_getAllInpatientList");
                        Message({
                            message: "修改成功",
                            type: "success"
                        });
                        return 'yes'
                    } else {
                        Message.error(data.msg);
                        return 'no'
                    }
                });
        },
        // 通过用户查看默认选中的发布公告部门权限列表
        dept_getDeptIdListByUser({ commit }, userid) {
            return functionarrs
                .dept_getDeptIdListByUser(userid)
                .then(data => {
                    commit('changeDefaultNoticeSelect', data)
                });
        }
    }
}
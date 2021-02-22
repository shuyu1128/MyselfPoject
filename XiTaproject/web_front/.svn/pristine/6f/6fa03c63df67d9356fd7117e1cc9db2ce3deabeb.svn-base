/**
 * User: peijialong
 * Date: 2020/04/26
 * Description: 人员档案表格状态
 */
import { functionarrs } from '../../../api/api'
import { Message } from 'element-ui';
export default {
    state: {
        selectName: "",
        // 建筑树形结构
        allbuildTree: [],
        // 当前上级id
        nowParentId: "",
        // 当前名称
        nowlabel: "",
        // 深度
        level: 0,
        // 选中内容
        ContentData: [],
        // 编辑的内容
        updataContent: {},
        // 院编辑
        nursingHomeUpdataVisible: false,
        // 建筑编辑
        buildUpdataVisible: false,
        // 楼层编辑
        floorUpdataVisible: false,
        // 房间编辑
        roomUpdataVisible: false,
        // 床位编辑
        bedUpdataVisible: false,
        // 临时新数据
        temporaryBuildTree: [],
        // 当前表格展开行
        expandList: []
    },
    mutations: {
        updateSelectName(state, data) {
            state.selectName = data
        },
        // 增加默认展开行
        addExpandList(state, id) {
            state.expandList.push(id)
        },
        // 减少默认展开行
        reduceExpandList(state, id) {
            let index = state.expandList.findIndex(el => el === id);
            state.expandList.splice(index, 1)
        },
        // 获取全部房间的建筑树形结构
        updataAllbuildTree(state, data) {
            state.allbuildTree = data
        },
        // 更改深度
        changeLevel(state, data) {
            state.level = data
        },
        // 更改父级id
        changeNowParentId(state, data) {
            state.nowParentId = data
        },
        // 更改父级名称
        changeNowNowlabel(state, data) {
            state.nowlabel = data
        },
        // 更改选中内容
        changeContent(state, data) {
            state.ContentData = data
        },
        // 院弹窗操作
        closeNursingHomeVisible(state) {
            state.nursingHomeUpdataVisible = false
        },
        openNursingHomeVisible(state) {
            state.nursingHomeUpdataVisible = true
        },
        // 建筑弹窗操作
        closeBuild(state) {
            state.buildUpdataVisible = false
        },
        openBuild(state) {
            state.buildUpdataVisible = true
        },
        // 更新选中编辑的数据
        changeUpdataContent(state, data) {
            // state.updataContent = data
            state.updataContent = JSON.parse(JSON.stringify(data))
        },
        // 楼层弹窗操作
        closeFloor(state) {
            state.floorUpdataVisible = false
        },
        openFloor(state) {
            state.floorUpdataVisible = true
        }, // 房间弹窗操作
        closeRoom(state) {
            state.roomUpdataVisible = false
        },
        openRoom(state) {
            state.roomUpdataVisible = true
        }, // 床位弹窗操作
        closebed(state) {
            state.bedUpdataVisible = false
        },
        openbed(state) {
            state.bedUpdataVisible = true
        },
        // 删除之后更改内容
        DeleteChangeContent(state, id) {
            if (state.ContentData !== undefined) {
                let arr = state.ContentData
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].value === id) {
                        state.ContentData.splice(i, 1)
                        break;
                    }
                }
            }
        },
        // 新增之后更改内容操作
        addChangeContent(state) {
            function forTree(arr, id) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].children) {
                        forTree(arr[i].children, id)
                    }
                    if (arr[i].value === id) {
                        state.nowlabel = arr[i].label
                        state.ContentData = arr[i].children
                        break;
                    }
                }
            }
            let arr = state.allbuildTree
            let id = state.nowParentId
            forTree(arr, id)
        },
    },
    actions: {
        // 添加养老院
        nursingHome_insertNursingHome({ commit }, json) {
            return functionarrs
                .nursingHome_insertNursingHome(json.data, json.userid)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("bed_getNursingHomesAllTree")
                        Message({
                            message: "添加成功",
                            type: "success"
                        });
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
        // 获取到房间的建筑树形结构
        bed_getNursingHomesAllTree({ commit, state }) {
            return functionarrs
                .bed_getNursingHomesAllTree(state.selectName)
                .then(data => {
                    commit('updataAllbuildTree', data)
                    return data
                });
        },
        // 删除建筑
        buildin_delBuilding({ commit }, json) {
            functionarrs
                .buildin_delBuilding(json.id, json.userid)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("bed_getNursingHomesAllTree")
                        commit('DeleteChangeContent', json.id)
                        Message({
                            message: "删除成功",
                            type: "success"
                        });
                    } else {
                        Message.error(data.message);
                    }
                });
        },
        // 删除楼层
        floor_delFloor({ commit }, json) {
            functionarrs
                .floor_delFloor(json.id, json.userid)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("bed_getNursingHomesAllTree")
                        commit('DeleteChangeContent', json.id)
                        Message({
                            message: "删除成功",
                            type: "success"
                        });
                    } else {
                        Message.error(data.message);
                    }
                });
        },
        // 删除房间
        room_delRoom({ commit }, json) {
            functionarrs
                .room_delRoom(json.id, json.userid)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("bed_getNursingHomesAllTree")
                        commit('DeleteChangeContent', json.id)
                        Message({
                            message: "删除成功",
                            type: "success"
                        });
                    } else {
                        Message.error(data.message);
                    }
                });
        },
        // 删除床位 
        bed_delBed({ commit }, json) {
            functionarrs
                .bed_delBed(json.id, json.userid)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("bed_getNursingHomesAllTree")
                        commit('DeleteChangeContent', json.id)
                        Message({
                            message: "删除成功",
                            type: "success"
                        });
                    } else {
                        Message.error(data.message);
                    }
                });
        },
        // 添加建筑
        building_insertBuilding({ commit }, json) {
            return functionarrs
                .building_insertBuilding(json.data, json.userid)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("bed_getNursingHomesAllTree").then(res => {
                            commit('addChangeContent')
                        })

                        Message({
                            message: "添加成功",
                            type: "success"
                        });
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
        // 添加楼层
        floor_insertFloor({ commit }, json) {
            return functionarrs
                .floor_insertFloor(json.data, json.userid, json.id)
                .then(data => {
                    if (data.state === "success") {
                        this.dispatch("bed_getNursingHomesAllTree").then(res => {
                            commit('addChangeContent')
                        })
                        Message({
                            message: "添加成功",
                            type: "success"
                        });
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
        // 添加房间
        room_insertRoom({ commit }, json) {
            return functionarrs
                .room_insertRoom(json.data, json.userid, json.id)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("bed_getNursingHomesAllTree").then(res => {
                            commit('addChangeContent')
                        })
                        Message({
                            message: "添加成功",
                            type: "success"
                        });
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
        // 添加床位 
        bed_insertBed({ commit }, json) {
            return functionarrs
                .bed_insertBed(json.data, json.userid, json.id)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("bed_getNursingHomesAllTree").then(res => {
                            commit('addChangeContent')
                        })
                        Message({
                            message: "添加成功",
                            type: "success"
                        });
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
        // 修改院
        nursingHome_updateNursingHome({ commit }, json) {
            functionarrs
                .nursingHome_updateNursingHome(json.data, json.userid)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("bed_getNursingHomesAllTree").then(res => {
                            commit('addChangeContent')
                            commit('closeNursingHomeVisible')
                        })
                        Message({
                            message: "修改成功",
                            type: "success"
                        });
                    } else {
                        Message.error(data.msg);
                    }
                });
        },
        // 修改建筑
        building_updateBuilding({ commit }, json) {
            functionarrs
                .building_updateBuilding(json.data, json.userid)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("bed_getNursingHomesAllTree").then(res => {
                            commit('addChangeContent')
                            commit('closeBuild')
                        })
                        Message({
                            message: "修改成功",
                            type: "success"
                        });
                    } else {
                        Message.error(data.msg);
                    }
                });
        },
        // 修改楼层
        floor_updateFloor({ commit }, json) {
            functionarrs
                .floor_updateFloor(json.data, json.userid)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("bed_getNursingHomesAllTree").then(res => {
                            commit('addChangeContent')
                            commit('closeFloor')
                        })
                        Message({
                            message: "修改成功",
                            type: "success"
                        });
                    } else {
                        Message.error(data.msg);
                    }
                });
        },
        // 修改房间
        room_updateRoom({ commit }, json) {
            functionarrs
                .room_updateRoom(json.data, json.userid)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("bed_getNursingHomesAllTree").then(res => {
                            commit('addChangeContent')
                            commit('closeRoom')
                        })
                        Message({
                            message: "修改成功",
                            type: "success"
                        });
                    } else {
                        Message.error(data.msg);
                    }
                });
        },
        // 修改床位 
        bed_updateBed({ commit }, json) {
            functionarrs
                .bed_updateBed(json.data, json.userid)
                .then(data => {
                    if (data.state == "success") {
                        this.dispatch("bed_getNursingHomesAllTree").then(res => {
                            commit('addChangeContent')
                            commit('closebed')
                        })
                        Message({
                            message: "修改成功",
                            type: "success"
                        });
                    } else {
                        Message.error(data.msg);
                    }
                });
        },
    }
}
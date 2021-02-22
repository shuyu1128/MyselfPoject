/**
 * User: peijialong
 * Date: 2020/05/24
 * Description: 电子围栏配置数据
 */
import { functionarrs } from '../../../api/api'
import { Message } from 'element-ui';
export default {
    state: {
        // 全部新电子围栏
        allEnclosure: [],
        // 单子围栏录入方式
        inputMode: '1',
        // 选中电子围栏组id
        selectRailGroup: [],
        // 穿梭框中选中电子围栏id
        selectRailids: [],
        // 将要绘制的电子围栏数据
        drewRailList: [],
        // 全部建筑结构
        NursingHomesTree: [],
        // 基站位置树
        BasestationTree: [],
        // 信号强度级别
        signalLevelData: [],
        // 灵敏度等级
        sensitivityLevelData: [],
        // 当前楼层
        nowFloorId: '',
        // 准备添加电子围栏的房间
        readyAddRoom: [],
        // 将要绘制的单个房间的电子围栏
        inRoomEnclosure: [],
        // 将要绘制的单点围栏
        drewsinglePointPw: [],
        // 当前选中单独房间的信息
        nowRoominfo: {},
        // 全部电子围栏组
        RailListData: [],
        // 是否重新加载录入信息
        enclosureShow: false,
        GroupShow: false,
        // 围栏组选中情况数组
        groupTaps: []
    },
    mutations: {
        // 重置可重置数据
        clearSureData(state) {
            state.drewsinglePointPw = []
            state.inRoomEnclosure = []
            state.readyAddRoom = []
        },
        clearAll(state) {
            // 全部新电子围栏
            state.allEnclosure = []
                // 单子围栏录入方式
            state.inputMode = '1'
                // 选中电子围栏组id
            state.selectRailGroup = []
                // 穿梭框中选中电子围栏id
            state.selectRailids = []
                // 将要绘制的电子围栏数据
            state.drewRailList = []
                // 全部建筑结构
            state.NursingHomesTree = []
                // 基站位置树
            state.BasestationTree = []
                // 信号强度级别
            state.signalLevelData = []
                // 灵敏度等级
            state.sensitivityLevelData = []
                // 当前楼层
            state.nowFloorId = ''
                // 准备添加电子围栏的房间
            state.readyAddRoom = []
                // 将要绘制的单个房间的电子围栏
            state.inRoomEnclosure = []
                // 将要绘制的单点围栏
            state.drewsinglePointPw = []
                // 当前选中单独房间的信息
            state.nowRoominfo = {}
                // 全部电子围栏组
            state.RailListData = []
            state.groupTaps = []
        },
        // 清空录入信息
        clearenclosure(state) {
            state.enclosureShow = !state.enclosureShow
        },
        clearGroup(state) {
            state.GroupShow = !state.GroupShow
        },
        changeGroupTaps(state, data) {
            state.groupTaps = data
        },
        // 改变全部电子围栏组
        changeRailListJson(state, data) {
            state.RailListData = data
        },
        // 改变新全部电子围栏
        changeAllEnclosure(state, data) {
            state.allEnclosure = data
        },
        // 改变当前选中单独房间的信息
        changeNowRoominfo(state, data) {
            state.nowRoominfo = data
        },
        // 改变将要绘制的单点围栏
        changeDrewsinglePointPw(state, data) {
            state.drewsinglePointPw = data
        },
        // 清空将要绘制的单点围栏
        clearDrewsinglePointPw(state) {
            state.drewsinglePointPw = []
        },
        // 改变将要绘制的单个房间的电子围栏
        changeInRoomEnclosure(state, data) {
            state.inRoomEnclosure = data
        },
        // 清空将要绘制的单个房间的电子围栏
        clearInRoomEnclosure(state) {
            state.inRoomEnclosure = []
        },
        // 清空准备添加电子围栏的房间
        clearReadyAddRoom(state) {
            state.readyAddRoom = []
        },
        // 添加准备添加电子围栏的房间
        addReadyAddRoom(state, data) {
            state.readyAddRoom.push(data)
        },
        // 删除准备添加电子围栏的房间
        reduceReadyAddRoom(state, id) {
            state.readyAddRoom = state.readyAddRoom.filter((data) => data !== id);
        },
        // 切换选中楼层
        changeNowFloorId(state, data) {
            state.nowFloorId = data
        },
        // 改变录入方式
        changeInputMode(state, data) {
            state.inputMode = data
        },
        // 更新信号强度级别
        getSignalLevel(state, data) {
            state.signalLevelData = data
        },
        // 更新灵敏度等级
        getSensitivityLevel(state, data) {
            state.sensitivityLevelData = data
        },
        // 更新基站位置树
        changeBasestationTree(state, data) {
            state.BasestationTree = data
        },
        // 更新全部建筑结构
        changeNursingHomesTree(state, data) {
            state.NursingHomesTree = data
        },
        // 更新选中电子围栏组id
        updataSelectRailGroup(state, data) {
            state.selectRailGroup = data
        },
        // 更新选中电子围栏id
        updataSelectRailids(state, data) {
            state.selectRailids = data
        },
        // 更新将要绘画的电子围栏数据
        updataDrewRailList(state, data) {
            if (data.length == 0) this.commit('updataSelectRailids', [])
            let nowid = this.state.websocket.nowFloorId
            let arr = []
            data.forEach(element => {
                if (element.floorid == nowid) {
                    arr.push(element)
                }
            });
            state.drewRailList = arr
        }
    },
    actions: {
        // 获取全部电子围栏组
        railNew_getAllRailGroupList({ commit }) {
            return functionarrs.railNew_getAllRailGroupList().then(data => {
                commit('changeRailListJson', data)
                return data
            });
        },
        // 添加电子围栏组
        railNew_insertRailGroup({ commit }, json) {
            return functionarrs.railNew_insertRailGroup(json.railGroup, json.userid).then(data => {
                if (data.state === "success") {
                    Message({
                        message: "添加成功",
                        type: "success"
                    });
                    return 'success'
                } else {
                    Message.error(data.msg);
                    return 'error'
                }
            });
        },
        // 编辑电子围栏组
        railNew_updateRailGroup({ commit }, json) {
            return functionarrs.railNew_updateRailGroup(json.railGroup, json.userid).then(data => {
                if (data.state === "success") {
                    Message({
                        message: "编辑成功",
                        type: "success"
                    });
                    return 'success'
                } else {
                    Message.error(data.msg);
                    return 'error'
                }
            });
        },
        // 删除电子围栏组
        railNew_delRailGroup({ commit }, id) {
            return functionarrs.railNew_delRailGroup(id).then(data => {

                if (data.state === "success") {
                    Message({
                        message: "删除成功",
                        type: "success"
                    });
                    return 'success'
                } else {
                    Message.error(data.msg);
                    return 'error'
                }
            });
        },
        // 修改电子围栏
        railNew_updateRail({ commit, state }, json) {
            if (json.data.roomtype !== '1' && json.data.railtype !== "6" &&
                json.data.railtype !== "7") {
                json.data.roomidlist = state.readyAddRoom
            }
            return functionarrs.railNew_updateRail(json.data, json.userid).then(data => {
                if (data.state === "success") {
                    Message({
                        message: "修改成功",
                        type: "success"
                    });
                    return 'success'
                } else {
                    Message.error(data.msg);
                    return 'error'
                }
            });
        },
        // 删除电子围栏
        railNew_delRail({ commit }, json) {
            return functionarrs.railNew_delRail(json.id).then(data => {
                if (data === 'success') {
                    this.dispatch('railNew_getAllRailList', {
                        query: json.query,
                        floorid: json.floorid
                    })
                    Message.success('删除成功');
                } else {
                    Message.error('删除失败');
                }
            });
        },
        // 通过id查询电子围栏信息
        railNew_getRailById({ commit }, id) {
            return functionarrs.railNew_getRailById(id).then(data => {
                return data
            });
        },
        // 通过ids查询电子围栏信息
        railNew_getRailDrawing({ commit }, id) {
            return functionarrs.railNew_getRailDrawing(id).then(data => {
                // 单点
                let PointPw = []
                    // 单个房间
                let inroom = []
                    // 多个房间
                let MultipleRoom = []
                data.forEach(element => {
                    if (
                        element.roomtype === "1" && element.railtype !== "6" && element.railtype !== "7"
                    ) {
                        inroom.push(element)
                    } else if (
                        element.roomtype === "1" && (element.railtype === "6" || element.railtype === "7")
                    ) {
                        PointPw.push(element)
                    } else if (
                        element.roomtype === "2" && element.railtype !== "6" && element.railtype !== "7"
                    ) {
                        MultipleRoom.push(element)
                    } else if (
                        element.roomtype === "2" && (element.railtype === "6" || element.railtype === "7")
                    ) {
                        PointPw.push(element)
                    }
                });
                let obj = {
                    PointPw,
                    inroom,
                    MultipleRoom
                }
                return obj
            });
        },
        // 通过围栏组ids查询电子围栏信息
        railNew_getRailListByGroupIds({ commit }, ids) {
            return functionarrs.railNew_getRailListByGroupIds(ids).then(data => {

                // 单点
                let PointPw = []
                    // 单个房间
                let inroom = []
                    // 多个房间
                let MultipleRoom = []
                data.forEach(element => {
                    if (
                        element.roomtype === "1" && element.railtype !== "6" && element.railtype !== "7"
                    ) {
                        inroom.push(element)
                    } else if (
                        element.roomtype === "1" && (element.railtype === "6" || element.railtype === "7")
                    ) {
                        PointPw.push(element)
                    } else if (
                        element.roomtype === "2" && element.railtype !== "6" && element.railtype !== "7"
                    ) {
                        MultipleRoom.push(element)
                    } else if (
                        element.roomtype === "2" && (element.railtype === "6" || element.railtype === "7")
                    ) {
                        PointPw.push(element)
                    }
                });
                let obj = {
                    PointPw,
                    inroom,
                    MultipleRoom
                }
                return obj
            });
        },
        // 预览单点电子围栏
        singlePointPw({ commit }, json) {
            functionarrs.basestation_getBasestationById(json).then(data => {
                let arr = []
                arr.push({ xleftbmetre: data.basBasestationPO.xmetre, yleftbmetre: data.basBasestationPO.ymetre, floorid: data.basBasestationPO.floorid })
                commit('changeDrewsinglePointPw', arr)
            });
        },
        // 获取全部新电子围栏
        railNew_getAllRailList({ commit }, json) {
            functionarrs.railNew_getAllRailList(json.query, json.floorid).then(data => {
                commit('changeAllEnclosure', data)
            });
        },
        // 根据房间id获取房间信息
        room_getRoomById({ commit }, roomid) {
            functionarrs.room_getRoomById(roomid).then(data => {
                commit('changeNowRoominfo', data.basNursinghomeroomPO)
            });
        },
        // 新添加电子围栏信息
        railNew_insertRail({ commit, state }, json) {
            if (json.data.roomtype !== '1' && json.data.railtype !== "6" &&
                json.data.railtype !== "7") {
                json.data.roomidlist = state.readyAddRoom
            }
            return functionarrs.railNew_insertRail(json.data, json.userid).then(data => {

                if (data.state === "success") {
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
        // 通过类型获取基本信息数据
        basic_getBasDataByType({ commit }, str) {
            functionarrs.basic_getBasDataByType(str).then(data => {
                str == "signalLevel" ? commit("getSignalLevel", data) : commit("getSensitivityLevel", data)
            });
        },
        // 根据围栏组id数组获取围栏信息
        rail_getRailListByGroupIds({ commit }, json) {
            functionarrs.rail_getRailListByGroupIds(json).then(data => {
                commit("updataDrewRailList", data)
            });
        },
        // 根据围栏id数组获取围栏信息，并且更新电子围栏配置穿梭框中勾选数组
        rail_getRailDrawing({ commit }, json) {
            commit("updataSelectRailids", json)
            functionarrs.rail_getRailDrawing(json).then(data => {
                commit("updataDrewRailList", data)
            });
        },
        // 获取全部建筑结构
        room_getNursingHomesTree({ commit }) {
            functionarrs.room_getNursingHomesTree().then(data => {
                commit("changeNursingHomesTree", data)
            });
        },
        // 获取基站位置树
        rail_getBasestationTree({ commit }) {
            functionarrs.rail_getBasestationTree().then(data => {
                commit("changeBasestationTree", data)
            });
        },
    }
}
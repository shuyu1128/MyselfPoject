/**
 * User: peijialong
 * Date: 2020/04/26
 * Description: 历史警报状态
 */
import { functionarrs } from '../../../api/api'
export default {
    state: {
        historicalAlert: {},
        // 全部责任区域
        inpatientareas: null,
        // 房间床位统计
        RoomAndBedStatistics: null,
        // 房间床位统计图表数据
        RoomTypeStatisticsTotal: null,
        RoomTypeStatisticsType: null,
    },
    mutations: {
        // 获取全部关注信息
        mainPage_getAttention(state, data) {
            state.historicalAlert = data
        },
        // 更新全部责任区域
        changeInpatientareas(state, data) {
            state.inpatientareas = data
        },
        // 更新房间床位统计
        changeRoomAndBedStatistics(state, data) {
            state.RoomAndBedStatistics = data
        },
        // 更新房间床位统计图表数据
        changeRoomTypeStatistics(state, data) {
            state.RoomTypeStatisticsTotal = data.total
            state.RoomTypeStatisticsType = data.type
        }
    },
    actions: {
        // 获取全部关注信息
        mainPage_getAttention({ commit }, data) {
            return functionarrs
                .mainPage_getAttention(data.personName, data.beginTime, data.endTime, data.pageCount, data.pageNum)
                .then(data => {
                    commit("mainPage_getAttention", data)
                });
        },
        // 获取全部责任区域
        roomStatus_getInpatientareaListByUserid({ commit }, userid) {
            return functionarrs
                .roomStatus_getInpatientareaListByUserid(userid)
                .then(data => {
                    commit('changeInpatientareas', data)
                    return data
                });
        },
        // // 院内房间床位统计
        roomStatus_getRoomAndBedStatistics({ commit }, inpatientareas) {
            return functionarrs
                .roomStatus_getRoomAndBedStatistics(inpatientareas)
                .then(data => {
                    commit('changeRoomAndBedStatistics', data)
                });
        },
        // 获取房间不同类型中 不同状态的个数
        roomStatus_getRoomTypeStatistics({ commit }, inpatientareas) {
            return functionarrs
                .roomStatus_getRoomTypeStatistics(inpatientareas)
                .then(data => {
                    commit('changeRoomTypeStatistics', data)
                });
        },
    }
}
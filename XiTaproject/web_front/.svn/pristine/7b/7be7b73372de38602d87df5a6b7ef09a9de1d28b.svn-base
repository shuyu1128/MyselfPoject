/**
 * User: peijialong
 * Date: 2020/10/21
 * Description: 护理管理/工作统计
 */
import { functionarrs } from '../../../api/api'
import allMethods from '../../../components/allMethods'
import { Message } from 'element-ui';
export default {
    state: {
        // 长者统计列表
        personList: [],
        // 长者可审查护理内容列表
        personContentList: [],
        // 护工统计列表
        nursingWorkList: [],
        // 护工可审查护理内容列表
        nursingWorkContentList: [],
        // 当前查看组别id
        nowGroupData: '',
        internalShow: false,
        // 全部组别
        workGroups: [],
        // 查询条件
        teamName: '',
        type: 'day',
        beginDate: allMethods.getDay(-1, "-"),
    },
    mutations: {
        clearWork(state) {
            state.teamName = "";
            state.type = 'day';
            state.beginDate = allMethods.getDay(-1, "-");
            state.workGroups = []
            state.internalShow = false;
        },
        // 打开审批组别内护工和长者组件
        openInternalShow(state, data) {
            state.nowGroupData = data
            state.internalShow = true
        },
        // 关闭审批组别内护工和长者组件
        closeInternalShow(state) {
            state.internalShow = false
        },
        // 获取全部组
        changeWorkGroups(state, data) {
            state.workGroups = data
        },
        // 修改查询条件
        ChangeTeamName(state, data) {
            state.teamName = data
        },
        ChangeType(state, data) {
            state.type = data
        },
        ChangeBeginDate(state, data) {
            state.beginDate = data
        },
        // 更新长者统计列表
        changePersonList(state, data) {
            state.personList = data
        },
        // 更新长者可审查护理内容列表
        changePersonContentList(state, data) {
            state.personContentList = data
        },
        // 更新护工统计列表
        changeNursingWorkList(state, data) {
            state.nursingWorkList = data
        },
        // 更新护工可审查护理内容列表
        changeNursingWorkContentList(state, data) {
            state.nursingWorkContentList = data
        },
    },
    actions: {
        // 获取全部组（可查询 条件：组别名称、查询周期、查询时间  内容：总完成度、应做工时、不合格工时、审批工时）
        workStatistics_teamWorkStatistics({ commit, state }) {
            functionarrs
                .workStatistics_teamWorkStatistics(state.teamName, state.type, state.beginDate)
                .then(data => {
                    commit('changeWorkGroups', data)
                });
        },
        // 根据组别id获取护工列表
        workStatistics_nursingWorkStatisticsByTeamid({ commit, state }) {
            functionarrs
                .workStatistics_nursingWorkStatisticsByTeamid(state.nowGroupData.teamid, state.type, state.beginDate)
                .then(data => {
                    commit('changeNursingWorkList', data)
                });
        },
        // 根据护工id获取可进行审批的护理内容
        workStatistics_nursingContentsBynursingUserid({ commit }, json) {
            functionarrs
                .workStatistics_nursingContentsBynursingUserid(json.nowNursingUserid, json.type, state.beginDate)
                .then(data => {
                    commit('changeNursingWorkContentList', data)
                });
        },
        // 根据组别id获取长者列表
        workStatistics_personWorkStatisticsByTeamid({ commit, state }) {
            functionarrs
                .workStatistics_personWorkStatisticsByTeamid(state.nowGroupData.teamid, state.type, state.beginDate)
                .then(data => {
                    commit('changePersonList', data)
                });
        },
        // 根据长者id获取可进行审批的护理内容
        workStatistics_nursingContentsBypersinid({ commit, state }) {
            functionarrs
                .workStatistics_nursingContentsBypersinid(state.nowPersinid, state.type, state.beginDate)
                .then(data => {
                    commit('changePersonContentList', data)
                });
        },
        // 审批护理内容（返回：state msg）
        nursingContents_approvalNursingContents({ commit }, json) {
            functionarrs
                .nursingContents_approvalNursingContents(json.state, json.nursingid, json.type, this.state.token)
                .then(data => {
                    if (data.state === "success") {
                        Message.success("审批成功");
                        return 'yes';
                    } else {
                        Message.error(data.msg);
                        return 'no';
                    }
                });
        },
    }
}
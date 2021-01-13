/**
 * User: peijialong
 * Date: 2020/05/24
 * Description: 智能健康评估配置
 */
import { functionarrs } from '../../../api/api'
import { Message } from 'element-ui';
export default {
    state: {
        // 全部护理分类列表
        nursingList: [],
        // 当前选中护理列表id
        nursingListId: '',
        // 上级分类id
        nowPid: '',
        // 护理内容树
        contentTree: [],
        // 基础设施树
        facilitiesTree: [],
        // 当前选中的护理内容
        selectContent: null,
        // 题目列表
        TopicList: [],
        // 编辑弹窗
        updataFormVisible: false,
        updataFormVisible2: false,
    },
    mutations: {
        // 打开编辑弹窗
        openUpdataVisible(state) {
            state.updataFormVisible = true
        },
        // 关闭编辑弹窗
        closeUpdataVisible(state) {
            state.updataFormVisible = false
        },
        // 打开编辑弹窗(基础收费)
        openUpdataVisible2(state) {
            state.updataFormVisible2 = true
        },
        // 关闭编辑弹窗(基础收费)
        closeUpdataVisible2(state) {
            state.updataFormVisible2 = false
        },
        // 改变题目列表
        changeTopicList(state, data) {
            state.TopicList = data
        },
        // 改变护理分类列表
        changeNursingList(state, data) {
            state.nursingList = data
        },
        // 改变当前选中护理内容ID
        changeNursingListId(state, data) {
            state.nursingListId = data
        },
        // 改变当前选中上级分类id
        changeNowPid(state, data) {
            state.nowPid = data
        },
        // 改变护理内容树
        changeContentTree(state, data) {
            state.contentTree = data
        },
        // 改变基础设施树
        changeFacilitiesTree(state, data) {
            state.facilitiesTree = data
        },
        // 改变当前选中的护理内容
        changeSelectContent(state, data) {
            console.log(data);
            state.selectContent = data
        },
        // 替换page2的树形结构节点（护理内容）
        replaceNode(state, data) {
            function forTree(arr, id) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].child) {
                        forTree(arr[i].child, id)
                        if (arr[i].id === id) {
                            arr[i].child = data
                            break;
                        }
                    }
                }
            }
            forTree(state.contentTree, state.nowPid)
        },
        // 替换page2的树形结构节点(基础设施收费)
        replaceNode2(state, data) {
            function forTree(arr, id) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].child) {
                        forTree(arr[i].child, id)
                        if (arr[i].id === id) {
                            arr[i].child = data
                            break;
                        }
                    }
                }
            }
            forTree(state.facilitiesTree, state.nowPid)
        },
    },
    actions: {
        // 新增护理内容
        evalNursing_insertNursingClassificationS({ commit, dispatch }, data) {
            return functionarrs.evalNursing_insertNursingClassificationS(data.json, data.userid, data.topicWeight).then(data => {
                if (data.state == 'success') {
                    dispatch('evalNursing_getNursingClassificationSById')
                    commit('replaceNode', data.data)
                }
                return data
            });
        },
        // 添加护理收费信息
        evalNursing_insertNursingCharge({ commit, dispatch }, data) {
            return functionarrs.evalNursing_insertNursingCharge(data.json, data.userid).then(data => {
                if (data.state == 'success') {
                    dispatch('evalNursing_getNursingChargeById')
                    commit('replaceNode2', data.data)
                }
                return data
            });
        },
        // 修改护理内容信息
        updateNursingClassificationSById({ commit, dispatch }, data) {
            return functionarrs.updateNursingClassificationSById(data.json, data.userid, data.topicWeight).then(data => {
                if (data.state == 'success') {
                    dispatch('evalNursing_getNursingClassificationSById')
                    commit('replaceNode', data.data)
                }
                return data
            });
        },
        // 修改护理收费信息
        evalNursing_updateNursingChargeById({ commit, dispatch }, data) {
            return functionarrs.evalNursing_updateNursingChargeById(data.json, data.userid).then(data => {
                if (data.state == 'success') {
                    dispatch('evalNursing_getNursingChargeById')
                    commit('replaceNode2', data.data)
                }
                return data
            });
        },
        // 查询题目列表
        evalTopic_getTopicList({ commit }) {
            functionarrs.evalTopic_getTopicList().then(data => {
                data.forEach(element => {
                    element.weight = 0
                });
                commit('changeTopicList', data)
            });
        },
        // 通过id 查询当前节点护理内容信息
        evalNursing_getNursingClassificationSById({ commit, state }) {
            functionarrs.evalNursing_getNursingClassificationSById(state.nowPid).then(data => {
                var obj = data
                functionarrs.getNursingClassificationSByPid(state.nowPid).then(data => {
                    obj.child = data
                    commit('changeSelectContent', obj)
                });
            });
        },
        // 通过id 查询当前节点护理收费信息
        evalNursing_getNursingChargeById({ commit, state }) {
            functionarrs.evalNursing_getNursingChargeById(state.nowPid).then(data => {
                var obj = data
                functionarrs.evalNursing_getNursingChargeByPid(state.nowPid).then(data => {
                    obj.child = data
                    commit('changeSelectContent', obj)
                });
            });
        },
        // 获取护理内容树
        getNursingClassificationSObj({ commit, state }) {
            functionarrs.getNursingClassificationSObj(state.nursingListId).then(data => {
                commit('changeContentTree', data)
            });
        },
        // 获取基础设施树
        evalNursing_getnursingChargeObj({ commit, state }) {
            functionarrs.evalNursing_getnursingChargeObj(state.nursingListId).then(data => {
                commit('changeFacilitiesTree', data)
            });
        },
        // 查询护理分类列表
        getNursingClassificationList({ commit }) {
            functionarrs.getNursingClassificationList().then(data => {
                commit('changeNursingList', data)
            });
        },
        // 新增护理列表
        evalNursing_insertNursingClassification({ commit, dispatch }, json) {
            functionarrs.evalNursing_insertNursingClassification(json.value, json.userid).then(data => {
                if (data.state == "success") {
                    // 新增成功后重新获取列表
                    dispatch('getNursingClassificationList')
                    Message.success("添加成功！")
                } else {
                    Message(data.msg);
                }
            });
        },
        // 修改护理列表名称
        evalNursing_updateNursingClassificationById({ commit, dispatch }, json) {
            functionarrs.evalNursing_updateNursingClassificationById(JSON.stringify(json.obj), json.userid).then(data => {
                if (data.state == "success") {
                    // 修改成功后重新获取列表
                    dispatch('getNursingClassificationList')
                    Message.success("修改成功！")
                } else {
                    Message(data.msg);
                }
            });
        },
        // 删除护理列表
        evalNursing_deleteNursingClassificationById({ commit, dispatch }, json) {
            functionarrs.evalNursing_deleteNursingClassificationById(json.id, json.userid).then(data => {
                if (data.state == "success") {
                    // 删除成功后重新获取列表
                    dispatch('getNursingClassificationList')
                    Message.success("删除成功！")
                } else {
                    Message(data.msg);
                }
            });
        },
    }
}
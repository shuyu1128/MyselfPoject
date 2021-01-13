import http from '../utils/http'
// let resquest = process.env.VUE_APP_URL

// 请求
export default {
    // 登录
    doLogin(params) {
        return http.post(`receiving/receivingUser/doLogin`, params)
    },
    // 退出账号
    removeUser(params) {
        return http.post(`receiving/receivingUser/removeUser`, params)
    },
    // 修改密码
    updateReceivingUserPassword(params) {
        return http.post(`receiving/receivingUser/updateReceivingUserPassword`, params)
    },
    // 获取账户信息
    getUser(params) {
        return http.post(`receiving/receivingUser/getUser`, params)
    },
    // 获取冻结时长
    getFrozenEstimatedTimeByReceivingid(params) {
        return http.post(`receiving/log/getFrozenEstimatedTimeByReceivingid`, params)
    },
    // 获取兑换时长
    getExchangeEstimatedTimeByReceivingid(params) {
        return http.post(`receiving/exchangeApproval/getExchangeEstimatedTimeByReceivingid`, params)
    },
    // 修改账户信息
    updateReceivingUser(params) {
        return http.post(`receiving/receivingUser/updateReceivingUser`, params)
    },
    // 随意调用接口，用于验证登录态
    judgeSession(params) {
        return http.post(`receiving/receivingUser/judgeSession`, params)
    },
    // 获取未接单工单列表
    getNotReceivedWorkOrderListn(params) {
        return http.post(`receiving/workOrder/getNotReceivedWorkOrderList`, params)
    },
    // 接取工单
    receivedWorkOrder(params) {
        return http.post(`receiving/workOrder/receivedWorkOrder`, params)
    },
    // 查询本人已接收工单
    getWorkOrderListByReceivingid(params) {
        return http.post(`receiving/workOrder/getWorkOrderListByReceivingid`, params)
    },
    // 通过接单人id 统计接单人工单
    getReceivingStatisticsById(params) {
        return http.post(`receiving/workOrder/getReceivingStatisticsById`, params)
    },
    // 获取接单端日志列表
    getLogListByReceivingid(params) {
        return http.post(`receiving/log/getLogListByReceivingid`, params)
    },
    // 通过工单id 查询工单信息
    getWorkOrderById(params) {
        return http.post(`receiving/workOrder/getWorkOrderById`, params)
    },
    // 工单开始
    receivedWorkOrderStart(params) {
        return http.post(`receiving/workOrder/receivedWorkOrderStart`, params)
    },
    // 工单完成
    receivedWorkOrderCompleted(params) {
        return http.post(`receiving/workOrder/receivedWorkOrderCompleted`, params)
    },
    // 接单端查询全部审批列表
    getExchangeApprovalList(params) {
        return http.post(`receiving/exchangeApproval/getExchangeApprovalList`, params)
    },
    // 接单端修改兑换审批状态
    updateApprovalState(params) {
        return http.post(`receiving/exchangeApproval/updateApprovalState`, params)
    },
    // 审批 状态为接单待审批的工单
    receivedApprovalWorkOrder(params) {
        return http.post(`receiving/workOrder/receivedApprovalWorkOrder`, params)
    },
    // 查询工单上传文件信息
    getFileListByOrderid(params) {
        return http.post(`receiving/workOrder/getFileListByOrderid`, params)
    },


    // 根据护工账号获取长者列表
    getPersonListByTeamid(params) {
        return http.post(`nursing/prnPerson/getPersonListByTeamid`, params)
    },
    // 上传文件
    uploadNursingContentsFile(params) {
        return http.post(`nursing/nursingContents/uploadNursingContentsFile`, params)
    },
    // 提交护理内容
    // 参数  feedback, nursingContentsid, type,fileid,personid
    completeNursingContents(params) {
        return http.post(`nursing/nursingContents/completeNursingContents`, params)
    },
    // 获取护工护理完成度统计
    getNursingWorkProgress(params) {
        return http.post(`nursing/nursingContents/getNursingWorkProgress`, params)
    },
    // 判断班次
    judgeShift(params) {
        return http.post(`nursing/bizClock/judgeShift`, params)
    },
    // 添加班次
    // 参数  shift
    insertClock(params) {
        return http.post(`nursing/bizClock/insertClock`, params)
    },
    // 判断此人是否打卡
    judgeClock(params) {
        return http.post(`nursing/bizClock/judgeClock`, params)
    },






    
    // 护工查看人员护理内容信息
    getNursingContentsListByPersonId(params) {
        return http.post(`nursing/nursingContents/getNursingContentsListByPersonId`, params)
    },
    // 通过养老院id 查询服务器信息
    server_getServerListByNursinghomeId(params) {
        return http.post(`server/getServerListByNursinghomeId`, params)
    },
    // 查看院信息
    nursinghome_getNursinghomeList() {
        return http.post(`nursinghome/getNursinghomeList`)
    },
    // 通过用户id查看用户信息
    login_getSsoUserPOByUserId(params) {
        return http.post(`login/getSsoUserPOByUserId`, params)
    },
    // 修改密码
    login_changePassword(params) {
        return http.post(`login/changePassword`, params)
    },
    // 获取服务容器与服务器的树形结构
    container_getContainerTree(params) {
        return http.post(`container/getContainerTree`, params)
    },
    // 获取全部院下的服务容器的树形结构
    container_getNursingContainerTree(params) {
        return http.post(`/container/getNursingContainerTree`, params)
    },
    // 获取院信息及服务器个数
    nursinghome_getNursinghomeListTable(params) {
        return http.post(`/nursinghome/getNursinghomeListTable`, params)
    },
    // 获取客户端权限树
    childRight_getRightTree(params) {
        return http.post(`/childRight/getRightTree`, params)
    },
    // 通过院id 推送权限信息
    thetada_right_push(params) {
        return http.post(`/thetada/right_push`, params)
    },
    //  通过院id 推送院信息授权时间
    thetada_nursingDate_push(params) {
        return http.post(`/thetada/nursingDate_push`, params)
    },
    // 通过客户端信息查询拥有权限列表
    childRight_getRightListByNursingId(params) {
        return http.post(`/childRight/getRightListByNursingId`, params)
    },
    // 获取客户端版本号 mac ip port
    // 参数  nursingId
    thetada_getVersionNum(params) {
        return http.post(`/thetada/getVersionNum`, params)
    },
    // 上传war文件 并更新程序
    // 参数  file nursingId
    fileUpload_uploadWarFile(params) {
        return http.post(`/fileUpload/uploadWarFile`, params)
    },
    // 查询院信息及项目版本
    nursinghome_getNursinghomeVersionList(params) {
        return http.post(`/nursinghome/getNursinghomeVersionList`, params)
    },
}
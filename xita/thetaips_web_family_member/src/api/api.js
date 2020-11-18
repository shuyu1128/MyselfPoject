import http from '../utils/http'
// let resquest = process.env.VUE_APP_URL

// 请求
export default {
    // 登录
    doLogin(params) {
        return http.post(`family/sysFamilyUser/doLogin`, params)
    },
    // 退出账号
    removeUser(params) {
        return http.post(`family/sysFamilyUser/removeUser`, params)
    },
    // 获取账户信息
    getUser(params) {
        return http.post(`family/sysFamilyUser/getUser`, params)
    },
    // 3.获取长者列表（姓名，id，健康状况，不包含完成度）
    getPersonListByFamily(params) {
        return http.post(`family/familyPerson/getPersonListByFamily`, params)
    },
    // 获取服务内容
    // 参数  personid  type  nowDay
    getNursingContentsListByPersonId(params) {
        return http.post(`family/nursingContents/getNursingContentsListByPersonId`, params)
    },
    // 添加投诉信息
    insertComplaint(params) {
        return http.post(`family/complaint/insertComplaint`, params)
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
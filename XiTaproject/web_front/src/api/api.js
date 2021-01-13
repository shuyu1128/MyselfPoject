import axios from 'axios'
import Qs from 'qs'
// 用户及权限管理
// 获取全部角色
function basic_getAllRightRoleList(roleName, userName) {
    return axios
        .post(
            process.env.API_HOST + "/basic/getAllRightRoleList", `roleName=${roleName}&userName=${userName}`
        )
        .then(respones => respones.data);
}
// 创建角色
function basic_insertRole(rolename) {
    return axios
        .post(
            process.env.API_HOST + "/basic/insertRole", `rolename=${rolename}`
        )
        .then(respones => respones.data);
}

// 删除角色
function basic_deleteRole(id) {
    return axios
        .post(
            process.env.API_HOST + "/basic/deleteRole", `id=${id}`
        )
        .then(respones => respones.data);
}
// 根据角色id获取角色权限
function basic_getRightRole(roleid) {
    return axios
        .post(
            process.env.API_HOST + "/basic/getRightRole", `roleid=${roleid}`
        )
        .then(respones => respones.data);
}
// 修改角色
function basic_insertRightRole(json) {
    return axios
        .post(
            process.env.API_HOST + "/basic/insertRightRole", `json=${JSON.stringify(json)}`
        )
        .then(respones => respones.data);
}
// 修改角色名称
function basic_updateRole(json) {
    return axios
        .post(
            process.env.API_HOST + "/basic/updateRole", `json=${JSON.stringify(json)}`
        )
        .then(respones => respones.data);
}
// 获取全部责任区域信息
function inpatient_getAllInpatientList(search) {
    return axios
        .post(
            process.env.API_HOST + "/inpatient/getAllInpatientList", `search=${JSON.stringify(search)}`
        )
        .then(respones => respones.data);
}
// 添加责任区域信息
function inpatient_insertInpatient(json, userid, roomids) {
    return axios
        .post(
            process.env.API_HOST + "/inpatient/insertInpatient", `json=${JSON.stringify(json)}&userid=${userid}&roomids=${JSON.stringify(roomids)}`
        )
        .then(respones => respones.data);
}
// 删除责任区域信息
function inpatient_delInpatient(inpatientId, userid) {
    return axios
        .post(
            process.env.API_HOST + "/inpatient/delInpatient", `inpatientId=${inpatientId}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 修改责任区域信息
function inpatient_updateInpatient(json, userid, roomids) {
    return axios
        .post(
            process.env.API_HOST + "/inpatient/updateInpatient", `json=${JSON.stringify(json)}&userid=${userid}&roomids=${JSON.stringify(roomids)}`
        )
        .then(respones => respones.data);
}
// 根据id获取责任区域信息
function inpatient_getInpatientById(inpatientId) {
    return axios
        .post(
            process.env.API_HOST + "/inpatient/getInpatientById", `inpatientId=${inpatientId}`
        )
        .then(respones => respones.data);
}
// 根据id获取责任区域默认选中房间
function inpatient_getRoomsByInpatientId(inpatientId) {
    return axios
        .post(
            process.env.API_HOST + "/inpatient/getRoomsByInpatientId", `inpatientId=${inpatientId}`
        )
        .then(respones => respones.data);
}
// 通过用户查看部门权限列表
function dept_getDeptIdListByUser(userid) {
    return axios
        .post(
            process.env.API_HOST + "/dept/getDeptIdListByUser", `userid=${userid}`
        )
        .then(respones => respones.data);
}
// 新院内录入数据
// 添加养老院
function nursingHome_insertNursingHome(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/nursingHome/insertNursingHome", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 修改养老院
function nursingHome_updateNursingHome(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/nursingHome/updateNursingHome", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}

// 获取到房间的建筑树形结构
function bed_getNursingHomesTree() {
    return axios
        .post(
            process.env.API_HOST + "/bed/getNursingHomesTree"
        )
        .then(respones => respones.data);
}
// 获取建筑结构
function bed_getNursingHomesAllTree(name) {
    return axios
        .post(
            process.env.API_HOST + "/bed/getNursingHomesAllTree", `name=${name}`
        )
        .then(respones => respones.data);
}

//   删除建筑
function buildin_delBuilding(buildingId, userid) {
    return axios
        .post(
            process.env.API_HOST + "/building/delBuilding", `buildingId=${buildingId}&userid=${userid}`
        )
        .then(respones => respones.data);
}
//   删除楼层
function floor_delFloor(floorId, userid) {
    return axios
        .post(
            process.env.API_HOST + "/floor/delFloor", `floorId=${floorId}&userid=${userid}`
        )
        .then(respones => respones.data);
}
//   删除房间
function room_delRoom(roomId, userid) {
    return axios
        .post(
            process.env.API_HOST + "/room/delRoom", `roomId=${roomId}&userid=${userid}`
        )
        .then(respones => respones.data);
}
//   删除床位
function bed_delBed(bedId, userid) {
    return axios
        .post(
            process.env.API_HOST + "/bed/delBed", `bedId=${bedId}&userid=${userid}`
        )
        .then(respones => respones.data);
}

//   添加建筑
function building_insertBuilding(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/building/insertBuilding", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
//   添加楼层
function floor_insertFloor(json, userid, buildingid) {
    return axios
        .post(
            process.env.API_HOST + "/floor/insertFloor", `json=${JSON.stringify(json)}&userid=${userid}&buildingid=${buildingid}`
        )
        .then(respones => respones.data);
}
//   添加房间
function room_insertRoom(json, userid, floorid) {
    return axios
        .post(
            process.env.API_HOST + "/room/insertRoom", `json=${JSON.stringify(json)}&userid=${userid}&floorid=${floorid}`
        )
        .then(respones => respones.data);
}
//   添加床位
function bed_insertBed(json, userid, roomid) {
    return axios
        .post(
            process.env.API_HOST + "/bed/insertBed", `json=${JSON.stringify(json)}&userid=${userid}&roomid=${roomid}`
        )
        .then(respones => respones.data);
}

//   编辑建筑
function building_updateBuilding(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/building/updateBuilding", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
//   编辑楼层
function floor_updateFloor(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/floor/updateFloor", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
//   编辑房间
function room_updateRoom(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/room/updateRoom", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
//   编辑床位
function bed_updateBed(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/bed/updateBed", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}








// 房间状态
// 获取全部责任区域
function roomStatus_getInpatientareaListByUserid(userid) {
    return axios
        .post(
            process.env.API_HOST + "/roomStatus/getInpatientareaListByUserid", `userid=${userid}`
        )
        .then(respones => respones.data);
}
// 院内房间床位统计
function roomStatus_getRoomAndBedStatistics(inpatientareas) {
    return axios
        .post(
            process.env.API_HOST + "/roomStatus/getRoomAndBedStatistics", `inpatientareas=${JSON.stringify(inpatientareas)}`
        )
        .then(respones => respones.data);
}
// 获取房间不同类型中 不同状态的个数
function roomStatus_getRoomTypeStatistics(inpatientareas) {
    return axios
        .post(
            process.env.API_HOST + "/roomStatus/getRoomTypeStatistics", `inpatientareas=${JSON.stringify(inpatientareas)}`
        )
        .then(respones => respones.data);
}





// 电子围栏配置
// 获取全部建筑结构
function room_getNursingHomesTree() {
    return axios
        .post(
            process.env.API_HOST + "/room/getNursingHomesTree"
        )
        .then(respones => respones.data);
}
// 新添加电子围栏信息
function railNew_insertRail(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/railNew/insertRail", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 通过id获取房间信息
function room_getRoomById(roomId) {
    return axios
        .post(
            process.env.API_HOST + "/room/getRoomById", `roomId=${roomId}`
        )
        .then(respones => respones.data);
}
// 获取全部电子围栏数据
function railNew_getAllRailList(query, floorid) {
    return axios
        .post(
            process.env.API_HOST + "/railNew/getAllRailList", `query=${JSON.stringify(query)}&floorid=${floorid}`
        )
        .then(respones => respones.data);
}
// 通过id查询电子围栏信息
function railNew_getRailById(railid) {
    return axios
        .post(
            process.env.API_HOST + "/railNew/getRailById", `railid=${railid}`
        )
        .then(respones => respones.data);
}
// 修改电子围栏信息
function railNew_updateRail(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/railNew/updateRail", `json=${JSON.stringify(json)}&&userid=${userid}`
        )
        .then(respones => respones.data);
}

//  删除电子围栏
function railNew_delRail(id) {
    return axios
        .post(
            process.env.API_HOST + "/railNew/delRail", `id=${id}`
        )
        .then(respones => respones.data);
}
// 查询全部电子围栏组
function railNew_getAllRailGroupList() {
    return axios
        .post(
            process.env.API_HOST + "/railNew/getAllRailGroupList"
        )
        .then(respones => respones.data);
}
// 添加电子围栏组
function railNew_insertRailGroup(railGroup, userid) {
    return axios
        .post(
            process.env.API_HOST + "/railNew/insertRailGroup", `railGroup=${JSON.stringify(railGroup)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 编辑电子围栏组
function railNew_updateRailGroup(railGroup, userid) {
    return axios
        .post(
            process.env.API_HOST + "/railNew/updateRailGroup", `railGroup=${JSON.stringify(railGroup)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 删除电子围栏组
function railNew_delRailGroup(id) {
    return axios
        .post(
            process.env.API_HOST + "/railNew/delRailGroup", `id=${id}`
        )
        .then(respones => respones.data);
}
// 根据新电子围栏id数组获取电子围栏数组
function railNew_getRailDrawing(railids) {
    return axios
        .post(
            process.env.API_HOST + "/railNew/getRailDrawing", `railids=${JSON.stringify(railids)}`
        )
        .then(respones => respones.data);
}
// 通过分组ids 查询电子围栏列表
function railNew_getRailListByGroupIds(groupIds) {
    return axios
        .post(
            process.env.API_HOST + "/railNew/getRailListByGroupIds", `groupIds=${JSON.stringify(groupIds)}`
        )
        .then(respones => respones.data);
}



















// 根据电子围栏id数组获取电子围栏数组
function rail_getRailDrawing(railids) {
    return axios
        .post(
            process.env.API_HOST + "/rail/getRailDrawing", `railids=${JSON.stringify(railids)}`
        )
        .then(respones => respones.data);
}
// 根据电子围栏组id数组获取电子围栏数组
function rail_getRailListByGroupIds(groupIds) {
    return axios
        .post(
            process.env.API_HOST + "/rail/getRailListByGroupIds", `groupIds=${JSON.stringify(groupIds)}`
        )
        .then(respones => respones.data);
}
// 根据老人id获取默认绑定电子围栏组
function person_getRailGroupsByPerson(personid) {
    return axios
        .post(
            process.env.API_HOST + "/person/getRailGroupsByPerson", `personid=${personid}`
        )
        .then(respones => respones.data);
}
// 获取所有电子围栏组
function rail_getAllRailGroupList() {
    return axios
        .post(
            process.env.API_HOST + "/rail/getAllRailGroupList"
        )
        .then(respones => respones.data);
}
// 添加长者
function person_insertPersonData(userid, username, deviceId, hospitalID) {
    return axios
        .post(
            process.env.API_HOST + "/person/insertPersonData", `userid=${userid}&username=${username}&deviceId=${deviceId}&hospitalID=${hospitalID}`
        )
        .then(respones => respones.data);
}
// 批量人员删除
function person_delPersonByIds(personIds, userid) {
    return axios
        .post(
            process.env.API_HOST + "/person/delPersonByIds", `personIds=${JSON.stringify(personIds)}&userid=${userid}&state=1`
        )
        .then(respones => respones.data);
}
// 批量人员离院
function person_departurePersons(personids, userid) {
    return axios
        .post(
            process.env.API_HOST + "/person/departurePersons", `personids=${JSON.stringify(personids)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 批量修改在院状态
function person_updatePersonsInHospital(personIds, userid, state, oldState) {
    return axios
        .post(
            process.env.API_HOST + "/person/updatePersonsInHospital", `personIds=${JSON.stringify(personIds)}&userid=${userid}&state=${state}&oldState=${oldState}`
        )
        .then(respones => respones.data);
}
//人员离院
function person_departurePerson(personid, userid) {
    return axios
        .post(
            process.env.API_HOST + "/person/departurePerson", `personid=${personid}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 修改人员状态
function person_updatePerson(person, userid) {
    return axios
        .post(
            process.env.API_HOST + "/person/updatePerson", `person=${JSON.stringify(person)}&userid=${userid}`
        )
        .then(respones => respones.data);
}

// 删除人员
function person_delPersonById(id, userid) {
    return axios
        .post(
            process.env.API_HOST + "/person/delPersonById", `id=${id}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 通过人员id查询符合条件的全部生命体征历史信息
function person_getAllVitalSignsListByPersonId(personid, type, beginDate) {
    return axios
        .post(
            process.env.API_HOST + "/person/getAllVitalSignsListByPersonId", `personid=${personid}&type=${type}&beginDate=${beginDate}`
        )
        .then(respones => respones.data);
}
// 通过人员id获取生命体征历史信息
function person_getVitalSignsListByPersonId(personid, pageCount, pageNum) {
    return axios
        .post(
            process.env.API_HOST + "/person/getVitalSignsListByPersonId", `personid=${personid}&pageCount=${pageCount}&pageNum=${pageNum}`
        )
        .then(respones => respones.data);
}
// 获取楼层信息接口
function mainPage_getFloorAndRoomJson(personId) {
    return axios
        .post(
            process.env.API_HOST + "/mainPage/getFloorAndRoomJson", `personId=${personId}`
        )
        .then(respones => respones.data);
}
// 获取全部未佩戴手环
function person_getDeviceListByPersonId(personId) {
    return axios
        .post(
            process.env.API_HOST + "/person/getDeviceListByPersonId", `personId=${personId}`
        )
        .then(respones => respones.data);
}
// 查看老人特殊关注
function mainPage_getAttention(personName, beginTime, endTime, pageCount, pageNum) {
    return axios
        .post(
            process.env.API_HOST + "/mainPage/getAttention", `personName=${personName}&beginTime=${beginTime}&endTime=${endTime}&pageCount=${pageCount}&pageNum=${pageNum}`
        )
        .then(respones => respones.data);
}
// 获取全部老人
function person_getPersonList(sousou) {
    return axios
        .post(
            process.env.API_HOST + "/person/getPersonList", `sousou=${JSON.stringify(sousou)}`
        )
        .then(respones => respones.data);
}
// 修改用户选项卡
function person_insertUserProfileSettings(settings, userid) {
    return axios
        .post(
            process.env.API_HOST + "/person/insertUserProfileSettings", `settings=${JSON.stringify(settings)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 通过用户id查询用户信息
function basic_getUserById(userid) {
    return axios
        .post(
            process.env.API_HOST + "/basic/getUserById", `userid=${userid}`
        )
        .then(respones => respones.data);
}
// 获取老人简介的全部字段
function person_getAllProfileSettings(userid) {
    return axios
        .post(
            process.env.API_HOST + "/person/getAllProfileSettings", `userid=${userid}`
        )
        .then(respones => respones.data);
}
// 通过id获取老人信息
function person_getPersonById(id) {
    return axios
        .post(
            process.env.API_HOST + "/person/getPersonById", `id=${id}`
        )
        .then(respones => respones.data);
}
// 查询护理分类列表
function getNursingClassificationList() {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/getNursingClassificationList"
        )
        .then(respones => respones.data);

}
// 获取答题内容
function getTopicTree(num) {
    return axios
        .post(
            process.env.API_HOST + "/evalTopic/getTopicTree",
            `search={typeClassification:${num}}`
        )
        .then(respones => respones.data);
}
// 第一部分能力部分答题结果
function insertFirstStepAnswer(json, userid, personid) {
    return axios
        .post(
            process.env.API_HOST + "/evalPerson/insertFirstStepAnswer",
            `json=${JSON.stringify(json)}&userid=${
            userid
            }&personid=${personid}`
        )
        .then(respones => respones.data);
}
// 第二部分能力部分答题结果
function insertSecondStepAnswer(json, userid, summaryid) {
    return axios
        .post(
            process.env.API_HOST + "/evalPerson/insertSecondStepAnswer",
            `json=${JSON.stringify(json)}&userid=${
            userid
            }&summaryId=${summaryid}`
        )
        .then(respones => respones.data);
}
// 根据所选择的护理方案 生成护理内容
function getNursingClassificationObj(nursingClassificationId, summaryId) {
    return axios
        .post(
            process.env.API_HOST + "/evalPersonNursing/getNursingClassificationObj",
            `nursingClassificationId=${nursingClassificationId}&summaryId=${
            summaryId
            }`
        )
        .then(respones => respones.data);
}
// 获取基础设施费用
function getNursingChargeObj(nursingClassificationId) {
    return axios
        .post(
            process.env.API_HOST + "/evalPersonNursing/getNursingChargeObj",
            `nursingClassificationId=${nursingClassificationId}`
        )
        .then(respones => respones.data);
}
// 添加个人护理方案
function insertNursing(json, summaryId, userid, newClassification, nursingClassificationId, nursingChargeTree) {
    return axios
        .post(
            process.env.API_HOST + "/evalPersonNursing/insertNursing",
            `json=${JSON.stringify(json)}&summaryId=${summaryId}&userid=${userid}&newClassification=${
            newClassification
            }&nursingClassificationId=${nursingClassificationId}&nursingChargeTree=${JSON.stringify(nursingChargeTree)}`
        )
        .then(respones => respones.data);
}
// 查看评估报告
function getSummaryById(summaryId) {
    return axios
        .post(
            process.env.API_HOST + "/evalPersonNursing/getSummaryById",
            `summaryId=${summaryId}`
        )
        .then(respones => respones.data);
}

// 修改护理分类信息
function evalNursing_updateNursingClassificationById(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/updateNursingClassificationById",
            `json=${json}&userid=${userid}`
        )
        .then(respones => respones.data);
}

// 删除护理分类信息
function evalNursing_deleteNursingClassificationById(id, userid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/deleteNursingClassificationById",
            `id=${id}&userid=${userid}`
        )
        .then(respones => respones.data);
}

// 添加护理方案信息
function evalNursing_insertNursingClassification(name, userid) {
    let json = {
        classificationname: name
    }
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/insertNursingClassification",
            `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 根据所选择的护理方案 查看护理内容树
function getNursingClassificationSObj(nursingClassificationId) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/getNursingClassificationSObj",
            `nursingClassificationId=${nursingClassificationId}`
        )
        .then(respones => respones.data);
}
// 通过上级id 查询子节点护理内容信息
function getNursingClassificationSByPid(pid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/getNursingClassificationSByPid",
            `pid=${pid}`
        )
        .then(respones => respones.data);
}

// 查询题目列表
function evalTopic_getTopicList() {
    return axios
        .post(
            process.env.API_HOST + "/evalTopic/getTopicList"
        )
        .then(respones => respones.data);
}
// 通过护理内容id 查询护理内容下的题目信息
function evalNursing_getTopicByClassificationId(classificationId) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/getTopicByClassificationId",
            `classificationId=${classificationId}`
        )
        .then(respones => respones.data);
}
// 修改护理内容信息
function updateNursingClassificationSById(json, userid, topicWeight) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/updateNursingClassificationSById",
            `json=${JSON.stringify(json)}&userid=${userid}&topicWeight=${JSON.stringify(topicWeight)}`
        )
        .then(respones => respones.data);
}

// 删除护理内容信息
function deleteNursingClassificationSById(id, userid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/deleteNursingClassificationSById",
            `id=${id}&userid=${userid}`
        )
        .then(respones => respones.data);
}

// 添加护理内容信息
function evalNursing_insertNursingClassificationS(json, userid, topicWeight) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/insertNursingClassificationS",
            `json=${JSON.stringify(json)}&userid=${userid}&topicWeight=${JSON.stringify(topicWeight)}`
        )
        .then(respones => respones.data);
}

// 添加护理收费信息
function evalNursing_insertNursingCharge(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/insertNursingCharge",
            `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 根据所选择的护理方案 查看护理收费树
function evalNursing_getnursingChargeObj(nursingClassificationId) {
    return axios
        .post(
            process.env.API_HOST + "evalNursing/getnursingChargeObj",
            `nursingClassificationId=${nursingClassificationId}`
        )
        .then(respones => respones.data);
}
// 通过上级id 查询子节点护理收费信息
function evalNursing_getNursingChargeByPid(pid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/getNursingChargeByPid",
            `pid=${pid}`
        )
        .then(respones => respones.data);
}

// 修改护理收费信息
function evalNursing_updateNursingChargeById(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/updateNursingChargeById",
            `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}

// 删除护理收费信息
function evalNursing_deleteNursingChargeById(id, userid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/deleteNursingChargeById",
            `id=${id}&userid=${userid}`
        )
        .then(respones => respones.data);
}

// 护理内容信息 向上移
function evalNursing_moveUpNursingClassificationSById(id, userid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/moveUpNursingClassificationSById",
            `id=${id}&userid=${userid}`
        )
        .then(respones => respones.data);
}

// 护理内容信息 向下移
function evalNursing_moveDownNursingClassificationSById(id, userid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/moveDownNursingClassificationSById",
            `id=${id}&userid=${userid}`
        )
        .then(respones => respones.data);
}

// 护理收费信息 向上移
function evalNursing_moveUpNursingChargeById(id, userid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/moveUpNursingChargeById",
            `id=${id}&userid=${userid}`
        )
        .then(respones => respones.data);
}

// 护理收费信息 向下移
function evalNursing_moveDownNursingChargeById(id, userid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/moveDownNursingChargeById",
            `id=${id}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 通过id 查询当前节点护理内容信息
function evalNursing_getNursingClassificationSById(id) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/getNursingClassificationSById",
            `id=${id}`
        )
        .then(respones => respones.data);
}
// 通过id 查询当前节点护理收费信息
function evalNursing_getNursingChargeById(id) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/getNursingChargeById",
            `id=${id}`
        )
        .then(respones => respones.data);
}
// 通过id 查询当前节点护理收费信息
function evalNursing_getNursingChargeByPid(pid) {
    return axios
        .post(
            process.env.API_HOST + "/evalNursing/getNursingChargeByPid",
            `pid=${pid}`
        )
        .then(respones => respones.data);
}
// 通过类型获取基本信息数据
function basic_getBasDataByType(type) {
    return axios
        .post(
            process.env.API_HOST + "/basic/getBasDataByType",
            `type=${type}`
        )
        .then(respones => respones.data);
}
// 获取基站位置树
function rail_getBasestationTree() {
    return axios
        .post(
            process.env.API_HOST + "/rail/getBasestationTree"
        )
        .then(respones => respones.data);
}
// 根据基站id获取基站信息
function basestation_getBasestationById(basestationid) {
    return axios
        .post(
            process.env.API_HOST + "/basestation/getBasestationById", `basestationid=${basestationid}`
        )
        .then(respones => respones.data);
}
// 添加单点电子围栏信息及分组信息
function rail_insertSingleRail(rail, userid, groupid, addArr) {
    return axios
        .post(
            process.env.API_HOST + "/rail/insertSingleRail", `rail=${JSON.stringify(rail)}&userid=${userid}&groupid=${JSON.stringify(groupid)}&addArr=${JSON.stringify(addArr)}`
        )
        .then(respones => respones.data);
}

// 修改单点电子围栏信息
function rail_updateSingleRail(rail, userid, railid, addArr) {
    return axios
        .post(
            process.env.API_HOST + "/rail/updateSingleRail", `rail=${JSON.stringify(rail)}&userid=${userid}&railid=${railid}&addArr=${JSON.stringify(addArr)}`
        )
        .then(respones => respones.data);
}
// 通过用户id 查询用户曾经是否登入
function login_getAllowLoginByUserId(userid) {
    return axios
        .post(
            process.env.API_HOST + "/login/getAllowLoginByUserId", `userId=${userid}`
        )
        .then(respones => respones.data);
}
//  修改密码
function login_changePassword(userid, password, oldpassword) {
    return axios
        .post(
            process.env.API_HOST + "/login/changePassword", `userId=${userid}&password=${password}&oldpassword=${oldpassword}`
        )
        .then(respones => respones.data);
}




// 院内公告
// 通过用户id查询新闻公告
function news_getNewsByUser(userid, viewing, beginDate, endDate, type) {
    return axios
        .post(
            process.env.API_HOST + "/news/getNewsByUser", `userid=${userid}&viewing=${viewing}&beginDate=${beginDate}&endDate=${endDate}&type=${type}`
        )
        .then(respones => respones.data);
}
// 更改读取状态
function news_updateNewsByReadtype(id) {
    return axios
        .post(
            process.env.API_HOST + "/news/updateNewsByReadtype", `id=${id}`
        )
        .then(respones => respones.data);
}






// 护理管理功能模块
// 新增护工组别
function basNursingTeam_insertNursingTeam(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/basNursingTeam/insertNursingTeam", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 修改护工组别
function basNursingTeam_updateNursingTeam(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/basNursingTeam/updateNursingTeam", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 删除护工组别
function basNursingTeam_deleteNursingTeam(id, userid) {
    return axios
        .post(
            process.env.API_HOST + "/basNursingTeam/deleteNursingTeam", `id=${id}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 无条件获取全部组别
function basNursingTeam_getNursingTeamList() {
    return axios
        .post(
            process.env.API_HOST + "/basNursingTeam/getNursingTeamList"
        )
        .then(respones => respones.data);
}
// 新增护工账户
function sysNursingUser_insertNursingUser(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/sysNursingUser/insertNursingUser", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 修改护工信息
function sysNursingUser_updateNursingUser(json, userid) {
    return axios
        .post(
            process.env.API_HOST + "/sysNursingUser/updateNursingUser", `json=${JSON.stringify(json)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// 删除护工账户
function sysNursingUser_deleteNursingUser(id, userid) {
    return axios
        .post(
            process.env.API_HOST + "/sysNursingUser/deleteNursingUser", `id=${id}&userid=${userid}`
        )
        .then(respones => respones.data);
}
// ids获取护工账户信息
// 参数 search{nickname:'',teamids:''}
function sysNursingUser_getNursingUserList(search) {
    return axios
        .post(
            process.env.API_HOST + "/sysNursingUser/getNursingUserList", `search=${JSON.stringify(search)}`
        )
        .then(respones => respones.data);
}
// 获取所有长者（无条件，未分配组）
function prnPerson_getPersonNoTeamList() {
    return axios
        .post(
            process.env.API_HOST + "/prnPerson/getPersonNoTeamList"
        )
        .then(respones => respones.data);
}
// 查询人员信息（ids查询）
function prnPerson_getPersonTeamList(teamids) {
    return axios
        .post(
            process.env.API_HOST + "/prnPerson/getPersonTeamList", `search=${JSON.stringify({teamids})}`
        )
        .then(respones => respones.data);
}
//  添加老人组别
function basNursingTeam_insertPersonTeam(personids, teamid, userid) {
    return axios
        .post(
            process.env.API_HOST + "/basNursingTeam/insertPersonTeam", `teamid=${teamid}&personids=${JSON.stringify(personids)}&userid=${userid}`
        )
        .then(respones => respones.data);
}
//  切换老人组别
function basNursingTeam_updatePersonTeam(id, teamid, userid) {
    return axios
        .post(
            process.env.API_HOST + "/basNursingTeam/updatePersonTeam", `teamid=${teamid}&id=${id}&userid=${userid}`
        )
        .then(respones => respones.data);
}


// 护理管理/工作统计
// 获取全部组（可查询 条件：组别名称、查询周期、查询时间  内容：总完成度、应做工时、不合格工时、审批工时）
function workStatistics_teamWorkStatistics(teamName, type, beginDate) {
    return axios
        .post(
            process.env.API_HOST + "/workStatistics/teamWorkStatistics", `teamName=${teamName}&type=${type}&beginDate=${beginDate}`
        )
        .then(respones => respones.data);
}
// 根据组别id获取护工列表（组别id不为数组，列表：内容：账号、总完成度、应做工时、不合格工时、审批工时）
function workStatistics_nursingWorkStatisticsByTeamid(teamid, type, beginDate) {
    return axios
        .post(
            process.env.API_HOST + "/workStatistics/nursingWorkStatisticsByTeamid", `teamid=${teamid}&type=${type}&beginDate=${beginDate}`
        )
        .then(respones => respones.data);
}
// 根据组别id获取长者列表（组别id不为数组，列表：内容：姓名、总完成度、应做工时、不合格工时、审批工时）
function workStatistics_personWorkStatisticsByTeamid(teamid, type, beginDate) {
    return axios
        .post(
            process.env.API_HOST + "/workStatistics/personWorkStatisticsByTeamid", `teamid=${teamid}&type=${type}&beginDate=${beginDate}`
        )
        .then(respones => respones.data);
}
// 根据护工id获取可进行审批的护理内容（内容：护理内容、备注、长者、imgsrc、反馈、审批状态）
function workStatistics_nursingContentsBynursingUserid(nursingUserId, type, beginDate) {
    return axios
        .post(
            process.env.API_HOST + "/workStatistics/nursingContentsBynursingUserid", `nursingUserId=${nursingUserId}&type=${type}&beginDate=${beginDate}`
        )
        .then(respones => respones.data);
}
// 根据长者id获取可进行审批的护理内容（内容：护理内容、备注、护工、imgsrc、反馈、审批状态）
function workStatistics_nursingContentsBypersinid(personId, type, beginDate) {
    return axios
        .post(
            process.env.API_HOST + "/workStatistics/nursingContentsBypersinid", `personId=${personId}&type=${type}&beginDate=${beginDate}`
        )
        .then(respones => respones.data);
}
// 审批护理内容（返回：state msg）
function nursingContents_approvalNursingContents(state, nursingid, type, userid) {
    return axios
        .post(
            process.env.API_HOST + "/nursingContents/approvalNursingContents", `state=${state}&nursingid=${nursingid}&type=${type}&userid=${userid}`
        )
        .then(respones => respones.data);
}







const functionarrs = {
    news_updateNewsByReadtype,
    news_getNewsByUser,
    login_changePassword,
    login_getAllowLoginByUserId,
    getNursingClassificationList,
    getTopicTree,
    insertFirstStepAnswer,
    insertSecondStepAnswer,
    getNursingClassificationObj,
    getNursingChargeObj,
    insertNursing,
    getSummaryById,
    evalNursing_updateNursingClassificationById,
    evalNursing_deleteNursingClassificationById,
    getNursingClassificationSObj,
    getNursingClassificationSByPid,
    evalTopic_getTopicList,
    evalNursing_getTopicByClassificationId,
    updateNursingClassificationSById,
    deleteNursingClassificationSById,
    evalNursing_getnursingChargeObj,
    evalNursing_getNursingChargeByPid,
    evalNursing_updateNursingChargeById,
    evalNursing_deleteNursingChargeById,
    evalNursing_moveUpNursingClassificationSById,
    evalNursing_moveDownNursingClassificationSById,
    evalNursing_moveUpNursingChargeById,
    evalNursing_moveDownNursingChargeById,
    evalNursing_getNursingClassificationSById,
    evalNursing_getNursingChargeById,
    evalNursing_insertNursingClassification,
    evalNursing_insertNursingClassificationS,
    evalNursing_insertNursingCharge,
    basic_getBasDataByType,
    rail_getBasestationTree,
    basestation_getBasestationById,
    rail_insertSingleRail,
    rail_updateSingleRail,
    basic_getUserById,
    person_getAllProfileSettings,
    person_getPersonById,
    person_insertUserProfileSettings,
    person_getPersonList,
    mainPage_getAttention,
    person_getDeviceListByPersonId,
    mainPage_getFloorAndRoomJson,
    person_getVitalSignsListByPersonId,
    person_getAllVitalSignsListByPersonId,
    person_delPersonById,
    person_updatePerson,
    person_departurePerson,
    person_updatePersonsInHospital,
    person_departurePersons,
    person_delPersonByIds,
    person_insertPersonData,
    rail_getAllRailGroupList,
    person_getRailGroupsByPerson,
    rail_getRailListByGroupIds,
    rail_getRailDrawing,


    // 新院内信息录入数据
    nursingHome_insertNursingHome,
    nursingHome_updateNursingHome,
    bed_getNursingHomesTree,
    bed_getNursingHomesAllTree,
    buildin_delBuilding,
    floor_delFloor,
    room_delRoom,
    bed_delBed,
    building_insertBuilding,
    floor_insertFloor,
    room_insertRoom,
    bed_insertBed,
    building_updateBuilding,
    floor_updateFloor,
    room_updateRoom,
    bed_updateBed,


    // 房间状态
    roomStatus_getInpatientareaListByUserid,
    roomStatus_getRoomAndBedStatistics,
    roomStatus_getRoomTypeStatistics,


    // 用户及权限管理
    inpatient_getAllInpatientList,
    inpatient_insertInpatient,
    inpatient_delInpatient,
    inpatient_updateInpatient,
    inpatient_getInpatientById,
    inpatient_getRoomsByInpatientId,
    dept_getDeptIdListByUser,
    basic_getAllRightRoleList,
    basic_insertRole,
    basic_deleteRole,
    basic_getRightRole,
    basic_insertRightRole,
    basic_updateRole,
    // 电子围栏配置
    room_getNursingHomesTree,
    railNew_insertRail,
    room_getRoomById,
    railNew_getAllRailList,
    railNew_getRailById,
    railNew_updateRail,
    railNew_delRail,
    railNew_getAllRailGroupList,
    railNew_insertRailGroup,
    railNew_updateRailGroup,
    railNew_delRailGroup,
    railNew_getRailDrawing,
    railNew_getRailListByGroupIds,
    // 护理管理
    sysNursingUser_insertNursingUser,
    basNursingTeam_insertNursingTeam,
    basNursingTeam_updateNursingTeam,
    basNursingTeam_deleteNursingTeam,
    basNursingTeam_getNursingTeamList,
    sysNursingUser_updateNursingUser,
    sysNursingUser_deleteNursingUser,
    sysNursingUser_getNursingUserList,
    prnPerson_getPersonNoTeamList,
    prnPerson_getPersonTeamList,
    basNursingTeam_insertPersonTeam,
    basNursingTeam_updatePersonTeam,
    workStatistics_teamWorkStatistics,
    workStatistics_nursingWorkStatisticsByTeamid,
    workStatistics_personWorkStatisticsByTeamid,
    workStatistics_nursingContentsBynursingUserid,
    workStatistics_nursingContentsBypersinid,
    nursingContents_approvalNursingContents
}
export {
    functionarrs
}
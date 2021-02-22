import http from '../utils/http'
// let resquest = process.env.VUE_APP_URL

// 请求
export default {
  // 添加类目
  insertMaterialClassification(params) {
    return http.post(`${process.env.API_HOST}/mm/materialClassification/insertMaterialClassification`, params)
  },
  // 修改类目
  updateMaterialClassification(params) {
    return http.post(`${process.env.API_HOST}/mm/materialClassification/updateMaterialClassification`, params)
  },
  // 删除类目
  deleteMaterialClassificationById(params) {
    return http.post(`${process.env.API_HOST}/mm/materialClassification/deleteMaterialClassificationById`, params)
  },
  // 查询全部物品
  getMaterialInformationList(params) {
    return http.post(`${process.env.API_HOST}/mm/materialInformation/getMaterialInformationList`, params)
  },
  // 添加物品
  insertMaterialInformation(params) {
    return http.post(`${process.env.API_HOST}/mm/materialInformation/insertMaterialInformation`, params)
  },
  // 编辑物品
  updateMaterialInformation(params) {
    return http.post(`${process.env.API_HOST}/mm/materialInformation/updateMaterialInformation`, params)
  },
  // 删除物品
  deleteMaterialInformationById(params) {
    return http.post(`${process.env.API_HOST}/mm/materialInformation/deleteMaterialInformationById`, params)
  },
  // 获取全部入库记录
  getMaterialWarehousingList(params) {
    return http.post(`${process.env.API_HOST}/mm/materialWarehousing/getMaterialWarehousingList`, params)
  },
  // 查看全部可选择条件-查询种类
  getMaterialClassificationList(params) {
    return http.post(`${process.env.API_HOST}/mm/materialClassification/getMaterialClassificationList`, params)
  },
  // 查看全部可选择条件-查询物品
  getMaterialNameList(params) {
    return http.post(`${process.env.API_HOST}/mm/materialInformation/getMaterialNameList`, params)
  },
  // 查看全部可选择条件-查询规格
  getMaterialNormsList(params) {
    return http.post(`${process.env.API_HOST}/mm/materialInformation/getMaterialNormsList`, params)
  },
  // 查看全部可选择条件-查询厂家
  getMaterialFactoryList(params) {
    return http.post(`${process.env.API_HOST}/mm/materialInformation/getMaterialFactoryList`, params)
  },
  // 入库操作
  insertMaterialWarehousing(params) {
    return http.post(`${process.env.API_HOST}/mm/materialWarehousing/insertMaterialWarehousing`, params)
  },
  // 删除入库记录
  deleteMaterialWarehousingById(params) {
    return http.post(`${process.env.API_HOST}/mm/materialWarehousing/deleteMaterialWarehousingById`, params)
  },
  // 获取全部出库记录
  getMaterialDeliveryList(params) {
    return http.post(`${process.env.API_HOST}/mm/materialDelivery/getMaterialDeliveryList`, params)
  },
  // 出库操作
  insertMaterialDelivery(params) {
    return http.post(`${process.env.API_HOST}/mm/materialDelivery/insertMaterialDelivery`, params)
  },
  // 删除出库记录
  deleteMaterialDeliveryById(params) {
    return http.post(`${process.env.API_HOST}/mm/materialDelivery/deleteMaterialDeliveryById`, params)
  },
  //导出打印
  getMaterialInformationListExcel(params) {
    return http.post(`${process.env.API_HOST}/mm/materialInformation/getMaterialInformationListExcel`, params)
  },
  //耗材实用统计
  getMmMaterialUsageDetailsList(params) {
    return http.post(`${process.env.API_HOST}/prnPerson/getMmMaterialUsageDetailsList`, params)
  },
  //导出耗材使用统计表
  getMmMaterialUsageDetailsListExcel(params) {
    return http.post(`${process.env.API_HOST}/prnPerson/getMmMaterialUsageDetailsListExcel`, params)
  }
}

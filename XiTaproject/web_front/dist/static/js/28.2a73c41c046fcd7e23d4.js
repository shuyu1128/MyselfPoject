webpackJsonp([28],{auOv:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={data:function(){return{currentPage:1,pagesize:10,userList:[],tableData:[],gridData:[],getMaterialFormData:{materialname:"",classificationid:""}}},methods:{insertMaterialClassification:function(){var t=this;this.$http.getMaterialClassificationList({classificationname:""}).then(function(a){t.gridData=a.data})},InventoryStatisticsOut:function(){window.location.href="/mm/materialInformation/getMaterialInformationListExcel?materialname="+this.getMaterialFormData.materialname+"&classificationid="+this.getMaterialFormData.classificationid},handleSizeChange:function(t){this.pagesize=t},handleCurrentChange:function(t){this.currentPage=t},handleUserList:function(){var t=this;this.$http.getMaterialInformationList(this.getMaterialFormData).then(function(a){t.handleCurrentChange(1),t.userList=a.data,t.userList.forEach(function(t,a){t.idnum=a+1})})}},created:function(){this.handleUserList(),this.insertMaterialClassification()}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{attrs:{id:"InventoryStatistics-header"}},[e("div",{staticClass:"InventoryStatistics-header-left"},[e("el-input",{staticClass:"InventoryStatistics-header-left-input",attrs:{placeholder:"输入关键字",size:"normal",clearable:""},model:{value:t.getMaterialFormData.materialname,callback:function(a){t.$set(t.getMaterialFormData,"materialname",a)},expression:"getMaterialFormData.materialname"}}),t._v(" "),e("el-select",{staticClass:"InventoryStatistics-header-left-cascader",attrs:{placeholder:"全部",clearable:""},model:{value:t.getMaterialFormData.classificationid,callback:function(a){t.$set(t.getMaterialFormData,"classificationid",a)},expression:"getMaterialFormData.classificationid"}},t._l(t.gridData,function(t){return e("el-option",{key:t.id,attrs:{label:t.classificationname,value:t.id}})}),1)],1),t._v(" "),e("div",{staticClass:"InventoryStatistics-header-right"},[e("el-button",{staticClass:"InventoryStatistics-header-right-btn1",attrs:{type:"primary",size:"default"},on:{click:t.handleUserList}},[t._v("查询")]),t._v(" "),e("el-button",{staticClass:"InventoryStatistics-header-right-btn2",attrs:{type:"primary",size:"default"},on:{click:t.InventoryStatisticsOut}},[t._v("导出")])],1)]),t._v(" "),e("div",{staticClass:"InventoryStatistics-content"},[e("el-table",{staticClass:"form-style",attrs:{data:t.userList.slice((t.currentPage-1)*t.pagesize,t.currentPage*t.pagesize),border:"",height:"683px"}},[e("el-table-column",{attrs:{prop:"idnum",label:"序号",width:"150",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"materialname",label:"物品名称",align:"center",width:"300"}}),t._v(" "),e("el-table-column",{attrs:{prop:"classificationname",label:"物品分类",width:"200",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"norms",label:"规格",width:"200",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"amount",label:"数量",width:"200",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"factory",label:"生产厂家/品牌",align:"center"}})],1)],1),t._v(" "),e("div",{staticClass:"InventoryStatistics-block"},[e("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pagesize,layout:"total, prev, pager, next, jumper",total:t.userList.length},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},staticRenderFns:[]};var r=e("C7Lr")(i,n,!1,function(t){e("rE7U")},null,null);a.default=r.exports},rE7U:function(t,a){}});
//# sourceMappingURL=28.2a73c41c046fcd7e23d4.js.map
webpackJsonp([17],{"/TZe":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("3cXf"),s=a.n(l),i={data:function(){return{nowItem:"1"}},props:{detailsForm:null},methods:{compareTime:function(t,e){var a=new Date(t),l=e.split(":"),s=Number(l[0]),i=Number(l[1]),n=a.getHours(),r=a.getMinutes();if(s==n&&i==r)return!0;if(s==n){if(i>r)return!0;if(i<r)return!1}else{if(s>n)return!0;if(s<n)return!1}}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"complaint_details"},[a("el-row",{staticStyle:{"margin-bottom":"16px"}},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"details_left"},[a("li",{staticClass:"details_list"},[a("span",{staticClass:"details_list_title"},[t._v("家属姓名：")]),t._v(" "),a("span",{staticClass:"details_list_content"},[t._v("\n            "+t._s(t.detailsForm.familyname)+"\n          ")])]),t._v(" "),a("li",{staticClass:"details_list"},[a("span",{staticClass:"details_list_title"},[t._v("家属联系方式：")]),t._v(" "),a("span",{staticClass:"details_list_content"},[t._v("\n            "+t._s(t.detailsForm.familyphone)+"\n          ")])]),t._v(" "),a("li",{staticClass:"details_list"},[a("span",{staticClass:"details_list_title"},[t._v("护工姓名：")]),t._v(" "),a("span",{staticClass:"details_list_content"},[t._v("\n            "+t._s(t.detailsForm.nursingname)+"\n          ")])]),t._v(" "),a("li",{staticClass:"details_list"},[a("span",{staticClass:"details_list_title"},[t._v("护工联系方式：")]),t._v(" "),a("span",{staticClass:"details_list_content"},[t._v(t._s(t.detailsForm.nursingphone))])]),t._v(" "),"public"!=t.detailsForm.nursingType?a("li",{staticClass:"details_list"},[a("span",{staticClass:"details_list_title"},[t._v("长者姓名：")]),t._v(" "),a("span",{staticClass:"details_list_content"},[t._v(t._s(t.detailsForm.fullname))])]):t._e(),t._v(" "),a("li",{staticClass:"details_list"},[a("span",{staticClass:"details_list_title"},[t._v("投诉时间：")]),t._v(" "),a("span",{staticClass:"details_list_content"},[t._v("\n            "+t._s(t.$allMethods.formatTimeStamp(t.detailsForm.createdtime,"Y-M-D h:m"))+"\n          ")])])])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"details_right"},[a("p",{staticClass:"complaint_tile"},[t._v("投诉内容：")]),t._v(" "),a("div",{staticClass:"complaint_content"},[t._v("\n          "+t._s(t.detailsForm.complaintContent)+"\n        ")])])])],1),t._v(" "),a("el-collapse",{staticStyle:{"margin-bottom":"16px"},attrs:{accordion:""},model:{value:t.nowItem,callback:function(e){t.nowItem=e},expression:"nowItem"}},[a("el-collapse-item",{attrs:{name:"1"}},[a("template",{slot:"title"},[a("div",{staticClass:"nursing_list"},[t.compareTime(t.detailsForm.overTime,t.detailsForm.endTime)?a("i",{staticClass:"el-icon-check",staticStyle:{color:"#67c23a"}}):t._e(),t._v(" "),t.compareTime(t.detailsForm.overTime,t.detailsForm.endTime)?t._e():a("i",{staticClass:"fa fa-history",staticStyle:{color:"#e6a23c"}}),t._v(" "),a("span",{staticStyle:{"margin-right":"10px"}},[t._v("\n            护理内容："),a("span",{staticClass:"content_s"},[t._v("\n              "+t._s(t.detailsForm.nursingContents)+"\n            ")])]),t._v(" "),a("span",{staticStyle:{"margin-right":"10px"}},[t._v("\n            备注："),a("span",{staticClass:"content_s"},[t._v(t._s(t.detailsForm.nursingDesc))])]),t._v(" "),1==t.detailsForm.state?a("el-tag",{staticClass:"state_tag",attrs:{type:"success"}},[t._v("\n            已通过\n          ")]):t._e(),t._v(" "),2==t.detailsForm.state?a("el-tag",{staticClass:"state_tag",attrs:{type:"warning"}},[t._v("\n            未通过\n          ")]):t._e(),t._v(" "),0==t.detailsForm.state?a("el-tag",{staticClass:"state_tag",attrs:{type:"danger"}},[t._v("\n            未审批\n          ")]):t._e()],1)]),t._v(" "),a("div",["是"==t.detailsForm.isPicture?a("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.detailsForm.imgsrc,"preview-src-list":[t.detailsForm.imgsrc]}}):t._e(),t._v(" "),"是"==t.detailsForm.isText?a("div",{staticClass:"note_text"},[t._v("\n          "+t._s(t.detailsForm.feedback)+"\n        ")]):t._e()],1)],2)],1),t._v(" "),"1"==t.detailsForm.complaintstate?a("div",{staticClass:"details_right"},[a("p",{staticClass:"complaint_tile"},[t._v("投诉评审结果：")]),t._v(" "),a("div",{staticClass:"complaint_content"},[t._v("\n      "+t._s(t.detailsForm.complaintResults)+"\n    ")])]):t._e()],1)},staticRenderFns:[]};var r={components:{complaintDetails:a("C7Lr")(i,n,!1,function(t){a("ANHW")},"data-v-42a7713a",null).exports},data:function(){return{detailsForm:"",dialogVisible:!1,tableData:[{complaintContent:"",nursingType:"",state:"",complaintResults:"",createdtime:"",familyname:"",familyphone:"",nursingname:"",nursingphone:"",fullname:""}]}},props:{slelctForm:null},created:function(){this.getTableData()},methods:{overSubmit:function(){var t=this;this.$prompt("请输入投诉处理结果","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){var a=e.value,l="complaintid="+t.detailsForm.id+"&complaintResults="+a+"&userid="+t.$store.state.token;t.$ajax.post("/prnComplaint/updateComplaint",l).then(function(e){"success"==e.data.state?(t.getTableData(),t.$message.success("处理成功"),t.dialogVisible=!1):t.$message.error(e.data.msg)})}).catch(function(){})},handleDetails:function(t){var e=this;this.$ajax.post("/prnComplaint/getComplaintById","complaintid="+t).then(function(t){e.detailsForm=t.data,e.dialogVisible=!0})},getTableData:function(){var t=this;this.$ajax.post("/prnComplaint/getComplaintList","search="+s()(this.slelctForm)).then(function(e){t.tableData=e.data})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"complaint_table"},[a("el-dialog",{attrs:{title:"详情",visible:t.dialogVisible,width:"50%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[t.dialogVisible?a("complaintDetails",{attrs:{detailsForm:t.detailsForm}}):t._e(),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("关 闭")]),t._v(" "),"0"==t.detailsForm.complaintstate?a("el-button",{attrs:{type:"primary"},on:{click:t.overSubmit}},[t._v("\n        完成处理\n      ")]):t._e()],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{height:"100%",border:"",data:t.tableData}},[a("el-table-column",{attrs:{align:"center",prop:"familyname",label:"家属姓名"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"familyphone",label:"家属联系方式"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"nursingname",label:"护工姓名"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"nursingphone",label:"护工联系方式"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"nursingType",label:"服务类型"},scopedSlots:t._u([{key:"default",fn:function(e){return["person"===e.row.nursingType?a("el-tag",{attrs:{type:"info"}},[t._v("\n          常规服务\n        ")]):t._e(),t._v(" "),"team"===e.row.nursingType?a("el-tag",[t._v(" 组内服务 ")]):t._e(),t._v(" "),"cycle"===e.row.nursingType?a("el-tag",{attrs:{type:"warning"}},[t._v("\n          周期服务\n        ")]):t._e(),t._v(" "),"public"===e.row.nursingType?a("el-tag",{attrs:{type:"success"}},[t._v("\n          公共服务\n        ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"fullname",label:"长者姓名"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"投诉时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v("\n          "+t._s(t.$allMethods.formatTimeStamp(e.row.createdtime,"Y-M-D h:m"))+"\n        ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"nursingType",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return["0"===e.row.state?a("el-tag",{attrs:{type:"warning"}},[t._v("\n          未处理\n        ")]):t._e(),t._v(" "),"1"===e.row.state?a("el-tag",{attrs:{type:"success"}},[t._v("\n          已处理\n        ")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.handleDetails(e.row.id)}}},[t._v("\n          查看详情\n        ")])]}}])})],1)],1)},staticRenderFns:[]};var c={components:{complaintTable:a("C7Lr")(r,o,!1,function(t){a("TlEt")},"data-v-3ee75f05",null).exports},data:function(){return{slelctForm:{nursingname:"",fullname:"",beginDate:"",endDate:"",state:""}}},methods:{onSubmit:function(){this.$refs.refTable.getTableData()}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"complaint"},[a("el-row",{staticClass:"complaint_footer"},[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"complaint_select"},[a("el-form",{staticClass:"demo-form-inline",attrs:{size:"small",inline:!0,model:t.slelctForm}},[a("el-form-item",{attrs:{label:"护工名称"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.slelctForm.nursingname,callback:function(e){t.$set(t.slelctForm,"nursingname",e)},expression:"slelctForm.nursingname"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"长者名称"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.slelctForm.fullname,callback:function(e){t.$set(t.slelctForm,"fullname",e)},expression:"slelctForm.fullname"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"开始时间"}},[a("el-date-picker",{staticStyle:{"margin-right":"20px"},attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"请选择"},model:{value:t.slelctForm.beginDate,callback:function(e){t.$set(t.slelctForm,"beginDate",e)},expression:"slelctForm.beginDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"结束时间"}},[a("el-date-picker",{staticStyle:{"margin-right":"20px"},attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetime",placeholder:"请选择"},model:{value:t.slelctForm.endDate,callback:function(e){t.$set(t.slelctForm,"endDate",e)},expression:"slelctForm.endDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"处理状态"}},[a("el-select",{staticStyle:{width:"100px"},attrs:{clearable:"",placeholder:"请选择"},model:{value:t.slelctForm.state,callback:function(e){t.$set(t.slelctForm,"state",e)},expression:"slelctForm.state"}},[a("el-option",{attrs:{label:"未处理",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"已处理",value:"1"}})],1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")])],1)],1)],1)])],1),t._v(" "),a("el-row",{staticClass:"complaint_main"},[a("el-col",{staticStyle:{height:"100%"},attrs:{span:24}},[a("complaintTable",{ref:"refTable",attrs:{slelctForm:t.slelctForm}})],1)],1)],1)},staticRenderFns:[]};var _=a("C7Lr")(c,m,!1,function(t){a("TzY6")},"data-v-013a411e",null);e.default=_.exports},ANHW:function(t,e){},TlEt:function(t,e){},TzY6:function(t,e){}});
//# sourceMappingURL=17.8d82336b512087f4ecd3.js.map
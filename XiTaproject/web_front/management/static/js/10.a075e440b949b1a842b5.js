webpackJsonp([10],{B5YO:function(t,e){},"U/Ss":function(t,e){},iHd7:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"statistics_select"},[s("el-form",{staticClass:"select-form",attrs:{inline:!0,model:t.formInline}},[s("el-form-item",{attrs:{label:"组别名称"}},[s("el-input",{attrs:{placeholder:"请输入"},model:{value:t.teamName,callback:function(e){t.teamName=e},expression:"teamName"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"查询周期"}},[s("el-select",{attrs:{placeholder:"请选择"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.cycleOptions,function(t){return s("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),s("el-form-item",{attrs:{label:"查询时间"}},["day"==t.type?s("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:t.beginDate,callback:function(e){t.beginDate=e},expression:"beginDate"}}):t._e(),t._v(" "),"week"==t.type?s("el-date-picker",{attrs:{"picker-options":{firstDayOfWeek:1},type:"week","value-format":"yyyy-MM-dd",format:"yyyy 第 WW 周",placeholder:"选择周"},model:{value:t.beginDate,callback:function(e){t.beginDate=e},expression:"beginDate"}}):t._e(),t._v(" "),"month"==t.type?s("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"month",placeholder:"选择月"},model:{value:t.beginDate,callback:function(e){t.beginDate=e},expression:"beginDate"}}):t._e()],1),t._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")])],1),t._v(" "),s("el-form-item",[s("el-upload",{attrs:{action:t.PersonNursingContentsFileSrc,"on-success":t.handleSuccess,"show-file-list":!1,data:{userid:t.$store.state.token},multiple:""}},[s("el-button",{attrs:{type:"primary"}},[t._v("上传个人护理内容")])],1)],1),t._v(" "),s("el-form-item",[s("el-upload",{attrs:{action:t.CycleNursingContentsFileSrc,"on-success":t.handleSuccess,"show-file-list":!1,data:{userid:t.$store.state.token},multiple:""}},[s("el-button",{attrs:{type:"primary"}},[t._v("上传周期护理内容")])],1)],1),t._v(" "),s("el-form-item",[s("el-upload",{attrs:{action:t.TeamNursingContentsFileSrc,"on-success":t.handleSuccess,"show-file-list":!1,data:{userid:t.$store.state.token},multiple:""}},[s("el-button",{attrs:{type:"primary"}},[t._v("上传组别服务内容")])],1)],1),t._v(" "),s("el-form-item",[s("el-upload",{attrs:{action:t.PublicNursingContentsFileSrc,"on-success":t.handleSuccess,"show-file-list":!1,data:{userid:t.$store.state.token},multiple:""}},[s("el-button",{attrs:{type:"primary"}},[t._v("上传公共服务")])],1)],1)],1)],1)},staticRenderFns:[]};var n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"statistics_groups"},t._l(t.workGroups,function(e){return s("div",{key:e.id,staticClass:"groups_list"},[s("h3",{staticClass:"title_color"},[t._v(t._s(e.teamname))]),t._v(" "),s("div",{staticClass:"groups_b"},[s("li",[s("span",[t._v("总完成度： ")]),t._v(" "),s("span",[s("el-tag",{attrs:{size:"mini"}},[t._v(t._s(e.workProgress)+" %")])],1)]),t._v(" "),s("li",[s("span",[t._v("应做工时： ")]),t._v(" "),s("span",[s("el-tag",{attrs:{size:"mini"}},[t._v(t._s(e.doing)+" %")])],1)]),t._v(" "),s("li",[s("span",[t._v("已做工时： ")]),t._v(" "),s("span",[s("el-tag",{attrs:{size:"mini"}},[t._v(t._s(e.done)+" %")])],1)]),t._v(" "),s("li",[s("span",[t._v("审批工时：")]),t._v(" "),s("span",[s("el-tag",{attrs:{size:"mini"}},[t._v(t._s(e.approved)+" %")])],1)]),t._v(" "),s("li",[s("span",[t._v("不合格工时： ")]),t._v(" "),s("span",[s("el-tag",{attrs:{size:"mini"}},[t._v(t._s(e.approvalFailed)+" %")])],1)])]),t._v(" "),s("div",{staticClass:"groups_footer"},[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(s){return t.openGroup(e)}}},[t._v("\n        审查工作内容\n      ")])],1)])}),0)},staticRenderFns:[]};var i={data:function(){return{nowItem:"",nowId:"",collapValue:"person",collaps:[{label:"常规服务",value:"person"},{label:"周期服务",value:"cycle"},{label:"组内服务",value:"team"},{label:"公共服务",value:"public"}],nowPage:1,dialogShow:!1,NursingContentsDatas:[],tableData:[]}},computed:{nursingWorkList:function(){return this.$store.state.workStatistics.nursingWorkList}},methods:{closeDialog:function(){this.$store.dispatch("workStatistics_nursingWorkStatisticsByTeamid"),this.dialogShow=!1},handleEdit:function(t){var e=this;this.nowId=t;var s="nursingUserId="+t+"&type="+this.$store.state.workStatistics.type+"&beginDate="+this.$store.state.workStatistics.beginDate;this.$ajax.post("/workStatistics/nursingContentsBynursingUserid",s).then(function(t){e.NursingContentsDatas=t.data,e.nowItem="",e.dialogShow=!0})},approvalNursingContents:function(t,e,s){var a=this,n="userid="+this.$store.state.token+"&nursingid="+t+"&state="+e+"&type="+s;this.$confirm("即将审批, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$ajax.post("/nursingContents/approvalNursingContents",n).then(function(t){"success"==t.data.state?(a.$message.success("审批成功"),a.handleEdit(a.nowId)):a.$message.error(t.data.msg)})}).catch(function(){})},handleCurrentChange:function(t){this.nowPage=t,console.log(this.nowPage)},handleDelete:function(){},compareTime:function(t,e){var s=new Date(t),a=e.split(":"),n=Number(a[0]),i=Number(a[1]),l=s.getHours(),o=s.getMinutes();if(n==l&&i==o)return!0;if(n==l){if(i>o)return!0;if(i<o)return!1}else{if(n>l)return!0;if(n<l)return!1}}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"worker_list"},[s("el-dialog",{attrs:{"before-close":t.closeDialog,title:"护工护理内容审批",visible:t.dialogShow},on:{"update:visible":function(e){t.dialogShow=e}}},[t.dialogShow?s("div",[s("div",{staticClass:"collaps_headaer"},[s("el-select",{staticStyle:{float:"right"},attrs:{placeholder:"请选择"},model:{value:t.collapValue,callback:function(e){t.collapValue=e},expression:"collapValue"}},t._l(t.collaps,function(t){return s("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),s("div",{staticClass:"collapse_h"},[s("el-collapse",{attrs:{accordion:""},model:{value:t.nowItem,callback:function(e){t.nowItem=e},expression:"nowItem"}},t._l(t.NursingContentsDatas[t.nowPage-1][t.collapValue],function(e){return s("el-collapse-item",{key:e.id,attrs:{name:e.id}},[s("template",{slot:"title"},[s("div",{staticClass:"nursing_list"},[t.compareTime(e.overTime,e.endTime)?s("i",{staticClass:"el-icon-check",staticStyle:{color:"#67c23a"}}):t._e(),t._v(" "),t.compareTime(e.overTime,e.endTime)?t._e():s("i",{staticClass:"fa fa-history",staticStyle:{color:"#e6a23c"}}),t._v(" "),s("span",{staticStyle:{"margin-right":"10px"}},[t._v("\n                  护理内容："),s("span",{staticClass:"content_s"},[t._v("\n                    "+t._s(e.nursingContents)+"\n                  ")])]),t._v(" "),s("span",{staticStyle:{"margin-right":"10px"}},[t._v("\n                  备注："),s("span",{staticClass:"content_s"},[t._v(t._s(e.nursingDesc))])]),t._v(" "),1==e.state?s("el-tag",{staticClass:"state_tag",attrs:{type:"success"}},[t._v("\n                  已通过\n                ")]):t._e(),t._v(" "),2==e.state?s("el-tag",{staticClass:"state_tag",attrs:{type:"warning"}},[t._v("\n                  未通过\n                ")]):t._e(),t._v(" "),0==e.state?s("el-tag",{staticClass:"state_tag",attrs:{type:"danger"}},[t._v("\n                  未审批\n                ")]):t._e()],1)]),t._v(" "),s("div",["是"==e.isPicture?s("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.imgsrc,"preview-src-list":[e.imgsrc]}}):t._e(),t._v(" "),"是"==e.isText?s("div",{staticClass:"note_text"},[t._v("\n                "+t._s(e.feedback)+"\n              ")]):t._e(),t._v(" "),0==e.state?s("div",{staticClass:"nursing_list_footer"},[s("el-button",{staticStyle:{float:"right","margin-left":"14px"},attrs:{type:"success",size:"small",icon:"el-icon-check",circle:""},on:{click:function(s){return t.approvalNursingContents(e.id,"1",t.collapValue)}}}),t._v(" "),s("el-button",{staticStyle:{float:"right"},attrs:{type:"danger",size:"small",icon:"el-icon-close",circle:""},on:{click:function(s){return t.approvalNursingContents(e.id,"2",t.collapValue)}}})],1):t._e()],1)],2)}),1)],1),t._v(" "),s("div",{staticClass:"collapse_footer"},[s("el-pagination",{attrs:{"current-page":t.nowPage,"hide-on-single-page":"",background:"",layout:"prev, pager, next","page-size":1,total:this.NursingContentsDatas.length},on:{"current-change":t.handleCurrentChange}})],1)]):t._e(),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:t.closeDialog}},[t._v("\n        关 闭\n      ")])],1)]),t._v(" "),s("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.nursingWorkList}},[s("el-table-column",{attrs:{align:"center",label:"护工审核表"}},[s("el-table-column",{attrs:{align:"center",label:"账号",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[s("el-tag",{attrs:{size:"medium"}},[t._v(t._s(e.row.account))])],1)]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"workProgress",label:"总完成度"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"doing",label:"应做工时"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"done",label:"已做工时"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"approved",label:"审批工时"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"approvalFailed",label:"不合格工时"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"small"},on:{click:function(s){return t.handleEdit(e.row.userid)}}},[t._v("\n            审查\n          ")])]}}])})],1)],1)],1)},staticRenderFns:[]};var o={data:function(){return{nowItem:"",nowId:"",collapValue:"person",collaps:[{label:"常规服务",value:"person"},{label:"周期服务",value:"cycle"}],nowPage:1,dialogShow:!1,NursingContentsDatas:[],tableData:[]}},computed:{personList:function(){return this.$store.state.workStatistics.personList}},methods:{closeDialog:function(){this.$store.dispatch("workStatistics_personWorkStatisticsByTeamid"),this.dialogShow=!1},handleEdit:function(t){var e=this;this.nowId=t;var s="personId="+t+"&type="+this.$store.state.workStatistics.type+"&beginDate="+this.$store.state.workStatistics.beginDate;this.$ajax.post("/workStatistics/nursingContentsBypersinid",s).then(function(t){e.NursingContentsDatas=t.data,e.nowItem="",e.dialogShow=!0})},approvalNursingContents:function(t,e,s){var a=this,n="userid="+this.$store.state.token+"&nursingid="+t+"&state="+e+"&type="+s;this.$confirm("即将审批, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$ajax.post("/nursingContents/approvalNursingContents",n).then(function(t){"success"==t.data.state?(a.$message.success("审批成功"),a.handleEdit(a.nowId)):a.$message.error(t.data.msg)})}).catch(function(){})},handleCurrentChange:function(t){this.nowPage=t,console.log(this.nowPage)},handleDelete:function(){},compareTime:function(t,e){var s=new Date(t),a=e.split(":"),n=Number(a[0]),i=Number(a[1]),l=s.getHours(),o=s.getMinutes();if(n==l&&i==o)return!0;if(n==l){if(i>o)return!0;if(i<o)return!1}else{if(n>l)return!0;if(n<l)return!1}}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"people_list"},[s("el-dialog",{attrs:{"before-close":t.closeDialog,title:"长者护理内容审批",visible:t.dialogShow},on:{"update:visible":function(e){t.dialogShow=e}}},[t.dialogShow?s("div",[s("div",{staticClass:"collaps_headaer"},[s("el-select",{staticStyle:{float:"right"},attrs:{placeholder:"请选择"},model:{value:t.collapValue,callback:function(e){t.collapValue=e},expression:"collapValue"}},t._l(t.collaps,function(t){return s("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),s("div",{staticClass:"collapse_h"},[s("el-collapse",{attrs:{accordion:""},model:{value:t.nowItem,callback:function(e){t.nowItem=e},expression:"nowItem"}},t._l(t.NursingContentsDatas[t.nowPage-1][t.collapValue],function(e){return s("el-collapse-item",{key:e.id,attrs:{name:e.id}},[s("template",{slot:"title"},[s("div",{staticClass:"nursing_list"},[e.nursingid&&t.compareTime(e.overTime,e.endTime)?s("i",{staticClass:"el-icon-check",staticStyle:{color:"#67c23a"}}):t._e(),t._v(" "),e.nursingid?t._e():s("i",{staticClass:"el-icon-circle-close",staticStyle:{color:"#f56c6c"}}),t._v(" "),e.nursingid&&!t.compareTime(e.overTime,e.endTime)?s("i",{staticClass:"fa fa-history",staticStyle:{color:"#e6a23c"}}):t._e(),t._v(" "),s("span",{staticStyle:{"margin-right":"10px"}},[t._v("\n                  护理内容："),s("span",{staticClass:"content_s"},[t._v("\n                    "+t._s(e.nursingContents)+"\n                  ")])]),t._v(" "),s("span",{staticStyle:{"margin-right":"10px"}},[t._v("\n                  备注："),s("span",{staticClass:"content_s"},[t._v(t._s(e.nursingDesc))])]),t._v(" "),1==e.state?s("el-tag",{staticClass:"state_tag",attrs:{type:"success"}},[t._v("\n                  已通过\n                ")]):t._e(),t._v(" "),2==e.state?s("el-tag",{staticClass:"state_tag",attrs:{type:"warning"}},[t._v("\n                  未通过\n                ")]):t._e(),t._v(" "),0==e.state?s("el-tag",{staticClass:"state_tag",attrs:{type:"danger"}},[t._v("\n                  未审批\n                ")]):t._e()],1)]),t._v(" "),s("div",["是"==e.isPicture?s("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.imgsrc,"preview-src-list":[e.imgsrc]}}):t._e(),t._v(" "),"是"==e.isText?s("div",{staticClass:"note_text"},[t._v("\n                "+t._s(e.feedback)+"\n              ")]):t._e(),t._v(" "),0==e.state&&e.nursingid?s("div",{staticClass:"nursing_list_footer"},[s("el-button",{staticStyle:{float:"right","margin-left":"14px"},attrs:{type:"success",size:"small",icon:"el-icon-check",circle:""},on:{click:function(s){return t.approvalNursingContents(e.id,"1",t.collapValue)}}}),t._v(" "),s("el-button",{staticStyle:{float:"right"},attrs:{type:"danger",size:"small",icon:"el-icon-close",circle:""},on:{click:function(s){return t.approvalNursingContents(e.id,"2",t.collapValue)}}})],1):t._e()],1)],2)}),1)],1),t._v(" "),s("div",{staticClass:"collapse_footer"},[s("el-pagination",{attrs:{"current-page":t.nowPage,"hide-on-single-page":"",background:"",layout:"prev, pager, next","page-size":1,total:this.NursingContentsDatas.length},on:{"current-change":t.handleCurrentChange}})],1)]):t._e(),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:t.closeDialog}},[t._v("\n        关 闭\n      ")])],1)]),t._v(" "),s("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.personList}},[s("el-table-column",{attrs:{align:"center",label:"长者审核表"}},[s("el-table-column",{attrs:{align:"center",label:"姓名",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[s("el-tag",{attrs:{size:"medium"}},[t._v(t._s(e.row.fullname))])],1)]}}])}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"workProgress",label:"总完成度"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"doing",label:"应做工时"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"done",label:"已做工时"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"approved",label:"审批工时"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",prop:"approvalFailed",label:"不合格工时"}}),t._v(" "),s("el-table-column",{attrs:{align:"center",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"small"},on:{click:function(s){return t.handleEdit(e.row.personid)}}},[t._v("\n            审查\n          ")])]}}])})],1)],1)],1)},staticRenderFns:[]};var c={components:{StatisticsSelect:s("VU/8")({data:function(){return{PersonNursingContentsFileSrc:"/nursingContents/uploadPersonNursingContentsFile",CycleNursingContentsFileSrc:"/nursingContents/uploadCycleNursingContentsFile",TeamNursingContentsFileSrc:"/nursingContents/uploadTeamNursingContentsFile",PublicNursingContentsFileSrc:"/nursingContents/uploadPublicNursingContentsFile",formInline:{teamname:"",cycle:"day",begintime:"",endtime:""},cycleOptions:[{value:"day",label:"日"},{value:"week",label:"周"},{value:"month",label:"月"}]}},computed:{teamName:{get:function(){return this.$store.state.workStatistics.teamName},set:function(t){this.$store.commit("ChangeTeamName",t)}},type:{get:function(){return this.$store.state.workStatistics.type},set:function(t){this.$store.commit("ChangeType",t)}},beginDate:{get:function(){return this.$store.state.workStatistics.beginDate},set:function(t){this.$store.commit("ChangeBeginDate",t)}}},created:function(){this.$store.dispatch("workStatistics_teamWorkStatistics")},methods:{handleSuccess:function(t,e){"success"==t.state?this.$message.success("添加成功"):this.$notify.error({title:"导入失败",message:t.msg,duration:0})},onSubmit:function(){this.$store.dispatch("workStatistics_teamWorkStatistics")}}},a,!1,function(t){s("B5YO")},"data-v-00beccc6",null).exports,StatisticsGroups:s("VU/8")({data:function(){return{}},computed:{workGroups:function(){return this.$store.state.workStatistics.workGroups}},methods:{openGroup:function(t){this.$store.commit("openInternalShow",t),this.$store.dispatch("workStatistics_nursingWorkStatisticsByTeamid"),this.$store.dispatch("workStatistics_personWorkStatisticsByTeamid")}}},n,!1,function(t){s("U/Ss")},"data-v-c5faca38",null).exports,WorkerList:s("VU/8")(i,l,!1,function(t){s("s2g7")},"data-v-32ea35e5",null).exports,PeopleList:s("VU/8")(o,r,!1,function(t){s("tJe4")},"data-v-fa1208a0",null).exports},data:function(){return{}},computed:{internalShow:function(){return this.$store.state.workStatistics.internalShow},nowGroupData:function(){return this.$store.state.workStatistics.nowGroupData}},methods:{goBack:function(){this.$store.commit("closeInternalShow")}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"work_statistics"},[t.internalShow?s("div",{staticClass:"group_internal"},[s("div",{staticClass:"group_internal_header"},[s("el-page-header",{attrs:{content:t.nowGroupData.teamname},on:{back:t.goBack}})],1),t._v(" "),s("div",{staticStyle:{height:"3%"}}),t._v(" "),s("el-row",{staticStyle:{height:"calc(97% - 73px)"},attrs:{gutter:20}},[s("el-col",{staticClass:"Nurse_height",attrs:{span:12}},[s("WorkerList")],1),t._v(" "),s("el-col",{staticClass:"Nurse_height",attrs:{span:12}},[s("PeopleList")],1)],1)],1):s("div",{staticClass:"group_external"},[s("el-row",{staticStyle:{height:"10%"}},[s("el-col",{staticClass:"Nurse_height",attrs:{span:24}},[s("StatisticsSelect")],1)],1),t._v(" "),s("div",{staticStyle:{height:"3%"}}),t._v(" "),s("el-row",{staticStyle:{height:"87%"},attrs:{gutter:14}},[s("el-col",{staticClass:"Nurse_height",attrs:{span:24}},[s("StatisticsGroups")],1)],1)],1)])},staticRenderFns:[]};var p=s("VU/8")(c,u,!1,function(t){s("qXq2")},"data-v-50c03a28",null);e.default=p.exports},qXq2:function(t,e){},s2g7:function(t,e){},tJe4:function(t,e){}});
//# sourceMappingURL=10.a075e440b949b1a842b5.js.map
webpackJsonp([13],{LmSY:function(e,t){},behq:function(e,t){},eP8Y:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=n("Dd8w"),a=n.n(l),s=n("NYxO"),o=n("woOf"),i=n.n(o),r=n("4kSj"),c=n.n(r),u={data:function(){return{rules:{username:[{required:!0,message:"请输入人员姓名",trigger:"blur"}],hospitalID:[{pattern:/^\d*\.?\d+$/,message:"请输入数字",trigger:"blur"}],deviceId:[{required:!0,message:"请选择手环",trigger:"change"}]},NewPersonnelobj:{username:"",hospitalID:"",deviceId:""},braceletList:[],dialogNewPersonnel:!1,dialogNewPersonnelLoading:!1,gridData:[],uuid:"",dialogTableVisible:!1,json_fields:{"序号":"ROWNUM","编号":"CODE","姓名":"FULLNAME","性别":"SEX","绑定设备编码":"DEVICECODE","房间号":"ROOMNAME","护理等级":"NURSINGLEVEL","入院时间":"ADMISSIONDATE","在院状态":"STATE"},optionsex:[{value:"男",label:"男"},{value:"女",label:"女"},{value:" ",label:"全部"}],optionstate:[{value:"0",label:"在院"},{value:"1",label:"外出"},{value:"2",label:"离院"},{value:" ",label:"全部"}],equipmentoption:[{value:"0",label:"未佩戴"},{value:"1",label:"已佩戴"},{value:" ",label:"全部"}],value:"",sousuo:{id:"",name:"",sex:"",roomN:"",state:"",hasDevice:""}}},computed:{notWearingEquipment:function(){return this.$store.state.archivesList.notWearingEquipment},zhenlist:function(){var e=[];return this.$store.state.details.allSeniors.forEach(function(t){e.push(i()({},t))}),e.forEach(function(e){0==e.STATE?e.STATE="在院":1==e.STATE?e.STATE="外出":2==e.STATE&&(e.STATE="离院")}),e},filename:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}},watch:{sousuo:{handler:function(e){console.log(e),this.$store.commit("changeSelectFrom",e)},deep:!0}},mounted:function(){},methods:{baocun:function(){var e=this;this.$ajax.post("/person/insertPersonList","uuid="+this.uuid).then(function(t){e.search(),e.$message({message:"导入成功",type:"success"}),e.dialogTableVisible=!1})},getFile:function(){var e=this;if(this.$refs.filElem.files[0]){var t=document.getElementById("msgForm");t.action="/person/uploadPersonListFile?userid="+this.$store.state.token,t.submit(),setTimeout(function(){var t=JSON.parse(c()("#form").contents().find("body").text());e.uuid=t.code,"success"==t.msg?(e.dialogTableVisible=!0,e.gridData=t.personList):e.$notify({title:"警告",message:t.msg,duration:0})},1e3)}this.$refs.filElem.value=null},Downloadmoban:function(){var e=this;this.$confirm("请先下载模板?","提示",{confirmButtonText:"确定下载",cancelButtonText:"我已下载",distinguishCancelAndClose:!0}).then(function(){e.$message({type:"success",message:"下载成功!"}),window.location.href="/person/downLoadPersonModel"}).catch(function(t){"cancel"==t&&e.$refs.filElem.dispatchEvent(new MouseEvent("click"))})},handleDownload:function(){var e=this;this.$store.state.hospitalshow?this.onekey():(this.dialogNewPersonnel=!0,this.dialogNewPersonnelLoading=!0,this.$store.dispatch("person_getDeviceListByPersonId","").then(function(){e.dialogNewPersonnelLoading=!1}))},onekey:function(){var e=this;this.$confirm("确认是否添加长者！","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$ajax.post("/person/insertPerson","userid="+e.$store.state.token).then(function(t){t.data.id?e.$store.state.hospitalshow?(e.$store.state.actives=1,e.$router.push({path:"/Evaluating",name:"简单评估",query:{id:t.data.id}})):e.$router.push({path:"/Details:id",name:"编辑",query:{id:t.data.id}}):e.$message({type:"info",message:"编号重复"})})}).catch(function(){e.$message({type:"info",message:"取消输入"})})},sureNewPersonnel:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.$store.dispatch("person_insertPersonData",{userid:t.$store.state.token,username:t.NewPersonnelobj.username,deviceId:t.NewPersonnelobj.deviceId,hospitalID:t.NewPersonnelobj.hospitalID}).then(function(e){"success"==e.state?(t.$message.success("添加成功"),t.search(),t.NewPersonnelobj={username:"",hospitalID:"",deviceId:""},t.dialogNewPersonnel=!1):t.$message.error(e.msg)})})},search:function(){var e=this;this.$store.dispatch("person_getPersonList",this.sousuo).then(function(){e.$store.commit("changeCurrentPage",1)})}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{float:"left"}},[n("el-dialog",{attrs:{title:"新增人员",visible:e.dialogNewPersonnel,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogNewPersonnel=t}}},[n("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.dialogNewPersonnelLoading,expression:"dialogNewPersonnelLoading"}],ref:"ruleForm",attrs:{model:e.NewPersonnelobj,rules:e.rules}},[n("el-form-item",{attrs:{label:"姓名",prop:"username"}},[n("el-input",{attrs:{maxlength:"16",autocomplete:"off"},model:{value:e.NewPersonnelobj.username,callback:function(t){e.$set(e.NewPersonnelobj,"username",t)},expression:"NewPersonnelobj.username"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"住院号",prop:"hospitalID"}},[n("el-input",{attrs:{autocomplete:"off"},model:{value:e.NewPersonnelobj.hospitalID,callback:function(t){e.$set(e.NewPersonnelobj,"hospitalID",t)},expression:"NewPersonnelobj.hospitalID"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"手环",prop:"deviceId"}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择手环"},model:{value:e.NewPersonnelobj.deviceId,callback:function(t){e.$set(e.NewPersonnelobj,"deviceId",t)},expression:"NewPersonnelobj.deviceId"}},e._l(e.notWearingEquipment,function(e,t){return n("el-option",{key:t,attrs:{label:e.name,value:e.ID}})}),1)],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogNewPersonnel=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.sureNewPersonnel("ruleForm")}}},[e._v("确 定")])],1)],1),e._v(" "),n("form",{attrs:{id:"msgForm",target:"form",action:"",enctype:"multipart/form-data",method:"post"}},[n("input",{ref:"filElem",staticClass:"upload-file",staticStyle:{display:"none"},attrs:{name:"file",accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",type:"file"},on:{change:e.getFile}})]),e._v(" "),n("iframe",{ref:"reszhi",staticStyle:{display:"none"},attrs:{name:"form",id:"form"}}),e._v(" "),n("div",{staticClass:"header-clo filterTable-step1"},[n("el-input",{staticStyle:{width:"100px"},attrs:{maxlength:"16",placeholder:"编号","prefix-icon":"el-icon-document"},model:{value:e.sousuo.id,callback:function(t){e.$set(e.sousuo,"id",t)},expression:"sousuo.id"}}),e._v(" "),n("el-input",{staticStyle:{width:"120px"},attrs:{maxlength:"16",placeholder:"长者姓名","prefix-icon":"el-icon-document"},model:{value:e.sousuo.name,callback:function(t){e.$set(e.sousuo,"name",t)},expression:"sousuo.name"}}),e._v(" "),n("el-select",{staticStyle:{width:"95px"},attrs:{clearable:"",placeholder:"性别"},model:{value:e.sousuo.sex,callback:function(t){e.$set(e.sousuo,"sex",t)},expression:"sousuo.sex"}},e._l(e.optionsex,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),n("el-input",{staticStyle:{width:"130px"},attrs:{maxlength:"16",placeholder:"房间号","prefix-icon":"el-icon-document"},model:{value:e.sousuo.roomN,callback:function(t){e.$set(e.sousuo,"roomN",t)},expression:"sousuo.roomN"}}),e._v(" "),n("el-select",{staticStyle:{width:"105px"},attrs:{clearable:"",placeholder:"在院状态"},model:{value:e.sousuo.state,callback:function(t){e.$set(e.sousuo,"state",t)},expression:"sousuo.state"}},e._l(e.optionstate,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),n("el-select",{staticStyle:{width:"105px"},attrs:{clearable:"",placeholder:"佩戴状态"},model:{value:e.sousuo.hasDevice,callback:function(t){e.$set(e.sousuo,"hasDevice",t)},expression:"sousuo.hasDevice"}},e._l(e.equipmentoption,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.search}},[e._v("搜索")])],1),e._v(" "),n("div",{staticClass:"header-clo"},[n("el-button",{staticClass:"filterTable-step2",staticStyle:{margin:"0 0 20px 20px"},attrs:{type:"primary",icon:"document"},on:{click:e.handleDownload}},[n("i",{staticClass:"el-icon-edit"}),e._v("\n      添加\n    ")]),e._v(" "),n("el-button",{staticClass:"filterTable-step3",staticStyle:{margin:"0 0 20px 20px"},attrs:{type:"primary",icon:"document"},on:{click:e.Downloadmoban}},[n("i",{staticClass:"el-icon-edit"}),e._v("\n      批量添加\n    ")]),e._v(" "),n("download-excel",{staticClass:"export-excel-wrapper filterTable-step4",attrs:{data:e.zhenlist,fields:e.json_fields,name:"人员概览.xls"}},[n("i",{staticClass:"el-icon-download"}),e._v("\n      导出\n    ")])],1),e._v(" "),n("el-dialog",{attrs:{title:"提示",visible:e.dialogTableVisible},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[n("el-table",{attrs:{data:e.gridData}},[n("el-table-column",{attrs:{property:"fullname",label:"姓名"}}),e._v(" "),n("el-table-column",{attrs:{property:"idcard",label:"身份证"}}),e._v(" "),n("el-table-column",{attrs:{property:"insurancecard",label:"社保卡"}}),e._v(" "),n("el-table-column",{attrs:{property:"sex",label:"性别"}}),e._v(" "),n("el-table-column",{attrs:{property:"birthdate",label:"出生日期"}}),e._v(" "),n("el-table-column",{attrs:{property:"nation",label:"民族"}}),e._v(" "),n("el-table-column",{attrs:{property:"religion",label:"宗教"}}),e._v(" "),n("el-table-column",{attrs:{property:"origin",label:"籍贯"}}),e._v(" "),n("el-table-column",{attrs:{property:"education",label:"文化"}}),e._v(" "),n("el-table-column",{attrs:{property:"census",label:"户籍所在地",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{property:"detailaddr",label:"详细地址"}}),e._v(" "),n("el-table-column",{attrs:{property:"medicalinsurance",label:"医疗保险"}}),e._v(" "),n("el-table-column",{attrs:{property:"commercialinsurance",label:"商业保险"}}),e._v(" "),n("el-table-column",{attrs:{property:"endowmeninsurance",label:"养老保险"}}),e._v(" "),n("el-table-column",{attrs:{property:"code",label:"住院号"}}),e._v(" "),n("el-table-column",{attrs:{property:"roomname",label:"房间名称"}}),e._v(" "),n("el-table-column",{attrs:{property:"bedname",label:"床位名称"}}),e._v(" "),n("el-table-column",{attrs:{property:"doctor",label:"所属医生"}}),e._v(" "),n("el-table-column",{attrs:{property:"remark",label:"备注"}}),e._v(" "),n("el-table-column",{attrs:{property:"isinhospital",label:"是否在院"}}),e._v(" "),n("el-table-column",{attrs:{property:"nursinglevel",label:"护理等级"}}),e._v(" "),n("el-table-column",{attrs:{property:"health",label:"健康状况"}}),e._v(" "),n("el-table-column",{attrs:{property:"healthstatement",label:"身体状况陈述",width:"120"}}),e._v(" "),n("el-table-column",{attrs:{property:"carepoint",label:"照护重点"}}),e._v(" "),n("el-table-column",{attrs:{property:"diettaboo",label:"饮食禁忌"}}),e._v(" "),n("el-table-column",{attrs:{property:"bloodtype",label:"血型"}}),e._v(" "),n("el-table-column",{attrs:{property:"drugreaction",label:"药物反应"}})],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.baocun}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d={name:"filterTable",components:{FilenameOption:n("VU/8")(u,p,!1,function(e){n("sYQG")},null,null).exports},computed:a()({},Object(s.b)({allSeniors:function(e){return e.details.allSeniors},pageSize:function(e){return e.archivesList.pageSize},currentPage:function(e){return e.archivesList.currentPage}})),data:function(){return{rbtn:!1,wbtn:!1,lbtn:!1,inHospitalStatez:[{value:"0",label:"在院"},{value:"1",label:"外出"},{value:"2",label:"离院"}],inHospitalStatew:[{value:"0",label:"在院"},{value:"1",label:"外出"},{value:"2",label:"离院",disabled:!0}],inHospitalStatel:[{value:"0",label:"在院"},{value:"1",label:"外出",disabled:!0},{value:"2",label:"离院"}],gOldState:0,beHospitalizedbtn:!0,goOutbtn:!0,outOfHospital:!0,deletebtn:!0,multipleSelection:[],a:1,list:[{ID:1,FULLNAME:"",ROWNUM:"",SEX:"",AGE:"",ROOMNAME:"",NURSINGLEVEL:"",ADMISSIONDATE:"",STATE:"",CODE:"",bgc:""}],sousuo:{id:"",name:"",sex:"",roomN:"",state:"",hasDevice:""}}},beforeRouteLeave:function(e,t,n){var l=this;this.$store.state.hospitalshow?"简单评估"==e.name&&1==this.$store.state.actives?n():""!=this.childByValuename?this.$confirm("入院未完成, 是否退出?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n(),l.$store.commit("closehospitalshow"),l.$store.state.actives=0,l.$store.state.activeNames="1"}).catch(function(){n(!1)}):n():n()},created:function(){this.$store.dispatch("person_getPersonList",{id:"",name:"",sex:"",roomN:"",state:"",hasDevice:""})},mounted:function(){this.$refs.rbtn.$el.style.display="none",this.$refs.wbtn.$el.style.display="none",this.$refs.lbtn.$el.style.display="none",this.handleSizeChange(10)},methods:{inHospitalState:function(e){return"0"==e?this.inHospitalStatez:"1"==e?this.inHospitalStatew:"2"==e?this.inHospitalStatel:void 0},changeHospitalState:function(e,t,n){"2"!=e?this.changestate(t,e,n):this.leave(t)},deletepeople:function(e){var t=this;this.$confirm("即将删除人员，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$store.dispatch("person_delPersonById",{id:e,userid:t.$store.state.token})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},changestate:function(e,t,n){var l=this;this.$confirm("即将修改在院状态，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a=[];a.push(e),l.$store.dispatch("person_updatePersonsInHospital",{personIds:a,userid:l.$store.state.token,state:t,oldState:n})}).catch(function(){l.$message({type:"info",message:"已取消"})})},leave:function(e){var t=this;this.$confirm("即将离院，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$store.dispatch("person_departurePerson",{personid:e,userid:t.$store.state.token})}).catch(function(){t.$message({type:"info",message:"已取消离院"})})},handleCurrentChange:function(e){this.$store.commit("changeCurrentPage",e)},handleSizeChange:function(e){this.$store.commit("changePageSize",e)},handleSelectionChange:function(e){var t=this;if(0!==e.length){this.gOldState=e[0].STATE,this.multipleSelection=[],e.forEach(function(e){t.multipleSelection.push(e.ID)});var n=e.some(function(e){return"0"==e.STATE}),l=e.some(function(e){return"1"==e.STATE}),a=e.some(function(e){return"2"==e.STATE});console.log(n,l,a),n&&l||n&&a?(this.$refs.rbtn.$el.style.display="none",this.$refs.wbtn.$el.style.display="none",this.$refs.lbtn.$el.style.display="none"):n?(this.$refs.rbtn.$el.style.display="none",this.$refs.wbtn.$el.style.display="inline-block",this.$refs.lbtn.$el.style.display="inline-block"):l?(this.$refs.rbtn.$el.style.display="inline-block",this.$refs.wbtn.$el.style.display="none",this.$refs.lbtn.$el.style.display="none"):a&&(this.$refs.rbtn.$el.style.display="inline-block",this.$refs.wbtn.$el.style.display="none",this.$refs.lbtn.$el.style.display="none")}else this.$refs.rbtn.$el.style.display="none",this.$refs.wbtn.$el.style.display="none",this.$refs.lbtn.$el.style.display="none"},changeStates:function(e){var t=this;this.$confirm("即将批量修改在院状态，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$store.dispatch("person_updatePersonsInHospital",{personIds:t.multipleSelection,userid:t.$store.state.token,state:e,oldState:t.gOldState})}).catch(function(){t.$message({type:"info",message:"已取消"})})},batchDeparturefromhospital:function(){var e=this;this.$confirm("即将批量离院，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$store.dispatch("person_departurePersons",{personids:e.multipleSelection,userid:e.$store.state.token})}).catch(function(){e.$message({type:"info",message:"已取消"})})},bulkDelete:function(){var e=this;0!=this.multipleSelection.length?this.$confirm("即将批量删除人员，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$store.dispatch("person_delPersonByIds",{personIds:e.multipleSelection,userid:e.$store.state.token})}).catch(function(){e.$message({type:"info",message:"已取消删除"})}):this.$message({type:"warning",message:"请勾选！"})},tableRowClassName:function(e){var t=e.row;return"2"==t.STATE?"grey-row":"1"==t.STATE?"light-grey-row":""}}},m={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",[n("FilenameOption"),e._v(" "),n("div",{staticClass:"filterTable-step5",staticStyle:{float:"left"}},[n("el-button",{ref:"rbtn",staticStyle:{"margin-left":"40px"},attrs:{type:"primary"},on:{click:function(t){return e.changeStates(0)}}},[e._v("批量入院")]),e._v(" "),n("el-button",{ref:"wbtn",staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:function(t){return e.changeStates(1)}}},[e._v("批量外出")]),e._v(" "),n("el-button",{ref:"lbtn",staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:e.batchDeparturefromhospital}},[e._v("批量离院")]),e._v(" "),n("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:e.bulkDelete}},[e._v("批量删除")])],1)],1),e._v(" "),n("el-table",{staticClass:"filterTable-step6",attrs:{data:e.allSeniors.slice((e.currentPage-1)*e.pageSize,e.currentPage*e.pageSize),"element-loading-text":"拼命加载中",border:"","highlight-current-row":"","row-class-name":e.tableRowClassName},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"ROWNUM",align:"center",label:"序号"}}),e._v(" "),n("el-table-column",{attrs:{prop:"CODE",align:"center",label:"编号"}}),e._v(" "),n("el-table-column",{attrs:{prop:"FULLNAME",align:"center",label:"姓名"}}),e._v(" "),n("el-table-column",{attrs:{prop:"SEX",align:"center",label:"性别"}}),e._v(" "),n("el-table-column",{attrs:{prop:"DEVICECODE",label:"绑定设备编码",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"ROOMNAME",label:"房间号",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"grade",align:"center",label:"护理等级"},scopedSlots:e._u([{key:"default",fn:function(t){return["全自理"==t.row.NURSINGLEVEL?n("el-tag",{attrs:{type:"success"}},[e._v("全自理")]):e._e(),e._v(" "),"半自理"==t.row.NURSINGLEVEL?n("el-tag",{attrs:{type:"info"}},[e._v("半自理")]):e._e(),e._v(" "),"全介护"==t.row.NURSINGLEVEL?n("el-tag",{attrs:{type:"danger"}},[e._v("全介护")]):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"入院时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.ADMISSIONDATE?n("span",{attrs:{type:"success"}},[e._v(e._s(t.row.ADMISSIONDATE))]):n("span",{attrs:{type:"info"}},[e._v(e._s(t.row.CREATEDTIME))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"STATE",align:"center",label:"在院状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-select",{attrs:{size:"small",value:JSON.parse(JSON.stringify(t.row.STATE)),placeholder:"请选择"},on:{change:function(n){e.changeHospitalState(n,t.row.ID,t.row.STATE)}}},e._l(e.inHospitalState(t.row.STATE),function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value,disabled:e.disabled}})}),1)]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"operation",align:"center",label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("router-link",{attrs:{to:{name:"详情",params:{id:t.row.ID}}}},[n("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("详情")])],1),e._v(" "),n("router-link",{attrs:{to:{name:"编辑",params:{id:t.row.ID}}}},[n("el-button",{attrs:{type:"success",size:"mini"}},[e._v("编辑")])],1),e._v(" "),n("span",[n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return e.deletepeople(t.row.ID)}}},[e._v("删除")])],1)]}}])})],1),e._v(" "),n("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.allSeniors.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},staticRenderFns:[]};var h=n("VU/8")(d,m,!1,function(e){n("behq"),n("LmSY")},"data-v-8b23a9dc",null);t.default=h.exports},sYQG:function(e,t){}});
//# sourceMappingURL=13.4e905a497b1ca7bdde2c.js.map
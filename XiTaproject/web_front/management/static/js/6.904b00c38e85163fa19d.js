webpackJsonp([6],{"9oS+":function(e,t){},Eb3G:function(e,t){},UjPw:function(e,t){},UpNq:function(e,t){},WlFf:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=o("mvHQ"),a=o.n(l),r={components:{Alertform:s},data:function(){return{dialogFormVisible:!1,form:{name:"",code:"",type:"带心率",model:"TW-01",version:"v2.3",devicedesc:""},rules:{name:[{required:!0,message:"请输入手环名称",trigger:"blur"}],code:[{required:!0,message:"请输入编码",trigger:"blur"}]},formLabelWidth:"120px"}},methods:{submitform:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.$ajax.post("/device/insertDevice","json="+a()(t.form)+"&userid="+t.$store.state.token).then(function(e){"success"==e.data.state?(t.$emit("childByValue",!0),t.$message({message:"添加成功",type:"success"}),t.form={name:"",code:"",type:"带心率",model:"TW-01",version:"v2.3",devicedesc:""},t.dialogFormVisible=!1):t.$message.error(e.data.message)}).catch(function(e){console.log(e)})})}}},i={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"alertfrom"},[o("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("手环录入")]),e._v(" "),o("el-dialog",{attrs:{title:"录入手环",visible:e.dialogFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[o("el-form",{ref:"ruleForm",attrs:{rules:e.rules,model:e.form,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"手环名称",prop:"name"}},[o("el-input",{attrs:{maxlength:"30"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"手环编号",prop:"code"}},[o("el-input",{attrs:{maxlength:"8"},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"手环类型"}},[o("el-input",{attrs:{maxlength:"16"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"手环型号"}},[o("el-input",{attrs:{maxlength:"32"},model:{value:e.form.model,callback:function(t){e.$set(e.form,"model",t)},expression:"form.model"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"手环版本"}},[o("el-input",{attrs:{maxlength:"20"},model:{value:e.form.version,callback:function(t){e.$set(e.form,"version",t)},expression:"form.version"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"手环描述"}},[o("el-input",{attrs:{maxlength:"50"},model:{value:e.form.devicedesc,callback:function(t){e.$set(e.form,"devicedesc",t)},expression:"form.devicedesc"}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitform("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var s=o("VU/8")(r,i,!1,function(e){o("iY0A")},null,null).exports,n={data:function(){return{form:{name:"",code:"",type:"",model:"",version:"",devicedesc:""},rules:{name:[{required:!0,message:"请输入手环名称",trigger:"blur"}],code:[{required:!0,message:"请输入编码",trigger:"blur"}]},formLabelWidth:"120px"}},props:{did:null,fullname:null,personid:null},created:function(){var e=this;this.$ajax.post("/device/getDeviceById","deviceId="+this.did).then(function(t){e.form=t.data})},methods:{ifuntieBracelet:function(){var e=this;this.$confirm("即将解除手环绑定, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.untieBracelet()}).catch(function(){e.$message({type:"info",message:"已取消"})})},untieBracelet:function(){var e=this;this.$ajax.post("/person/savePersonDevice","personId="+this.personid+"&deviceId=&username="+this.$store.state.token).then(function(t){"success"==t.data?(e.$emit("shuaxin"),e.$message({type:"success",message:"修改成功"})):e.$message({type:"warning",message:"修改失败"})})},toDetails:function(){this.$router.push({path:"/Details:id",name:"编辑",query:{id:this.personid}})},submitform:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.$ajax.post("/device/updateDevice","json="+encodeURI(a()(t.form))+"&userid="+t.$store.state.token).then(function(e){"success"===e.data.state?(t.$emit("shuaxin"),t.$message({type:"success",message:"修改成功!"})):t.$message.error(e.data.message)})})}}},c={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-form",{ref:"ruleForm",attrs:{rules:e.rules,model:e.form,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"手环名称",prop:"name"}},[o("el-input",{attrs:{maxlength:"30"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"手环编号",prop:"code"}},[o("el-input",{attrs:{maxlength:"8"},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"手环类型"}},[o("el-input",{attrs:{maxlength:"16"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"手环型号"}},[o("el-input",{attrs:{maxlength:"32"},model:{value:e.form.model,callback:function(t){e.$set(e.form,"model",t)},expression:"form.model"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"手环版本"}},[o("el-input",{attrs:{maxlength:"20"},model:{value:e.form.version,callback:function(t){e.$set(e.form,"version",t)},expression:"form.version"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"手环描述"}},[o("el-input",{attrs:{maxlength:"50"},model:{value:e.form.devicedesc,callback:function(t){e.$set(e.form,"devicedesc",t)},expression:"form.devicedesc"}})],1),e._v(" "),void 0!==e.fullname?o("el-form-item",{attrs:{label:"使用人"}},[o("el-button",{attrs:{type:"text"},on:{click:e.toDetails}},[e._v(e._s(e.fullname))])],1):e._e()],1),e._v(" "),o("div",{staticStyle:{height:"30px"}},[o("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:function(t){return e.submitform("ruleForm")}}},[e._v("确 定")]),e._v(" "),void 0!==e.fullname?o("el-button",{staticStyle:{float:"right","margin-right":"20px"},attrs:{type:"primary"},on:{click:function(t){return e.ifuntieBracelet()}}},[e._v("解绑此手环")]):e._e()],1)],1)},staticRenderFns:[]};var m={name:"filterTable",components:{Alertform:s,Alertbianji:o("VU/8")(n,c,!1,function(e){o("fBcR")},null,null).exports},data:function(){return{vbattvalue:["",""],vbattOpaction:[{value:[0,1],label:"需充电"},{value:[2,4],label:"20%-49%"},{value:[5,6],label:"50%-99%"},{value:[7,7],label:"已充满"},{value:["",""],label:"全部"}],dialogFormVisible:!1,shouhuanid:"",fullname:"",personid:"",a:1,list:[{ID:1,code:"",name:"",type:"",model:"",version:""}],pagesize:10,currentPage:1,sousuo:{code:"",name:"",type:"",version:"",beginVbatt:"",endVbatt:""},bianjiShow:!1}},created:function(){this.Refresh()},mounted:function(){this.handleSizeChange(10)},methods:{shuaxin:function(){this.dialogFormVisible=!1,this.Refresh()},bianji:function(e){var t=this;this.shouhuanid=e.id,this.fullname=e.fullname,this.personid=e.personid,this.bianjiShow=!1,this.$nextTick(function(){t.bianjiShow=!0}),this.dialogFormVisible=!0},childByValue:function(){this.Refresh()},serch:function(){console.log(this.vbattvalue),this.sousuo.beginVbatt=this.vbattvalue[0],this.sousuo.endVbatt=this.vbattvalue[1],this.Refresh()},deleteshouhuan:function(e){var t=this;this.$confirm("此操作将永久删除该设备, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$ajax.post("/device/delDevice","deviceId="+e).then(function(e){"success"==e.data.state?(t.Refresh(),t.$message({type:"success",message:"删除成功!"})):t.$message({showClose:!0,message:e.data.message,type:"error"}),console.log(e.data)})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleCurrentChange:function(e){this.currentPage=e},handleSizeChange:function(e){this.pagesize=e},Refresh:function(){var e=this;this.$ajax.post("/device/getAllDevice","sousou="+a()(this.sousuo)).then(function(t){e.list=t.data,e.list.forEach(function(e){e.lasttime&&(e.lasttime=vm.formatTime(e.lasttime,"Y-M-D h:m:s"))}),e.handleCurrentChange(1),console.log(e.list)}).catch(function(e){console.log(e)})}}},u={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("el-input",{staticStyle:{width:"200px","margin-bottom":"10px"},attrs:{placeholder:"请输入手环编码"},model:{value:e.sousuo.code,callback:function(t){e.$set(e.sousuo,"code",t)},expression:"sousuo.code"}},[o("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),e._v(" "),o("el-input",{staticStyle:{width:"200px","margin-left":"10px"},attrs:{placeholder:"请输入手环名称"},model:{value:e.sousuo.name,callback:function(t){e.$set(e.sousuo,"name",t)},expression:"sousuo.name"}},[o("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),e._v(" "),o("el-input",{staticStyle:{width:"200px","margin-left":"10px"},attrs:{placeholder:"请输手环类型"},model:{value:e.sousuo.type,callback:function(t){e.$set(e.sousuo,"type",t)},expression:"sousuo.type"}},[o("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),e._v(" "),o("el-input",{staticStyle:{width:"200px","margin-left":"10px"},attrs:{placeholder:"请输入手环版本"},model:{value:e.sousuo.version,callback:function(t){e.$set(e.sousuo,"version",t)},expression:"sousuo.version"}},[o("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),e._v(" "),o("el-select",{attrs:{placeholder:"请选择电量范围"},model:{value:e.vbattvalue,callback:function(t){e.vbattvalue=t},expression:"vbattvalue"}},e._l(e.vbattOpaction,function(e,t){return o("el-option",{key:t,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),o("el-button",{staticStyle:{"margin-left":"30px"},attrs:{type:"primary"},on:{click:e.serch}},[e._v("搜索")]),e._v(" "),o("Alertform",{on:{childByValue:e.childByValue}}),e._v(" "),o("el-table",{attrs:{data:e.list.slice((e.currentPage-1)*e.pagesize,e.currentPage*e.pagesize),"element-loading-text":"拼命加载中",border:"",fit:"","highlight-current-row":""}},[o("el-table-column",{attrs:{prop:"ROWNUM",align:"center",label:"序号"}}),e._v(" "),o("el-table-column",{attrs:{prop:"code",align:"center",label:"编码"}}),e._v(" "),o("el-table-column",{attrs:{prop:"name",align:"center",label:"手环名称"}}),e._v(" "),o("el-table-column",{attrs:{prop:"type",align:"center",label:"手环类型"}}),e._v(" "),o("el-table-column",{attrs:{prop:"model",align:"center",label:"手环型号"}}),e._v(" "),o("el-table-column",{attrs:{prop:"version",align:"center",label:"手环版本"}}),e._v(" "),o("el-table-column",{attrs:{prop:"lasttime",align:"center",label:"最后接收数据时间"}}),e._v(" "),o("el-table-column",{attrs:{prop:"fullname",align:"center",label:"使用人"}}),e._v(" "),o("el-table-column",{attrs:{prop:"vbatt",align:"center",label:"电量"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tag",{directives:[{name:"show",rawName:"v-show",value:"10%↓"==t.row.vbatt||"10%↑"==t.row.vbatt,expression:"scope.row.vbatt=='10%↓'||scope.row.vbatt=='10%↑' "}],attrs:{type:"warning"}},[e._v("需充电")]),e._v(" "),o("el-tag",{directives:[{name:"show",rawName:"v-show",value:"100%"==t.row.vbatt,expression:"scope.row.vbatt=='100%'"}],attrs:{type:"primary"}},[e._v("已充满")]),e._v(" "),o("el-tag",{directives:[{name:"show",rawName:"v-show",value:"20%↑"==t.row.vbatt||"30%↑"==t.row.vbatt||"40%↑"==t.row.vbatt||"50%↑"==t.row.vbatt||"75%↑"==t.row.vbatt,expression:"scope.row.vbatt=='20%↑'||scope.row.vbatt=='30%↑'||scope.row.vbatt=='40%↑'||scope.row.vbatt=='50%↑'||scope.row.vbatt=='75%↑'"}],attrs:{type:"success"}},[e._v(e._s(t.row.vbatt))])]}}])}),e._v(" "),o("el-table-column",{attrs:{prop:"operation",align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(o){return e.bianji(t.row)}}},[e._v("编辑")]),e._v(" "),o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(o){return e.deleteshouhuan(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),o("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.list.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),o("el-dialog",{attrs:{title:"编辑手环",visible:e.dialogFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[e.bianjiShow?o("Alertbianji",{attrs:{did:e.shouhuanid,fullname:e.fullname,personid:e.personid},on:{shuaxin:e.shuaxin}}):e._e()],1)],1)},staticRenderFns:[]};var d=o("VU/8")(m,u,!1,function(e){o("UjPw")},"data-v-7684d12a",null).exports,f={components:{Alertform:s},data:function(){var e=this;return{deletedshow:!1,logic:[["","",""]],Calculation:[{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4}],deploymentmode:[{value:1,label:"部署点在所属范围上方"},{value:2,label:"部署点在所属范围下方"}],deploymentmodevalue:"",Calculationvalue:"",options:[],dialogFormVisible:!1,form:{wificode:"",ytoilet:"",xtoilet:"",height:"",code:"",name:"",model:"",version:"",checkversion:"",xmetre:"",ymetre:"",zmetre:"",basestationdesc:"",method:"",domains:[{cmd:"",lrg:"",lrgId:""}]},rules:{name:[{required:!0,message:"请输入基站名称",trigger:"blur"}],code:[{required:!0,message:"请输入编码",trigger:"blur"}],version:[{required:!0,message:"请输入解析协议版本",trigger:"blur"}],height:[{required:!0,message:"请输入基站高度",trigger:"blur"},{pattern:/^\d{1,4}\.{0,1}\d{0,3}$/,message:"基站高度格式为整数4位以内，小数三位以内",trigger:"blur"}],xmetre:[{required:!0,message:"请输入X轴",trigger:"blur"},{pattern:/^\d{1,4}\.{0,1}\d{0,3}$/,message:"坐标格式为整数4位以内，小数三位以内",trigger:"blur"}],ymetre:[{required:!0,message:"请输入Y轴",trigger:"blur"},{pattern:/^\d{1,4}\.{0,1}\d{0,3}$/,message:"坐标格式为整数4位以内，小数三位以内",trigger:"blur"}],xtoilet:[{required:!0,message:"请输入卫生间X轴",trigger:"blur"},{pattern:/^\d{1,4}\.{0,1}\d{0,3}$/,message:"坐标格式为整数4位以内，小数三位以内",trigger:"blur"}],ytoilet:[{required:!0,message:"请输入卫生间Y轴",trigger:"blur"},{pattern:/^\d{1,4}\.{0,1}\d{0,3}$/,message:"坐标格式为整数4位以内，小数三位以内",trigger:"blur"}],selectRoom:[{required:!0,validator:function(t,o,l){e.floorid?l():l(new Error("请选择房间"))}}]},floorid:null,formLabelWidth:"120px"}},created:function(){var e=this;this.$ajax.post("/bed/getNursingHomesTree").then(function(t){e.options=t.data})},watch:{logic:function(e){console.log(e),1==e.length?this.deletedshow=!1:this.deletedshow=!0}},methods:{removeDomain:function(e){var t=this.form.domains.indexOf(e);-1!==t&&this.form.domains.splice(t,1)},addDomain:function(){this.form.domains.push({cmd:"",lrg:"",lrgId:""})},luru:function(){var e=this;this.$ajax.post("/basestation/getBaseStationHeight").then(function(t){e.form.height=t.data,console.log("基站高",t.data)}),this.form={wificode:"",ytoilet:"",xtoilet:"",height:"",code:"",name:"",model:"",version:"",checkversion:"",xmetre:"",ymetre:"",zmetre:"",basestationdesc:"",method:"",domains:[{cmd:"",lrg:"",lrgId:""}]},this.floorid=null,this.dialogFormVisible=!0},deleteji:function(e){this.logic.splice(e,1)},ziranshu:function(e){/^[1-9]\d*$/.test(e)||this.$message({message:"警告，请输入正整数",type:"warning"})},add:function(){this.logic.push([,,])},submitform:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var o="";t.form.domains.forEach(function(e,l){o=l===t.form.domains.length-1?""+o+e.cmd+"-"+e.lrg+"-"+e.lrgId:""+o+e.cmd+"-"+e.lrg+"-"+e.lrgId+"|"}),t.form.method=o,t.$ajax.post("/basestation/insertBasestation","json="+a()(t.form)+"&nursinghomeid="+t.floorid[0]+"&buildingid="+t.floorid[1]+"&floorid="+t.floorid[2]+"&roomid="+t.floorid[3]+"&userid="+t.$store.state.token).then(function(e){"success"==e.data.state?(t.$emit("childByValue",!0),t.$message({message:"添加成功",type:"success"}),t.dialogFormVisible=!1):t.$message.error(e.data.message)})})}}},p={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"alertfrom"},[o("el-button",{attrs:{type:"primary"},on:{click:e.luru}},[e._v("基站录入")]),e._v(" "),o("el-dialog",{attrs:{title:"录入基站",visible:e.dialogFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[o("el-form",{ref:"ruleForm",attrs:{rules:e.rules,model:e.form,"label-width":"110px"}},[o("el-form-item",{attrs:{label:"录入名称",prop:"name"}},[o("el-input",{attrs:{maxlength:"32"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"录入编号",prop:"code"}},[o("el-input",{attrs:{maxlength:"8"},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"录入描述"}},[o("el-input",{attrs:{maxlength:"50"},model:{value:e.form.basestationdesc,callback:function(t){e.$set(e.form,"basestationdesc",t)},expression:"form.basestationdesc"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"录入型号"}},[o("el-input",{attrs:{maxlength:"64"},model:{value:e.form.model,callback:function(t){e.$set(e.form,"model",t)},expression:"form.model"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"解析协议版本",prop:"version"}},[o("el-input",{attrs:{maxlength:"32",placeholder:"v1.0"},model:{value:e.form.version,callback:function(t){e.$set(e.form,"version",t)},expression:"form.version"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"基站高度",prop:"height"}},[o("el-input",{attrs:{maxlength:"10"},model:{value:e.form.height,callback:function(t){e.$set(e.form,"height",t)},expression:"form.height"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"无线编码"}},[o("el-input",{attrs:{maxlength:"4"},model:{value:e.form.wificode,callback:function(t){e.$set(e.form,"wificode",t)},expression:"form.wificode"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"录入X轴",prop:"xmetre"}},[o("el-input",{model:{value:e.form.xmetre,callback:function(t){e.$set(e.form,"xmetre",t)},expression:"form.xmetre"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"录入Y轴",prop:"ymetre"}},[o("el-input",{model:{value:e.form.ymetre,callback:function(t){e.$set(e.form,"ymetre",t)},expression:"form.ymetre"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"录入房间",prop:"selectRoom"}},[o("el-cascader",{staticStyle:{width:"100%"},attrs:{options:e.options,placeholder:""},model:{value:e.floorid,callback:function(t){e.floorid=t},expression:"floorid"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"卫生间X轴",prop:"xtoilet"}},[o("el-input",{model:{value:e.form.xtoilet,callback:function(t){e.$set(e.form,"xtoilet",t)},expression:"form.xtoilet"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"卫生间Y轴",prop:"ytoilet"}},[o("el-input",{model:{value:e.form.ytoilet,callback:function(t){e.$set(e.form,"ytoilet",t)},expression:"form.ytoilet"}})],1),e._v(" "),o("div",{staticStyle:{"margin-left":"10px","margin-bottom":"10px"}},[e._v("计算方式与逻辑区域配置")]),e._v(" "),e._l(e.form.domains,function(t,l){return o("el-row",{key:l},[o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"计算方式",prop:"domains."+l+".cmd",rules:{required:!0,message:"计算方式不能为空",trigger:"blur"}}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:t.cmd,callback:function(o){e.$set(t,"cmd",o)},expression:"domain.cmd"}},e._l(e.Calculation,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"逻辑区域",prop:"domains."+l+".lrg",rules:{required:!0,message:"逻辑区域不能为空",trigger:"blur"}}},[o("el-input",{attrs:{maxlength:"5"},model:{value:t.lrg,callback:function(o){e.$set(t,"lrg",o)},expression:"domain.lrg"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"逻辑区域ID",prop:"domains."+l+".lrgId",rules:{required:!0,message:"逻辑区域ID不能为空",trigger:"blur"}}},[o("el-input",{staticStyle:{width:"120px","margin-right":"20px"},attrs:{maxlength:"5"},model:{value:t.lrgId,callback:function(o){e.$set(t,"lrgId",o)},expression:"domain.lrgId"}}),e._v(" "),1!=e.form.domains.length?o("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(o){return e.removeDomain(t)}}}):e._e()],1)],1)],1)}),e._v(" "),o("el-form-item",[o("el-button",{staticStyle:{float:"right","margin-right":"20px"},on:{click:e.addDomain}},[e._v("新增计算方式与逻辑区域配置")])],1)],2),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitform("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var g={data:function(){var e=this;return{Calculation:[{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4}],rules:{name:[{required:!0,message:"请输入基站名称",trigger:"blur"}],code:[{required:!0,message:"请输入编码",trigger:"blur"}],version:[{required:!0,message:"请输入解析协议版本",trigger:"blur"}],height:[{required:!0,message:"请输入基站高度",trigger:"blur"},{pattern:/^\d{1,4}\.{0,1}\d{0,3}$/,message:"基站高度格式为整数4位以内，小数三位以内",trigger:"blur"}],xmetre:[{required:!0,message:"请输入X轴",trigger:"blur"},{pattern:/^\d{1,4}\.{0,1}\d{0,3}$/,message:"坐标格式为整数4位以内，小数三位以内",trigger:"blur"}],ymetre:[{required:!0,message:"请输入Y轴",trigger:"blur"},{pattern:/^\d{1,4}\.{0,1}\d{0,3}$/,message:"坐标格式为整数4位以内，小数三位以内",trigger:"blur"}],xtoilet:[{required:!0,message:"请输入卫生间X轴",trigger:"blur"},{pattern:/^\d{1,4}\.{0,1}\d{0,3}$/,message:"坐标格式为整数4位以内，小数三位以内",trigger:"blur"}],ytoilet:[{required:!0,message:"请输入卫生间Y轴",trigger:"blur"},{pattern:/^\d{1,4}\.{0,1}\d{0,3}$/,message:"坐标格式为整数4位以内，小数三位以内",trigger:"blur"}],selectRoom:[{required:!0,validator:function(t,o,l){e.floorid?l():l(new Error("请选择房间"))}}]},Calculationvalue:"",options:[],floorid:[],form:{wificode:"",ytoilet:"",xtoilet:"",height:"",code:"",name:"",model:"",version:"",checkversion:"",xmetre:"",ymetre:"",zmetre:"",basestationdesc:"",method:"",domains:[{cmd:"",lrg:"",lrgId:""}]},formLabelWidth:"120px"}},props:{did:null},created:function(){var e=this;this.$ajax.post("/bed/getNursingHomesTree").then(function(t){e.options=t.data}),this.$ajax.post("/basestation/getBasestationById","basestationid="+this.did).then(function(t){var o=t.data.basBasestationPO;for(var l in o)e.form[l]=o[l];e.floorid=t.data.positionArr,e.form.domains=[],t.data.basBasestationPO.method.split("|").forEach(function(t){var o=t.split("-");e.form.domains.push({cmd:o[0],lrg:o[1],lrgId:o[2]})})})},methods:{removeDomain:function(e){var t=this.form.domains.indexOf(e);-1!==t&&this.form.domains.splice(t,1)},addDomain:function(){this.form.domains.push({cmd:"",lrg:"",lrgId:""})},submitform:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.dialogFormVisible=!1;var o="";t.form.domains.forEach(function(e,l){o=l===t.form.domains.length-1?""+o+e.cmd+"-"+e.lrg+"-"+e.lrgId:""+o+e.cmd+"-"+e.lrg+"-"+e.lrgId+"|"}),t.form.method=o,void 0==t.floorid&&(t.floorid=["","","",""]),t.$ajax.post("/basestation/updateBasestation","json="+a()(t.form)+"&nursinghomeid="+t.floorid[0]+"&buildingid="+t.floorid[1]+"&floorid="+t.floorid[2]+"&roomid="+t.floorid[3]+"&userid="+t.$store.state.token).then(function(e){"success"===e.data.state?(t.$emit("childByValue",!0),t.$message({type:"success",message:"修改成功!"})):t.$message.error(e.data.message)})})}}},v={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-form",{ref:"ruleForm",attrs:{rules:e.rules,model:e.form,"label-width":"110px"}},[o("el-form-item",{attrs:{label:"修改名称",prop:"name"}},[o("el-input",{attrs:{maxlength:"32"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"修改编号",prop:"code"}},[o("el-input",{attrs:{maxlength:"8"},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"修改描述"}},[o("el-input",{attrs:{maxlength:"50"},model:{value:e.form.basestationdesc,callback:function(t){e.$set(e.form,"basestationdesc",t)},expression:"form.basestationdesc"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"修改型号"}},[o("el-input",{attrs:{maxlength:"64"},model:{value:e.form.model,callback:function(t){e.$set(e.form,"model",t)},expression:"form.model"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"解析协议版本",prop:"version"}},[o("el-input",{attrs:{maxlength:"32",placeholder:"v1.0"},model:{value:e.form.version,callback:function(t){e.$set(e.form,"version",t)},expression:"form.version"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"基站高度",prop:"height"}},[o("el-input",{attrs:{maxlength:"10"},model:{value:e.form.height,callback:function(t){e.$set(e.form,"height",t)},expression:"form.height"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"无线编码"}},[o("el-input",{attrs:{maxlength:"4"},model:{value:e.form.wificode,callback:function(t){e.$set(e.form,"wificode",t)},expression:"form.wificode"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"修改X轴",prop:"xmetre"}},[o("el-input",{model:{value:e.form.xmetre,callback:function(t){e.$set(e.form,"xmetre",t)},expression:"form.xmetre"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"修改Y轴",prop:"ymetre"}},[o("el-input",{model:{value:e.form.ymetre,callback:function(t){e.$set(e.form,"ymetre",t)},expression:"form.ymetre"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"修改房间",prop:"selectRoom"}},[o("el-cascader",{staticStyle:{width:"100%"},attrs:{options:e.options,placeholder:""},model:{value:e.floorid,callback:function(t){e.floorid=t},expression:"floorid"}})],1),e._v(" "),o("el-form-item",{attrs:{label:" 卫生间X轴",prop:"xtoilet"}},[o("el-input",{model:{value:e.form.xtoilet,callback:function(t){e.$set(e.form,"xtoilet",t)},expression:"form.xtoilet"}})],1),e._v(" "),o("el-form-item",{attrs:{label:" 卫生间Y轴",prop:"ytoilet"}},[o("el-input",{model:{value:e.form.ytoilet,callback:function(t){e.$set(e.form,"ytoilet",t)},expression:"form.ytoilet"}})],1),e._v(" "),e._l(e.form.domains,function(t,l){return o("el-row",{key:l},[o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"计算方式",prop:"domains."+l+".cmd",rules:{required:!0,message:"计算方式不能为空",trigger:"blur"}}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:t.cmd,callback:function(o){e.$set(t,"cmd",o)},expression:"domain.cmd"}},e._l(e.Calculation,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"逻辑区域",prop:"domains."+l+".lrg",rules:{required:!0,message:"逻辑区域不能为空",trigger:"blur"}}},[o("el-input",{attrs:{maxlength:"5"},model:{value:t.lrg,callback:function(o){e.$set(t,"lrg",o)},expression:"domain.lrg"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:8}},[o("el-form-item",{attrs:{label:"逻辑区域ID",prop:"domains."+l+".lrgId",rules:{required:!0,message:"逻辑区域ID不能为空",trigger:"blur"}}},[o("el-input",{staticStyle:{width:"120px","margin-right":"20px"},attrs:{maxlength:"5"},model:{value:t.lrgId,callback:function(o){e.$set(t,"lrgId",o)},expression:"domain.lrgId"}}),e._v(" "),1!=e.form.domains.length?o("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(o){return e.removeDomain(t)}}}):e._e()],1)],1)],1)}),e._v(" "),o("el-form-item",[o("el-button",{staticStyle:{float:"right","margin-right":"20px"},on:{click:e.addDomain}},[e._v("新增计算方式与逻辑区域配置")])],1)],2),e._v(" "),o("div",{staticStyle:{height:"30px"}},[o("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:function(t){return e.submitform("ruleForm")}}},[e._v("确 定")])],1)],1)},staticRenderFns:[]};var h={name:"filterTable",components:{Sectionfrom:o("VU/8")(f,p,!1,function(e){o("9oS+")},null,null).exports,Sectionbianji:o("VU/8")(g,v,!1,function(e){o("Eb3G")},null,null).exports},data:function(){return{jizhanid:"",dialogFormVisibles:!1,a:1,options:[],list:[{id:1,code:"",name:"",model:"",version:"",xmetre:"",ymetre:"",position:"",zmetre:"",createdtime:"",createdby:""}],pagesize:10,currentPage:1,sousuo:{code:"",name:""},floorid:["","",""]}},created:function(){var e=this;this.$ajax.post("/basestation/getAllBasestation","sousuo="+a()(this.sousuo)+"&floorid="+this.floorid[2]).then(function(t){console.log(t.data),e.list=t.data}),this.$ajax.post("/room/getNursingHomesTree").then(function(t){e.options=t.data})},mounted:function(){this.handleSizeChange(10)},methods:{toCalculationrssi:function(){this.$router.push("/Calculationrssi")},bianji:function(e){this.dialogFormVisibles=!0,this.jizhanid=e},childByValue:function(e){var t=this;this.dialogFormVisibles=!1,this.$ajax.post("/basestation/getAllBasestation","sousuo="+a()(this.sousuo)+"&floorid="+this.floorid[2]).then(function(e){t.list=e.data})},select:function(){var e=this;this.$ajax.post("/basestation/getAllBasestation","sousuo="+a()(this.sousuo)+"&floorid="+(0==this.floorid.length?"":this.floorid[2])).then(function(t){e.list=t.data,e.handleCurrentChange(1)})},deleteshouhuan:function(e){var t=this;this.$confirm("此操作将永久删除该设备, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$ajax.post("/basestation/delBasestation","basestationId="+e+"&userid="+t.$store.state.token).then(function(e){"success"==e.data&&(t.$ajax.post("/basestation/getAllBasestation","sousuo="+a()(t.sousuo)+"&floorid="+t.floorid[2]).then(function(e){t.list=e.data,t.handleCurrentChange(1)}),t.$message({type:"success",message:"删除成功!"}))})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},handleCurrentChange:function(e){this.currentPage=e},handleSizeChange:function(e){this.pagesize=e}}},b={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("el-input",{staticStyle:{width:"200px","margin-bottom":"10px"},attrs:{placeholder:"请输入基站编码"},model:{value:e.sousuo.code,callback:function(t){e.$set(e.sousuo,"code",t)},expression:"sousuo.code"}},[o("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),e._v(" "),o("el-input",{staticStyle:{width:"200px","margin-left":"10px"},attrs:{placeholder:"请输入基站名称"},model:{value:e.sousuo.name,callback:function(t){e.$set(e.sousuo,"name",t)},expression:"sousuo.name"}},[o("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),e._v(" "),o("el-cascader",{staticStyle:{width:"200px","margin-left":"10px"},attrs:{options:e.options,placeholder:"请输所在楼层",clearable:""},model:{value:e.floorid,callback:function(t){e.floorid=t},expression:"floorid"}}),e._v(" "),o("el-button",{staticStyle:{"margin-left":"30px"},attrs:{type:"primary"},on:{click:e.select}},[e._v("搜索")]),e._v(" "),o("Sectionfrom",{on:{childByValue:e.childByValue}}),e._v(" "),o("el-button",{staticStyle:{"margin-left":"30px"},attrs:{type:"primary"},on:{click:e.toCalculationrssi}},[e._v("基站维护")]),e._v(" "),o("el-table",{attrs:{data:e.list.slice((e.currentPage-1)*e.pagesize,e.currentPage*e.pagesize),"element-loading-text":"拼命加载中",border:"",fit:"","highlight-current-row":""}},[o("el-table-column",{attrs:{prop:"code",align:"center",label:"编码"}}),e._v(" "),o("el-table-column",{attrs:{prop:"name",align:"center",label:"基站名称"}}),e._v(" "),o("el-table-column",{attrs:{prop:"model",align:"center",label:"基站型号"}}),e._v(" "),o("el-table-column",{attrs:{prop:"version",align:"center",label:"基站版本"}}),e._v(" "),o("el-table-column",{attrs:{prop:"xmetre",align:"center",label:"X轴位置"}}),e._v(" "),o("el-table-column",{attrs:{prop:"ymetre",align:"center",label:"Y轴位置"}}),e._v(" "),o("el-table-column",{attrs:{prop:"position",align:"center",label:"房间"}}),e._v(" "),o("el-table-column",{attrs:{prop:"createdtime",align:"center",label:"创建时间"}}),e._v(" "),o("el-table-column",{attrs:{prop:"createdby",align:"center",label:"创建人"}}),e._v(" "),o("el-table-column",{attrs:{prop:"operation",align:"center",label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(o){return e.bianji(t.row.id)}}},[e._v("编辑")]),e._v(" "),o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(o){return e.deleteshouhuan(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),o("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,40],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.list.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),o("el-dialog",{attrs:{title:"编辑基站",visible:e.dialogFormVisibles,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisibles=t}}},[e.dialogFormVisibles?o("Sectionbianji",{attrs:{did:e.jizhanid},on:{childByValue:e.childByValue}}):e._e()],1)],1)},staticRenderFns:[]};var x={components:{Bracelet:d,Station:o("VU/8")(h,b,!1,function(e){o("UpNq")},null,null).exports}},_={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"xgun"},[t("el-tabs",{staticStyle:{height:"100%"},attrs:{"tab-position":"left"}},[t("el-tab-pane",{attrs:{label:"手环管理"}},[t("Bracelet")],1),this._v(" "),t("el-tab-pane",{attrs:{label:"基站管理"}},[t("Station")],1)],1)],1)},staticRenderFns:[]};var y=o("VU/8")(x,_,!1,function(e){o("wuub")},null,null);t.default=y.exports},fBcR:function(e,t){},iY0A:function(e,t){},wuub:function(e,t){}});
//# sourceMappingURL=6.904b00c38e85163fa19d.js.map
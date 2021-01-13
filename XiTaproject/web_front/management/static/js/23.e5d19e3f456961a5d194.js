webpackJsonp([23],{h1Tv:function(e,t){},sqTH:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("mvHQ"),s=i.n(a),n={data:function(){return{addBtn:!0,carddata:"",peopleid:"",deptid:[],moren:["0"],formLabelWidth:"120px",form:{deptname:"",deptcode:"",deptdesc:"",pid:""},addFormRule:{deptname:[{required:!0,message:"请输入部门名称",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 15 个字符",trigger:"blur"}],deptcode:[{required:!0,message:"请输入部门编码",trigger:"blur"},{min:1,max:8,message:"长度在 1 到 8 个字符",trigger:"blur"}]},bjFormRule:{deptname:[{required:!0,message:"请输入部门名称",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 15 个字符",trigger:"blur"}],deptcode:[{required:!0,message:"请输入部门编码",trigger:"blur"},{min:1,max:8,message:"长度在 1 到 8 个字符",trigger:"blur"}]},options:[],value:"",dialogFormVisible1:!1,dialogFormVisible2:!1,dialogVisible1:!1,dialogVisible2:!1,data:[],peopledata:[],defaultProps:{children:"children",label:"label"},datacheck:[],datacheckid:"0",dalabel:"总结构"}},created:function(){var e=this;this.$ajax.post("/dept/getDeptTree").then(function(t){e.data=t.data,e.distrue(e.data)}),this.$ajax.post("/dept/getDeptPersonTree").then(function(t){e.peopledata=t.data})},methods:{distrue:function(e){var t=this;e.forEach(function(e){e.children.length>0&&(e.disabled=!0,t.distrue(e.children))})},send:function(){for(var e=this,t=[],i=0;i<this.$refs.tree.getCheckedNodes().length;i++)0==this.$refs.tree.getCheckedNodes()[i].children.length&&t.push(this.$refs.tree.getCheckedNodes()[i].id);t.length>1?this.$message({message:"请勿选中多个部门",type:"warning"}):(this.$ajax.post("/basic/updateDeptByUser","deptid="+t[0]+"&userid="+this.peopleid+"&updateUserid="+this.$store.state.token).then(function(t){"success"==t.data?e.$message({message:"修改成功",type:"success"}):e.$message({message:"修改失败",type:"warning"}),e.$ajax.post("/dept/getUserByDeptId","deptId="+e.datacheckid).then(function(t){e.datacheck=t.data})}),this.dialogVisible2=!1)},bianji:function(e,t){this.dialogVisible2=!0,this.peopleid=e,this.deptid=[t]},delUser:function(e){var t=this;this.$confirm("此操作将永久移出该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$ajax.post("/dept/insertUserDept","userid="+e+"&deptid=&updateUserid="+t.$store.state.token).then(function(e){t.$ajax.post("/dept/getUserByDeptId","deptId="+t.datacheckid).then(function(e){t.datacheck=e.data})})}).catch(function(){})},insertUserDept:function(){var e=this;this.dialogVisible1=!1,""==this.value?this.$message({showClose:!0,message:"请选择用户",type:"warning"}):0==this.carddata.children.length?this.$ajax.post("/dept/insertUserDept","userid="+this.value+"&deptid="+this.datacheckid+"&updateUserid="+this.$store.state.token).then(function(t){e.$ajax.post("/dept/getUserByDeptId","deptId="+e.datacheckid).then(function(t){e.datacheck=t.data})}):this.$message({showClose:!0,message:"请选中末级部门",type:"warning"})},insertDept:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.$ajax.post("/dept/insertDept","json="+s()(t.form)).then(function(e){"success"==e.data.state?t.$ajax.post("/dept/getDeptTree").then(function(e){t.data=e.data,t.distrue(t.data),t.moren=[t.form.pid],t.$message({message:"添加成功",type:"success"}),t.dialogFormVisible1=!1}):t.$message({message:e.data.msg,type:"error"})})})},card:function(e){var t=this;0!==e.children.length?this.addBtn=!0:this.addBtn=!1,this.carddata=e,this.dalabel=e.label,this.datacheckid=e.id,this.$ajax.post("/dept/getUserByDeptId","deptId="+e.id).then(function(e){t.datacheck=e.data})},add:function(){this.value="",this.getNoDeptUser(),this.dialogVisible1=!0},append:function(e){this.form.pid=e.id,this.dialogFormVisible1=!0,this.form.deptname="",this.form.deptcode="",this.form.deptdesc=""},updateDept:function(e){this.form.pid=e.id,this.dialogFormVisible2=!0,this.form.deptname=e.label,this.form.deptcode=e.code,this.form.deptdesc=e.desc},update:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.$ajax.post("/dept/updateDept","json="+s()(t.form)).then(function(e){"success"==e.data.state?t.$ajax.post("/dept/getDeptTree").then(function(e){t.data=e.data,t.distrue(t.data),t.moren=[t.form.pid],t.$message({message:"修改成功",type:"success"}),t.dialogFormVisible2=!1}):t.$message({message:e.data.msg,type:"error"})})})},remove:function(e,t){var i=this;this.$confirm("即将删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.$ajax.post("/dept/delDept","deptId="+t.id).then(function(a){if("failure"==a.data.state)i.$message.error(a.data.message);else{var s=e.parent,n=s.data.children||s.data,o=n.findIndex(function(e){return e.id===t.id});n.splice(o,1),i.$message({type:"success",message:"删除成功!"})}})}).catch(function(){i.$message({type:"info",message:"已取消删除"})})},getNoDeptUser:function(){var e=this;this.$ajax.post("/dept/getNoDeptUser").then(function(t){e.options=t.data})},renderContent:function(e,t){var i=this,a=t.node,s=t.data;t.store;return"组织结构"!=a.label?e("span",{style:"flex: 1;display: flex;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 8px;"},[e("span",[a.label]),e("span",[e("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(){return i.append(s)}}},["增加"]),e("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(){return i.updateDept(s)}}},["编辑"]),e("el-button",{attrs:{id:"test",size:"mini",type:"text"},on:{click:function(){return i.remove(a,s)}}},["删除"])])]):e("span",{style:"flex: 1;display: flex;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 8px;"},[e("span",[a.label]),e("span",[e("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(){return i.append(s)}}},["增加"]),e("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(){return i.updateDept(s)}}},["编辑"])])])}}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"test1"}},[i("el-row",{attrs:{gutter:20}},[i("el-col",{staticClass:"Organization-step1",staticStyle:{"margin-left":"170px"},attrs:{span:10}},[i("div",{staticStyle:{width:"100%","text-align":"left","background-color":"#fff","padding-top":"10px","padding-bottom":"10px"}},[i("i",{staticClass:"el-icon-circle-plus",staticStyle:{"margin-left":"10px"}}),e._v("\n        总结构\n      ")]),e._v(" "),i("el-tree",{staticClass:"tree",attrs:{data:e.data,props:e.defaultProps,"node-key":"id","default-expanded-keys":e.moren,"expand-on-click-node":!1,"render-content":e.renderContent},on:{"node-click":e.card}})],1),e._v(" "),i("el-col",{staticClass:"Organization-step2",attrs:{span:10}},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[e._v(e._s(e.dalabel)+"部门下人员")]),e._v(" "),i("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{disabled:e.addBtn,type:"text"},on:{click:e.add}},[e._v("增加")])],1),e._v(" "),i("div",{staticStyle:{height:"20px"}},e._l(e.datacheck,function(t,a){return i("div",{key:a,staticClass:"item"},[e._v("\n            "+e._s(t.nickname)+"\n            "),i("el-button",{staticStyle:{float:"right","font-size":"10px"},attrs:{type:"danger",icon:"el-icon-delete",size:"mini",circle:""},on:{click:function(i){return e.delUser(t.id)}}}),e._v(" "),i("el-button",{staticStyle:{float:"right","font-size":"10px","margin-right":"8px"},attrs:{type:"primary",icon:"el-icon-edit",size:"mini",circle:""},on:{click:function(i){return e.bianji(t.id,t.deptid)}}})],1)}),0)])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"新增部门",visible:e.dialogFormVisible1,closeOnClickModal:!1},on:{"update:visible":function(t){e.dialogFormVisible1=t}}},[i("el-form",{ref:"ruleAddForm",attrs:{model:e.form,rules:e.addFormRule}},[i("el-form-item",{attrs:{label:"部门名称","label-width":e.formLabelWidth,prop:"deptname"}},[i("el-input",{model:{value:e.form.deptname,callback:function(t){e.$set(e.form,"deptname",t)},expression:"form.deptname"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"部门编号","label-width":e.formLabelWidth,prop:"deptcode"}},[i("el-input",{model:{value:e.form.deptcode,callback:function(t){e.$set(e.form,"deptcode",t)},expression:"form.deptcode"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"部门描述","label-width":e.formLabelWidth}},[i("el-input",{model:{value:e.form.deptdesc,callback:function(t){e.$set(e.form,"deptdesc",t)},expression:"form.deptdesc"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible1=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.insertDept("ruleAddForm")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"编辑部门",visible:e.dialogFormVisible2,closeOnClickModal:!1},on:{"update:visible":function(t){e.dialogFormVisible2=t}}},[i("el-form",{ref:"rulebjForm",attrs:{model:e.form,rules:e.bjFormRule}},[i("el-form-item",{attrs:{label:"部门名称","label-width":e.formLabelWidth,prop:"deptname"}},[i("el-input",{model:{value:e.form.deptname,callback:function(t){e.$set(e.form,"deptname",t)},expression:"form.deptname"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"部门编号","label-width":e.formLabelWidth,prop:"deptcode"}},[i("el-input",{model:{value:e.form.deptcode,callback:function(t){e.$set(e.form,"deptcode",t)},expression:"form.deptcode"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"部门描述","label-width":e.formLabelWidth}},[i("el-input",{model:{value:e.form.deptdesc,callback:function(t){e.$set(e.form,"deptdesc",t)},expression:"form.deptdesc"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible2=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.update("rulebjForm")}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{"close-on-click-modal":!1,title:"增加用户",visible:e.dialogVisible1,width:"30%"},on:{"update:visible":function(t){e.dialogVisible1=t}}},[i("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",placeholder:"请选择"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,function(e,t){return i("el-option",{key:t,attrs:{label:e.nickname,value:e.id}})}),1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogVisible1=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.insertUserDept}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{"close-on-click-modal":!1,title:"修改用户所在部门",visible:e.dialogVisible2,width:"30%"},on:{"update:visible":function(t){e.dialogVisible2=t}}},[e.dialogVisible2?i("el-tree",{ref:"tree",attrs:{"default-expand-all":"",data:e.data,"default-checked-keys":e.deptid,"expand-on-click-node":!1,"show-checkbox":"","node-key":"id","highlight-current":""}}):e._e(),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogVisible2=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.send}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=i("VU/8")(n,o,!1,function(e){i("h1Tv")},"data-v-5ad7d8bc",null);t.default=d.exports}});
//# sourceMappingURL=23.e5d19e3f456961a5d194.js.map
webpackJsonp([13],{"1RbD":function(e,t){},"46au":function(e,t){},Hqy5:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("3cXf"),i=n.n(a),o=n("lC5x"),r=n.n(o),s=n("J0Oq"),l=n.n(s),c={data:function(){return{updataBtn:!1,form:{account:"hyb1991",password:"123456",nickname:"韩一斌",phone:"13091443416"},Rules:{account:[{required:!0,message:"请输入账号",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 16 个字符",trigger:"blur"}],nickname:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 16 个字符",trigger:"blur"}],phone:[{required:!0,pattern:/^1(3|4|5|7|8)\d{9}$/,message:"请输入正确联系方式",trigger:"blur"}]}}},methods:{openDialog:function(e){this.form=JSON.parse(i()(e)),this.updataBtn=!0},submitForm:function(){var e=this;this.$refs.RuleForm.validate(function(t){if(!t)return!1;e.$ajax.post("/sysFamilyUser/updateFamilyUser","json="+i()(e.form)+"&userid="+e.$store.state.token).then(function(t){"success"==t.data.state?(e.$emit("updateOk"),e.$message.success("修改成功"),e.updataBtn=!1):e.$message.error(t.data.msg)})})}}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{title:"编辑家属账号",visible:e.updataBtn},on:{"update:visible":function(t){e.updataBtn=t}}},[n("el-form",{ref:"RuleForm",attrs:{rules:e.Rules,model:e.form}},[n("el-form-item",{attrs:{label:"账号",prop:"account"}},[n("el-input",{model:{value:e.form.account,callback:function(t){e.$set(e.form,"account",t)},expression:"form.account"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"姓名",prop:"nickname"}},[n("el-input",{model:{value:e.form.nickname,callback:function(t){e.$set(e.form,"nickname",t)},expression:"form.nickname"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"联系方式",prop:"phone"}},[n("el-input",{model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.updataBtn=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v(" 确 定 ")])],1)],1)},staticRenderFns:[]};var d={components:{updateFamily:n("C7Lr")(c,u,!1,function(e){n("46au")},null,null).exports},data:function(){return{nowId:"",nonePeople:[],checkPelple:[],addSeniorBtn:!1,addSeniorSelect:"",loadingTable:!1,dialogLoading:!1,searchForm:{nickname:""},tableData:[{account:"hyb1991",password:"123456",nickname:"韩一斌",phone:"13091443416"}]}},created:function(){this.getTableData({nickname:""})},methods:{openaddSenior:function(e){this.nowId=e,this.addSeniorBtn=!0,this.dialogLoading=!0;var t=this;!function(){var n=l()(r.a.mark(function n(){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.getPersonListByFamily(e);case 2:return t.checkPelple=n.sent,n.next=5,t.getFamilyPersonAndNoFamilyList(e);case 5:t.nonePeople=n.sent,t.dialogLoading=!1;case 7:case"end":return n.stop()}},n,this)}));return function(){return n.apply(this,arguments)}}()()},getPersonListByFamily:function(e){return this.$ajax.post("/sysFamilyUser/getPersonListByFamily","familyid="+e).then(function(e){return e.data})},getFamilyPersonAndNoFamilyList:function(e){return this.$ajax.post("/prnPerson/getFamilyPersonAndNoFamilyList","familyid="+e).then(function(e){return e.data})},submitSeniorForm:function(){var e=this;this.$ajax.post("/sysFamilyUser/insertAndUpdatePersonFamily","familyid="+this.nowId+"&personids="+i()(this.checkPelple)+"&userid="+this.$store.state.token).then(function(t){"success"==t.data.state?(e.$message.success("修改成功"),e.addSeniorBtn=!1):e.$message.error(t.data.msg)})},update:function(e){this.$refs.refupdate.openDialog(e)},updateOk:function(){this.getTableData({nickname:""})},changePassword:function(e){var t=this;this.$confirm("即将重置该家属账号的密码, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n="userid="+t.$store.state.token+"&familyid="+e;t.$ajax.post("sysFamilyUser/resetFamilyPassword",n).then(function(e){"success"==e.data.state?t.$message.success("修改成功!"):t.$message.error("修改失败！")})}).catch(function(){})},handleDelete:function(e){var t=this;this.$confirm("即将删除该账号, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$ajax.post("/sysFamilyUser/deleteFamilyUser","id="+e+"&userid"+t.$store.state.token).then(function(e){"success"==e.data.state?(t.getTableData({nickname:""}),t.$message.success("删除成功"),t.updataBtn=!1):t.$message.error(e.data.msg)})}).catch(function(){})},getTableData:function(e){var t=this;this.$ajax.post("/sysFamilyUser/getFamilyUserList","search="+i()(e)).then(function(e){t.tableData=e.data})}}},m={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table_family"},[n("el-dialog",{attrs:{title:"关联长者",visible:e.addSeniorBtn},on:{"update:visible":function(t){e.addSeniorBtn=t}}},[n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.dialogLoading,expression:"dialogLoading"}],staticClass:"selectPeople"},[n("div",{staticStyle:{"margin-bottom":"20px",overflow:"hidden"}},[n("li",{staticStyle:{float:"right"}},[n("span",[e._v(" 长者姓名查询： ")]),e._v(" "),n("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"请输入"},model:{value:e.addSeniorSelect,callback:function(t){e.addSeniorSelect=t},expression:"addSeniorSelect"}})],1)]),e._v(" "),n("div",{staticClass:"checkbox-group-style"},[n("el-checkbox-group",{attrs:{size:"small"},model:{value:e.checkPelple,callback:function(t){e.checkPelple=t},expression:"checkPelple"}},e._l(e.nonePeople.filter(function(t){return!e.addSeniorSelect||t.fullname.toLowerCase().includes(e.addSeniorSelect.toLowerCase())}),function(t){return n("el-checkbox",{key:t.id,attrs:{label:t.id,border:""}},[e._v(e._s(t.fullname)+"\n          ")])}),1)],1)]),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.addSeniorBtn=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.submitSeniorForm}},[e._v(" 确 定 ")])],1)]),e._v(" "),n("updateFamily",{ref:"refupdate",on:{updateOk:e.updateOk}}),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingTable,expression:"loadingTable"}],staticStyle:{width:"100%"},attrs:{border:"",height:"100%",data:e.tableData}},[n("el-table-column",{attrs:{align:"center",prop:"account",label:"账号",width:"180"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",prop:"nickname",label:"姓名"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",prop:"phone",label:"联系方式"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作",width:"360"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.openaddSenior(t.row.id)}}},[e._v("\n          关联长者\n        ")]),e._v(" "),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.changePassword(t.row.id)}}},[e._v("\n          重置密码\n        ")]),e._v(" "),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.update(t.row)}}},[e._v(" 编辑 ")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDelete(t.row.id)}}},[e._v("\n          删除\n        ")])]}}])})],1)],1)},staticRenderFns:[]};var f={data:function(){return{addBtn:!1,form:{account:"",nickname:"",phone:""},Rules:{account:[{required:!0,message:"请输入账号",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 16 个字符",trigger:"blur"}],nickname:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 16 个字符",trigger:"blur"}],phone:[{required:!0,pattern:/^1(3|4|5|7|8)\d{9}$/,message:"请输入正确联系方式",trigger:"blur"}]}}},methods:{openDialog:function(){this.addBtn=!0},submitForm:function(){var e=this;this.$refs.RuleForm.validate(function(t){if(!t)return!1;e.$ajax.post("/sysFamilyUser/insertFamilyUser","json="+i()(e.form)+"&userid="+e.$store.state.token).then(function(t){"success"==t.data.state?(e.$emit("addSuccess"),e.$message.success("添加成功"),e.form={account:"",password:"",nickname:"",phone:""},e.addBtn=!1):e.$message.error(t.data.msg)})})}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{title:"创建家属账号",visible:e.addBtn,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addBtn=t}}},[n("el-form",{ref:"RuleForm",attrs:{rules:e.Rules,model:e.form}},[n("el-form-item",{attrs:{label:"账号",prop:"account"}},[n("el-input",{model:{value:e.form.account,callback:function(t){e.$set(e.form,"account",t)},expression:"form.account"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"姓名",prop:"nickname"}},[n("el-input",{model:{value:e.form.nickname,callback:function(t){e.$set(e.form,"nickname",t)},expression:"form.nickname"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"联系方式",prop:"phone"}},[n("el-input",{model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.addBtn=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v(" 确 定 ")])],1)],1)},staticRenderFns:[]};var h={components:{TableFamily:n("C7Lr")(d,m,!1,function(e){n("1RbD")},"data-v-30ff2652",null).exports,addFamily:n("C7Lr")(f,p,!1,function(e){n("ad9o")},null,null).exports},data:function(){return{selectFrom:{nickname:""}}},methods:{openadd:function(){this.$refs.refAdd.openDialog()},selectTableData:function(){this.$refs.refTable.getTableData(this.selectFrom)},addOk:function(){this.$refs.refTable.getTableData(this.selectFrom)}}},g={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"family_account_management"},[n("addFamily",{ref:"refAdd",on:{addSuccess:e.addOk}}),e._v(" "),n("el-row",{staticStyle:{height:"8%"}},[n("el-col",{staticClass:"Nurse_height",attrs:{span:24}},[n("div",{staticClass:"select_famliy"},[n("el-input",{staticStyle:{width:"180px","margin-right":"10px"},attrs:{placeholder:"请输入用户真实姓名"},model:{value:e.selectFrom.nickname,callback:function(t){e.$set(e.selectFrom,"nickname",t)},expression:"selectFrom.nickname"}}),e._v(" "),n("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary"},on:{click:function(t){return e.selectTableData()}}},[e._v("查询")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.openadd}},[e._v("新增")])],1)])],1),e._v(" "),n("el-row",{staticStyle:{height:"92%"}},[n("el-col",{staticClass:"Nurse_height",attrs:{span:24}},[n("TableFamily",{ref:"refTable"})],1)],1)],1)},staticRenderFns:[]};var v=n("C7Lr")(h,g,!1,function(e){n("n9o0")},"data-v-31721479",null);t.default=v.exports},ad9o:function(e,t){},n9o0:function(e,t){}});
//# sourceMappingURL=13.4cc22d8c8806197c0848.js.map
webpackJsonp([12],{"+SEQ":function(t,e){},A46i:function(t,e,i){"use strict";var s={data:function(){return{btn:"f",restaurants:[],state1:this.$route.query.id}},created:function(){var t=this;this.$ajax.post("/personProblem/getNoAssessmentPersonList").then(function(e){t.restaurants=e.data,console.log(e.data)}).catch(function(t){console.log(t)})},mounted:function(){document.querySelector(".el-message-box__wrapper").style.display="block"},updated:function(){console.log("页面更新"),void 0!=this.$route.query.id&&this.baocun()},methods:{change:function(t){!0!==t&&void 0!==this.state1?this.btn="t":this.btn="f"},baocun:function(){console.log("this.restaurants"),document.querySelector(".el-message-box__wrapper").style.display="none",this.$emit("childByValue",this.state1)},close:function(){this.$router.back(-1)}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"el-message-box__wrapper",staticStyle:{"z-index":"206"},attrs:{tabindex:"-1",role:"dialog","aria-modal":"true","aria-label":"确认信息"}},[i("div",{staticClass:"el-message-box Evaluating-step1"},[t._m(0),t._v(" "),i("div",{staticClass:"el-message-box__content"},[i("div",{staticClass:"el-message-box__message"},[i("p"),t._v(" "),i("div",{staticClass:"bain"},[i("el-select",{staticStyle:{width:"67%"},attrs:{filterable:"",placeholder:"请选择"},on:{"visible-change":t.change},model:{value:t.state1,callback:function(e){t.state1=e},expression:"state1"}},t._l(t.restaurants,function(t){return i("el-option",{key:t.id,attrs:{label:t.value,value:t.id}})}),1)],1)]),t._v(" "),t._m(1)]),t._v(" "),i("div",{staticClass:"el-message-box__btns"},[i("button",{staticClass:"el-button el-button--default el-button--small",attrs:{type:"button"},on:{click:t.close}},[i("span",[t._v("取消")])]),t._v(" "),"f"==t.btn?i("el-button",{attrs:{type:"primary",size:"small",disabled:""},on:{click:t.baocun}},[t._v("确定")]):t._e(),t._v(" "),"t"==t.btn?i("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.baocun}},[t._v("确定")]):t._e()],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"el-message-box__header"},[e("div",{staticClass:"el-message-box__title"},[e("span",[this._v("请输入长者姓名")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"el-message-box__input",staticStyle:{display:"none"}},[e("div",{staticClass:"el-input"},[e("input",{staticClass:"el-input__inner",attrs:{type:"text",autocomplete:"off",placeholder:""}})]),this._v(" "),e("div",{staticClass:"el-message-box__errormsg",staticStyle:{visibility:"hidden"}})])}]};var n=i("VU/8")(s,a,!1,function(t){i("dCwW")},"data-v-3e89903f",null);e.a=n.exports},BlhZ:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("KSek"),a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"evaluating"},[i("Xiala",{on:{childByValue:t.childByValue}}),t._v(" "),i("div",{staticClass:"Evaluating-step2",staticStyle:{height:"750px",width:"23%",float:"left","margin-left":"50px","overflow-y":"auto","OVERFLOW-X":"hidden"}},[i("div",[i("el-steps",{attrs:{space:100,direction:"vertical",active:t.active,"finish-status":"success"}},t._l(t.ti,function(t,e){return i("el-step",{key:e,attrs:{title:t.name,description:t.xiang}})}),1)],1)]),t._v(" "),i("el-card",{staticClass:"box-card Evaluating-step3",staticStyle:{position:"relative"},attrs:{shadow:"hover"}},[i("el-button-group",{staticStyle:{position:"absolute",bottom:"20px",right:"25px"}},[t.upti?i("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left"},on:{click:t.up}},[t._v("上一题")]):t._e(),t._v(" "),t.nextti?i("el-button",{attrs:{type:"primary"},on:{click:t.next}},[t._v("\n        下一题\n        "),i("i",{staticClass:"el-icon-arrow-right el-icon--right"})]):t._e(),t._v(" "),t.submitda?i("el-button",{attrs:{type:"primary"},on:{click:t.next}},[t._v("\n        提交\n        "),i("i",{staticClass:"el-icon-arrow-right el-icon--right"})]):t._e(),t._v(" "),t.baocun?i("el-button",{attrs:{type:"primary"},on:{click:t.nextbaocun}},[t._v("\n        保存\n        "),i("i",{staticClass:"el-icon-arrow-right el-icon--right"})]):t._e()],1),t._v(" "),i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",{staticStyle:{"font-size":"20px"}},[t._v(t._s(t.timu))]),t._v(" "),i("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:t.again}},[t._v("重新答题")])],1),t._v(" "),i("div",{staticClass:"diss_y"},[t.rea?i("el-radio-group",{model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},t._l(t.da,function(e,s){return i("el-radio",{key:s,staticClass:"text item",staticStyle:{display:"block","margin-left":"30px"},attrs:{label:e.id}},[i("span",{staticStyle:{display:"inline-block",width:"300px"}},[t._v(t._s(e.answer))]),t._v(" "),i("span",{staticClass:"sheng"},[t._v(t._s(e.desc))])])}),1):t._l(t.retrunAnswer,function(e,s){return i("li",{key:s,staticClass:"ruturn"},[i("span",[t._v(t._s(s+1)+".")]),t._v(" "),i("span",{attrs:{id:"hov"}},[t._v(t._s(e.PROBLEM))]),t._v(" "),i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ANSWERID,callback:function(i){t.$set(e,"ANSWERID",i)},expression:"item.ANSWERID"}},t._l(e.ANSWERS,function(t,e){return i("el-option",{key:e,attrs:{label:t.choicesubject,value:t.id}})}),1),t._v(" "),i("span",[t._v(t._s(e.SCORE)+"分")])],1)})],2)],1)],1)},staticRenderFns:[]};var n=function(t){i("+SEQ")},o=i("VU/8")(s.a,a,!1,n,"data-v-6bf484f1",null);e.default=o.exports},KSek:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__=__webpack_require__("fZjL"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__=__webpack_require__("mvHQ"),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__),__WEBPACK_IMPORTED_MODULE_2__Xiala_vue__=__webpack_require__("A46i"),a;__webpack_exports__.a={components:{Xiala:__WEBPACK_IMPORTED_MODULE_2__Xiala_vue__.a},inject:["reload"],data:function(){return{upti:!1,nextti:!0,tap:0,name:"",timu:"",da:"",ti:[],active:0,radio:"",userda:[],zhenuserda:[],childByValuename:"",test:{},tiid:"",submitda:!1,retrunAnswer:[],rea:!0,shangradio:!1,baocun:!1}},beforeRouteLeave:function(t,e,i){var s=this;this.$store.state.hospitalshow?"编辑"==t.name&&2==this.$store.state.actives?i():this.$confirm("入院未完成, 是否退出?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i(),s.$store.commit("closehospitalshow"),s.$store.state.actives=0,s.$store.state.activeNames="1"}).catch(function(){i(!1)}):"编辑"==t.name?i():""!=this.childByValuename?this.$confirm("答题未完成, 是否退出?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i()}).catch(function(){i(!1)}):i()},created:function(){var t=this;this.$ajax.post("/personProblem/getProblemList").then(function(e){t.ti=e.data.ti,t.timu=t.ti[0].name,t.da=t.ti[0].da,t.tiid=t.ti[0].id,console.log(e.data.ti)})},watch:{tap:function(t){t<this.ti.length-1&&t>0?(this.upti=!0,this.nextti=!0,this.submitda=!1,this.baocun=!1):t==this.ti.length-1?(this.upti=!0,this.nextti=!1,this.submitda=!0,this.baocun=!1):t<=0?(this.upti=!1,this.nextti=!0,this.submitda=!1,this.baocun=!1):t==this.ti.length&&(this.upti=!1,this.nextti=!1,this.submitda=!1,this.baocun=!0)},radio:function(t,e){t==e?this.shangradio=!1:""==this.radio?this.shangradio=!1:this.shangradio=!0}},methods:{childByValue:function(t){this.childByValuename=t},up:function up(){this.tap-- >0&&(this.active--,this.timu=this.ti[this.tap].name,this.da=this.ti[this.tap].da,this.tiid=this.ti[this.tap].id,this.radio=eval("this.test."+this.tiid))},nextbaocun:function(){for(var t=this,e=[],i=0;i<this.retrunAnswer.length;i++)e.push(this.retrunAnswer[i].ANSWERID);this.$confirm("即将保存, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.$ajax.post("/personProblem/saveAnswer","personId="+t.childByValuename+"&answerArry="+__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(e)+"&type=save&userid="+t.$store.state.token).then(function(e){t.$alert("共"+e.data.total+"分","提示",{confirmButtonText:"确定",callback:function(e){t.$store.state.hospitalshow?(t.$store.state.actives=2,t.$store.state.activeNames="3",t.$router.push({path:"/Details",name:"编辑",query:{id:t.childByValuename}})):void 0==t.$route.query.id?t.reload():t.$router.push({path:"/Details",name:"编辑",query:{id:t.childByValuename}})}})})}).catch(function(){t.$message({type:"info",message:"取消保存"})})},next:function next(){console.log("test",this.conleng(this.test)),console.log("tap",this.tap),console.log(this.shangradio),this.shangradio?(this.tap<this.ti.length&&(this.tap++,this.active++,this.test[this.ti[this.tap-1].id]=this.radio,this.tap!=this.ti.length&&(this.timu=this.ti[this.tap].name,this.da=this.ti[this.tap].da,this.tiid=this.ti[this.tap].id,this.conleng(this.test)!=this.tap?this.radio=eval("this.test."+this.tiid):this.radio="")),this.tap==this.ti.length&&this.submitt()):this.$message({type:"warning",message:"不能为空"})},again:function(){var t=this;this.$confirm("即将重新答题, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){t.tap=0,t.timu=t.ti[t.tap].name,t.da=t.ti[t.tap].da,t.tiid=t.ti[t.tap].id,t.test={},t.radio="",t.active=0,t.rea=!0}).catch(function(){t.$message({type:"info",message:"取消提交"})})},conleng:function(t){return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(t).length},submitt:function(){var t,e=this,i=[];for(t in this.test)i.push(this.test[t]);this.$ajax.post("/personProblem/saveAnswer","personId="+this.childByValuename+"&answerArry="+__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(i)).then(function(t){e.upti=!1,e.rea=!1,e.timu="已完成         "+t.data.total+"分",e.retrunAnswer=t.data.retrunAnswer,console.log(t.data)}).catch(function(t){console.log(t)})}}}},dCwW:function(t,e){}});
//# sourceMappingURL=12.d1af8613c02d8370d7a2.js.map
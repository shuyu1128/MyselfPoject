webpackJsonp([0],{"+ENe":function(t,e,o){"use strict";var i=o("Dd8w"),n=o.n(i),s=o("NYxO"),a=(o("BYCl"),{render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"station_content"},[e("div",[e("p"),this._v(" "),e("span")])])}]});var r={components:{circular:o("VU/8")({},a,!1,function(t){o("OR5i")},"data-v-3827ddda",null).exports},data:function(){return{coefficient:1,pelplectxImg:null,percentage:0,percenta:1,circularShow:!0,floorRoll:!1,floorgrop:[],zongq:"",room:"",peoplefloor:[],people:[],x:0,y:0,floorid:"",loui:1}},props:{did:null,tableFloorid:null,ifUpdata:null},computed:n()({nowPeople:function(){for(var t={color:"transparent"},e=this.$store.state.websocket.allSocketData,o=0;o<e.length;o++)for(var i=0;i<e[o].persons.length;i++)if(e[o].persons[i].id==this.did){this.onlyIdchange(e[o].floorId),t={fontSize:12*this.percenta+"px",color:"危机"==e[o].persons[i].state?"#F56C6C":"#67C23A",left:e[o].persons[i].x*this.percenta*this.coefficient+"px",bottom:e[o].persons[i].y*this.percenta*this.coefficient+"px"};break}return t},readyAddRoom:function(){return this.changeRoomColor(this.$store.state.fance.readyAddRoom),this.$store.state.fance.readyAddRoom}},Object(s.b)({drewsinglePointPw:function(t){return t.fance.drewsinglePointPw},inRoomEnclosure:function(t){return t.fance.inRoomEnclosure},addNowFloorId:function(t){return t.fance.nowFloorId},inputMode:function(t){return t.fance.inputMode},drewRailList:function(t){return t.fance.drewRailList},nowRoomsData:function(t){return t.websocket.nowRoomsData},allBuildsData:function(t){return t.websocket.allBuildsData},nowFloorId:function(t){return t.websocket.nowFloorId}})),watch:{addNowFloorId:function(t){this.onlyIdchange(t)},percentage:function(t){this.percenta=0==t?1:t/50+1}},created:function(){var t=this;this.$store.dispatch("mainPage_getFloorAndRoomJson").then(function(e){t.getCoefficient(e[0].loushu[0].X,e[0].loushu[0].Y),t.x=e[0].loushu[0].X,t.y=e[0].loushu[0].Y,t.$store.commit("updataFloorId",e[0].loushu[0].floorId),t.ifUpdata&&t.onlyIdchange(t.tableFloorid)})},mounted:function(){},destroyed:function(){this.$store.commit("clearReadyAddRoom")},directives:{drag:function(t,e){t.onmousedown=function(e){var o=e.pageX-t.offsetLeft,i=e.pageY-t.offsetTop;document.onmousemove=function(e){t.style.left=e.pageX-o+"px",t.style.top=e.pageY-i+"px"},document.onmouseup=function(){document.onmousemove=document.onmouseup=null}}}},methods:{changeRoomColor:function(t){this.$store.commit("changeRoomColor",t)},selectRoom:function(t,e){"2"===this.inputMode&&(e?this.$store.commit("reduceReadyAddRoom",t):this.$store.commit("addReadyAddRoom",t))},getRoomStyle:function(t,e,o,i,n,s,a){return{background:a?"radial-gradient(circle,  #f56c6c, #604050)":"私人区域"==e?"radial-gradient(circle, #183c59, #18657f)":"公共区域"==e?"radial-gradient(circle, #1a494e, #1d6d6e)":"高危区域"==e?"radial-gradient(circle, #513841, #883652)":"移动区域"==e?"radial-gradient(circle, #ae5b1b, #ae5b1b)":"radial-gradient(circle, #122742, #1053ad)",border:"私人区域"==e?"1px solid #05d2d5":"公共区域"==e?"1px solid #1ba999":"高危区域"==e?"1px solid #f4464a":"移动区域"==e?"1px solid #ae5b1b":"1px solid #1053ad",borderRadius:"移动区域"==e?"0px":"4px",width:(o*this.percenta-i*this.percenta)*this.coefficient+"px",height:(n*this.percenta-s*this.percenta)*this.coefficient+"px",left:i*this.percenta*this.coefficient+"px",bottom:s*this.percenta*this.coefficient+"px"}},getInRoomEnclosureStyle:function(t,e,o,i){return{width:(t-e)*this.percenta*this.coefficient+"px",height:(o-i)*this.percenta*this.coefficient+"px",left:e*this.percenta*this.coefficient+"px",bottom:i*this.percenta*this.coefficient+"px"}},getSpotRailStyle:function(t,e){return{left:t*this.percenta*this.coefficient+"px",bottom:e*this.percenta*this.coefficient+"px"}},getCoefficient:function(t,e){this.coefficient=766/t>359/e?359/e:766/t},fuwei:function(){var t=document.querySelector(".plan");t.style.left="50%",t.style.top="50%",this.percenta=1,this.percentage=0},increase:function(){var t=document.querySelector(".plan");t.style.left="50%",t.style.left="50%",this.percentage+=10,this.percentage>100&&(this.percentage=100)},decrease:function(){var t=document.querySelector(".plan");t.style.left="50%",t.style.left="50%",this.percentage-=10,this.percentage<0&&(this.percentage=0)},changeRoom:function(t,e,o,i){this.getCoefficient(e,o),this.x=e,this.y=o,this.$store.commit("updataFloorId",i),this.$store.commit("updataNowRoomsData",t),void 0!==this.did?0===this.$store.state.fance.selectRailGroup.length?this.$store.commit("updataDrewRailList",[]):this.$store.dispatch("rail_getRailListByGroupIds",this.$store.state.fance.selectRailGroup):0===this.$store.state.fance.selectRailids.length?this.$store.commit("updataDrewRailList",[]):this.$store.dispatch("rail_getRailDrawing",this.$store.state.fance.selectRailids)},onlyIdchange:function(t){this.$store.commit("updataFloorId",t);for(var e=this.allBuildsData,o=0;o<e.length;o++)for(var i=0;i<e[o].loushu.length;i++)if(e[o].loushu[i].floorId==t){this.x=e[o].loushu[i].X,this.y=e[o].loushu[i].Y,this.getCoefficient(e[o].loushu[i].X,e[o].loushu[i].Y),this.$store.commit("updataNowRoomsData",e[o].loushu[i].roomqing);break}}}},l={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"map"},[o("span",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[t._v(t._s(t.readyAddRoom))]),t._v(" "),o("div",{staticClass:"kaiguanfangda"},[o("div",{staticStyle:{width:"180px",float:"left","margin-top":"10px"}},[o("el-progress",{attrs:{"stroke-width":28,"text-inside":!0,percentage:t.percentage}})],1),t._v(" "),o("div",{staticStyle:{"margin-top":"10px","margin-right":"30px",float:"right"}},[o("el-button-group",[o("el-button",{attrs:{icon:"el-icon-minus",size:"mini"},on:{click:t.decrease}}),t._v(" "),o("el-button",{attrs:{icon:"el-icon-plus",size:"mini"},on:{click:t.increase}}),t._v(" "),o("el-button",{attrs:{icon:"el-icon-refresh",size:"mini"},on:{click:t.fuwei}})],1)],1)]),t._v(" "),o("div",{staticClass:"buildandfloor"},t._l(t.allBuildsData,function(e,i){return o("div",{key:i,staticClass:"fir"},t._l(e.loushu,function(i,n){return o("div",{key:n,class:i.floorId==t.nowFloorId?"activity-lil":"lil",attrs:{id:i.floorId},on:{click:function(e){return t.changeRoom(i.roomqing,i.X,i.Y,i.floorId)}}},[o("li",{staticClass:"lil-top"},[o("b",{staticStyle:{color:"#03b2e1","font-size":"1.375rem"}},[t._v(t._s(e.buildName))])]),t._v(" "),o("li",{staticClass:"lil-bottom"},[o("b",{staticStyle:{"font-size":"16px"}},[t._v(t._s(i.floorName))])])])}),0)}),0),t._v(" "),o("div",{staticClass:"window"},[o("div",{directives:[{name:"drag",rawName:"v-drag"}],staticClass:"plan",style:{width:t.x*t.percenta*t.coefficient+"px",height:t.y*t.percenta*t.coefficient+"px"}},[t._l(t.nowRoomsData,function(e,i){return o("el-tooltip",{key:i,attrs:{content:e.roomName,placement:"top"}},[o("div",{staticClass:"room-whole",style:t.getRoomStyle(e,e.type,e.rightx,e.leftx,e.righty,e.lefty,e.active),attrs:{id:e.roomId},on:{click:function(o){return t.selectRoom(e.roomId,e.active)}}},[t._l(t.inRoomEnclosure,function(i,n){return o("div",{directives:[{name:"show",rawName:"v-show",value:e.roomId===i.roomidlist[0],expression:"item.roomId===inRoomEnclosureitem.roomidlist[0]"}],key:n,staticClass:"in-room-enclosure",style:t.getInRoomEnclosureStyle(i.xrighttmetre,i.xleftbmetre,i.yrighttmetre,i.yleftbmetre)})}),t._v(" "),o("div",{staticClass:"room-text"},[o("p",{staticClass:"room-name"},[t._v(t._s(e.roomName))]),t._v(" "),t.circularShow?t._e():o("div",{staticClass:"room-circular",style:{backgroundColor:e.peopleColor}})])],2)])}),t._v(" "),t._l(t.drewsinglePointPw,function(e,i){return o("circular",{directives:[{name:"show",rawName:"v-show",value:t.nowFloorId===e.floorid,expression:"nowFloorId===item.floorid"}],key:i+100,style:t.getSpotRailStyle(e.xleftbmetre,e.yleftbmetre)})}),t._v(" "),o("i",{staticClass:"iconfont iconbuhangxiaoren people-img",style:t.nowPeople})],2)])])},staticRenderFns:[]};var c=o("VU/8")(r,l,!1,function(t){o("BMkl")},"data-v-49991a26",null);e.a=c.exports},"37tQ":function(t,e,o){"use strict";e.a=class{constructor(t,e={}){this.quill=t,this.handleDrop=this.handleDrop.bind(this),this.handlePaste=this.handlePaste.bind(this),this.quill.root.addEventListener("drop",this.handleDrop,!1),this.quill.root.addEventListener("paste",this.handlePaste,!1)}handleDrop(t){if(t.preventDefault(),t.dataTransfer&&t.dataTransfer.files&&t.dataTransfer.files.length){if(document.caretRangeFromPoint){const e=document.getSelection(),o=document.caretRangeFromPoint(t.clientX,t.clientY);e&&o&&e.setBaseAndExtent(o.startContainer,o.startOffset,o.startContainer,o.startOffset)}this.readFiles(t.dataTransfer.files,this.insert.bind(this))}}handlePaste(t){t.clipboardData&&t.clipboardData.items&&t.clipboardData.items.length&&this.readFiles(t.clipboardData.items,t=>{this.quill.getSelection()||setTimeout(()=>this.insert(t),0)})}insert(t){const e=(this.quill.getSelection()||{}).index||this.quill.getLength();this.quill.insertEmbed(e,"image",t,"user")}readFiles(t,e){[].forEach.call(t,t=>{if(!t.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i))return;const o=new FileReader;o.onload=(t=>{e(t.target.result)});const i=t.getAsFile?t.getAsFile():t;i instanceof Blob&&o.readAsDataURL(i)})}}},BMkl:function(t,e){},OR5i:function(t,e){}});
//# sourceMappingURL=0.b5be7b0f03184ac6d24b.js.map
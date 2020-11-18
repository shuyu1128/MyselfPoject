<template>
  <div
    class="dmap"
    style="background-color: #1e2b40; padding-top: 30px;padding-left: 30px;padding-right: 30px;padding-bottom: 30px"
  >
    <!-- 侧边抽屉 -->
    <div class="button_left" @click="opendrawer">
      <i class="fa fa-angle-double-left fa-2x"></i>
    </div>
    <el-drawer
      @close="drawersize = '64%'"
      style="position: absolute"
      :visible.sync="drawer"
      :size="drawersize"
    >
      <h3 slot="title">全体人员健康检测</h3>
      <allPeopleHealthy v-if="drawer" @openScreen="drawersizefun" />
    </el-drawer>

    <div class="in-room">
      <li v-for="(item,index) in roompeople" :key="index">
        <div>
          <em></em>
          <p style="font-weight: 200;margin-bottom: 13px;margin-left: 2.5rem;">{{item.name}}</p>
          <p>{{item.num}}</p>
        </div>
        <div>
          <p class="btn1" v-if="item.state=='危机'">{{item.state}}</p>
          <p class="btn" v-else>{{item.state}}</p>
          <p style="cursor:pointer;" @click="xaingqing(item.id)">查看详情>></p>
        </div>
      </li>
    </div>
    <button class="gotomonitor" @click="enlarge">院内综合数据展示</button>
    <button class="gohome" @click="gohome">返回主页</button>
    <div class="shichuang">
      <div class="kaiguanfangda">
        <el-progress :percentage="percentage"></el-progress>
        <div style="margin-top:10px;margin-right:30px;float:right">
          <el-button-group>
            <el-button icon="el-icon-minus" size="mini" @click="decrease"></el-button>
            <el-button icon="el-icon-plus" size="mini" @click="increase"></el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="fuwei"></el-button>
          </el-button-group>
        </div>
      </div>

      <div class="kaiguan">
        <div style="margin-bottom:10px">
          <span style="color:#fff;margin-right:10px">显示人员位置</span>
          <el-switch v-model="circularShow" active-color="#0ea5a0" inactive-color="#ff4949"></el-switch>
        </div>
        <div>
          <span style="color:#fff;margin-right:10px">显示基站位置</span>
          <el-switch v-model="stationShow" active-color="#0ea5a0" inactive-color="#ff4949"></el-switch>
        </div>
      </div>
      <div
        v-drag
        class="plan"
        :style="{width:x*percenta*coefficient+'px',height:y*percenta*coefficient+'px'}"
      >
        <div
          class="room"
          v-for="(item,index) in nowRoomsData"
          :key="index"
          :id="item.roomId"
          :style="{background:item.type=='私人区域'?'radial-gradient(circle, #183c59, #18657f)':(item.type=='公共区域'?'radial-gradient(circle, #1a494e, #1d6d6e)':(item.type=='高危区域'?'radial-gradient(circle, #513841, #883652)':(item.type=='移动区域'?'radial-gradient(circle, #ae5b1b, #65462f)':'radial-gradient(circle, #ae5b1b, #65462f)'))),border:item.type=='私人区域'?'1px solid #05d2d5':(item.type=='公共区域'?'1px solid #1ba999':(item.type=='高危区域'?'1px solid #f4464a':(item.type=='移动区域'?'1px solid #c36218':'1px solid #c36218'))),width:(item.rightx*percenta-item.leftx*percenta)*coefficient+'px',height:(item.righty*percenta-item.lefty*percenta)*coefficient+'px',left:item.leftx*percenta*coefficient+'px',bottom:item.lefty*percenta*coefficient+'px'}"
          @click="roombao(item.peopleArr?item.peopleArr:[])"
        >
          <p style="color: #f3efef;font-size:16px;">{{item.roomName}}</p>
          <p
            style="color: #f3efef;font-size:16px;margin-top:10px;"
          >{{item.peopleArr?item.peopleArr.length:0}}人</p>
          <!-- <li style="color:#fff;margin-top:50px;font-size:22px">0人</li> -->

          <i
            v-if="!circularShow"
            class="fa fa-circle circular-sty"
            :style="{color:item.peopleColor}"
          ></i>
        </div>

        <div v-if="circularShow">
          <div
            v-for="(item,index) in allPeoplesData"
            :key="index+1000"
            class="peopletu"
            @click="inroomdan(item)"
            :style="{color:item.state=='危机'?'#F56C6C':'#67C23A',left:(item.x)*percenta*coefficient+'px',bottom:(item.y)*percenta*coefficient+'px'}"
          >
            <span
              class="peopletuname"
              :style="{color:item.state=='危机'?'#F56C6C':'#67C23A',fontSize:12+'px',top:-20+'px',left:-24+'px',width:66+'px'}"
            >{{item.name}}</span>
            <i
              class="iconfont iconbuhangxiaoren"
              :style="{color:item.state=='危机'?'#F56C6C':'#67C23A',fontSize:25*percenta+'px'}"
            ></i>
          </div>
        </div>
        <div v-if="stationShow">
          <div
            v-for="item in nowStation"
            :key="item.id"
            class="peopletu"
            @click="inroomdan(item)"
            :style="{color:'#409EFF',left:(item.xmetre)*percenta*coefficient+'px',bottom:(item.ymetre)*percenta*coefficient+'px'}"
          >
            <span
              class="peopletuname"
              :style="{fontSize:12+'px',top:-20+'px',left:-24+'px',width:66+'px'}"
            >{{item.code}}</span>
            <i class="iconfont iconjizhan" :style="{fontSize:25*percenta+'px'}"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="special_pos">
      <special />
    </div>
    <div class="floor_d">
      <el-popover
        v-for="(item,index) in allBuildsData"
        :key="index"
        placement="top-start"
        :title="item.buildname"
        trigger="hover"
        :content="item.floorName"
      >
        <li
          :class="nowFloorId==item.floorId?'dactlil':'dlil'"
          slot="reference"
          @click="changeRoom(item.roomqing,item.X,item.Y,item.floorId)"
        >
          <span
            class="buildnamewidth"
            style="color:#01aedd;font-size: 20px;width: 78px;display: inline-block;"
          >{{item.buildname}}</span>
          <span
            class="floornamewidth"
            style="color:#fff;font-size: 12px;width: 36px;display: inline-block;position: relative;top: 3px;"
          >{{item.floorName}}</span>
        </li>
      </el-popover>
    </div>
  </div>
</template>
<script>
import allPeopleHealthy from "../allPeopleHealthy.vue";
import special from "./Special.vue";
import { mapState } from "vuex";
export default {
  components: {
    special,
    allPeopleHealthy,
  },
  data() {
    return {
      stationShow: false,
      allStation: [],
      nowStation: [],
      // 楼层系数
      coefficient: 1,
      dpeople: [],
      // 抽屉显示状态
      peoplelength: [],
      drawersize: "64%",
      drawer: false,
      // 定位图状态
      percentage: 0,
      percenta: 1,
      circularShow: true,
      people: [],
      room: [],
      x: "",
      y: "",
      allfloor: [],
      floorid: "",
      zhendata: [],
      roompeople: [
        { name: "---", num: "---", state: "---" },
        { name: "---", num: "---", state: "---" },
        { name: "---", num: "---", state: "---" },
        { name: "---", num: "---", state: "---" },
        { name: "---", num: "---", state: "---" },
        { name: "---", num: "---", state: "---" },
      ],
    };
  },
  computed: {
    ...mapState({
      // 全部人员信息
      allPeoplesData: (state) => state.websocket.allPeoplesData,
      // 当前楼层内房间信息
      nowRoomsData: (state) => state.websocket.nowRoomsData,
      // 全部建筑、楼层、房间信息
      allBuildsData: (state) => {
        let newarr = [];
        state.websocket.allBuildsData.forEach((element) => {
          element.loushu.forEach((ele) => {
            ele.buildname = element.buildName;
            newarr.push(ele);
          });
        });
        return newarr;
      },
      // 全部楼层信息
      allFloorsData: (state) => state.websocket.allFloorsData,
      // 当前选中楼层id
      nowFloorId: (state) => state.websocket.nowFloorId,
    }),
  },
  watch: {
    nowFloorId(val) {
      this.nowStation = [];
      this.allStation.forEach((element) => {
        if (element.floorid == val) {
          this.nowStation.push(element);
        }
      });
      console.log(this.nowStation);
    },
    percentage(val) {
      if (val == 0) {
        this.percenta = 1;
      } else {
        this.percenta = val / 50 + 1;
      }
    },
  },
  created() {
    // 获取全部基站信息
    this.$ajax
      .post(
        process.env.API_HOST + "/basestation/getAllBasestation",
        `sousuo=${JSON.stringify({
          code: "",
          name: "",
        })}&floorid=`
      )
      .then((respones) => {
        this.allStation = respones.data;
        this.allStation.forEach((element) => {
          if (element.floorid == this.nowFloorId) {
            this.nowStation.push(element);
          }
        });
      });

    this.$store.commit("changeNowpath", "dmap");
    this.$store.dispatch("startSocoket");
    // 获取所有房间信息
    this.allBuildsData.forEach((element) => {
      if (element.floorId == this.nowFloorId) {
        this.x = element.X;
        this.y = element.Y;
        this.getCoefficient(element.X, element.Y);
      }
    });
  },
  destroyed() {
    this.$store.commit("closeSocket");
  },
  beforeRouteLeave(to, form, next) {
    if (to.path !== "/newmonitor") {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      next();
    } else {
      next();
    }
  },

  directives: {
    drag(el, bindings) {
      el.onmousedown = function (e) {
        var disx = e.pageX - el.offsetLeft;
        var disy = e.pageY - el.offsetTop;
        document.onmousemove = function (e) {
          el.style.left = e.pageX - disx + "px";
          el.style.top = e.pageY - disy + "px";
        };
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
        };
      };
    },
  },
  methods: {
    // 求系数
    getCoefficient(x, y) {
      if (1316 / x > 850 / y) {
        this.coefficient = 850 / y;
      } else {
        this.coefficient = 1316 / x;
      }
    },

    gohome() {
      this.$router.push("/index");
    },
    opendrawer() {
      window.scrollTo(0, 0);
      this.$ajax
        .post(process.env.API_HOST + "/mainPage/getAttentionNum")
        .then((respones) => {
          this.peoplelength = respones.data;
        });
      this.drawer = true;
    },
    drawersizefun() {
      this.drawersize = "100%";
    },
    // 切换楼层
    changeRoom(room, x, y, floorId) {
      this.getCoefficient(x, y);
      this.x = x;
      this.y = y;
      this.$store.commit("updataNowRoomsData", room);
      this.$store.commit("updataFloorId", floorId);
    },
    fuwei() {
      let windosass = document.querySelector(".plan");
      windosass.style.left = "50%";
      windosass.style.top = "50%";
      this.percenta = 1;
      this.percentage = 0;
    },
    increase() {
      let dom = document.querySelector(".plan");
      dom.style.left = "50%";
      dom.style.left = "50%";
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      let dom = document.querySelector(".plan");
      dom.style.left = "50%";
      dom.style.left = "50%";
      this.percentage -= 10;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    },
    inroomdan(data) {
      // 建立临时数组
      var linshidata = [];
      linshidata.push(data);
      // 赋值给房间内的人数
      this.roompeople = linshidata;
      for (let i = 0; i < 5; i++) {
        this.roompeople.push({ name: "---", num: "---", state: "---" });
      }
    },
    xaingqing(val) {
      if (val != undefined) {
        this.$router.push({
          path: "/Detailsx:id",
          name: "详情",
          query: { id: val },
        });
      }
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://" + process.env.ws_host + "//maxwebsocket";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },

    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      this.room.forEach((element) => {
        element.personNum = 0;
      });
      this.room.forEach((element) => {
        redata.roomStateList.forEach((ele) => {
          if (element.roomId == ele.roomid) {
            element.personNum = ele.personNum;
          }
        });
      });
      this.zhendata = redata.personObj.loushu;

      this.zhendata.forEach((element) => {
        if (element.floorId == this.floorid) {
          this.people = element.persons;
        }
      });

      // this.room.forEach(element => {
      //   element.people=[]
      // });
      // var peoplearr = [];
      // for (var k = 0; k < this.room.length; k++) {
      //   this.room[k].people = [];
      //   peoplearr = [];
      //   this.dpeople = [];
      //   for (var i = 0; i < this.people.length; i++) {
      //     if (this.people[i].calculationBaseStationNum == "1") {
      //       if (this.room[k].roomId == this.people[i].roomid) {
      //         peoplearr.push(this.people[i]);
      //         if (i == this.people.length - 1) {
      //           this.room[k].people = peoplearr;
      //         }
      //       }
      //     } else {
      //       this.dpeople.push(this.people[i]);
      //     }
      //   }
      // }

      // this.dpeople.forEach(element => {
      //   let nowx = element.x;
      //   let nowy = element.x;
      //   let rwidth =
      //     (element.roomRightXPixel - element.roomLeftXPixel) *
      //     element.maxProportion;
      //   let brwidth =
      //     element.roomRightXPixel * element.maxProportion - rwidth / 2;
      //   let rheight =
      //     (element.roomRightYPixel - element.roomLeftYPixel) *
      //     element.maxProportion;
      //   let bheight =
      //     element.roomRightYPixel * element.maxProportion - rheight / 2;
      //   if (nowx <= brwidth && nowy >= bheight) {
      //     element.x = element.x + 25;
      //     element.y = element.y - 25;
      //   } else if (nowx <= brwidth && nowy < bheight) {
      //     element.x = element.x + 25;
      //     element.y = element.y + 25;
      //   } else if (nowx > brwidth && nowy >= bheight) {
      //     element.x = element.x - 25;
      //     element.y = element.y - 25;
      //   } else if (nowx > brwidth && nowy < bheight) {
      //     element.x = element.x - 25;
      //     element.y = element.y + 25;
      //   }
      // });
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {},
    // 查询房间内的人员
    roombao(data) {
      if (data.length === 0) {
        this.roompeople = [
          { name: "---", num: "---", state: "---" },
          { name: "---", num: "---", state: "---" },
          { name: "---", num: "---", state: "---" },
          { name: "---", num: "---", state: "---" },
          { name: "---", num: "---", state: "---" },
          { name: "---", num: "---", state: "---" },
        ];
      } else {
        if (data.length < 6) {
          this.roompeople = JSON.parse(JSON.stringify(data));
          for (let i = 0; i < 6 - data.length; i++) {
            this.roompeople.push({ name: "---", num: "---", state: "---" });
          }
        } else {
          this.roompeople = data;
        }
      }
    },
    enlarge() {
      this.$router.push("/newmonitor");
    },
  },
};
</script>
<style>
.dmap .special {
  border: 1px solid #0f8295;
}

.dmap .el-avatar,
.el-drawer {
  overflow: visible;
}
</style>
<style scoped>
.circular-sty {
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.buildnamewidth {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.floornamewidth {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.allpeoplehealthy {
  height: 800px;
  padding-left: 45px;
  padding-top: 32px;
  overflow-y: auto;
  background: #f0f2f5;
}
.allpeoplehealthy_box {
  float: left;
  margin-bottom: 12px;
  margin-right: 32px;
}
@media screen and (height: 1080px) {
  .allpeoplehealthy {
    height: 950px;
    padding-top: 20px;
    padding-left: 45px;
    overflow-y: auto;
  }
}
.button_left {
  position: fixed;
  width: 40px;
  height: 50px;
  background-color: #ffffff;
  color: #72767b;
  text-align: center;
  line-height: 50px;
  border-radius: 8px 0 0 8px;
  font-size: 23px;
  right: 0;
  top: 50%;
  z-index: 2;
}
.button_left_N {
  font-size: 23px;
  position: absolute;
  width: 40px;
  height: 50px;
  background-color: #ffffff;
  color: #72767b;
  text-align: center;
  line-height: 50px;
  border-radius: 8px 0 0 8px;
  left: -40px;
  top: 50%;
  z-index: 2078;
}
.gotomonitor {
  font-weight: 500;
  font-size: 14px;
  position: absolute;
  top: 30px;
  right: 46px;
  width: 92px;
  height: 100px;
  border: none;
  border-radius: 4px;
  text-align: center;
  line-height: 28px;
  color: rgb(1, 174, 221);
  background-color: #0c1019;
  padding: 10px 14px;
}
.gohome {
  font-weight: 500;
  font-size: 14px;
  position: absolute;
  top: 30px;
  right: 164px;
  width: 92px;
  height: 100px;
  border: none;
  border-radius: 4px;
  text-align: center;
  line-height: 28px;
  color: rgb(1, 174, 221);
  background-color: #0c1019;
  padding: 10px 6px;
}
/* .dmap special{
    border: 1px solid #0f8295;
} */
.peopletuname {
  position: absolute;
  text-align: center;
  top: -21px;
  left: 5px;
  width: 40px;
}
.kaiguan {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}
.kaiguanfangda {
  position: absolute;
  width: 292px;
  top: 10px;
  right: 0px;
  z-index: 1;
}
.dmap {
  height: 1020px;
  background-color: red;
}
.shichuang {
  overflow: hidden;
  position: absolute;
  width: 1316px;
  height: 850px;
  border: 1px solid #0f8295;
  border-radius: 4px;
  margin-top: 50px;
  /* background-color: red; */
  left: 48px;
  /* bottom: 480px; */
}
.special_pos {
  position: absolute;
  top: 180px;
  right: 48px;
}
.floor_d {
  width: 462px;
  height: 187px;
  background-color: #1c2a3a;
  position: absolute;
  padding-left: 12px;
  padding-top: 12px;
  right: 48px;
  top: 831px;
  overflow-y: auto;
  border: 1px solid #0f8295;
}
.floor_d::-webkit-scrollbar {
  display: none;
}
.dlil {
  width: 118px;
  height: 48px;
  float: left;
  border-radius: 4px;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 12px;
  margin-right: 12px;
  line-height: 48px;
  background-color: #0c1019;
}
.dactlil {
  width: 118px;
  height: 48px;
  float: left;
  border-radius: 4px;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 12px;
  margin-right: 12px;
  line-height: 48px;
  background-color: #1bcbb4;
}
.peopletu {
  position: absolute;
  /* top: 20px; */
  color: #409eff;

  z-index: 1;
}
.plan {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.room {
  position: absolute;
  border: 1px solid #06d4d8;
  border-radius: 4px;
  background: radial-gradient(circle, #183c59, #18657f);
  text-align: center;
  overflow: hidden;
}
.num {
  position: absolute;
  bottom: 10px;
  left: 50%;
  color: #fff;
  transform: translate(-50%, 0);
}
.in-room {
  text-align: center;
  height: 6.25rem;
  overflow-y: scroll;
  margin-left: 16px;
  /* margin-bottom: 15px; */
  width: 1556px;
}
.in-room::-webkit-scrollbar {
  /* width:0.0625rem; */
  height: 6.25rem;
}
.in-room li {
  width: 246px;
  height: 4.6875rem;
  float: left;
  background-color: #0c151c;
  border-left: 0.0625rem dashed #4b545b;
  padding-top: 1.5625rem;
}
.in-room li:first-of-type {
  border-left: none;
}
.in-room li > div {
  float: left;
  width: 7.6875rem;
  color: #fff;
  font-size: 14px;
  position: relative;
}

.in-room li > div:first-of-type > em {
  display: block;
  position: relative;
  width: 1.1875rem;
  height: 1.25rem;
  background-image: url(../../../assets/6.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: -0.0625rem;
  left: 2.125rem;
}
.btn {
  margin-bottom: 12px;
  position: relative;
  left: 18px;
  width: 78px;
  height: 22px;
  font-size: 14px;
  background-color: #097594;
  border-radius: 12px;
  border: 1px solid #00cbff;
  text-align: center;
  line-height: 20px;
}
.btn1 {
  margin-bottom: 12px;
  position: relative;
  left: 18px;
  width: 78px;
  height: 22px;
  font-size: 14px;
  background-color: #9a363d;
  border-radius: 12px;
  border: 1px solid #f4464a;
  text-align: center;
  line-height: 20px;
}
</style>

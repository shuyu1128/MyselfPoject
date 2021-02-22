<template>
  <div class="map">
    <div class="kaiguanfangda">
      <div style="width:180px;float:left;margin-top:10px">
        <el-progress :stroke-width="28" :text-inside="true" :percentage="percentage"></el-progress>
      </div>
      <div style="margin-top:10px;margin-right:30px;float:right">
        <el-button-group>
          <el-button icon="el-icon-minus" size="mini" @click="decrease"></el-button>
          <el-button icon="el-icon-plus" size="mini" @click="increase"></el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="fuwei"></el-button>
        </el-button-group>
      </div>
    </div>
    <div class="buildandfloor">
      <div class="fir" v-for="(build,bindex) in allBuildsData" :key="bindex">
        <div
          v-for="(item,index) in build.loushu"
          :key="index"
          :id="item.floorId"
          :class="item.floorId==nowFloorId?'activity-lil':'lil'"
          @click="changeRoom(item.roomqing,item.X,item.Y,item.floorId)"
        >
          <li class="lil-top">
            <b style="color:#03b2e1;font-size:1.375rem">{{build.buildName}}</b>
          </li>
          <li class="lil-bottom">
            <b style="font-size:16px">{{item.floorName}}</b>
          </li>
        </div>
      </div>
    </div>
    <!-- 可视窗口 -->
    <div class="window">
      <!-- 楼层范围 -->
      <div
        class="plan"
        v-drag
        :style="{width:x*percenta*coefficient+'px',height:y*percenta*coefficient+'px'}"
      >
        <!-- 房间范围 -->
        <el-tooltip
          v-for="(item,index) in nowRoomsData"
          :key="index"
          :content="item.roomName"
          placement="top"
        >
          <div
            class="room-whole"
            :id="item.roomId"
            :style="{boxSizing: 'border-box',background:item.type=='私人区域'?'radial-gradient(circle, #183c59, #18657f)':(item.type=='公共区域'?'radial-gradient(circle, #1a494e, #1d6d6e)':(item.type=='高危区域'?'radial-gradient(circle, #513841, #883652)':(item.type=='移动区域'?'radial-gradient(circle, #ae5b1b, #ae5b1b)':'radial-gradient(circle, #122742, #1053ad)'))),border:item.type=='私人区域'?'1px solid #05d2d5':(item.type=='公共区域'?'1px solid #1ba999':(item.type=='高危区域'?'1px solid #f4464a':(item.type=='移动区域'?'1px solid #ae5b1b':'1px solid #1053ad'))),borderRadius:item.type=='移动区域'?0+'px':4+'px',width:(item.rightx*percenta-item.leftx*percenta)*coefficient+'px',height:(item.righty*percenta-item.lefty*percenta)*coefficient+'px',left:item.leftx*percenta*coefficient+'px',bottom:item.lefty*percenta*coefficient+'px'}"
          >
            <div class="room-text">
              <p class="room-name">{{item.roomName}}</p>
              <div
                v-if="!circularShow"
                class="room-circular"
                :style="{backgroundColor:item.peopleColor}"
              ></div>
            </div>
          </div>
        </el-tooltip>
        <!-- 电子围栏范围 -->
        <el-tooltip
          v-for="(item,index) in drewRailList"
          :key="index+1000"
          :content="getContentStyle(item.type, item.railname)"
          placement="top"
        >
          <div
            v-if="item.type!='6'&&item.type!='7'"
            class="fence-whole"
            :style="getRailStyle(item.xrighttmetre,item.xleftbmetre,item.yrighttmetre,item.yleftbmetre)"
          ></div>
          <circular :style="getSpotRailStyle(item.xleftbmetre,item.yleftbmetre)" v-else />
        </el-tooltip>
        <!-- 人员范围 -->
        <i class="iconfont iconbuhangxiaoren people-img" :style="nowPeople"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import peopleImg from "../../assets/peopleico.png";
import circular from "../../components/circular.vue";
export default {
  components: {
    circular,
  },
  data() {
    return {
      // 系数
      coefficient: 1,
      pelplectxImg: null,
      percentage: 0,
      percenta: 1,
      circularShow: true,
      floorRoll: false,
      // 定时器容器
      timer: "",
      // 所有楼层组
      floorgrop: [],
      zongq: "",
      room: "",
      peoplefloor: [],
      people: [],
      x: 0,
      y: 0,
      floorid: "",
      // 轮播楼层的系数
      loui: 1,
    };
  },
  props: {
    did: null,
    fufloorid: null,
  },

  computed: {
    // 人员样式数据
    nowPeople() {
      let obj = { color: "transparent" };
      let arr = this.$store.state.websocket.allSocketData;
      for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr[i].persons.length; k++) {
          if (arr[i].persons[k].id == this.did) {
            this.onlyIdchange(arr[i].floorId);
            obj = {
              fontSize: 12 * this.percenta + "px",
              color: arr[i].persons[k].state == "危机" ? "#F56C6C" : "#67C23A",
              left:
                arr[i].persons[k].x * this.percenta * this.coefficient + "px",
              bottom:
                arr[i].persons[k].y * this.percenta * this.coefficient + "px",
            };
            break;
          }
        }
      }
      return obj;
    },
    ...mapState({
      // 将要绘制的电子围栏
      drewRailList: (state) => state.fance.drewRailList,
      // 当前楼层内房间信息
      nowRoomsData: (state) => state.websocket.nowRoomsData,
      // 全部建筑、楼层、房间信息
      allBuildsData: (state) => state.websocket.allBuildsData,
      // 当前选中楼层id
      nowFloorId: (state) => state.websocket.nowFloorId,
    }),
  },
  watch: {
    fufloorid(val) {
      this.onlyIdchange(val);
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
    this.$store.dispatch("mainPage_getFloorAndRoomJson").then((data) => {
      this.getCoefficient(data[0].loushu[0].X, data[0].loushu[0].Y);
      this.x = data[0].loushu[0].X;
      this.y = data[0].loushu[0].Y;
      this.$store.commit("updataFloorId", data[0].loushu[0].floorId);
      if (this.did !== undefined) {
        if (this.$store.state.fance.selectRailGroup.length === 0) {
          // 清空默认电子围栏
          this.$store.commit("updataDrewRailList", []);
        } else {
          // 获取选中组下电子围栏
          this.$store.dispatch(
            "rail_getRailListByGroupIds",
            this.$store.state.fance.selectRailGroup
          );
        }
      }
    });
  },
  mounted() {},
  destroyed() {
    clearInterval(this.timer);
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
    // 普通电子围栏样式
    getRailStyle(xrighttmetre, xleftbmetre, yrighttmetre, yleftbmetre) {
      let obj = {
        width:
          (xrighttmetre - xleftbmetre) * this.percenta * this.coefficient +
          "px",
        height:
          (yrighttmetre - yleftbmetre) * this.percenta * this.coefficient +
          "px",
        left: xleftbmetre * this.percenta * this.coefficient + "px",
        bottom: yleftbmetre * this.percenta * this.coefficient + "px",
      };
      return obj;
    },
    // 单点电子围栏样式
    getSpotRailStyle(xleftbmetre, yleftbmetre) {
      let obj = {
        left: xleftbmetre * this.percenta * this.coefficient + "px",
        bottom: yleftbmetre * this.percenta * this.coefficient + "px",
      };
      return obj;
    },
    getContentStyle(type, railname) {
      let str = type.toString();
      switch (str) {
        case "1":
          str = "禁入：" + railname;
          return str;
        case "2":
          str = "计时禁入：" + railname;
          return str;
        case "3":
          str = "禁出：" + railname;
          return str;
        case "4":
          str = "预警：" + railname;
          return str;
        case "5":
          str = "分时段禁入：" + railname;
          return str;
        case "6":
          str = "单点禁入：" + railname;
          return str;
        case "7":
          str = "单点禁出：" + railname;
          return str;
      }
    },
    // 求系数
    getCoefficient(x, y) {
      if (766 / x > 359 / y) {
        this.coefficient = 359 / y;
      } else {
        this.coefficient = 766 / x;
      }
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
    changeRoom(room, x, y, floorid) {
      this.getCoefficient(x, y);
      this.x = x;
      this.y = y;
      this.$store.commit("updataFloorId", floorid);
      this.$store.commit("updataNowRoomsData", room);
      // 更新不同楼层电子围栏
      if (this.did !== undefined) {
        if (this.$store.state.fance.selectRailGroup.length === 0) {
          // 清空默认电子围栏
          this.$store.commit("updataDrewRailList", []);
        } else {
          // 获取选中组下电子围栏
          this.$store.dispatch(
            "rail_getRailListByGroupIds",
            this.$store.state.fance.selectRailGroup
          );
        }
      } else {
        // 电子围栏配置中提前选中切换楼层无法绘制
        this.$store.state.fance.selectRailids.length === 0
          ? this.$store.commit("updataDrewRailList", [])
          : this.$store.dispatch(
              "rail_getRailDrawing",
              this.$store.state.fance.selectRailids
            );
      }
    },
    // 只有floorid切换楼层
    onlyIdchange(floorid) {
      this.$store.commit("updataFloorId", floorid);
      let arr = this.allBuildsData;
      for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr[i].loushu.length; k++) {
          if (arr[i].loushu[k].floorId == floorid) {
            this.x = arr[i].loushu[k].X;
            this.y = arr[i].loushu[k].Y;
            this.getCoefficient(arr[i].loushu[k].X, arr[i].loushu[k].Y);
            this.$store.commit("updataNowRoomsData", arr[i].loushu[k].roomqing);
            break;
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.people-img {
  position: absolute;
  /* width: 16px;
  height: 25px; */
  /* background-image: url(../../../assets/peopleico.png);
  background-repeat: no-repeat;
  background-size: 100% 100%; */
  z-index: 9;
}
.window {
  overflow: hidden;
  position: absolute;
  width: 766px;
  height: 359px;
  border: 1px solid #0f8295;
  border-radius: 4px;
  /* background-color: red; */
  left: 170px;
  bottom: 38px;
}
.fence-whole {
  position: absolute;
  bottom: 0;
  width: 50px;
  height: 80px;
  border: 1px solid #f56c6c;
  background-color: rgba(245, 108, 108, 0.3);
  border-radius: 4px;
}
.room-whole {
  position: absolute;
  border: 1px solid #06d4d8;
  border-radius: 4px;
  background: radial-gradient(circle, #183c59, #18657f);
  text-align: center;
  overflow: visible;
}
.room-text {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.room-name {
  color: rgb(243, 239, 239);
  font-size: 12px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.room-circular {
  width: 12px;
  height: 12px;
  position: absolute;
  border-radius: 50%;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background: radial-gradient(circle, red, #f56c6c); */
}
.people-img {
  position: absolute;
  /* width: 16px;
  height: 25px; */
  /* background-image: url(../../../assets/peopleico.png);
  background-repeat: no-repeat;
  background-size: 100% 100%; */
  z-index: 9;
}
.people-name {
  position: absolute;
  top: -8px;
  left: -10px;
  width: 40px;
  text-align: center;
}

.kaiguanfangda {
  position: absolute;
  width: 345px;
  top: 8px;
  left: 607px;
}
.buildandfloor {
  height: 492px;
  overflow-y: auto;
}
.buildandfloor::-webkit-scrollbar {
  display: none;
}

.buildandfloor .lil {
  display: block;
  width: 135px;
  height: 72px;
  padding-top: 13px;
  color: #ffffff;
  background-color: #0c1019;
  position: relative;
}
.buildandfloor .activity-lil {
  display: block;
  width: 135px;
  height: 72px;
  padding-top: 13px;
  color: #ffffff;
  background-color: #1bcbb4;
  position: relative;
}
.lil-top,
.lil-bottom {
  padding: 0 16px;
}
.lil-top {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lil-top:hover {
  overflow: visible;
}
.lil-bottom b:first-of-type {
  display: inline-block;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.lil-bottom b:first-of-type:hover {
  overflow: visible;
}

.plan {
  position: absolute;
  width: 761px;
  height: 300px;
  left: 50%;
  top: 50%;
  /* transform:rotateX(45deg) translate(-50%, -50%); */
  /* perspective: 500px;  */
  transform: translate(-50%, -50%);
}
</style>

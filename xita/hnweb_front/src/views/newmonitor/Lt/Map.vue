<template>
  <div class="map" style="position: relative;">
    <div class="kaiguan">
      <span style="color:#fff;margin-right:10px">显示人员位置</span>
      <el-switch v-model="circularShow" active-color="#0ea5a0" inactive-color="#ff4949"></el-switch>
    </div>
    <div class="kaiguanlou">
      <span style="color:#fff;margin-right:10px">控制楼层滚动</span>
      <el-switch
        v-model="floorRoll"
        active-color="#0ea5a0"
        inactive-color="#ff4949"
        @change="changeFloorRoll"
      ></el-switch>
    </div>
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
            <b style="font-size:16px" :id="item.floorId">{{item.peopleLength}}人</b>
          </li>
        </div>
      </div>
    </div>
    <div class="window">
      <div
        class="plan"
        v-drag
        :style="{width:x*percenta*coefficient+'px',height:y*percenta*coefficient+'px'}"
        @dblclick="enlarge"
      >
        <el-popover
          v-for="(item,index) in nowRoomsData"
          :key="index"
          placement="top-start"
          :title="item.roomName"
          trigger="hover"
          :content="'当前：'+(item.peopleArr?item.peopleArr.length:0)+'人'"
        >
          <div
            slot="reference"
            class="room-whole"
            :id="item.roomId"
            :style="{boxSizing: 'border-box',background:item.type=='私人区域'?'radial-gradient(circle, #183c59, #18657f)':(item.type=='公共区域'?'radial-gradient(circle, #1a494e, #1d6d6e)':(item.type=='高危区域'?'radial-gradient(circle, #513841, #883652)':(item.type=='移动区域'?'radial-gradient(circle, #ae5b1b, #ae5b1b)':'radial-gradient(circle, #122742, #1053ad)'))),border:item.type=='私人区域'?'1px solid #05d2d5':(item.type=='公共区域'?'1px solid #1ba999':(item.type=='高危区域'?'1px solid #f4464a':(item.type=='移动区域'?'1px solid #ae5b1b':'1px solid #1053ad'))),borderRadius:item.type=='移动区域'?0+'px':4+'px',width:(item.rightx*percenta-item.leftx*percenta)*coefficient+'px',height:(item.righty*percenta-item.lefty*percenta)*coefficient+'px',left:item.leftx*percenta*coefficient+'px',bottom:item.lefty*percenta*coefficient+'px'}"
            @click="roombao(item.peopleArr?item.peopleArr:[])"
          >
            <div class="room-text">
              <p class="room-name">{{item.roomName}}</p>
              <div
                v-if="!circularShow"
                class="room-circular"
                :style="{backgroundColor:item.peopleColor}"
              ></div>
              <li class="room-num">{{item.peopleArr?item.peopleArr.length:0}}人</li>
            </div>
          </div>
        </el-popover>
        <div class="allpeople-show" v-if="circularShow">
          <i
            v-for="(item,index) in allPeoplesData"
            :key="index.id"
            @click="inroomdan(item)"
            class="iconfont iconbuhangxiaoren people-img"
            :style="{fontSize:12*percenta+'px',color:item.state=='危机'?'#F56C6C':'#67C23A',left:(item.x)*percenta*coefficient+'px',bottom:item.y*percenta*coefficient+'px'}"
          ></i>
        </div>
      </div>
    </div>
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
  </div>
</template>
<script>
import { mapState } from "vuex";
import peopleImg from "../../../assets/peopleico.png";
export default {
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
      roompeople: [
        { name: "---", num: "---", state: "---" },
        { name: "---", num: "---", state: "---" },
        { name: "---", num: "---", state: "---" },
      ],
      x: 720,
      y: 300,
      // 轮播楼层的系数
      loui: 1,
    };
  },
  computed: {
    ...mapState({
      // 全部人员信息
      allPeoplesData: (state) => state.websocket.allPeoplesData,
      // 当前楼层内房间信息
      nowRoomsData: (state) => state.websocket.nowRoomsData,
      // 全部建筑、楼层、房间信息
      allBuildsData: (state) => state.websocket.allBuildsData,
      // 全部楼层信息
      allFloorsData: (state) => state.websocket.allFloorsData,
      // 当前选中楼层id
      nowFloorId: (state) => state.websocket.nowFloorId,
      // 全部楼层
      floorGroup: (state) => state.websocket.floorGroup,
    }),
  },

  created() {
    this.$store.dispatch("mainPage_getFloorAndRoomJson").then((data) => {
      this.getCoefficient(data[0].loushu[0].X, data[0].loushu[0].Y);
      this.x = data[0].loushu[0].X;
      this.y = data[0].loushu[0].Y;
      this.$store.commit("updataFloorId", data[0].loushu[0].floorId);
    });
  },
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
  watch: {
    percentage(val) {
      if (val == 0) {
        this.percenta = 1;
      } else {
        this.percenta = val / 50 + 1;
      }
    },
  },
  methods: {
    // 求系数
    getCoefficient(x, y) {
      if (766 / x > 359 / y) {
        this.coefficient = 359 / y;
      } else {
        this.coefficient = 766 / x;
      }
    },
    // 开启楼层滚动
    changeFloorRoll(data) {
      if (data) {
        var maps = document.querySelector(".buildandfloor");
        this.timer = setInterval(() => {
          maps.scrollTop = this.loui * 85;
          if (this.loui == this.floorGroup.length) {
            maps.scrollTop = 0;
            this.loui = 0;
          }
          this.changeRoom(
            this.floorGroup[this.loui].roomqing,
            this.floorGroup[this.loui].X,
            this.floorGroup[this.loui].Y,
            this.floorGroup[this.loui].floorId
          );
          this.loui++;
        }, 5000);
      } else {
        clearInterval(this.timer);
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
    inroomdan(data) {
      // 建立临时数组
      var linshidata = [];
      linshidata.push(data);
      // 赋值给房间内的人数
      this.roompeople = linshidata;
      for (let i = 0; i < 2; i++) {
        this.roompeople.push({ name: "---", num: "---", state: "---" });
      }
    },
    xaingqing(val) {
      // 点击查看详情跳转到详情页面
      if (val != undefined) {
        this.$router.push({
          path: "/Detailsx:id",
          name: "详情",
          query: { id: val },
        });
      }
    },
    roombao(data) {
      if (data.length === 0) {
        this.roompeople = [
          { name: "---", num: "---", state: "---" },
          { name: "---", num: "---", state: "---" },
          { name: "---", num: "---", state: "---" },
        ];
      } else {
        if (data.length < 3) {
          this.roompeople = JSON.parse(JSON.stringify(data));
          for (let i = 0; i < 3 - data.length; i++) {
            this.roompeople.push({ name: "---", num: "---", state: "---" });
          }
        } else {
          this.roompeople = data;
        }
      }
    },
    enlarge() {
      this.$router.push({
        path: "/dmap",
      });
    },
    changeRoom(room, x, y, floorid) {
      this.getCoefficient(x, y);
      this.x = x;
      this.y = y;
      this.$store.commit("updataNowRoomsData", room);
      this.$store.commit("updataFloorId", floorid);
    },
  },
};
</script>
<style scoped>
.map {
  height: 534px;
  width: 946px;
  margin-top: 6px;
  background-color: #1d283b;
  border-radius: 7px;
  padding-top: 10px;
  padding-left: 10px;
  background-image: url(../../../assets/5.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.window {
  overflow: hidden;
  position: absolute;
  width: 766px;
  height: 359px;
  border: 1px solid #0f8295;
  border-radius: 4px;
  left: 170px;
  bottom: 115px;
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
.room-num {
  color: #fff;
  margin-top: 10px;
  font-size: 12px;
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
.kaiguan {
  position: absolute;
  top: 34px;
  right: 647px;
}
.kaiguanlou {
  position: absolute;
  top: 7px;
  left: 172px;
}

.kaiguanfangda {
  position: absolute;
  width: 345px;
  top: 8px;
  left: 607px;
}
.buildandfloor {
  height: 526px;
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
.lil-top:hover{
  overflow: visible;
}
.lil-bottom b:first-of-type {
  display: inline-block;
  width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.lil-bottom b:first-of-type:hover {
  overflow: visible;
}
.lil-bottom b:last-of-type {
  float: right;
}

.plan {
  position: absolute;
  left: 50%;
  top: 50%;
  /* transform:rotateX(45deg) translate(-50%, -50%); */
  /* perspective: 500px;  */
  transform: translate(-50%, -50%);
}
.num {
  position: absolute;
  bottom: 2px;
  left: 50%;
  color: #fff;
  transform: translate(-50%, 0);
}

.in-room {
  text-align: center;
  height: 6.25rem;
  position: absolute;
  top: 436px;
  left: 10.625rem;
  overflow-y: scroll;
}
.in-room::-webkit-scrollbar {
  /* width:0.0625rem; */
  height: 6.25rem;
}
.in-room li {
  width: 15.375rem;
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

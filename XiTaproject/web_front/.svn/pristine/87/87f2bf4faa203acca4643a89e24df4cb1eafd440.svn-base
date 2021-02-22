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
    <div class="shuliang">
      <li style="font-size:0.875rem;text-align: center">
        <em
          style="display:block;position: relative;left:1.875rem;top:3.125rem; width: 0.125rem; height: 0.875rem; background-color: #a2a800;"
        ></em>
        长者数量
      </li>

      <div class="diyi" v-for="(build,bindex) in zongq" :key="bindex">
        <div
          v-for="(item,index) in build.loushu"
          :key="index"
          class="lil"
          @click="changeRoom($event,item.roomqing,item.X,item.Y,item.floorId)"
        >
          <b style="color:#03b2e1;font-size:1.375rem">{{build.buildName}}</b>
          <b style="font-size:16px">{{item.floorName}}</b>
        </div>
      </div>
    </div>

    <div class="shichuang">
      <div class="plan" v-drag :style="{width:x*percenta+'px',height:y*percenta+'px'}">
        <div
          class="room"
          v-for="(item,index) in room"
          :key="index"
          :style="{width:item.rightx*percenta-item.leftx*percenta+'px',height:item.righty*percenta-item.lefty*percenta+'px',left:item.leftx*percenta+'px',bottom:item.lefty*percenta+'px'}"
        >
          {{item.roomCode}}
          <i
            v-if="item.hasPerson=='true'"
            class="fa fa-circle"
            style="color:#c94655;font-size:16px;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"
          ></i>
          <div v-if="item.person=='true'" class="num" style="font-size:12px">
            <li style="color:#fff">{{item.personNum}}人</li>
            <i class="fa fa-circle" style="color:#fff;font-size:10px"></i>
          </div>
        </div>
        <div v-if="showmap">
          <div v-for="rail in zhenrail" :key="rail.id">
            <div
              class="rail"
              v-show="rail.type==1||rail.type==2||rail.type==2||rail.type==3||rail.type==4||rail.type==5"
              :style="{width:rail.xrighttmetre*percenta-rail.xleftbmetre*percenta+'px',height:rail.yrighttmetre*percenta-rail.yleftbmetre*percenta+'px',left:rail.xleftbmetre*percenta+'px',bottom:rail.yleftbmetre*percenta+'px'}"
            ></div>
            <div
              class="station_content"
              v-show="rail.type=='6'||rail.type=='7'"
              :style="{left:rail.xleftbmetre*percenta+'px',bottom:rail.yleftbmetre*percenta+'px'}"
            >
              <div>
                <p></p>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div v-for="rail in zhengouxuan" :key="rail.id">
          <div
            class="rail"
            v-show="rail.type==1||rail.type==2||rail.type==2||rail.type==3||rail.type==4||rail.type==5"
            :style="{width:rail.xrighttmetre*percenta-rail.xleftbmetre*percenta+'px',height:rail.yrighttmetre*percenta-rail.yleftbmetre*percenta+'px',left:rail.xleftbmetre*percenta+'px',bottom:rail.yleftbmetre*percenta+'px'}"
          ></div>
          <div
            class="station_content"
            v-show="rail.type=='6'||rail.type=='7'"
            :style="{left:rail.xleftbmetre*percenta+'px',bottom:rail.yleftbmetre*percenta+'px'}"
          >
            <div>
              <p></p>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      percentage: 0,
      percenta: 1,
      // 勾选的围栏
      gouxuan: [],
      zhengouxuan: [],
      zhenrail: [],
      input: "",
      zongq: "",
      room: "",
      rail: [],
      roompeople: [
        { name: "---", num: "---", state: "---" },
        { name: "---", num: "---", state: "---" },
        { name: "---", num: "---", state: "---" }
      ],
      x: 720,
      y: 300,
      floorid: "",
      jsonj: {
        railname: "",
        type: ""
      }
    };
  },
  props: {
    showmap: false,
    chdatas: null,
    circulardatas: null
  },
  created() {
    this.$ajax
      .post(process.env.API_HOST + "/mainPage/getFloorAndRoomJson")
      .then(respones => {
        this.zongq = respones.data;

        this.room = this.zongq[0].loushu[0].roomqing;
        this.x = this.zongq[0].loushu[0].X;
        this.y = this.zongq[0].loushu[0].Y;
        this.$store.state.floorwh = respones.data;
        this.floorid = this.zongq[0].loushu[0].floorId;
      });
  },
  directives: {
    drag(el, bindings) {
      el.onmousedown = function(e) {
        var disx = e.pageX - el.offsetLeft;
        var disy = e.pageY - el.offsetTop;
        document.onmousemove = function(e) {
          el.style.left = e.pageX - disx + "px";
          el.style.top = e.pageY - disy + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = document.onmouseup = null;
        };
      };
    }
  },
  watch: {
    percentage(val) {
      if (val == 0) {
        this.percenta = 1;
      } else {
        this.percenta = val / 10 + 1;
      }
    },
    chdatas(val) {
      // 画预览的电子围栏
      this.zhenrail = [];
      val.forEach(element => {
        if (element.floorid == this.floorid) {
          this.zhenrail.push(element);
        }
      });
    },
    selectfence(val) {
      // 画勾选的电子围栏
      this.$ajax
        .post(
          process.env.API_HOST + "/rail/getRailDrawing",
          `railids=${JSON.stringify(val)}`
        )
        .then(respones => {
          this.zhengouxuan = [];
          this.gouxuan = respones.data;
          if (respones.data != "") {
            this.gouxuan.forEach(element => {
              if (element.floorid == this.floorid) {
                this.zhengouxuan.push(element);
              }
            });
          }
        });
    }
  },
  computed: {
    selectfence() {
      // 选中的围栏
      return this.$store.state.fence;
    }
  },
  methods: {
    fuwei() {
      let windosass = document.querySelector(".plan");
      windosass.style.left = 0;
      windosass.style.top = 0;
      this.percenta = 1;
      this.percentage = 0;
    },
    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      this.percentage -= 10;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    },
    changeRoom(ev, room, x, y, floorid) {
      if (ev.target.tagName == "B") {
        var zitar = ev.target.parentNode;
      } else {
        var zitar = ev.target;
      }

      var wuc = document.getElementsByClassName("lil");
      // for (var k = 0; k < this.zongq.length; k++) {
      //   for (var i = 0; i < this.zongq[k].loushu.length; i++) {
      //     if (
      //       zitar.firstChild.innerHTML == this.zongq[k].loushu[i].floorCode
      //     ) {
      //       this.roomqing = this.zongq[k].loushu[i].roomqing;
      //     }
      //   }
      // }
      for (var t = 0; t < wuc.length; t++) {
        wuc[t].style.backgroundColor = "#121823";
      }
      zitar.style.backgroundColor = "#1bcbb4";
      this.room = room;
      this.x = x;
      this.y = y;
      this.floorid = floorid;

      this.zhenrail = [];
      this.chdatas.forEach(element => {
        if (element.floorid == this.floorid) {
          this.zhenrail.push(element);
        }
      });

      this.zhengouxuan = [];
      this.gouxuan.forEach(element => {
        if (element.floorid == this.floorid) {
          this.zhengouxuan.push(element);
        }
      });
      //
      // for (var i = 0; i < this.rail.length; i++) {
      //   if (this.rail[i].floorid == floorid) {
      //     this.zhenrail.push(this.rail[i]);
      //     console.log(this.rail[i]);
      //   }
      // }
    }
  }
};
</script>
<style scoped>
.station_content {
  position: absolute;
}
.station_content div {
  background: #009fd9;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: relative;
}
.station_content p {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: myfirst 5s infinite;
  box-shadow: 0px 0px 1px #009fd9;
}
.station_content span {
  position: absolute;
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: myfirst 5s infinite;
  box-shadow: 0px 0px 1px #009fd9;
  animation-delay: 0.5s;
}
@keyframes myfirst {
  20% {
    transform: scale(2);
  }
  40% {
    transform: scale(3);
  }
  60% {
    transform: scale(4);
  }
}
.shichuang {
  overflow: hidden;
  position: absolute;
  width: 766px;
  height: 359px;
  border: 1px solid #0f8295;
  border-radius: 4px;
  left: 170px;
  bottom: 28px;
}
.kaiguanfangda {
  position: absolute;
  width: 345px;
  top: 80px;
  left: 607px;
}
.rail {
  position: absolute;
  background: radial-gradient(circle, #4b151a, #9c3a42);
  border: 1px solid #e04348;
  opacity: 0.8;
}
.shuliang {
  height: 526px;
  overflow-y: auto;
}
.shuliang::-webkit-scrollbar {
  display: none;
}
.shuliang li {
  line-height: 5.3125rem;
  width: 8.4375rem;
  height: 5.3125rem;
  color: #ffffff;
  background-color: #0c1019;
}
.shuliang .lil {
  display: block;
  line-height: 5.3125rem;
  width: 8.4375rem;
  height: 5.3125rem;
  color: #ffffff;
  background-color: #0c1019;
}
.shuliang .diyi:first-of-type .lil:first-of-type {
  background-color: #1bcbb4;
}
.lil b:first-of-type {
  margin-left: 10px;
}
.lil b:last-of-type {
  /* margin-left: 12.8px; */
}
.plan {
  position: absolute;
  width: 761px;
  height: 300px;
}
.num {
  position: absolute;
  bottom: 2px;
  left: 50%;
  color: #fff;
  transform: translate(-50%, 0);
}
.room {
  position: absolute;
  border: 1px solid #06d4d8;
  border-radius: 4px;
  background: radial-gradient(circle, #183c59, #18657f);
  text-align: center;
  overflow: hidden;
}
.in-room {
  text-align: center;
  height: 6.25rem;
  position: absolute;
  top: 4.375rem;
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
  background-image: url(../../assets/6.png);
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

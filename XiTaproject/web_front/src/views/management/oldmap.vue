<template>
  <div class="map" style="position: relative;">
    <div v-if="fangdashow" class="kaiguanfangda">
      <el-progress :percentage="percentage"></el-progress>
      <div style="margin-top:10px;margin-right:30px;float:right">
        <el-button-group>
          <el-button icon="el-icon-minus" size="mini" @click="decrease"></el-button>
          <el-button icon="el-icon-plus" size="mini" @click="increase"></el-button>
        </el-button-group>
      </div>
    </div>
    <div class="time">{{nowtimedata.uploadedtime}}</div>
    <div class="shuliang">
      <li style="font-size:0.875rem;text-align: center">
        <em
          style="display:block;position: relative;left:1.875rem;top:3.125rem; width: 0.125rem; height: 0.875rem; background-color: #a2a800;"
        ></em>
        楼层展示
      </li>

      <div class="fir" v-for="(build,bindex) in zongq" :key="bindex">
        <el-tooltip
          v-for="(item,index) in build.loushu"
          :key="index"
          class="item"
          effect="dark"
          :content="build.buildName+item.floorName"
          placement="left-start"
        >
          <div :id="item.floorId===floorid?'active':'noactive'" class="lil">
            <b style="color:#03b2e1;font-size:22px">{{build.buildName}}</b>
            <b style="font-size:12px">{{item.floorName}}</b>
          </div>
        </el-tooltip>
      </div>
    </div>

    <div class="shichuang">
      <i class="iconfont iconbuhangxiaoren peopletu"></i>
      <div
        class="plan"
        id="jietu"
        :style="{width:x*percenta*coefficient+'px',height:y*percenta*coefficient+'px',left:planx+'px',bottom:plany+'px'}"
      >
        <div
          class="room"
          v-for="(item,index) in room"
          :key="index"
          :id="item.roomId"
          :style="{background:item.type=='私人区域'?'radial-gradient(circle, #183c59, #18657f)':(item.type=='公共区域'?'radial-gradient(circle, #1a494e, #1d6d6e)':(item.type=='高危区域'?'radial-gradient(circle, #513841, #883652)':(item.type=='移动区域'?'radial-gradient(circle, #ae5b1b, #65462f)':'radial-gradient(circle, #ae5b1b, #65462f)'))),border:item.type=='私人区域'?'1px solid #05d2d5':(item.type=='公共区域'?'1px solid #1ba999':(item.type=='高危区域'?'1px solid #f4464a':(item.type=='移动区域'?'1px solid #c36218':'1px solid #c36218'))),width:(item.rightx*percenta-item.leftx*percenta)*coefficient+'px',height:(item.righty*percenta-item.lefty*percenta)*coefficient+'px',left:item.leftx*percenta*coefficient+'px',bottom:item.lefty*percenta*coefficient+'px'}"
        >
          <span style="color: #f3efef;font-size:16px;">{{item.roomName}}</span>
        </div>

        <!-- <div :style="{width:x+'px',height:y+'px',zIndex:2019}"> -->
        <canvas id="mycanvas" :width="x*percenta*coefficient" :height="y*percenta*coefficient"></canvas>
        <!-- </div> -->
      </div>
    </div>

    <!-- 按钮组 -->
    <div style="position: absolute;top: 60px;right: 48px;">
      <el-tooltip class="item" v-if="playorno" effect="dark" content="播放" placement="top-start">
        <el-button @click="go" icon="fa fa-play" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" v-else effect="dark" content="暂停" placement="top-start">
        <el-button @click="stop" icon="fa fa-pause" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="快进" placement="top-start">
        <el-button @click="addspeed" icon="fa fa-fast-forward" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="截图" placement="top-start">
        <el-button
          @click="createPicture('轨迹回放'+nowtimedata.uploadedtime)"
          icon="iconfont iconjietu"
          circle
        ></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      coefficient:1,
      ii: 0,
      fangdashow: true,
      // 放大缩小相关
      planx: 384,
      plany: 180.5,
      percentage: 0,
      percenta: 1,
      // 放大缩小相关
      pagetime: "",
      canvas: "",
      context: "",
      // 移动速度
      speed: 1,
      // 人的临时数据
      nowtimedata: "",
      // 定时器
      settime: null,
      // 定时器参数
      timei: 1,
      // 暂停播放
      playorno: true,
      // 所有楼层组
      floorgrop: [],
      zongq: "",
      room: "",
      peoplefloor: [],
      people: [],
      roompeople: [
        { name: "---", num: "---", state: "---" },
        { name: "---", num: "---", state: "---" },
        { name: "---", num: "---", state: "---" }
      ],
      x: 720,
      y: 300,
      floorid: ""
    };
  },
  props: {
    timedata: null
  },
  created() {
    this.$ajax
      .post(process.env.API_HOST + "/mainPage/getFloorAndRoomJson")
      .then(respones => {

        this.zongq = respones.data;
        for (var i = 0; i < this.zongq.length; i++) {
          this.floorgrop = this.floorgrop.concat(this.zongq[i].loushu);
        }
        this.room = this.zongq[0].loushu[0].roomqing;
        this.getCoefficient(this.zongq[0].loushu[0].X,this.zongq[0].loushu[0].Y);
        this.x = this.zongq[0].loushu[0].X;
        this.y = this.zongq[0].loushu[0].Y;
        this.floorid = this.zongq[0].loushu[0].floorId;
      });
  },
  mounted() {
    this.canvas = document.getElementById("mycanvas");
    this.context = this.canvas.getContext("2d");
  },
  destroyed() {
    clearInterval(this.settime);
  },
  watch: {
    timedata(val) {
      // if (this.settime != null) {
      //   clearInterval(this.settime);
      //   this.timei = 1;
      //   this.speed = 5;
      //   this.playorno = true;
      // }
      // this.nowtimedata = val[0];
    },
    nowtimedata(val, oldval) {
      this.planx = 384 - val.xmetre * this.percenta*this.coefficient;
      this.plany = 180.5 - val.ymetre * this.percenta*this.coefficient;

      if (val.floorid != oldval.floorid) {
        this.changefloor(val.floorid);
        if (!this.playorno) {
          if (this.timedata[0].id !== val.id) {
            alert("即将跨越楼层，保存截图");
            this.createPicture(this.nowtimedata.uploadedtime);
          }
        }
      }
      // this.floorgrop.forEach(element => {
      //   if (val.floorid == element.floorId) {
      //     this.changeRoom(
      //       false,
      //       element.roomqing,
      //       element.X,
      //       element.Y,
      //       element.floorId
      //     );
      //   }
      // });
    },
    // 监听放大事件
    percentage(val) {
      if (val == 0) {
        this.percenta = 1;
      } else {
        this.percenta = val / 50 + 1;
      }
    }
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
    // 改变楼层
    changefloor(id) {
      this.floorgrop.forEach(element => {
        if (element.floorId === id) {
          this.room = element.roomqing;
          this.floorid = element.floorId;
          this.x = element.X;
          this.y = element.Y;
        }
      });
    },
    // 开始播放
    go() {
      this.fangdashow = false;
      if (this.timedata.length != 0) {
        this.playorno = false;
        this.godatachange(this.speed);
      } else {
        this.$message("请确定该时间段内目标人员是否存在数据！");
      }
    },
    // 暂停播放
    stop() {
      this.playorno = true;
      clearInterval(this.settime);
    },
    // 速度控制
    addspeed() {
      setTimeout(() => {
        if (!this.playorno) {
          if (this.speed >= 16) {
            this.speed = 1;
            this.godatachange(this.speed);
            this.$message("正常播放");
          } else {
            this.speed = this.speed * 2;
            this.godatachange(this.speed);
            this.$message("x" + this.speed + "播放");
          }
        } else {
          this.$message("请先播放！");
        }
      }, 1000);
    },
    // 定时画图
    godatachange(sudu) {
      clearInterval(this.settime);
      this.settime = setInterval(() => {
        if (this.ii >= this.timedata.length) {
          clearInterval(this.settime);
          this.$alert("播放已完成！", "提示", {
            confirmButtonText: "确定"
          });
        } else {
          this.nowtimedata = this.timedata[this.ii];
          if (this.ii != 0) {
            this.draw(this.timedata[this.ii - sudu], this.nowtimedata);
          }

          this.ii = this.ii + sudu;
        }
      }, 1000);
    },

    draw(old, now) {
      this.context.translate(0, this.y * this.percenta*this.coefficient);
      this.context.strokeStyle = "red";
      this.context.lineWidth = 3;
      this.context.moveTo(
        old.xmetre * this.percenta*this.coefficient,
        -old.ymetre * this.percenta*this.coefficient
      );
      this.context.lineTo(
        now.xmetre * this.percenta*this.coefficient,
        -now.ymetre * this.percenta*this.coefficient
      );
      this.context.stroke();
      this.context.translate(0, -this.y * this.percenta*this.coefficient);
    },
    // 放大事件
    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    // 缩小事件
    decrease() {
      this.percentage -= 10;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    },
    // 截图事件
    createPicture(name) {
      html2canvas(document.getElementById("jietu")).then(canvas => {
        this.imgmap = canvas.toDataURL();
        if (window.navigator.msSaveOrOpenBlob) {
          var bstr = atob(this.imgmap.split(",")[1]);
          var n = bstr.length;
          var u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          var blob = new Blob([u8arr]);
          // window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png')
          window.navigator.msSaveOrOpenBlob(
            blob,
            "chart-download" + "." + "png"
          );
        } else {
          // 这里就按照chrome等新版浏览器来处理
          const a = document.createElement("a");
          a.href = this.imgmap;
          a.setAttribute("download", name);
          a.click();
        }
      });
    }
  }
};
</script>

<style scoped>
.kaiguanfangda {
  position: absolute;
  width: 300px;
  top: 55px;
  left: 442px;
}
.shichuang {
  text-align: center;

  overflow: hidden;
  position: absolute;
  width: 766px;
  height: 359px;
  border: 1px solid #0f8295;
  border-radius: 4px;
  /* background-color: red; */
  left: 170px;
  bottom: 28px;
}
.time {
  width: 120px;
  height: 100px;
  position: absolute;
  color: #fff;
  left: 180px;
  top: 80px;
  font-size: 20px;
}
#mycanvas {
  position: relative;
  z-index: 10;
}
.map {
  height: 534px;
  width: 946px;
  margin-top: 6px;
  background-color: #1d283b;
  border-radius: 7px;
  padding-top: 10px;
  padding-left: 10px;
  background-image: url(../../assets/5.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.peopletu {
  line-height: 359px;
  position: absolute;
  color: #409eff;
  font-size: 20px;
  z-index: 2015;
}
.kaiguan {
  position: absolute;
  top: 23px;
  right: 48px;
}
.kaiguanlou {
  position: absolute;
  top: 23px;
  left: 172px;
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
  position: relative;
}
#active {
  background-color: #1bcbb4;
}
.lil b:first-of-type {
  margin-left: 8px;
  display: inline-block;
  width: 70px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.lil b:last-of-type {
  margin-left: 8px;
  line-height: 7;
  display: inline-block;
  width: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.plan {
  position: absolute;
  width: 761px;
  height: 300px;
  bottom: 180.5px;
  left: 384px;
  transition: 0.3s;
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

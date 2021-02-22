<template>
  <div class="special" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <audio :src="ss" loop id="eventAudio"></audio>
    <li class="first-li">
      <em
        style="display:block;position: relative;left:0rem;top:1.4375rem; width: 0.125rem; height: 1.25rem; background-color: #fff300;"
      ></em>
      <em style="color:#ffffff">
        需特殊关注
        <!-- 加速度值：{{value}} 加速度最大值：{{maxvalue}} 暴力等级：{{accelerationLevel}} 暴力等级最大值：{{accelerationMaxLevel}} -->
      </em>
    </li>
    <div class="special-conent" style="width:390px;height:510px; position: relative;">
      <transition-group name="list">
        <li
          :class="item.id"
          :id="item.healthstatuscode"
          v-for="item in nowSpecialData"
          :key="item.wyid"
          class="telist"
        >
          <div class="x" @click="cha(item.id,item.healthstatuscode,item.railid,item.ipAndPort)"></div>
          <div class="j" @click="turnup(item.id,item.healthstatuscode,item.railid,item.ipAndPort)"></div>
          <div class="cetiao" :style="{backgroundColor:item.color}"></div>
          <div
            v-show="item.healthstatuscode!='990'"
            class="xinxi"
            style="font-size:1.125rem;color:#ffffff"
          >
            注意：{{item.state}}
            <em
              style=" border-radius: 0.1875rem;border: 0.0625rem solid #737d8a;padding:0.25rem 1.0625rem; margin-left:0.375rem;"
            >{{item.healthstatename}}</em>
          </div>
          <div
            v-show="item.healthstatuscode=='990'"
            class="xinxi"
            style="font-size:1.125rem;color:#ffffff"
          >
            注意：设备异常
            <em
              style=" border-radius: 0.1875rem;border: 0.0625rem solid #737d8a;padding:0.25rem 1.0625rem; margin-left:0.375rem;"
            >{{item.healthstatename}}</em>
          </div>
          <div v-show="item.healthstatuscode!='990'" class="xinxi">
            <span>姓名：{{item.name}}</span>
            <span style="margin-left:12px;">位置：{{item.roomname}}</span>
          </div>
          <div
            v-show="item.healthstatuscode=='990'"
            style="width: 249px;height: 58px;overflow-y: auto;"
            class="xinxi"
          >详情：{{item.name}}</div>
          <div v-show="item.healthstatuscode!='990'" class="xinxi">时间：{{item.createTime}}</div>
        </li>
      </transition-group>
    </div>
    <div class="special-page">
      <el-pagination
        background
        :current-page="nowPage"
        :page-size="4"
        :pager-count="5"
        :total="allSpecialsData.length"
        @current-change="changeCurrent"
        layout="prev, pager, next"
      ></el-pagination>
    </div>
    <el-dialog :close-on-click-modal="false" title="设置解除时间" :visible.sync="dialogVisible" width="30%">
      <el-time-select v-model="gettime" :picker-options="timeend" placeholder="选择时间"></el-time-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="jiechu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { constants } from "crypto";
import audio from "../../../assets/10344.mp3";
export default {
  data() {
    return {
      // 当前页
      nowPage: 1,
      // 排序过后全部特殊人员
      newarr: [],
      // 当前特殊人员
      nowSpecialData: [],
      // 定时器
      timer: null,
      maxvalue: "",
      value: "",
      accelerationLevel: "",
      accelerationMaxLevel: "",
      c: "",
      // 老的紧急人员
      oldjiji: [],
      newjiji: [],
      ss: audio,
      // 禁用时间
      gettime: "",
      personid: "",
      type: "",
      railid: "",
      timeend: {
        start: "08:30",
        step: "00:15",
        end: "23:59"
      },
      dialogVisible: false,
      people: [],
      top: 0,
      i: 1
    };
  },
  computed: {
    allSpecialsData() {
      return this.$store.state.websocket.allSpecialsData;
    }
  },
  watch: {
    allSpecialsData(val, oldval) {
      this.newarr = [];
      for (let i = 0; i < val.length; i++) {
        if (val[i].state == "危机") {
          this.newarr.push(val[i]);
        }
      }
      for (let i = 0; i < val.length; i++) {
        if (val[i].state == "关注") {
          this.newarr.push(val[i]);
        }
      }
      this.nowSpecialData = this.newarr.slice(
        this.nowPage * 4 - 4,
        this.nowPage * 4
      );
      // this.people = this.group(newarr, 4);
      // 暂时解除
      oldval.forEach(element => {
        if (element.state == "危机") {
          this.oldjiji.push(element.name + element.healthstatename);
        }
      });
      val.forEach(element => {
        if (element.state == "危机") {
          this.newjiji.push(element.name + element.healthstatename);
        }
      });
      this.getArrDifference(this.oldjiji, this.newjiji).forEach(element => {
        if (this.oldjiji.indexOf(element) == -1) {
          setTimeout(() => {
            // this.actok(element, "名称");
          }, 1000);
        } else {
        }
      });
      // 暂时解除
      this.oldjiji = [];
      this.newjiji = [];
    }
  },
  mounted() {
    this.openTimer();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    // 开启定时器
    openTimer() {
      this.timer = setInterval(() => {
        if (this.nowPage >= Math.ceil(this.allSpecialsData.length / 4)) {
          this.nowPage = 1;
        } else {
          this.nowPage++;
        }
        this.nowSpecialData = this.newarr.slice(
          this.nowPage * 4 - 4,
          this.nowPage * 4
        );
      }, 5000);
    },
    changeCurrent(num) {
      console.log(num);
      this.nowPage = num;
      this.nowSpecialData = this.newarr.slice(
        this.nowPage * 4 - 4,
        this.nowPage * 4
      );
    },
    mouseOver() {
      clearInterval(this.timer);
    },
    mouseLeave() {
      this.openTimer();
    },
    actok(name, titles) {
      let d = new Date();
      let d2 =
        d.getFullYear() +
        "年" +
        (d.getMonth() + 1) +
        "月" +
        d.getDate() +
        "日" +
        " " +
        "" +
        d.getHours() +
        "时" +
        d.getMinutes() +
        "分" +
        d.getSeconds() +
        "秒";
      this.$notify.error({
        title: "危机",
        dangerouslyUseHTMLString: true,
        message:
          "<p><sapn>" +
          titles +
          "：</sapn><span>" +
          name +
          "</span></p><p><sapn>时间：</sapn><span>" +
          d2 +
          "</span></p>",
        duration: 15000,
        onClose: this.guan
      });
      this.act();
    },
    guan() {
      this.stop();
    },
    getArrDifference(arr1, arr2) {
      return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
      });
    },
    turnup(personid, type, railid, ipAndPort) {
      this.personid = personid;
      this.type = type;
      this.railid = railid;
      this.ipAndPort = ipAndPort;
      let date = new Date();
      var a =
        date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
      this.dialogVisible = true;
      this.timeend.start = date.getHours() + ":" + a;
    },
    jiechu() {
      if (this.gettime != "") {
        this.dialogVisible = false;
        // 解除关注
        this.$ajax
          .post(
            "http://" + this.ipAndPort + "/mainPage/intsertRemoveAttention",
            `userid=${this.$store.state.token}&personid=${this.personid}&time=${this.gettime}&type=${this.type}&railid=${this.railid}&source=main`
          )
          .then(res => {
            if (res.data === "success") {
              this.$message({
                showClose: true,
                message: "解除成功",
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: "解除失败",
                type: "error"
              });
            }
          });
      } else {
        this.$message.error("请选择");
      }
    },
    cha(personid, type, railid, ipAndPort) {
      // 解除关注
      this.$confirm("即将解除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$ajax
            .post(
              "http://" + ipAndPort + "/mainPage/intsertRemoveAttention",
              `userid=${this.$store.state.token}&personid=${personid}&time=23:59&type=${type}&railid=${railid}&source=main`
            )
            .then(res => {
              if (res.data === "success") {
                this.$message({
                  showClose: true,
                  message: "解除成功",
                  type: "success"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "解除失败",
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消解除"
          });
        });
    },
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },
    act() {
      let audio = document.querySelector("#eventAudio");
      if (!this.isPlaying) {
        audio.play();
        this.isPlaying = true;
      }
    },
    stop() {
      let audio = document.querySelector("#eventAudio");
      if (this.isPlaying) {
        audio.currentTime = 0;
        audio.pause();
        this.isPlaying = false;
      }
    }
  }
};
</script>
<style>
.special .el-carousel__indicators {
  border-radius: 4px;
  /* background-color: #dedede; */
  width: 400px;
}
.special .el-carousel__arrow {
  top: 255px;
}
.special .el-pager li {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 28px;
  border-radius: 50%;
}
.special .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #2ba9a0;
  border-radius: 50%;
  border: 1px solid #2ee6d9;
}
.special .el-pagination.is-background .el-pager li {
  min-width: 28px;
  border-radius: 50%;
}
.special .el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: transparent;
}
</style>


<style scoped>
.special {
  width: 393px;
  height: 639px;
  float: left;
  position: relative;
  margin-left: 15px;
  padding: 0 41px;
  background-color: #1c293a;
}
.special-page {
  margin-top: 12px;
}
.special-conent{
  overflow: hidden;
}
.special .page li {
  width: 20px;
  height: 10px;
  float: left;
  background-color: #1c4e55;
  color: transparent;
  border-radius: 6px;
  margin-left: 5px;
  margin-right: 5px;
  border: 1px solid #1baa9c;
}
.special .first-li {
  height: 4.6875rem;
  width: 393px;
  font-size: 1.0625rem;
  text-align: left;
}
.telist .x {
  width: 2.25rem;
  height: 1.25rem;
  background-image: url(../../../assets/7.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  right: 0.9375rem;
}
.telist .j {
  width: 6rem;
  height: 2.625rem;
  background-image: url(../../../assets/8.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  right: 0.9375rem;
  top: 3.4375rem;
}
.special li:first-of-type em:last-of-type {
  margin-left: 0.625rem;
}
.special .telist {
  width: 393px;
  height: 6.1875rem;
  background-color: #16273c;
  padding-top: 1rem;
  position: relative;
  margin-bottom: 1.0625rem;
}
.telist .cetiao {
  width: 0.5rem;
  height: 7.1875rem;
  float: left;
  position: absolute;
  top: 0;
}

.telist .xinxi {
  text-align: left;
  margin-bottom: 0.75rem;
  margin-left: 1.3125rem;
  font-size: 0.875rem;
  color: #999999;
}

.list-enter-active {
  transition: all .8s ease;
}
.list-leave-active {
  transition: all .0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.list-enter,
.list-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>


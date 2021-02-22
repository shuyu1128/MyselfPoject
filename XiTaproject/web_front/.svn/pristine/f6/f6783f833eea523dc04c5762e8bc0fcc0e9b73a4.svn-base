<template>
  <div>
    <div class="left-suo">
      <div class="v-step1">
        <el-input
          size="mini"
          v-model="sousuo.name"
          placeholder="搜索长者"
          style="width: 180px;height: 16px;font-size:14px;margin-right: 5px;"
        ></el-input>
        <el-button type="primary" size="mini" @click="search" style="margin-left: 20px;">搜索</el-button>
      </div>
      <div>
        <div class="choice-people v-step2">
          <div
            v-for="(item,index) in list"
            :id="item.ID"
            :key="index"
            :class="item.ID===changeid?'active-old-list':'old-list'"
            @click="changeids(item.ID)"
          >
            <li>{{item.FULLNAME}}</li>
            <li>{{item.SEX}}</li>
            <li>{{item.ROOMNAME}}</li>
          </div>
        </div>
      </div>
    </div>
    <div class="tracking-time">
      <div class="v-step3">
        <div class="block" style="margin-left:26%;margin-top:30px">
          <span>开始时间：</span>
          <el-date-picker
            v-model="begintime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择时间"
            style="margin-right:20px"
          ></el-date-picker>
          <span>结束时间：</span>
          <el-date-picker
            v-model="endtime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择时间"
            style="margin-right:20px"
          ></el-date-picker>
          <el-button type="primary" @click="getTrackPlayback">确定</el-button>
          <!-- <span class="demonstration" style="margin-right:30px;">请选择时间区间</span>
          <el-date-picker
            @change="huoqu"
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            :clearable="false"
            :picker-options="pickerOptions"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>-->
        </div>
      </div>
      <oldmap class="v-step4" v-if="mapshow" :timedata="timedatas" style="margin-left:15%;margin-top:3%" />
    </div>
  </div>
</template>
<script>
import oldmap from "./oldmap.vue";
export default {
  components: {
    oldmap
  },

  data() {
    return {
      begintime: null,
      endtime: null,
      pickerMinDate: "",
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerMinDate = minDate.getTime();
          if (maxDate) {
            this.pickerMinDate = "";
          }
        },
        disabledDate: time => {
          if (this.pickerMinDate !== "") {
            const day30 = (30 - 1) * 24 * 3600 * 1000;
            let maxTime = this.pickerMinDate + day30;
            if (maxTime > new Date()) {
              maxTime = new Date();
            }
            return time.getTime() > maxTime;
          }
          return time.getTime() > Date.now();
        }
      },
      mapshow: true,
      changeid: "",
      timedatas: "",
      list: {},
      sousuo: {
        id: "",
        name: "",
        sex: "",
        roomN: "",
        state: "",
        hasDevice: ""
      },

      //日期选择器相关
      value1: []
    };
  },
  created() {
    if (this.$route.params.id || this.$route.query.id) {
      this.changeid =
        this.$route.params.id == undefined
          ? this.$route.query.id
          : this.$route.params.id;
    }
    // 获取全部老人
    this.$ajax
      .post(
        process.env.API_HOST + "/person/getPersonList",
        `sousou=${JSON.stringify(this.sousuo)}`
      )
      .then(respones => {
        this.list = respones.data;
      });
  },
  methods: {
    nowtime() {
      return true;
    },
    // 获取轨迹回放数据
    getTrackPlayback() {
      if (this.changeid == "") {
        this.$message.warning("请选择人员");
      } else if (this.begintime == null) {
        this.$message.warning("请选择开始时间");
      } else if (this.endtime == null) {
        this.$message.warning("请选择结束时间");
      } else {
        const loading = this.$loading({
          lock: true,
          text: "加载中，请稍后...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$ajax
          .post(
            process.env.API_HOST + "/person/personHistoryTrajectory",
            `personid=${this.changeid}&beginDate=${this.begintime}&endDate=${this.endtime}`
          )
          .then(response => {
            if (response.data.length == 0) {
              this.$message("该时间区域无数据！");
            }
            response.data.forEach(element => {
              element.uploadedtime = vm.formatTime(
                element.uploadedtime,
                "Y-M-D h:m:s"
              );
            });
            this.timedatas = response.data;
            loading.close();
          })
          .catch(error => {
            loading.close();
            this.$message("加载失败！");
          });
      }
    },
    huoqu() {
      // if (this.changeid != "") {
      //   const loading = this.$loading({
      //     lock: true,
      //     text: "加载中，请稍后...",
      //     spinner: "el-icon-loading",
      //     background: "rgba(0, 0, 0, 0.7)"
      //   });
      //   this.$ajax
      //     .post(
      //       process.env.API_HOST + "/person/personHistoryTrajectory",
      //       `personid=${this.changeid}&beginDate=${this.datatime(
      //         this.value1[0]
      //       )}&endDate=${this.datatime(this.value1[1])}`
      //     )
      //     .then(response => {
      //       response.data.forEach(element => {
      //         element.uploadedtime = vm.formatTime(
      //           element.uploadedtime,
      //           "Y-M-D h:m:s"
      //         );
      //       });
      //       this.timedatas = response.data;
      //       loading.close();
      //       console.log(this.timedatas);
      //     })
      //     .catch((error)=>{
      //       loading.close();
      //       this.$message("加载失败！");
      //     })
      // } else {
      //   this.value1 = [];
      //   this.$message({
      //     message: "请选择人员",
      //     type: "warning"
      //   });
      // }
    },
    search() {
      this.$ajax
        .post(
          process.env.API_HOST + "/person/getPersonList",
          `sousou=${JSON.stringify(this.sousuo)}`
        )
        .then(respones => {
          this.list = respones.data;
        });
    },
    changeids(id) {
      this.value1 = [];
      this.timedatas = [];
      this.changeid = id;
      this.mapshow = false;
      setTimeout(() => {
        this.mapshow = true;
      }, 100);
    },
    // 格式转换
    datatime(cantime) {
      var seperator1 = "-";
      var seperator2 = ":";
      var date = cantime;
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      return currentdate;
    }
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 95px;
  height: 104px;
  line-height: 104px;
  text-align: center;
}
.avatar {
  width: 95px;
  height: 104px;
  display: block;
}
.choice-people {
  height: 677px;
  overflow-y: auto;
}
.bain {
  height: 388px;
  /* background-color: aqua; */
}
.bain div {
  padding: 3px 10px 3px 10px;
  /* background-color: red; */
  border: 1px solid #dcdfe6;
  margin-right: 14px;
  border-radius: 4px;
  margin-bottom: 8px;
  float: left;
}
.el-message-box__wrapper {
  background-color: rgba(0, 0, 0, 0.6);
  display: none;
}

.left-suo {
  width: 18%;
  height: 760px;
  float: left;
  margin-right: 10px;
}

.left-suo > div:first-of-type {
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  width: 100%;
  background-color: #ffffff;
  height: 65px;
  margin-bottom: 4px;
  padding-top: 35px;
  text-align: center;
}
.left-suo > div:last-of-type {
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  width: 100%;
  background-color: #ffffff;
  height: 676px;
}
.tracking-time {
  width: 80%;
  height: 782px;
  float: left;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

  background-color: #ffffff;
}

/* .tracking-time > div:first-of-type {
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  width: 1352px;
  background-color: #ffffff;
  height: 65px;
  margin-bottom: 4px;
  padding-top: 35px;
  padding-left: 20px;
} */
.basic {
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  width: 100%;
  background-color: #ffffff;
  height: 160px;
  margin-bottom: 10px;
  padding-top: 30px;
}
.basic > div {
  float: left;
  height: 100%;
}
.basic > div:first-of-type {
  width: 189px;
  /* height: 100px; */
  /* background-color: #409eff; */
}
.basic > div:first-of-type dl {
  margin-left: 45px;
}
.basic > div:first-of-type dl > dt {
  width: 95px;
  height: 104px;
  margin-bottom: 6px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.basic > div:first-of-type dl > dd {
  width: 95px;
  text-align: center;
  color: #000000;
}
.basic > div:nth-of-type(2) {
  width: 566px;
  padding-right: 400px;
  height: 160px;
  overflow: hidden;
  /* background-color: #40ff89; */
}
.kapianconte {
  float: left;
  margin-right: 40px;
  margin-bottom: 20px;
}
.basic > div:nth-of-type(2) > table {
  font-size: 13px;
  /* border: 1px solid red; */
}
.basic > div:nth-of-type(2) > table input {
  border: none;
  background-color: #ffffff;
}
.basic > div:nth-of-type(3) {
  width: 187px;
  text-align: right;
  padding-right: 1px;
  /* height: 100px; */
  /* background-color: #213252; */
}
.tap {
  background-color: #ffffff;
}
.tap-data {
  position: relative;
  height: 510px;
}
.baocun {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 999;
}
.old-list,
.active-old-list {
  width: 225px;
  height: 30px;
  /* background-color: #409eff; */
  border-bottom: 1px solid #dcdfe6;
  margin: 10px auto;
  padding-top: 15px;
  padding-left: 38px;
}
.active-old-list {
  background-color: #409eff;
}
.old-list li {
  float: left;
  color: #606266;
  margin-right: 30px;
}
.active-old-list li {
  float: left;
  color: #fff;
  margin-right: 30px;
}
.xiangqing {
  position: absolute;
  /* top:2px; */
  right: 100px;
  width: 30px;
  z-index: 99;
  text-align: center;
}
</style>

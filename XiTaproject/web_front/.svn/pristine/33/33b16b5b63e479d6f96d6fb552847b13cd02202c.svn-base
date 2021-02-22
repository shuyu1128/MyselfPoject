<template>
  <div class="testing">
    <div class="body">
      <div class="body-shen"></div>
      <div class="body-nei">
        <div>
          <div>
            <div class="xueya">
              <img src="../../assets/huixueyao.png" alt />
            </div>
            <div class="jieshao">
              <p>血压(mmHg):</p>
              <p>{{allSocketData.lowPressure}}/{{allSocketData.highPressure}}</p>
            </div>
            <!-- <div class="jieshao">
              <span>血压(mmHg):&nbsp&nbsp&nbsp&nbsp&nbsp</span>
              <span>--/--</span>
            </div>-->
          </div>
        </div>
        <div>
          <div>
            <div class="xueya">
              <img src="../../assets/huihart.png" alt />
            </div>
            <!-- <div class="jieshao">
              <span v-if="that>=180" style="color:#f4464a;">心率(bpm):&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
              <span v-if="that>=180" style="color:#f4464a;">{{heartRate}}</span>
              <span v-if="that<180">心率(bpm):&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
              <span v-if="that<180">{{heartRate}}</span>
            </div>-->
            <div class="jieshao">
              <p>心率(bpm):</p>
              <p>{{allSocketData.heartRate}}</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="xueya">
              <img src="../../assets/imgfont/temper.png" alt />
            </div>
            <div class="jieshao">
              <p>体温（℃）</p>
              <p>{{allSocketData.wristTemperature}}</p>
            </div>
            <!-- <div class="jieshao">
              <span>体温（℃）&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
              <span>--</span>
            </div>-->
          </div>
        </div>
        <div>
          <div>
            <div class="xueya">
              <img src="../../assets/imgfont/font_03.gif" alt />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="xueya">
              <img src="../../assets/imgfont/font_07.gif" alt />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="xueya">
              <img src="../../assets/imgfont/font_09.gif" alt />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="xueya">
              <img src="../../assets/imgfont/font_12.jpg" alt />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="xueya">
              <img src="../../assets/imgfont/font_13.gif" alt />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="xueya">
              <img src="../../assets/imgfont/font_16.gif" alt />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="xueya">
              <img src="../../assets/imgfont/font_17.gif" alt />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="xueya">
              <img src="../../assets/imgfont/font_20.gif" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chart">
      <div style="height:41px">
        <el-select
          v-model="timevalue"
          placeholder="请选择"
          style="width:90px; float:right"
          @change="zhi"
        >
          <el-option v-for="item in time" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <!-- <el-button
          style="position: relative;left:10px"
          size="small"
          type="primary"
          icon="el-icon-download"
          circle
          @click="createPicture"
        ></el-button>-->

        <el-button
          style="position: relative;left:10px"
          size="small"
          type="primary"
          icon="el-icon-refresh-left"
          circle
          @click="gettabledata"
        ></el-button>
      </div>

      <div class="jietu" id="mymap">
        <div class="xinlubiao"></div>
        <div class="xueyabiao"></div>
        <div class="heid"></div>
      </div>
    </div>
  </div>
</template>
<script>
import westeros from "../../components/ECharts/theme/westeros.js";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      lowPressure: "",
      highPressure: "",
      heartRate: "",
      wristTemperature: "",
      blood: 170,
      that: 170,
      timevalue: "day",
      time: [
        {
          value: "day",
          label: "一天",
        },
        {
          value: "halfday",
          label: "半天",
        },
        {
          value: "hours",
          label: "小时",
        },
      ],
      zxinlv: {
        // time: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        // data: [714, 258, 456, 457, 451, 256, 355]
      },
      ztiwen: {
        // time: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        // data: [714, 258, 456, 457, 451, 256, 355]
      },
      zxueya: {
        // time: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        // datag: [714, 258, 457, 451, 256, 355, 441],
        // datad: [714, 258, 457, 451, 256, 355, 441]
      },
    };
  },
  props: {
    did: null,
  },
  computed: {
    allSocketData() {
      let data = {
        lowPressure: "--",
        highPressure: "--",
        heartRate: "--",
        wristTemperature: "--",
      };
      let arr = this.$store.state.websocket.allSocketData;
      for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr[i].persons.length; k++) {
          if (arr[i].persons[k].id == this.did) {
            data = arr[i].persons[k];
            break;
          }
        }
      }
      return data;
    },
  },
  watch: {
    timevalue(newvalue) {
      this.gettabledata(newvalue);
    },
    did(val) {
      this.gettabledata(this.timevalue);
    },
  },
  created() {
    // this.$ajax
    //       .post(
    //         process.env.API_HOST + "/person/realtimeHealth",
    //         `personid=${this.did}&type=${this.timevalue}`
    //       )
    //       .then(respones => {
    //         console.log('图表数据',respones.data);
    //         this.zxinlv=respones.data.heartMap
    //         this.zxueya=respones.data.pressureMap
    //         this.ztiwen=respones.data.temperatureMap
    //       });
  },
  mounted() {
  this.gettabledata()
  },
  methods: {
    gettabledata() {
      // 获取图表数据

      this.$ajax
        .post(
          process.env.API_HOST + "/person/realtimeHealth",
          `personid=${this.did}&type=${this.timevalue}`
        )
        .then((respones) => {
          console.log("图表数据", respones.data);
          this.zxinlv = respones.data.heartMap;
          this.zxueya = respones.data.pressureMap;
          this.ztiwen = respones.data.temperatureMap;
        })
        .then((res) => {
          this.ini();
        });
    },
    createPicture() {
      html2canvas(document.getElementById("mymap")).then((canvas) => {
        this.imgmap = canvas.toDataURL();
        console.log(999, this.imgmap);
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
          a.setAttribute("download", "chart-download");
          a.click();
        }
      });
    },
    zhi(value) {},
    ini() {
      let xinlu = this.$echarts.init(
        document.querySelector(".xinlubiao"),
        "westeros"
      );
      let xueyabiao = this.$echarts.init(
        document.querySelector(".xueyabiao"),
        "westeros"
      );
      let heid = this.$echarts.init(
        document.querySelector(".heid"),
        "westeros"
      );

      xinlu.setOption({
        title: {
          text: "心率",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["bpm"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.zxinlv.time,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "bpm",
            type: "line",
            itemStyle: {
              normal: {
                color: "#51c1e5",
                lineStyle: {
                  color: "#51c1e5",
                },
              },
            },
            data: this.zxinlv.data,
          },
        ],
      });
      xueyabiao.setOption({
        title: {
          text: "血压",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["高压", "低压"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.zxueya.time,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "高压",
            type: "line",
            itemStyle: {
              normal: {
                color: "#51c1e5",
                lineStyle: {
                  colzor: "#51c1e5",
                },
              },
            },
            data: this.zxueya.datag,
          },
          {
            name: "低压",
            type: "line",
            itemStyle: {
              normal: {
                color: "#eba9d7",
                lineStyle: {
                  color: "#eba9d7",
                },
              },
            },
            data: this.zxueya.datad,
          },
        ],
      });
      heid.setOption({
        title: {
          text: "体温",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["℃"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.ztiwen.time,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "℃",
            type: "line",
            itemStyle: {
              normal: {
                color: "#4aa3ff",
                lineStyle: {
                  color: "#4aa3ff",
                },
              },
            },
            data: this.ztiwen.data,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.body {
  margin-right: 8px;
  width: 55%;
  height: 510px;
  background-color: #ffffff;
  float: left;
}
.xinlubiao {
  height: 235px;
}
.xueyabiao {
  height: 235px;
}

.xueya {
  float: left;
  margin-right: 10px;
  width: 65px;
  height: 64px;
  background-position: 100% 100%;
}
.jieshao {
  color: #727272;
  height: 54px;
  padding-top: 12px;
}
.body-shen {
  width: 360px;
  height: 510px;
  background: url("../../assets/body.png") no-repeat;
  background-position: 10px 0px;
  float: left;
}
.body-nei {
  width: 366px;
  height: 500px;

  padding-top: 10px;
  float: left;
}
.body-nei > div {
  width: 50%;
  height: 66px;
  float: left;
  margin-bottom: 8px;
}
.chart {
  width: 44%;
  height: 510px;
  background-color: #ffffff;
  float: left;
  overflow-x: hidden;
  overflow-y: visible;
}
.heid {
  width: 100%;
  height: 235px;
}
</style>



<template>
  <div>
    <div
      style="margin-bottom:20px"
      v-for="item in allData"
      :key="item.title"
      class="echarts_style"
      :id="item.title"
    ></div>
  </div>
</template>

<script>
import westeros from "./ECharts/theme/westeros";
export default {
  data() {
    return {
      allData: [],
    };
  },
  created() {},
  mounted() {
    this.select().then((res) => {
      this.allData.forEach((element) => {
        this.initChart(
          element.title,
          element.zjzs,
          element.xData,
          element.xtime,
          element.series
        );
      });
    });
  },
  methods: {
    initChart(title, zjzs, xData, xtime, series) {
      this.chart = this.$echarts.init(
        document.getElementById(title),
        "westeros"
      );
      this.chart.setOption({
        title: {
          text: title,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: zjzs,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            xAxisIndex: [0, 1],
          },
          {
            yAxisIndex: 0,
          },
        ],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: xData,
          },
          {
            type: "category",
            boundaryGap: false,
            data: xtime,
          },
        ],
        yAxis: {
          type: "value",
        },
        series: series,
      });
    },
    select() {
      return this.$ajax.get("/pgl/logEcharts/getlog").then((res) => {
        this.allData = [];
        res.data.allBracelet.forEach((allBraceletItem) => {
          var wobj = {
            title: allBraceletItem,
            zjzs: res.data.allStation,
            xData: [],
            xtime: [],
            series: [],
          };
          var changeXdata = [];
          var changeTime = [];
          res.data.allStation.forEach((allStationItem) => {
            let xobj = {
              name: allStationItem,
              type: "line",
              data: [],
            };
            var zchangeXdata = [];
            var zchangeTime = [];
            let logmsnrssi =
              res.data.logArr2[allBraceletItem + "--" + allStationItem];
            if (logmsnrssi) {
              logmsnrssi.forEach((logArrTtem, logArrIndex) => {
                if (logArrIndex != 0) {
                  // msn差值
                  let Difference =
                    logArrTtem.msn - logmsnrssi[logArrIndex - 1].msn;
                  if (Difference > 1) {
                    for (let i = 1; i < Difference; i++) {
                      zchangeXdata.push(logmsnrssi[logArrIndex - 1].msn + i);
                      zchangeTime.push(null);
                      xobj.data.push(null);
                    }
                  } else if (Difference < 1 && Difference != -255) {
                    let ngDifference = Difference + 255;
                    for (var i = 1; i <= ngDifference; i++) {
                      let gnNow = logmsnrssi[logArrIndex - 1].msn + i;
                      if (gnNow > 255) {
                        zchangeXdata.push(gnNow - 256);
                      } else {
                        zchangeXdata.push(gnNow);
                      }
                      zchangeTime.push(null);
                      xobj.data.push(null);
                    }
                  }
                }
                zchangeXdata.push(logArrTtem.msn);
                zchangeTime.push(logArrTtem.time);
                xobj.data.push(logArrTtem.rssi);
              });
              changeXdata.push(zchangeXdata);
              changeTime.push(zchangeTime);
              wobj.series.push(xobj);
            }
          });
          changeXdata.sort((now, old) => {
            if (now.length > old.length) {
              return -1;
            } else if (now.length < old.length) {
              return 1;
            } else {
              return 0;
            }
          });
          changeTime.sort((now, old) => {
            if (now.length > old.length) {
              return -1;
            } else if (now.length < old.length) {
              return 1;
            } else {
              return 0;
            }
          });
          wobj.xData = changeXdata[0];
          wobj.xtime = changeTime[0];
          this.allData.push(wobj);
        });
      });
    },
  },
};
</script>

<style>
.echarts_style {
  height: 300px;
}
</style>
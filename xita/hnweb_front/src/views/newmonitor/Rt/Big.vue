<template>
  <div class="big">
    <el-dialog title="人员信息" :visible.sync="iftable">
      <el-table :data="tabledata">
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="highPressure" label="高压"></el-table-column>
        <el-table-column align="center" prop="lowPressure" label="低压"></el-table-column>
        <el-table-column align="center" prop="heartRate" label="心率">
          <template slot-scope="scope">
            <span
              v-if="scope.row.heartRate!='255'&&scope.row.heartRate!='0'"
            >{{scope.row.heartRate}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="wristTemperature" label="体温"></el-table-column>
        <el-table-column property="state" label="状态"></el-table-column>
      </el-table>
    </el-dialog>
    <span class="title">院内心率体温大数据展示</span>
    <div class="heart"></div>
    <div class="temperature"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: null,
      heartChart: null,
      temperatureChart: null,
      tabledata: [],
      iftable: false
    };
  },
  computed: {
    heartRateData() {
      return this.$store.state.websocket.heartRateData;
    },
    temperatureData() {
      return this.$store.state.websocket.temperatureData;
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.heart();
      this.temperature();
    }, 2000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    heart() {
      if (this.heartChart === null) {
        this.heartChart = this.$echarts.init(document.querySelector(".heart"));
      }
      this.heartChart.setOption({
        backgroundColor: "#1c293a",
        color: ["#0998f6"],
        title: {
          x: "30px",
          y: "20px",
          text: "心率展示",
          textStyle: { fontSize: 14, color: "#8d8e90" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        grid: {
          top: 52,
          bottom: 40,
          left: 50,
          right: 80
        },
        xAxis: [
          {
            show: false,
            type: "value"
          }
        ],
        yAxis: [
          {
            name: "ppm",
            nameLocation: "start",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#8d8e90" //左边线的颜色
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#8d8e90"
              }
            },
            nameTextStyle: {
              color: "#6b7077",
              fontSize: 12
            },
            type: "category",
            data: this.heartRateData[0],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        series: [
          {
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [5, -2],
                textStyle: {
                  color: "#8d8e90",
                  fontSize: 13
                }
              }
            },
            name: "人数",
            type: "bar",
            barWidth: "60%",
            data: this.heartRateData[1]
          }
        ]
      });
      //在渲染点击事件之前先清除点击事件
      this.heartChart.off("click");
      // triggerEvent为true时，触发点击事件
      let that = this;
      this.heartChart.on("click", function(params) {
        that.tabledata = params.data.peoples;
        that.iftable = true;
      });
    },
    temperature() {
      if (this.temperatureChart === null) {
        this.temperatureChart = this.$echarts.init(
          document.querySelector(".temperature")
        );
      }

      this.temperatureChart.setOption({
        backgroundColor: "#1c293a",
        color: ["#1bcbb4"],
        title: {
          x: "30px",
          y: "20px",
          text: "体温展示",
          textStyle: { fontSize: 14, color: "#8d8e90" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },

        grid: {
          top: 52,
          bottom: 40,
          left: 50,
          right: 80
        },
        xAxis: [
          {
            show: false,
            type: "value"
          }
        ],
        yAxis: [
          {
            name: "℃",
            nameLocation: "start",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#8d8e90" //左边线的颜色
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#8d8e90"
              }
            },
            nameTextStyle: {
              color: "#6b7077",
              fontSize: 12
            },
            type: "category",
            data: this.temperatureData[0],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        series: [
          {
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [5, -2],
                textStyle: {
                  color: "#8d8e90",
                  fontSize: 13
                }
              }
            },
            name: "人数",
            type: "bar",
            barWidth: "60%",
            data: this.temperatureData[1]
          }
        ]
      });
      //在渲染点击事件之前先清除点击事件
      this.temperatureChart.off("click");
      // triggerEvent为true时，触发点击事件
      let that = this;
      this.temperatureChart.on("click", function(params) {
        that.tabledata = params.data.peoples;
        that.iftable = true;
      });
    }
  }
};
</script>
<style scoped>
.title {
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  margin-left: 20px;
}

.heart {
  height: 298px;
}
.temperature {
  height: 298px;
}
</style>

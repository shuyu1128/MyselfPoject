<template>
  <div class="personnel">
    <div class="personnel_1"></div>
    <div class="personnel_2">
      <table style="background-color:#141d28;">
        <tr style="font-size:1rem;color:#999999">
          <td style>
            <span
              style="width:0.875rem;height:0.875rem;background-color:#0ab06d;display:inline-block;border-radius: 50%;margin-right:0.375rem;"
            ></span>活动中
          </td>
          <td>{{Personnel.activityPersonnel}}人</td>
        </tr>
        <tr style="font-size:0.875rem;color:#999999">
          <td>全自理长者</td>
          <td>{{Personnel.activitySelfCare}}人</td>
        </tr>
        <tr style="font-size:0.875rem;color:#999999">
          <td>半自理长者</td>
          <td>{{Personnel.activityHalfSelfCare}}人</td>
        </tr>
        <tr>
          <td colspan="2">
            <hr width="167" style="border:0.0625rem dashed #434950;" />
          </td>
        </tr>
        <tr style="font-size:1rem;color:#999999">
          <td style>
            <span
              style="width:0.875rem;height:0.875rem;background-color:#d1aa0f;display:inline-block;border-radius: 50%;margin-right:0.375rem;"
            ></span>静止中
          </td>
          <td>{{Personnel.stationaryPersonnel}}人</td>
        </tr>
        <tr>
          <td style="font-size:0.875rem;color:#999999">全自理长者</td>
          <td style="font-size:0.875rem;color:#999999">{{Personnel.quiescenceSelfCare}}人</td>
        </tr>
        <tr>
          <td style="font-size:0.875rem;color:#999999">半自理长者</td>
          <td style="font-size:0.875rem;color:#999999">{{Personnel.quiescenceHalfSelfCare}}人</td>
        </tr>
        <tr>
          <td style="font-size:0.875rem;color:#999999">全失能长者</td>
          <td style="font-size:0.875rem;color:#999999">{{Personnel.quiescenceNoSelfCare}}人</td>
        </tr>
      </table>
    </div>
    <div class="personnel_3"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: null,
      personnel_1Chart: null,
      personnel_3Chart: null
    };
  },
  computed: {
    Personnel() {
      return this.$store.state.websocket.Personnel;
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.personnel_1();
      this.personnel_3();
    }, 2000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    personnel_1() {
      if (this.personnel_1Chart === null) {
        this.personnel_1Chart = this.$echarts.init(
          document.querySelector(".personnel_1")
        );
      }
      this.personnel_1Chart.setOption({
        title: {
          x: "17px",
          y: "20px",
          text: "院内人员信息",
          subtext: "\n\n人\n员\n外\n出\n情\n况\n统\n计",
          subtextStyle: {
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "normal"
          },
          textStyle: { color: "#ffffff" }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        graphic: {
          type: "text",
          left: "center", //设置偏移量
          top: "center",
          z: 2,
          zlevel: 100,
          style: {
            text: `共${this.Personnel.allNum}人`,
            x: 100,
            y: 100,
            textAlign: "center",
            fill: "#89D4ED",
            width: 200,
            height: 200,
            textFont: "bold 20px verdana"
          }
        },
        legend: {
          orient: "vertical",
          x: "left",
          y: "bottom",
          data: ["在院人员", "离院人员"],
          textStyle: { color: "#999999" }
        },
        backgroundColor: "#1c293a",

        color: ["#099af5", "#f4464a"],
        series: [
          {
            name: "人数",
            type: "pie",
            radius: ["50%", "70%"],

            label: {
              normal: {
                show: false,

                position: "center"
              },
              emphasis: {
                show: false,

                textStyle: {
                  fontSize: "16",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: true // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            data: [
              { value: this.Personnel.inHospitalNum, name: "在院人员" },
              {
                value: this.Personnel.outOfHospitalNum,
                name: "离院人员"
              }
            ]
          }
        ]
      });
    },
    personnel_3() {
      if (this.personnel_3Chart === null) {
        this.personnel_3Chart = this.$echarts.init(
          document.querySelector(".personnel_3")
        );
      }

      this.personnel_3Chart.setOption({
        title: {
          x: "17px",
          y: "20px",
          text: "",
          subtext: "\n\n人\n员\n活\n动\n情\n况\n统\n计",
          subtextStyle: {
            //副标题文本样式{"color": "#aaa"}

            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "normal"
          },
          textStyle: { color: "#ffffff" }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        graphic: {
          type: "text",
          left: "center", //设置偏移量
          top: "center",
          z: 2,
          zlevel: 100,
          style: {
            text: `共${this.Personnel.inHospitalNum}人`,
            x: 100,
            y: 100,
            textAlign: "center",
            fill: "#89D4ED",
            width: 200,
            height: 200,
            textFont: "bold 20px verdana"
          }
        },
        legend: {
          orient: "vertical",
          x: "left",
          y: "bottom",
          data: ["活动中", "静止"],
          textStyle: { color: "#999999" }
        },
        backgroundColor: "#1c293a",

        color: ["#1bcbb4", "#d1aa0f"],
        series: [
          {
            name: "人数",
            type: "pie",
            radius: ["50%", "70%"],

            label: {
              normal: {
                show: false,

                position: "center"
              },
              emphasis: {
                show: false,

                textStyle: {
                  fontSize: "16",
                  fontWeight: "bold"
                }
              }
            },

            labelLine: {
              normal: {
                show: true // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            data: [
              {
                value: this.Personnel.activityPersonnel,
                name: "活动中"
              },
              {
                value: this.Personnel.stationaryPersonnel,
                name: "静止"
              }
            ]
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.personnel {
  width: 1000px;
  height: 100%;
  background-color: #1c293a;
  float: left;
}
.personnel_1 {
  width: 406px;
  height: 100%;
  float: left;
}
.personnel_2 {
  width: 170px;
  height: 100%;
  background-color: #1c293a;
  float: left;
  margin-right: 33px;
}
.personnel_3 {
  width: 385px;
  height: 100%;
  float: left;
}
table {
  text-align: center;
  width: 100%;
  height: 285px;
  margin-top: 15px;
  border-radius: 4px;
}
</style>

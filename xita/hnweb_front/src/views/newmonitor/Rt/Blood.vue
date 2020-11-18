<template>
  <div class="bld"></div>
</template>
<script>
export default {
  data() {
    return {
      timer:null,
      chartDom: null
    };
  },
  computed: {
    bloodData() {
     
      return this.$store.state.websocket.bloodData;
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.bld();
    }, 2000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    bld() {
      if(this.chartDom===null){
        this.chartDom = this.$echarts.init(document.querySelector(".bld"));
      }
      var datag = this.bloodData.datag;
      var dataz = this.bloodData.dataz;
      var datad = this.bloodData.datad;
      if (this.chartDom === null) {
        this.chartDom = this.$echarts.init(document.querySelector(".bld"));
      }
      this.chartDom.setOption({
        backgroundColor: "#1c293a",
        title: {
          x: "17px",
          y: "20px",
          text: "院内血压大数据展示",
          textStyle: { fontSize: 16, color: "#ffffff" }
        },
        grid: {
          top: 90,
          bottom: 35,
          left: 50,
          right: 80
        },
        legend: {
          x: "180px",
          y: "20px",

          textStyle: {
            color: "#999999"
          },
          right: 10,
          data: ["低压", "中压", "高压"]
        },
        xAxis: {
          name: "mmHg",
          nameLocation: "end",
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#a5a8ac"
            }
          }
        },
        yAxis: {
          name: "mmHg",
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#a5a8ac"
            }
          },
          scale: true
        },
        series: [
          {
            name: "低压",
            data: datad,
            type: "scatter",

            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data;
                },
                position: "top"
              }
            },
            itemStyle: {
              normal: {
                color: "#5b323f"
              }
            }
          },
          {
            name: "中压",
            data: dataz,
            type: "scatter",

            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data;
                },
                position: "top"
              }
            },
            itemStyle: {
              normal: {
                color: "#ae3d45"
              }
            }
          },
          {
            name: "高压",
            data: datag,
            type: "scatter",

            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data;
                },
                position: "top"
              }
            },
            itemStyle: {
              normal: {
                color: "#ec4549"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style>
.bld {
  height: 310px;
  margin-bottom: 17px;
  background-color: #1c293a;
}
</style>



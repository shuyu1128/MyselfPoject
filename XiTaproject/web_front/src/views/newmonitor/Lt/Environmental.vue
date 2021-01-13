<template>
  <div class="encironmental"></div>
</template>
<script>
export default {
  data() {
    return {
      timer:null,
      charts: null,
      leida: []
    };
  },
  created() {
    // this.initWebSocket();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.encironmental();
    }, 2000);
  },
  destroyed() {
    clearInterval(this.timer);
    // this.websock.close();
  },
  methods: {
    encironmental() {
      if (this.charts === null) {
        this.charts = this.$echarts.init(
          document.querySelector(".encironmental")
        );
      }
      this.charts.setOption({
        backgroundColor: "#1c293a",
        title: {
          x: "17px",
          y: "20px",
          text: "院内环境",
          textStyle: { fontSize: 16, color: "#ffffff" }
        },

        radar: {
          indicator: [
            { name: "温度", max: 300 },
            { name: "湿度", max: 250 },
            { name: "PM2.5", max: 300 },
            { name: "PM10", max: 5 },
            { name: "PM10", max: 200 },
            { name: "NO2", max: 100 }
          ],
          shape: "circle",
          splitNumber: 4,
          name: {
            textStyle: {
              color: "#999999"
            }
          },
          splitLine: {
            lineStyle: {
              color: [
                "rgba(238, 197, 102, 0.1)",
                "rgba(238, 197, 102, 0.2)",
                "rgba(238, 197, 102, 0.4)",
                "rgba(238, 197, 102, 0.6)",
                "rgba(238, 197, 102, 0.8)",
                "rgba(238, 197, 102, 1)"
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#1d5285"
            }
          }
        },
        series: [
          {
            type: "radar",
            lineStyle: {
              width: 1,
              opacity: 0.5
            },
            data: this.leida,
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#18b4e8"
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.1
              }
            }
          }
        ]
      });
    },

    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://" + process.env.ws_host + "//environmentWebsocket";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let actions = { test: "12345" };
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);

      this.leida = redata;
      // console.log(redata);
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("关闭院内环境通道", e);
    }
  }
};
</script>
<style scoped>
.encironmental {
  width: 432px;
  height: 100%;
  float: left;
  margin-right: 20px;
}
</style>

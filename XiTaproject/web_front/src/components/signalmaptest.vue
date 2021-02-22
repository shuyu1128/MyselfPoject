<template>
  <div>
    <div class="zecharts"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      zecharts: "",
      stationarr: [
        { name: "0D011315", value: [] },
        { name: "02011315", value: [] },
        { name: "5E011315", value: [] },
        { name: "5D011315", value: [] }
      ],
      oldxdata: "",
      xdataarr: ""
    };
  },
  created() {},
  mounted() {
    this.initWebSocket();
    this.zecharts = echarts.init(document.querySelector(".zecharts"));
    this.drawLine();
  },
  beforeDestroy() {
    this.websocketclose();
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://" + process.env.ws_host + "/SignalmapWebsocket";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },

    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      console.log(redata);
      if (redata.length != 0) {
        if ((this.oldxdata = "")) {
          this.xdataarr.push(redata[0].datax);
          this.oldxdata = redata[0].datax;
        } else {
          if (redata[0].datax > this.oldxdata) {
            this.xdataarr.push(redata[0].datax);
            this.oldxdata = redata[0].datax;
          } else if (redata[0].datax < this.oldxdata) {
            this.xdataarr.splice(this.xdataarr.length, 0, redata[0].datax);
            this.oldxdata = redata[0].datax;
          } else {
          }
          console.log(this.xdataarr);
        }
      }
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
    drawLine() {
      this.zecharts.setOption({
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    }
  }
};
</script>

<style>
.zecharts {
  height: 500px;
  background-color: aqua;
}
</style>
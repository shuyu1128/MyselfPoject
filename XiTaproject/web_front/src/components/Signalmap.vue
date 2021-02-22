<template>
  <div class="japp">
    <!-- <div></div> -->
    <div class="fustatio">
      <div
        :style="{width:statiow+'px'}"
        v-for="(item,index) in arr"
        :key="index"
        id="statio"
        :class="`e${item.stationname}`"
      ></div>
    </div>
    <div class="title">
      <li>0D011315</li>
      <li>02011315</li>
      <li>5E011315</li>
      <li>5D011315</li>
    </div>
    <el-button type="primary" @click="cleart" class="clear">清空</el-button>
  </div>
</template>

<script>
import echarts from "echarts";
import { drawLine } from "./ECharts/Signalmap.js";
export default {
  data() {
    return {
      dom1: "",
      dom2: "",
      dom3: "",
      dom4: "",
      firstdata: [],
      first: 0,
      statiow: 1715,
      show: true,
      arr: [
        { stationname: "0D011315", datax: [], datay: [] },
        { stationname: "02011315", datax: [], datay: [] },
        { stationname: "5E011315", datax: [], datay: [] },
        { stationname: "5D011315", datax: [], datay: [] }
      ]
    };
  },
  created() {},
  mounted() {
    this.dom1 = echarts.init(document.querySelector(".e0D011315"));
    this.dom2 = echarts.init(document.querySelector(".e02011315"));
    this.dom3 = echarts.init(document.querySelector(".e5E011315"));
    this.dom4 = echarts.init(document.querySelector(".e5D011315"));
    this.initWebSocket();
  },
  beforeDestroy() {
    this.websocketclose();
  },
  methods: {
    cleart() {
      this.arr = [
        { stationname: "0D011315", datax: [], datay: [] },
        { stationname: "02011315", datax: [], datay: [] },
        { stationname: "5E011315", datax: [], datay: [] },
        { stationname: "5D011315", datax: [], datay: [] }
      ];
      this.statiow = 1715;
    },
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
      if (this.first != 1) {
        this.first = 1;
        setTimeout(() => {
          this.firstdata.push(Number(this.arr[0].datax[0]));
          this.arr.forEach(element => {
            if (Number(element.datax[0]) < this.firstdata[0]) {
              this.firstdata[0] = element.datax;
            }
          });
          console.log(this.firstdata[0]);
          this.arr.forEach(element => {
            if (element.datax[0] != this.firstdata[0]) {
              for (
                var c = 0;
                c < Number(element.datax[0]) - this.firstdata[0];
                c++
              ) {
                element.datax.unshift(this.firstdata[0] + c);
                element.datay.unshift(null);
              }
            }
          });
        }, 4000);
      }

      for (var i = 0; i < this.arr.length; i++) {
        for (var k = 0; k < redata.length; k++) {
          if (this.arr[i].stationname == redata[k].stationname) {
            let newtime = "";
            let oldtime = "";
            if (this.arr[i].datax.length != 0) {
              newtime = redata[k].datax;
              oldtime = this.arr[i].datax[this.arr[i].datax.length - 1];
              if (Number(newtime) - Number(oldtime) > 1) {
                console.log(Number(newtime) - Number(oldtime));
                for (var t = 1; t < Number(newtime) - Number(oldtime); t++) {
                  let pushtime = "";
                  pushtime =
                    Number(redata[k].datax) -
                    (Number(newtime) - Number(oldtime) - t);
                  this.arr[i].datax.push(pushtime);
                  this.arr[i].datay.push(null);
                }
              }
            }
            this.arr[i].datax.push(redata[k].datax);
            this.arr[i].datay.push(redata[k].datay);
          }
        }
      }
      // 渲染图表

      this.arr.forEach(element => {
        switch (`.e${element.stationname}`) {
          case ".e0D011315":
            drawLine(element.datax, element.datay, this.dom1);
            break;
          case ".e02011315":
            drawLine(element.datax, element.datay, this.dom2);
            break;
          case ".e5E011315":
            drawLine(element.datax, element.datay, this.dom3);
            break;
          case ".e5D011315":
            drawLine(element.datax, element.datay, this.dom4);
            break;
        }

        this.statiow = this.statiow + 2;
        var cmyChart = echarts.getInstanceByDom(
          document.querySelector(`.e${element.stationname}`)
        );

        cmyChart.resize();
      });
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    }
  }
};
</script>

<style scoped>
.japp {
  position: relative;
  height: 820px;
}
.clear {
  position: absolute;
  bottom: 10px;
  right: 30px;
}
#statio {
  /* width: 5000px; */
  height: 180px;
  border-bottom: 1px solid #fff;
  margin-bottom: 20px;
}
.fustatio {
  width: 90%;
  overflow-x: auto;
  /* height: 250px; */
  float: left;
}
.title {
  width: 8%;
  float: left;
}
.title li {
  height: 180px;
  border-bottom: 1px solid #fff;
  margin-bottom: 20px;
  text-align: center;
  line-height: 180px;
  font-size: 30px;
  font-weight: 700;
}
</style>
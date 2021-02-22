<template>
    
    <!-- <div class="chart"> -->
      <!-- <div style="height:41px">
        <el-select
          v-model="timevalue"
          placeholder="请选择"
          style="width:90px; float:right"
          @change="zhi"
        >
          <el-option v-for="item in time" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button style="position: relative;left:10px" size="small" type="primary" icon="el-icon-download" circle></el-button>
      </div> -->

      <div class="jietu"  id="mymap">
      <div id="xinlubiao"></div>
      <div id="xueyabiao"></div>
      <div id="heid"></div>
      </div>
    <!-- </div> -->
 
</template>
<script>
import westeros from "../../components/ECharts/theme/westeros.js";
export default {
  data() {
    return {
lowPressure:'',
highPressure:'',
heartRate:'',
wristTemperature:'',
      blood:170,
      that: 170,
      timevalue: "day",
      time: [
        {
          value: "day",
          label: "一天"
        },
        {
          value: "halfday",
          label: "半天"
        },
        {
          value: "hours",
          label: "小时"
        }
      ],
      zxinlv: {
      },
ztiwen: {
      },
      zxueya: {
      }
    };
  },
  props:{
    did:null,
    returnPictureMaps:null
  },
  created(){
    console.log('timesss',this.returnPictureMaps);
this.zxinlv=this.returnPictureMaps.heartMap
this.zxueya=this.returnPictureMaps.pressureMap
this.ztiwen=this.returnPictureMaps.temperatureMap
  },
  mounted() {
      // this.$ajax
      //   .post(
      //     process.env.API_HOST + "/person/realtimeHealth",
      //     `personid=${this.did}&type=${this.timevalue}`
      //   )
      //   .then(respones => {
      //     console.log('图表数据',respones.data);
      //     this.zxinlv=respones.data.heartMap
      //     this.zxueya=respones.data.pressureMap
      //     this.ztiwen=respones.data.temperatureMap
      //   }).then(res=>{
       this.$nextTick(() => {
      //  执行echarts方法
        this.ini()
      })
           
        // })
   
    
  },
//   watch: {
    
//     timevalue(newvalue) {
// this.gettabledata(newvalue)
//     },
//     did(val){
//       this.gettabledata(newvalue)
//     }
//   },
  methods: {
    
    zhi(value) {},
    ini() {
      let xinlu = this.$echarts.init(
        document.querySelector("#xinlubiao"),
        "westeros"
      );
      let xueyabiao = this.$echarts.init(
        document.querySelector("#xueyabiao"),
        "westeros"
      );
      let heid = this.$echarts.init(
        document.querySelector("#heid"),
        "westeros"
      );

      xinlu.setOption({
        title: {
          text: "心率"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["bpm"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.zxinlv.time
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "bpm",
            type: "line",
            itemStyle: {
              normal: {
                color: "#51c1e5",
                lineStyle: {
                  color: "#51c1e5"
                }
              }
            },
            data: this.zxinlv.data
          }
        ]
      });
      xueyabiao.setOption({
        title: {
          text: "血压"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["高压", "低压"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.zxueya.time
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "高压",
            type: "line",
            itemStyle: {
              normal: {
                color: "#51c1e5",
                lineStyle: {
                  colzor: "#51c1e5"
                }
              }
            },
            data: this.zxueya.datag
          },
          {
            name: "低压",
            type: "line",
            itemStyle: {
              normal: {
                color: "#eba9d7",
                lineStyle: {
                  color: "#eba9d7"
                }
              }
            },
            data: this.zxueya.datad
          }
        ]
      });
      heid.setOption({
        title: {
          text: "体温"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["℃"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.ztiwen.time
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "℃",
            type: "line",
            itemStyle: {
              normal: {
                color: "#4aa3ff",
                lineStyle: {
                  color: "#4aa3ff"
                }
              }
            },
            data: this.ztiwen.data
          }
        ]
      });
    }
  }
};
</script>

<style scoped>

#xinlubiao {
  height: 200px;
  width: 608px;
  margin-bottom: 20px;
}
#xueyabiao {
  height: 200px;
  width: 608px;
  margin-bottom: 20px;
}

.xueya {
  float: left;
  margin-right: 10px;
  width: 65px;
  height: 64px;
  background-position: 100% 100%;
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
#heid {
  width: 608px;
  height: 200px;
}
</style>



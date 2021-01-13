<template>
  <div id="lineEchart" style="width:100%;background-color:#ffffff;">
    <div :id="id" class="test" :style="{float: 'left',width: 84+'%', height: height}"></div>
    <div class="select_area">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>查看区域</span>
          <el-checkbox
            style="float: right; padding: 3px 0"
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">全选</el-button> -->
        </div>
        <el-checkbox-group v-model="checkedAreas" @change="handleCheckedAreasChange">
          <template v-for="area in areas">
            <p :key="area">
              <el-checkbox :label="area">{{area}}</el-checkbox>
            </p>
          </template>
        </el-checkbox-group>
      </el-card>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import westeros from "./theme/westeros";
export default {
  name: "lineEcharts",
  props: {
    id: {
      type: String,
      default: "myChart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      checkAll: false,
      // 当前选中病区
      checkedAreas: ["上海", "北京"],
      // 全部可选择病区
      areas: [],
      // 病区情况数据
      allAreasData: null,
      echartsData: [],
      isIndeterminate: true,
      xdate: [],
    };
  },
  created() {
    this.$ajax
      .post(
        process.env.API_HOST + "/homePage/getHospitalStatisticsJson",
        `userid=${this.$store.state.token}`
      )
      .then((respones) => {
        // 获取右侧选择框可选择内容
        respones.data.bingquN.forEach((element) => {
          this.areas.push(element.bingqun);
        });
        this.checkedAreas = this.areas;
        this.allAreasData = respones.data.bingquN;
        this.xdate = respones.data.dateGroup;
        this.handleCheckedAreasChange(this.checkedAreas);
      });
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedAreas = val ? this.areas : [];
      this.isIndeterminate = false;
      this.handleCheckedAreasChange(this.checkedAreas);
    },
    handleCheckedAreasChange(val) {
      // 全选状态
      let checkedCount = val.length;
      this.checkAll = checkedCount === this.areas.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.areas.length;

      // 图表数据处理
      let selectData = [];
      let zruzhu = [0, 0, 0, 0, 0, 0, 0];
      let zliyuan = [0, 0, 0, 0, 0, 0, 0];
      let zwaichu = [0, 0, 0, 0, 0, 0, 0];
      let zjinji = [0, 0, 0, 0, 0, 0, 0];
      let zteshu = [0, 0, 0, 0, 0, 0, 0];
      let dataObj = {
        ruzhu: [],
        liyuan: [],
        waichu: [],
        jinji: [],
        teshu: [],
      };
      this.allAreasData.forEach((allAreasDataElement) => {
        val.forEach((valElement) => {
          if (valElement === allAreasDataElement.bingqun) {
            selectData.push(allAreasDataElement.data);
          }
        });
      });
      selectData.forEach((welement) => {
        welement.forEach((element) => {
          switch (element.name) {
            case "入住人数":
              dataObj.ruzhu.push(element.data);
              break;
            case "离院人数":
              dataObj.liyuan.push(element.data);
              break;
            case "外出人数":
              dataObj.waichu.push(element.data);
              break;
            case "紧急状况":
              dataObj.jinji.push(element.data);
              break;
            case "特殊关注":
              dataObj.teshu.push(element.data);
              break;
          }
        });
      });
      let dataArr = Object.values(dataObj);

      dataArr.forEach((welement, index) => {
        welement.forEach((element) => {
          for (let i = 0; i < 7; i++) {
            if (index === 0) zruzhu[i] = zruzhu[i] + element[i];
            if (index === 1) zliyuan[i] = zliyuan[i] + element[i];
            if (index === 2) zwaichu[i] = zwaichu[i] + element[i];
            if (index === 3) zjinji[i] = zjinji[i] + element[i];
            if (index === 4) zteshu[i] = zteshu[i] + element[i];
          }
        });
      });
      this.echartsData = [zruzhu, zliyuan, zwaichu, zjinji, zteshu];
      this.initChart();
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id), "westeros");

      this.chart.setOption({
        title: {
          text: "院内情况统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["入住人数", "离院人数", "外出人数", "紧急状况", "特殊关注"],
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
          data: this.xdate,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "入住人数",
            type: "line",

            itemStyle: {
              normal: {
                color: "#4aa3ff",
                lineStyle: {
                  color: "#4aa3ff",
                },
              },
            },
            data: this.echartsData[0],
          },
          {
            name: "离院人数",
            type: "line",

            itemStyle: {
              normal: {
                color: "#65c8e8",
                lineStyle: {
                  color: "#65c8e8",
                },
              },
            },
            data: this.echartsData[1],
          },
          {
            name: "外出人数",
            type: "line",

            itemStyle: {
              normal: {
                color: "#efb8de",
                lineStyle: {
                  color: "#efb8de",
                },
              },
            },
            data: this.echartsData[2],
          },
          {
            name: "紧急状况",
            type: "line",

            itemStyle: {
              normal: {
                color: "#9bbce4",
                lineStyle: {
                  color: "#9bbce4",
                },
              },
            },
            data: this.echartsData[3],
          },
          {
            name: "特殊关注",
            type: "line",
            itemStyle: {
              normal: {
                color: "#9bd7e4",
                lineStyle: {
                  color: "#9bd7e4",
                },
              },
            },
            data: this.echartsData[4],
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.select_area {
  width: 200px;
  height: 352px;
  float: left;
  padding: 24px 0 24px 0;
  margin-left: 20px;
}
.box-card {
  height: 100%;
}
</style>

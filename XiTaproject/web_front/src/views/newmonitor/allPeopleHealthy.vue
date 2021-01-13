<template>
  <div>
    <div class="button_left_N" @click="drawersizefun">
      <i class="fa fa-angle-double-left fa-2x"></i>
    </div>
    <div class="allpeoplehealthy" v-infinite-scroll="allpeoplehealthyLoad">
      <el-card
        v-for="item in allphysicalConditionList"
        :key="item.id"
        :style="{width:allpeoplehealthy_box_width,boxShadow: item.state=='正常'?'0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)':(item.state=='关注'?'0 2px 4px rgba(245, 177, 21, 1), 0 0 6px rgba(245, 220, 165, 1)':'0 2px 4px rgba(245, 128, 133, 1), 0 0 6px rgba(245, 195, 197, 1)')}"
        class="allpeoplehealthy_box"
        shadow="never"
      >
        <div slot="header" class="clearfix">
          <span>{{item.name}}</span>
          <el-badge style="float: right; padding: 3px 0" :value="item.peopleCount" class="item">
            <span @click="openHistory(item.id)" style="color: #409EFF;">历史警报</span>
          </el-badge>
        </div>
        <div>
          <li style="margin-bottom: 8px;">
            <span>血压(mmHg)：</span>
            <span>{{item.highPressure}}/{{item.lowPressure}}</span>
          </li>
          <li style="margin-bottom: 8px;">
            <span>心率(bpm)：</span>
            <span v-if="item.heartRate=='255'||item.heartRate=='0'">--</span>
            <span v-else>{{item.heartRate}}</span>
          </li>
          <li>
            <span>体温（℃）：</span>
            {{item.wristTemperature}}
          </li>
        </div>
      </el-card>

      <el-drawer size="40%" :append-to-body="true" :visible.sync="innerDrawer">
        <h3 slot="title">历史危机</h3>
        <el-table :data="tableData" height="100%" style="width: 100%">
          <el-table-column prop="healthstatename" label="异常情况"></el-table-column>
          <el-table-column prop="personname" label="姓名"></el-table-column>
          <el-table-column prop="createtime" label="开始时间" width="160"></el-table-column>
          <el-table-column align="center" prop="highpressure" label="高压"></el-table-column>
          <el-table-column align="center" prop="lowpressure" label="低压"></el-table-column>
          <el-table-column align="center" prop="heartrate" label="心率">
            <template slot-scope="scope">
              <span
                v-if="scope.row.heartrate!='255'&&scope.row.heartrate!='0'"
              >{{scope.row.heartrate}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="wristtemperature" label="体温"></el-table-column>
        </el-table>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newallphysicalConditionList: [],
      newallphysicalConditionListCount: 30,
      // 抽屉显示状态
      peoplelength: [],
      allpeoplehealthy_box_width: "258px",
      drawersize: "64%",
      drawer: false,
      innerDrawer: false,
      allallpeoplehealthys: this.$store.state.allpeopleHealthy,
      // 获取系统时间状态
      time: "",
      // 历史警报表格数据
      tableData: []
    };
  },
  created() {
    this.$ajax
      .post(process.env.API_HOST + "/mainPage/getAttentionNum")
      .then(respones => {
        this.peoplelength = respones.data;
      });
  },

  computed: {
    allphysicalConditionList() {
      let arr = [];
      arr = this.$store.state.websocket.allPeoplesdataNoloushu.slice(
        0,
        this.newallphysicalConditionListCount
      );
      if (this.peoplelength.length !== 0) {
        this.peoplelength.forEach(peoplelengthElement => {
          arr.forEach(arrElement => {
            if (peoplelengthElement.personId == arrElement.id) {
              arrElement.peopleCount = peoplelengthElement.count;
            }
          });
        });
      }
      return arr;
    }
  },
  watch: {},
  methods: {
    // 健康人员滚动底部赋值方法
    allpeoplehealthyLoad() {
      this.newallphysicalConditionListCount =
        this.newallphysicalConditionListCount + 8;
    },
    // 返回主页
    goback() {
      this.$router.push("/index");
    },
    drawersizefun() {
      this.allpeoplehealthy_box_width = "276px";
      this.$emit("openScreen");
    },
    // 打开历史健康表格
    openHistory(id) {
      this.$ajax
        .post(
          process.env.API_HOST + "/mainPage/getAttentionByPersonId",
          `personId=${id}`
        )
        .then(respones => {
          this.tableData = respones.data;
          this.tableData.forEach(element => {
            element.createtime = this.formatTime(
              element.createtime,
              "Y-M-D h:m:s"
            );
          });
        });
      this.innerDrawer = true;
    },
    // 参数number为毫秒时间戳，format为需要转换成的日期格式
    formatTime(number, format) {
      let time = new Date(number);
      let newArr = [];
      let formatArr = ["Y", "M", "D", "h", "m", "s"];
      newArr.push(time.getFullYear());
      newArr.push(this.formatNumber(time.getMonth() + 1));
      newArr.push(this.formatNumber(time.getDate()));
      newArr.push(this.formatNumber(time.getHours()));
      newArr.push(this.formatNumber(time.getMinutes()));
      newArr.push(this.formatNumber(time.getSeconds()));

      for (let i in newArr) {
        format = format.replace(formatArr[i], newArr[i]);
      }
      return format;
    },
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    }
  }
};
</script>
<style scoped>
.allpeoplehealthy {
  height: 800px;
  padding-left: 45px;
  padding-top: 32px;
  overflow-y: auto;
  background: #f0f2f5;
}
.allpeoplehealthy_box {
  float: left;
  margin-bottom: 12px;
  margin-right: 32px;
}
.button_left {
  position: fixed;
  width: 40px;
  height: 50px;
  background-color: #ffffff;
  color: #72767b;
  text-align: center;
  line-height: 50px;
  border-radius: 8px 0 0 8px;
  right: 0;
  top: 50%;
  z-index: 2;
}
.button_left_N {
  font-size: 23px;
  position: absolute;
  width: 40px;
  height: 50px;
  background-color: #ffffff;
  color: #72767b;
  text-align: center;
  line-height: 50px;
  border-radius: 8px 0 0 8px;
  left: -40px;
  top: 50%;
  z-index: 2078;
}
@media screen and (height: 1080px) {
  .allpeoplehealthy {
    height: 950px;
    padding-top: 20px;
    padding-left: 45px;
    overflow-y: auto;
  }
}
</style>
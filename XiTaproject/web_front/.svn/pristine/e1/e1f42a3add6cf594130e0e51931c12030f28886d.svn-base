<template>
  <div>
    <el-row class="v-step1" style="margin-bottom:32px;">
      <el-col :span="24">
        <span>姓名：</span>
        <el-select
          style="width:200px;margin-right:12px;"
          v-model="personName"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in allSeniors"
            :key="item.ID"
            :label="item.FULLNAME"
            :value="item.FULLNAME"
          ></el-option>
        </el-select>
        <span>开始时间：</span>
        <el-date-picker
          v-model="beginTime"
          type="datetime"
          style="width:200px;margin-right:12px;"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择开始时间"
        ></el-date-picker>
        <span>结束时间：</span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          style="width:200px;margin-right:12px;"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择结束时间"
        ></el-date-picker>
        <el-button type="primary" @click="handleCurrentChange(1)">搜索</el-button>
        <el-button type="primary" @click="downExcel">导出</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          class="v-step2"
          v-loading="tableLoading"
          height="625"
          :data="historicalAlert.rtdAttentionPOList"
          border
          style="width: 100%;margin-bottom:10px"
        >
          <el-table-column align="center" prop="healthstatename" label="异常情况"></el-table-column>
          <el-table-column align="center" prop="personname" label="姓名"></el-table-column>
          <el-table-column align="center" prop="createtime" label="开始时间" width="160"></el-table-column>
          <el-table-column align="center" prop="roomname" label="位置"></el-table-column>
          <el-table-column align="center" prop="highpressure" label="高压">
            <template slot-scope="scope">--</template>
          </el-table-column>
          <el-table-column align="center" prop="lowpressure" label="低压">
            <template slot-scope="scope">--</template>
          </el-table-column>
          <el-table-column align="center" prop="heartrate" label="心率">
            <template slot-scope="scope">
              <span
                v-if="scope.row.heartrate!='255'&&scope.row.heartrate!='0'"
              >{{scope.row.heartrate}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="wristtemperature" label="体温">
            <template slot-scope="scope">--</template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="12"
        layout="total, prev, pager, next, jumper"
        :total="historicalAlert.total"
      ></el-pagination>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableLoading:true,
      currentPage: 1,
      personName: "",
      beginTime: "",
      endTime: "",
      tableData: [],
    };
  },
  created() {
    this.$store.dispatch("person_getPersonList", {
      id: "",
      name: "",
      sex: "",
      roomN: "",
      state: "",
      hasDevice: "",
    });
    this.handleCurrentChange(1);
  },
  computed: {
    // 全部老人
    allSeniors() {
      return this.$store.state.details.allSeniors;
    },
    historicalAlert() {
      if (
        JSON.stringify(this.$store.state.management.historicalAlert) !== "{}"
      ) {
        this.$store.state.management.historicalAlert.rtdAttentionPOList.forEach(
          (element) => {
            element.createtime = this.formatTime(
              element.createtime,
              "Y-M-D h:m:s"
            );
          }
        );
      }
      return this.$store.state.management.historicalAlert;
    },
  },
  methods: {
    downExcel() {
      // 导出关注信息
     if (!this.beginTime) {
        this.beginTime = '';
      }
      if (!this.endTime) {
        this.endTime = '';
      }
      window.location.href = `${process.env.API_HOST}/mainPage/getAttentionExcel?personName=${this.personName}&beginTime=${this.beginTime}&endTime=${this.endTime}`;
    },
    // 切换页数
    handleCurrentChange(data) {
      this.currentPage = data;
      if (!this.beginTime) {
        this.beginTime = '';
      }
      if (!this.endTime) {
        this.endTime = '';
      }
      this.tableLoading=true
      this.$store.dispatch("mainPage_getAttention", {
        personName: this.personName,
        beginTime: this.beginTime,
        endTime: this.endTime,
        pageCount: 12,
        pageNum: data,
      }).then(res=>{
        this.tableLoading=false
      })
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
    },
  },
};
</script>
<style scoped>
</style>

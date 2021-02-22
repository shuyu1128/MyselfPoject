<template>
  <div>
    <div class="Selfchecking-step1">
      <span>设置开始时间：</span>
      <el-date-picker
      :editable="false"
        :clearable="false"
        style="margin-right:20px;width:195px;"
        v-model="zidongtime"
        type="datetime"
        placeholder="选择日期时间"
      ></el-date-picker>
      <span>设置自检周期：</span>
      <el-input style="width:80px;" v-model="value" placeholder="请输入数值"></el-input>
      <el-select v-model="Company" style="width:86px;" placeholder="单位">
        <el-option
          v-for="item in options"
          :key="item.label1"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button style="margin-left:10px;" type="primary" @click="consoletim">确定</el-button>
      <el-button style="margin-left:10px;" type="primary" @click="Manual">手动自检</el-button>
    </div>
    <el-table
      class="Selfchecking-step2"
      :data="tabledata"
      height="662"
      border
      style="width: 785px;margin-top:20px;"
    >
      <el-table-column align="center" prop="begintime" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="endtime" label="结束时间"></el-table-column>
      <el-table-column align="center" prop="abnormalnum" label="异常个数"></el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <el-button type="text" @click="select">刷新</el-button>
        </template>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id)" type="text">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详情表格 -->
    <el-dialog title="详情" :visible.sync="dialogTableVisible">
      <el-table height="241" border :data="xqdata">
        <el-table-column align="center" property="dataname" label="设备名称" width="150"></el-table-column>
        <el-table-column align="center" property="datacode" label="设备编码" width="200"></el-table-column>
        <!-- <el-table-column align="center" property="address" label="使用人"></el-table-column> -->
        <el-table-column align="center" property="abnormal" label="异常码"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      tabledata: [{}],
      xqdata: [{}],
      zidongtime: "",
      value: "",
      Company: "",
      options: [
        {
          label: "分钟",
          value: "minute",
        },
        {
          label: "小时",
          value: "hour",
        },
        {
          label: "天",
          value: "day",
        },
      ],
    };
  },
  created() {
    this.$ajax
      .post(
        process.env.API_HOST + "/selfExamination/getSelfExaminationTasksettings"
      )
      .then((response) => {
        response.data.forEach((element) => {
          if (element.type == "device") {
            this.Company = element.unit;
            this.zidongtime = element.beigintime;
            this.value = element.cycle;
          }
        });
      });
    // 查询设备
    this.select();
  },
  methods: {
    // 查询设备
    select() {
      this.$ajax
        .post(
          process.env.API_HOST + "/selfExamination/getDeviceSelfExaminationP"
        )
        .then((response) => {
          this.tabledata = response.data;
        });
    },
    consoletim() {
      if (this.value != "") {
        var seperator1 = "-";
        var seperator2 = ":";
        var date = new Date();
        date.setTime(this.zidongtime);
        // var date=this.zidongtime
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate =
          date.getFullYear() +
          seperator1 +
          month +
          seperator1 +
          strDate +
          " " +
          date.getHours() +
          seperator2 +
          date.getMinutes() +
          seperator2 +
          date.getSeconds();

        this.$ajax
          .post(
            process.env.API_HOST + "/selfExamination/insertSelfExamination",
            `beginTime=${currentdate}&cycle=${this.value}&unit=${this.Company}&type=device`
          )
          .then((response) => {
            if (response.data == "success") {
              this.$message({
                message: "设置成功",
                type: "success",
              });
            } else {
              this.$message.error("设置失败");
            }
          });
      } else {
        this.$message.warning("请输入完整！");
      }
    },
    Manual() {
      // 设备手动检查
      this.$ajax
        .post(
          process.env.API_HOST + "/selfExamination/getDeviceSelfExamination"
        )
        .then((response) => {
          if (response.data == "success") {
            this.$message({
              message: "正在检查，请稍后...",
              type: "success",
            });
            this.select();
          } else {
            this.$message.error("检查失败");
          }
        });
    },
    handleClick(id) {
      // 通过pid查询自检问题设备信息
      this.$ajax
        .post(
          process.env.API_HOST + "/selfExamination/getSelfExaminationSByPId",
          `pid=${id}`
        )
        .then((response) => {
          this.xqdata = response.data;
        });
      this.dialogTableVisible = true;
    },
  },
};
</script>
<style scoped>
</style>

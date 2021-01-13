<template>
  <div class="health-configuration">
    <div style="margin-bottom:20px;">
      <el-tag style="margin-bottom:10px;">主动推送院数据</el-tag>
      <br />
      <span>开始时间：</span>
      <el-date-picker
        style="width:196px;margin-right:18px"
        v-model="beginDate"
        type="datetime"
        placeholder="选择日期时间"
      ></el-date-picker>
      <span>结束时间：</span>
      <el-date-picker style="width:196px;" v-model="endDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
      <el-button type="primary" style="margin-left:20px;" @click="pushdata">确定</el-button>
    </div>
    <div style="margin-bottom:20px;">
      <el-tag style="margin-bottom:10px;">向服务器注册本地公网 IP</el-tag>
      <br />
      <span>院名称：</span>
      <el-input style="width:198px;margin-right:18px" v-model="name" placeholder="请输入内容"></el-input>
      <span>ip地址：</span>
      <el-input style="width:198px" v-model="ip" placeholder="请输入内容"></el-input>
      <el-button type="primary" style="margin-left:20px;" @click="getip">确定</el-button>
    </div>
    <el-table height=" 72%" class="HealthConfiguration-step1" :data="tableData" style="width: 100%">
      <el-table-column prop="basname" label="名称" width="180"></el-table-column>
      <el-table-column label="当前值" width="180">
        <template slot-scope="scope">
          <span
            v-if="scope.row.basname==='均值滤波'||scope.row.basname==='Kalman滤波'||scope.row.basname==='平滑'||scope.row.basname==='遮罩'||scope.row.basname==='电子围栏自动添加'"
          >{{scope.row.bascode=='0'?'开':'关'}}</span>
          <span v-else>{{scope.row.bascode}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="basdesc" label="备注" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.basname==='均值滤波'||scope.row.basname==='Kalman滤波'||scope.row.basname==='平滑'||scope.row.basname==='遮罩'||scope.row.basname==='电子围栏自动添加'"
            :value="bascodeFun(scope.row.bascode)"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="((val)=>{changebascode(val, scope.row.id)})"
          ></el-switch>
          <el-button v-else @click="handleClick(scope.row)" type="text">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :close-on-click-modal="false" title="修改" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="updateBasData">
        <el-form-item label="值">
          <el-input v-model="updateBasData.bascode" placeholder="请输入值"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="updateBasData.basdesc" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      beginDate: "",
      endDate: "",
      ip: "",
      name: "",
      tableData: [],
      dialogVisible: false,
      id: "",
      updateBasData: {
        id: "",
        basdesc: "",
        bascode: "",
      },
    };
  },
  created() {
    // 获取全部基本信息数据
    this.$ajax.post(process.env.API_HOST + "/basic/getBasData").then((res) => {
      this.tableData = res.data;
      console.log(res.data);
    });
  },
  methods: {
    bascodeFun(type) {
      if (type == "0") {
        return true;
      } else {
        return false;
      }
    },
    changebascode(data, id) {
      let obj = {
        id,
        bascode: data ? 0 : 1,
      };
      // 修改基本信息数据
      this.$ajax
        .post(
          process.env.API_HOST + "/basic/updateBasData",
          `json=${JSON.stringify(obj)}`
        )
        .then((res) => {
          this.$ajax
            .post(process.env.API_HOST + "/basic/getBasData")
            .then((res) => {
              this.tableData = res.data;
              this.$message({
                message: "修改成功",
                type: "success",
              });
            });
        });
    },
    // 向服务器注册本地公网 IP
    getip() {
      this.$ajax
        .post(
          process.env.API_HOST + "/thetada/dr_ipr",
          `ip=${this.ip}&name=${this.name}`
        )
        .then((res) => {
          this.$message(res.data);
          console.log("ip结果", res.data);
        });
    },
    // 推送院数据接口
    pushdata() {
      this.$ajax
        .post(
          process.env.API_HOST + "/thetada/da_push",
          `beginDate=${this.tftime(this.beginDate)}&endDate=${this.tftime(
            this.endDate
          )}`
        )
        .then((res) => {
          this.$message(res.data);
          console.log("推送结果", res.data);
        });
    },
    submit() {
      // 修改基本信息数据
      this.$ajax
        .post(
          process.env.API_HOST + "/basic/updateBasData",
          `json=${JSON.stringify(this.updateBasData)}`
        )
        .then((res) => {
          this.$ajax
            .post(process.env.API_HOST + "/basic/getBasData")
            .then((res) => {
              this.tableData = res.data;
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.dialogVisible = false;
            });
        });
    },
    handleClick(data) {
      console.log(data);
      this.updateBasData = $.extend(true, {}, data);
      this.dialogVisible = true;
    },
    // 时间格式转换
    tftime(d) {
      var date = new Date(d);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
  },
};
</script>
<style scoped>
.health-configuration {
  width: 656px;
  height: 100%;
}
.HealthConfiguration-step1 {
  /* height: 50%; */
}
</style>

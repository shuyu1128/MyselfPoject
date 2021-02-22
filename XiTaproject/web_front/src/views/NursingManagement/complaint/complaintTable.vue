<template>
  <div class="complaint_table">
    <el-dialog title="详情" :visible.sync="dialogVisible" width="50%">
      <complaintDetails v-if="dialogVisible" :detailsForm="detailsForm" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
        <el-button
          v-if="detailsForm.complaintstate == '0'"
          type="primary"
          @click="overSubmit"
        >
          完成处理
        </el-button>
      </span>
    </el-dialog>
    <el-table height="100%" border="" :data="tableData" style="width: 100%">
      <el-table-column align="center" prop="familyname" label="家属姓名">
      </el-table-column>
      <el-table-column align="center" prop="familyphone" label="家属联系方式">
      </el-table-column>
      <el-table-column align="center" prop="nursingname" label="护工姓名">
      </el-table-column>
      <el-table-column align="center" prop="nursingphone" label="护工联系方式">
      </el-table-column>
      <el-table-column align="center" prop="nursingType" label="服务类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.nursingType === 'person'" type="info">
            常规服务
          </el-tag>
          <el-tag v-if="scope.row.nursingType === 'team'"> 组内服务 </el-tag>
          <el-tag v-if="scope.row.nursingType === 'cycle'" type="warning">
            周期服务
          </el-tag>
          <el-tag v-if="scope.row.nursingType === 'public'" type="success">
            公共服务
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="fullname" label="长者姓名">
      </el-table-column>
      <el-table-column align="center" label="投诉时间">
        <template slot-scope="scope">
          <span>
            {{
              $allMethods.formatTimeStamp(scope.row.createdtime, "Y-M-D h:m")
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="nursingType" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === '0'" type="warning">
            未处理
          </el-tag>
          <el-tag v-if="scope.row.state === '1'" type="success">
            已处理
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetails(scope.row.id)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import complaintDetails from "./complaintDetails";
export default {
  components: {
    complaintDetails,
  },
  data() {
    return {
      detailsForm: "",
      dialogVisible: false,
      tableData: [
        {
          // 投诉内容
          complaintContent: "",
          // 服务类型
          nursingType: "",
          // 投诉状态
          state: "",
          // 投诉评审结果
          complaintResults: "",
          // 投诉时间
          createdtime: "",
          // 家属姓名
          familyname: "",
          // 家属联系方式
          familyphone: "",
          // 护工姓名
          nursingname: "",
          // 护工联系方式
          nursingphone: "",
          // 长者姓名
          fullname: "",
        },
      ],
    };
  },
  props: {
    slelctForm: null,
  },
  created() {
    this.getTableData();
  },
  methods: {
    overSubmit() {
      // 投诉处理
      this.$prompt("请输入投诉处理结果", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          let url = process.env.API_HOST + "/prnComplaint/updateComplaint";
          let formData = `complaintid=${this.detailsForm.id}&complaintResults=${value}&userid=${this.$store.state.token}`;
          //  投诉处理
          this.$ajax.post(url, formData).then((res) => {
            if (res.data.state == "success") {
              this.getTableData();
              this.$message.success("处理成功");
              this.dialogVisible = false;
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },
    handleDetails(id) {
      //  通过投诉id 查询投诉具体信息
      this.$ajax
        .post(
          process.env.API_HOST + "/prnComplaint/getComplaintById",
          `complaintid=${id}`
        )
        .then((res) => {
          this.detailsForm = res.data;
          this.dialogVisible = true;
          console.log(this.detailsForm);
          if (typeof this.detailsForm.imgsrc !== "undefined") {
            let obj = this.detailsForm.imgsrc.split(",");
            this.detailsForm.imgsrcarr = Object.values(obj);
            console.log(this.detailsForm.imgsrcarr);
          }
        });
    },
    getTableData() {
      // 查看投诉列表信息
      this.$ajax
        .post(
          process.env.API_HOST + "/prnComplaint/getComplaintList",
          `search=${JSON.stringify(this.slelctForm)}`
        )
        .then((res) => {
          this.tableData = res.data;
        });
    },
  },
};
</script>

<style scoped>
.complaint_table {
  height: 100%;
}
</style>

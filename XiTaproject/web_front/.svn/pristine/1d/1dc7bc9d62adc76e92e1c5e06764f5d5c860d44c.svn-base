<template>
  <div class="table_family">
    <!-- 关联长者对话框 -->
    <el-dialog title="关联长者" :visible.sync="addSeniorBtn">
      <div v-loading="dialogLoading" class="selectPeople">
        <div style="margin-bottom: 20px; overflow: hidden">
          <li style="float: right">
            <span> 长者姓名查询： </span>
            <el-input
              style="width: 180px"
              size="small"
              v-model="addSeniorSelect"
              placeholder="请输入"
            ></el-input>
          </li>
        </div>
        <div class="checkbox-group-style">
          <el-checkbox-group v-model="checkPelple" size="small">
            <el-checkbox
              v-for="item in nonePeople.filter(
                (data) =>
                  !addSeniorSelect ||
                  data.fullname
                    .toLowerCase()
                    .includes(addSeniorSelect.toLowerCase())
              )"
              :key="item.id"
              :label="item.id"
              border
              >{{ item.fullname }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSeniorBtn = false">取 消</el-button>
        <el-button type="primary" @click="submitSeniorForm"> 确 定 </el-button>
      </div>
    </el-dialog>

    <updateFamily ref="refupdate" @updateOk="updateOk" />
    <el-table
      v-loading="loadingTable"
      border
      height="100%"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column align="center" prop="account" label="账号" width="180">
      </el-table-column>
      <el-table-column align="center" prop="nickname" label="姓名">
      </el-table-column>
      <el-table-column align="center" prop="phone" label="联系方式">
      </el-table-column>
      <el-table-column align="center" label="操作" width="360">
        <template slot-scope="scope">
          <el-button size="mini" @click="openaddSenior(scope.row.id)">
            关联长者
          </el-button>
          <el-button size="mini" @click="changePassword(scope.row.id)">
            重置密码
          </el-button>
          <el-button size="mini" @click="update(scope.row)"> 编辑 </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import updateFamily from "./updateFamily";
export default {
  components: {
    updateFamily,
  },
  data() {
    return {
      nowId: "",
      // 可勾选长者列表
      nonePeople: [],
      // 关联长者选中值
      checkPelple: [],
      // 关联长者对话框状态
      addSeniorBtn: false,
      // 关联长者搜索框
      addSeniorSelect: "",
      loadingTable: false,
      dialogLoading: false,
      searchForm: {
        nickname: "",
      },
      tableData: [
        {
          // 账号
          account: "hyb1991",
          // 密码
          password: "123456",
          // 姓名
          nickname: "韩一斌",
          // 联系方式
          phone: "13091443416",
        },
      ],
    };
  },
  created() {
    this.getTableData({
      nickname: "",
    });
  },
  methods: {
    // 打开关联长者对话框
    openaddSenior(id) {
      this.nowId = id;
      this.addSeniorBtn = true;
      this.dialogLoading = true;
      var that = this;
      (async function getAddRouters() {
        that.checkPelple = await that.getPersonListByFamily(id);
        that.nonePeople = await that.getFamilyPersonAndNoFamilyList(id);
        that.dialogLoading = false;
      })();
    },
    // 获取家属人员列表
    getPersonListByFamily(id) {
      return this.$ajax
        .post(
          process.env.API_HOST + "/sysFamilyUser/getPersonListByFamily",
          `familyid=${id}`
        )
        .then((res) => res.data);
    },
    // 获取所有长者（未分配家属及当前家属所关联家属）
    getFamilyPersonAndNoFamilyList(id) {
      return this.$ajax
        .post(
          process.env.API_HOST + "/prnPerson/getFamilyPersonAndNoFamilyList",
          `familyid=${id}`
        )
        .then((res) => res.data);
    },
    // 分配长者
    submitSeniorForm() {
      // 添加及编辑家属老人关联表
      this.$ajax
        .post(
          process.env.API_HOST + "/sysFamilyUser/insertAndUpdatePersonFamily",
          `familyid=${this.nowId}&personids=${JSON.stringify(
            this.checkPelple
          )}&userid=${this.$store.state.token}`
        )
        .then((res) => {
          if (res.data.state == "success") {
            this.$message.success("修改成功");
            this.addSeniorBtn = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    update(data) {
      this.$refs.refupdate.openDialog(data);
    },
    updateOk() {
      this.getTableData({
        nickname: "",
      });
    },
    // 重置密码
    changePassword(id) {
      this.$confirm("即将重置该家属账号的密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let formData = `userid=${this.$store.state.token}&familyid=${id}`;
          // 重置护工密码
          this.$ajax
            .post(
              process.env.API_HOST + "sysFamilyUser/resetFamilyPassword",
              formData
            )
            .then((respones) => {
              if (respones.data.state == "success") {
                this.$message.success("修改成功!");
              } else {
                this.$message.error("修改失败！");
              }
            });
        })
        .catch(() => {});
    },
    handleDelete(id) {
      this.$confirm("即将删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$ajax
            .post(
              process.env.API_HOST + "/sysFamilyUser/deleteFamilyUser",
              `id=${id}&userid${this.$store.state.token}`
            )
            .then((res) => {
              if (res.data.state == "success") {
                this.getTableData({
                  nickname: "",
                });
                this.$message.success("删除成功");
                this.updataBtn = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
        })
        .catch(() => {});
    },

    getTableData(data) {
      // 通过查询条件查询家属列表
      this.$ajax
        .post(
          process.env.API_HOST + "/sysFamilyUser/getFamilyUserList",
          `search=${JSON.stringify(data)}`
        )
        .then((res) => {
          this.tableData = res.data;
        });
    },
  },
};
</script>
<style scoped>
.table_family {
  height: 100%;
}
.table_family .el-checkbox {
  margin-right: 10px;
  margin-bottom: 10px;
}
.table_family .el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
}
.checkbox-group-style {
  height: 260px;
  overflow-y: auto;
}
</style>

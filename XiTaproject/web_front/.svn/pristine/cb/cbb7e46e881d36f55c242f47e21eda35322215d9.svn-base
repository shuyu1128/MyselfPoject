<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="用户权限修改" :visible.sync="dialogTableVisible">
      <Userbianji v-if="dialogTableVisible" :userid="userid" />
    </el-dialog>
    <el-input
      v-model="selectform.name"
      placeholder="请输入真实姓名"
      style="width:200px;margin-bottom:15px;margin-right:15px;"
    ></el-input>
    <el-button type="primary" @click="select()">查询用户</el-button>
    <el-table :data="tableData" height="600px" border style="width: 100%">
      <el-table-column align="center" prop="ACCOUNT" label="用户名"></el-table-column>
      <el-table-column align="center" prop="NICKNAME" label="真实姓名"></el-table-column>
      <el-table-column align="center" prop="ROLENAME" label="角色"></el-table-column>
      <el-table-column align="center" prop="INPATIENTAREANAME" label="责任区域"></el-table-column>
      <el-table-column align="center" prop="DEPTNAME" label="发布公告区域"></el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="bianji(scope.row.ID,scope.row.ROLENAME)">编辑</el-button>
          <el-button type="danger" size="mini" @click="delUser(scope.row.ID)">删除</el-button>
          <el-button type="warning" size="mini" @click="resetPassWord(scope.row.ID)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Userbianji from "./Userbianji.vue";
export default {
  components: {
    Userbianji
  },
  data() {
    return {
      selectform: {
        name: ""
      },
      dialogTableVisible: false,
      tableData: [],
      userid: ""
    };
  },
  created() {
    this.$ajax
      .post(
        process.env.API_HOST + "/basic/getAllUserList",
        `nickname=${this.selectform.name}&userName=${sessionStorage.getItem(
          "user"
        )}`
      )
      .then(res => {
        this.tableData = res.data;
      });
  },
  watch: {
    dialogTableVisible(val) {
      if (val == false) {
        this.$ajax
          .post(
            process.env.API_HOST + "/basic/getAllUserList",
            `nickname=${this.selectform.name}&userName=${sessionStorage.getItem(
              "user"
            )}`
          )
          .then(res => {
            this.tableData = res.data;
          });
      }
    }
  },
  methods: {
    delUser(userid) {
      this.$confirm("即将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除用户
          this.$ajax
            .post(
              process.env.API_HOST + "/dept/delUser",
              `userid=${userid}&updateUserid=${this.$store.state.token}`
            )
            .then(res => {
              // 删除之后重新获取
              this.$ajax
                .post(
                  process.env.API_HOST + "/basic/getAllUserList",
                  `nickname=${
                    this.selectform.name
                  }&userName=${sessionStorage.getItem("user")}`
                )
                .then(res => {
                  this.tableData = res.data;
                });
            });

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
        });
    },
    // 重置密码
    resetPassWord(id) {
      this.$confirm("此操作将永久重置该用户的密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$ajax
            .post(
              process.env.API_HOST + "/login/reloadPassword",
              `userId=${id}`
            )
            .then(res => {
              console.log(res);
              if (res.data.status === "success") {
                this.$message.success("重置成功");
              } else {
                this.$message.error(res.data.message);
              }
            });
        })
        .catch(() => {});
    },
    select() {
      console.log(this.selectform.name);
      this.$ajax
        .post(
          process.env.API_HOST + "/basic/getAllUserList",
          `nickname=${this.selectform.name}&userName=${sessionStorage.getItem(
            "user"
          )}`
        )
        .then(res => {
          this.tableData = res.data;
        });
    },
    bianji(val, userrole) {
      this.userid = val;
      this.dialogTableVisible = true;
    }
  }
};
</script>
<style scoped>
</style>

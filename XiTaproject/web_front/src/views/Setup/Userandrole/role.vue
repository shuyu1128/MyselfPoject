<template>
  <div>
    <el-dialog
      title="角色名称修改"
      :visible.sync="dialogNameVisible"
      :close-on-click-modal="false"
    >
      <el-input
        maxlength="36"
        v-model="roleForm.rolename"
        placeholder="请输入角色名称"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNameVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="角色权限修改"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
    >
      <Rolebianji
        v-if="dialogTableVisible"
        :roleid="roleid"
        v-on:childByValue="childByValue"
      />
    </el-dialog>
    <el-input
      v-model="selectform.name"
      placeholder="请输入角色名称"
      style="width: 200px; margin-bottom: 15px; margin-right: 15px"
    ></el-input>
    <el-button type="primary" @click="select()">查询角色</el-button>
    <el-button type="primary" @click="addrole">添加角色</el-button>
    <el-table :data="allRoleData" height="600px" border style="width: 100%">
      <el-table-column
        align="center"
        prop="rolename"
        label="角色名"
        width="110"
      ></el-table-column>
      <el-table-column align="center" label="房间状态">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Roomstate"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="院内信息">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Information"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="人员点名">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Rollcall"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="轨迹回溯">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Backtracking"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="历史警报">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.history"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="简单评估" width="110">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Evaluating"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="智能健康评估">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.seniorindex"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="长者概览">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.filterTable"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="长者档案">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.fDetails"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>

      <el-table-column align="center" label="电子围栏">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Fences"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>

      <el-table-column align="center" label="工作统计">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.WorkStatistics"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="投诉管理">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.complaint"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="护工组管理">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.NurseAccountManagement"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="家属账号管理">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.FamilyAccountManagement"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>

      <el-table-column align="center" label="账户及权限管理" width="120">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Userrole"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备信息录入" width="110">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Equipmentall"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备自检" width="110">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Selfchecking"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="院信息录入" width="120">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Beadhouse"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电子围栏配置" width="110">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Fence"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="智能健康评估配置" width="110">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Evaluatiomaintenance"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户端访问权限配置" width="110">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.ClientAccessConfiguration"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="系统信息配置" width="110">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.HealthConfiguration"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="组织架构录入" width="110">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Organization"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="院内公告发布" width="110">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Notice"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邀请码">
        <template slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.Invitation"
            style="font-size: 18px; color: #67c23a"
          ></i>
          <i
            class="el-icon-error"
            v-else
            style="font-size: 18px; color: #f56c6c"
          ></i>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="count"
        align="center"
        label="人数"
      ></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="bianji(scope.row.id)"
            >授权</el-button
          >
          <el-button type="warning" size="mini" @click="updata(scope.row)"
            >修改</el-button
          >
          <el-button type="danger" size="mini" @click="deleterole(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Rolebianji from "./rolebianji.vue";
export default {
  components: {
    Rolebianji,
  },
  data() {
    return {
      dialogNameVisible: false,
      roleForm: {
        id: "",
        rolename: "",
      },
      roleid: "",
      selectform: {
        name: "",
      },
      dialogTableVisible: false,
    };
  },
  computed: {
    // 全部角色列表
    allRoleData() {
      return this.$store.state.userAndRole.allRoleData;
    },
  },
  created() {
    // 获取全部角色列表
    this.select();
  },
  methods: {
    addrole() {
      this.$prompt("请输入角色名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputPattern: /^.{1,36}$/,
        inputErrorMessage: "请输入0~36个字符！",
      })
        .then(({ value }) => {
          this.$store.dispatch("basic_insertRole", {
            newRolename: value,
            roleName: this.selectform.name,
            userName: sessionStorage.getItem("user"),
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    bianji(val) {
      this.roleid = val;
      this.$store.dispatch("basic_getRightRole", val).then((res) => {
        this.dialogTableVisible = true;
      });
    },
    // 赋值并打开修改名称对话框
    updata(val) {
      this.roleForm.rolename = val.rolename;
      this.roleForm.id = val.id;
      this.dialogNameVisible = true;
    },
    // 确认修改角色名称
    sureUpdate() {
      if (this.roleForm.rolename != "") {
        this.$store.dispatch("basic_updateRole", {
          json: this.roleForm,
          roleName: this.selectform.name,
          userName: sessionStorage.getItem("user"),
        });
        this.dialogNameVisible = false;
      } else {
        this.$message.warning("名称不能为空！");
      }
    },
    childByValue() {
      this.select();
      this.dialogTableVisible = false;
    },
    select() {
      // 获取全部角色列表
      this.$store.dispatch("basic_getAllRightRoleList", {
        roleName: this.selectform.name,
        userName: sessionStorage.getItem("user"),
      });
    },
    // 删除角色
    deleterole(roleid) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("basic_deleteRole", {
            id: roleid,
            roleName: this.selectform.name,
            userName: sessionStorage.getItem("user"),
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
</style>

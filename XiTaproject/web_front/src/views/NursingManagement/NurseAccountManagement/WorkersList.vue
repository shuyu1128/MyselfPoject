<template>
  <!-- 护工管理组件 -->
  <div class="workers_list">
    <!-- 编辑对话框 -->
    <el-dialog title="修改护工" :visible.sync="addWorkerBtn">
      <el-form :rules="WorkerRules" ref="WorkerRuleForm" :model="WorkerForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="WorkerForm.account"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="WorkerForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idcard">
          <el-input v-model="WorkerForm.idcard"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="WorkerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select
            style="width: 100%"
            v-model="WorkerForm.sex"
            placeholder="请选择"
          >
            <el-option label="男" :value="'0'"></el-option>
            <el-option label="女" :value="'1'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属组别" prop="teamid">
          <el-select
            style="width: 100%"
            v-model="WorkerForm.teamid"
            placeholder="请选择"
          >
            <el-option
              v-for="item in allGroup"
              :key="item.id"
              :label="item.teamname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addWorkerBtn = false">取 消</el-button>
        <el-button type="primary" @click="submitWorkerForm"> 确 定 </el-button>
      </div>
    </el-dialog>
    <el-row :gutter="20">
      <el-col :span="6"><h3 class="title_color">护工管理</h3></el-col>
      <el-col :span="6" :offset="12">
        <el-input
          style="width: 100%"
          size="mini"
          v-model="selectTable"
          placeholder="请输入账号查询"
        ></el-input>
      </el-col>
    </el-row>
    <el-table
      height="calc(100% - 24px)"
      :data="
        nursingUserList.filter(
          (data) =>
            !selectTable ||
            data.account.toLowerCase().includes(selectTable.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column align="center" label="账号">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.account }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="idcard" label="身份证">
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == '0'">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="mini" @click="changePassword(scope.row.id)">
            重置密码
          </el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>
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
export default {
  data() {
    return {
      selectTable: "",
      // 编辑护工相关
      addWorkerBtn: false,
      WorkerForm: {
        // 账号
        account: "",
        // 密码
        password: "",
        // 身份证
        idcard: "",
        // 性别
        sex: "",
        nickname: "",
        phone: "",
        // 所属组别
        teamid: "",
        id: "1",
      },
      groups: [{ teamName: "小组1", id: "1" }],
      WorkerRules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
        idcard: [
          {
            required: true,
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            message: "请输入正确身份证号",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: "请输入正确联系方式",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, message: "请输选择性别", trigger: "blur" }],
        teamid: [{ required: true, message: "请选择组别", trigger: "blur" }],
      },
      tableData: [
        {
          // 账号
          account: "裴佳龙-13091443416",
          // 密码
          password: "123456",
          // 身份证
          idcard: "230822176504064134",
          // 性别
          sex: "男",
          // 所属组别
          teamname: "小组1",
        },
      ],
    };
  },
  computed: {
    // 全部护工
    nursingUserList() {
      return this.$store.state.NursingManagement.nursingUserList;
    },
    // 全部组别
    allGroup() {
      return this.$store.state.NursingManagement.allGroup;
    },
  },
  created() {
    this.$store.dispatch("sysNursingUser_getNursingUserList");
  },
  methods: {
    handleEdit(data) {
      this.WorkerForm = JSON.parse(JSON.stringify(data));
      this.addWorkerBtn = true;
    },
    handleDelete(id) {
      this.$confirm(`此操作将永久删除该护工账户, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("sysNursingUser_deleteNursingUser", id);
      });
    },
    // 重置密码
    changePassword(id) {
      this.$confirm("即将重置该护工账号的密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let formData = `userid=${this.$store.state.token}&nursingid=${id}`;
          // 重置护工密码
          this.$ajax
            .post(
              process.env.API_HOST + "sysNursingUser/resetNursingPassword",
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
    // 编辑护工
    submitWorkerForm() {
      this.$refs["WorkerRuleForm"].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("sysNursingUser_updateNursingUser", this.WorkerForm)
            .then((res) => {
              if (res == "yes") {
                this.addWorkerBtn = false;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style></style>

<template>
  <el-dialog
    title="创建家属账号"
    :visible.sync="addBtn"
    :close-on-click-modal="false"
  >
    <el-form :rules="Rules" ref="RuleForm" :model="form">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addBtn = false">取 消</el-button>
      <el-button type="primary" @click="submitForm"> 确 定 </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      addBtn: false,
      form: {
        // 账号
        account: "",
        // 密码
        password: "",
        // 姓名
        nickname: "",
        // 联系方式
        phone: ""
      },
      Rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 16 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 16 个字符",
            trigger: "blur"
          }
        ],
        nickname: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 16 个字符",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: "请输入正确联系方式",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    openDialog() {
      this.addBtn = true;
    },
    submitForm() {
      this.$refs["RuleForm"].validate(valid => {
        if (valid) {
          // 新增家属账户
          this.$ajax
            .post(
              process.env.API_HOST + "/sysFamilyUser/insertFamilyUser",
              `json=${JSON.stringify(this.form)}&userid=${
                this.$store.state.token
              }`
            )
            .then(res => {
              if (res.data.state == "success") {
                this.$emit("addSuccess");
                this.$message.success("添加成功");
                this.form = {
                  // 账号
                  account: "",
                  // 密码
                  password: "",
                  // 姓名
                  nickname: "",
                  // 联系方式
                  phone: ""
                };
                this.addBtn = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style></style>

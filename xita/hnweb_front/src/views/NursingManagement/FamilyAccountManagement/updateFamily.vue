<template>
  <el-dialog title="编辑家属账号" :visible.sync="updataBtn">
    <el-form :rules="Rules" ref="RuleForm" :model="form">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="updataBtn = false">取 消</el-button>
      <el-button type="primary" @click="submitForm"> 确 定 </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      updataBtn: false,
      form: {
        // 账号
        account: "hyb1991",
        // 密码
        password: "123456",
        // 姓名
        nickname: "韩一斌",
        // 联系方式
        phone: "13091443416"
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
    openDialog(data) {
      this.form = JSON.parse(JSON.stringify(data));
      this.updataBtn = true;
    },
    submitForm() {
      this.$refs["RuleForm"].validate(valid => {
        if (valid) {
          this.$ajax
            .post(
              process.env.API_HOST + "/sysFamilyUser/updateFamilyUser",
              `json=${JSON.stringify(this.form)}&userid=${
                this.$store.state.token
              }`
            )
            .then(res => {
              if (res.data.state == "success") {
                this.$emit("updateOk");
                this.$message.success("修改成功");
                this.updataBtn = false;
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

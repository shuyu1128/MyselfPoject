<template>
  <div>
    <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px">
      <el-form-item label="手环名称" prop="name">
        <el-input maxlength="30" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手环编号" prop="code">
        <el-input maxlength="8" v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="手环类型">
        <el-input maxlength="16" v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="手环型号">
        <el-input maxlength="32" v-model="form.model"></el-input>
      </el-form-item>
      <el-form-item label="手环版本">
        <el-input maxlength="20" v-model="form.version"></el-input>
      </el-form-item>
      <el-form-item label="手环描述">
        <el-input maxlength="50" v-model="form.devicedesc"></el-input>
      </el-form-item>
      <el-form-item label="使用人" v-if="fullname!==undefined">
        <el-button type="text" @click="toDetails">{{fullname}}</el-button>
      </el-form-item>
    </el-form>
    <div style="height:30px">
      <el-button type="primary" @click="submitform('ruleForm')" style="float:right">确 定</el-button>
      <el-button
        type="primary"
        @click="ifuntieBracelet()"
        style="float:right;margin-right:20px"
        v-if="fullname!==undefined"
      >解绑此手环</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        code: "",
        type: "",
        model: "",
        version: "",
        devicedesc: "",
      },
      rules: {
        name: [{ required: true, message: "请输入手环名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }],
      },
      formLabelWidth: "120px",
    };
  },
  props: {
    did: null,
    fullname: null,
    personid: null,
  },
  created() {
    // 通过id 查看设备
    this.$ajax
      .post(
        process.env.API_HOST + "/device/getDeviceById",
        `deviceId=${this.did}`
      )
      .then((respones) => {
        this.form = respones.data;
      });
  },

  methods: {
    ifuntieBracelet() {
      this.$confirm("即将解除手环绑定, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.untieBracelet();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    // 解绑手环
    untieBracelet() {
      this.$ajax
        .post(
          process.env.API_HOST + "/person/savePersonDevice",
          `personId=${this.personid}&deviceId=&username=${this.$store.state.token}`
        )
        .then((respones) => {
          if (respones.data == "success") {
            this.$emit("shuaxin");
            this.$message({
              type: "success",
              message: "修改成功",
            });
          } else {
            this.$message({
              type: "warning",
              message: "修改失败",
            });
          }
        });
    },
    // 跳转个人编辑
    toDetails() {
      this.$router.push({
        path: "/Details:id",
        name: "编辑",
        query: { id: this.personid },
      });
    },
    submitform(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 修改设备
          this.$ajax
            .post(
              process.env.API_HOST + "/device/updateDevice",
              `json=${encodeURI(JSON.stringify(this.form))}&userid=${
                this.$store.state.token
              }`
            )
            .then((respones) => {
              if (respones.data.state === "success") {
                this.$emit("shuaxin");
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
              } else {
                this.$message.error(respones.data.message);
              }
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style>
.alertbianji {
  display: inline-block;
  margin-left: 30px;
  /* width: 100%;
  height: 100%;
  background-color: red; */
}
</style>

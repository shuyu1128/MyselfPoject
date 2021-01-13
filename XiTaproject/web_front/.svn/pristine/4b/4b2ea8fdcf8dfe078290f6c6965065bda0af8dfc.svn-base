<template>
  <div class="alertfrom">
    <!-- Form -->
    <el-button type="primary" @click="dialogFormVisible = true">手环录入</el-button>

    <el-dialog title="录入手环" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitform('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Alertform from "./Alertform.vue";
export default {
  components: { Alertform },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        code: "",
        type: "带心率",
        model: "TW-01",
        version: "v2.3",
        devicedesc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入手环名称", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入编码", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    submitform(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax
            .post(
              process.env.API_HOST + "/device/insertDevice",
              `json=${JSON.stringify(this.form)}&userid=${
                this.$store.state.token
              }`
            )
            .then((respones) => {
              if (respones.data.state == "success") {
                this.$emit("childByValue", true);
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.form = {
                  name: "",
                  code: "",
                  type: "带心率",
                  model: "TW-01",
                  version: "v2.3",
                  devicedesc: "",
                };
                this.dialogFormVisible = false;
              } else {
                this.$message.error(respones.data.message);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          return false;
        }
      });

      // 添加设备
    },
  },
};
</script>
<style>
.alertfrom {
  display: inline-block;
  margin-left: 30px;
  /* width: 100%;
  height: 100%;
  background-color: red; */
}
</style>

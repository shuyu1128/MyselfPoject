<template>
  <el-dialog
    :showClose="false"
    :closeOnClickModal="false"
    title="修改床位"
    :visible.sync="bedUpdataVisible"
  >
    <el-form :rules="rules" ref="form" :model="form" label-width="90px">
      <el-form-item label="床位名称" prop="name">
        <el-input maxlength="32" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="床位编码" prop="code">
        <el-input maxlength="32" v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="床位描述">
        <el-input maxlength="50" v-model="form.beddesc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitformbianji('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        name: [{ required: true, message: "请输入床位名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }],
      },
    };
  },
  computed: {
    bedUpdataVisible() {
      return this.$store.state.beadhouse.bedUpdataVisible;
    },
    updataContent() {
      return this.$store.state.beadhouse.updataContent;
    },
  },
  watch: {
    updataContent(val) {
      this.form = val;
    },
  },
  methods: {
    submitformbianji(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("bed_updateBed", {
            data: this.form,
            userid: this.$store.state.token,
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    close() {
      this.$store.commit("closebed");
    },
  },
};
</script>

<style>
</style>
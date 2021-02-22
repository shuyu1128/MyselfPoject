<template>
  <el-form 
  label-width="100px" 
  :rules="rules"
  :model="ruleForm"
  ref="ruleForm"
  >
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="local">
      <el-select v-model="ruleForm.local" placeholder="活动区域选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            placeholder="选择日期"
            style="width: 100%"
            v-model="ruleForm.date1"
            type="date"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="1">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
            placeholder="选择时间"
            style="width: 100%"
            v-model="ruleForm.date2"
          ></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="及时配送" prop="delivery">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm('ruleForm')" type="primary">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        local: "",
        delivery:false,
        date1: "",
        date2: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        local: [
          { required: true, message: "请选择活动地点", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "选择时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!!");
        } else {
          console.log("erro submit!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>
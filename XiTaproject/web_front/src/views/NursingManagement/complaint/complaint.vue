<template>
  <div class="complaint">
    <el-row class="complaint_footer">
      <el-col :span="24">
        <div class="complaint_select">
          <el-form
            size="small"
            :inline="true"
            :model="slelctForm"
            class="demo-form-inline"
          >
            <el-form-item label="护工名称">
              <el-input
                v-model="slelctForm.nursingname"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="长者名称">
              <el-input
                v-model="slelctForm.fullname"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="slelctForm.beginDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择"
                style="margin-right:20px"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="slelctForm.endDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择"
                style="margin-right:20px"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="处理状态">
              <el-select
                style="width:100px"
                v-model="slelctForm.state"
                clearable
                placeholder="请选择"
              >
                <el-option label="未处理" value="0"> </el-option>
                <el-option label="已处理" value="1"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row class="complaint_main">
      <el-col style="height:100%" :span="24">
        <complaintTable ref="refTable" :slelctForm="slelctForm" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import complaintTable from "./complaintTable.vue";
export default {
  components: {
    complaintTable
  },
  data() {
    return {
      slelctForm: {
        nursingname: "",
        fullname: "",
        beginDate: "",
        endDate: "",
        state: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.refTable.getTableData();
    }
  }
};
</script>

<style scoped>
.complaint {
  height: 100%;
}
.complaint_footer {
  height: 60px;
}
.complaint_main {
  height: calc(100% - 60px);
}
</style>

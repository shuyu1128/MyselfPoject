<template>
  <!-- 护工组管理 -->
  <div class="nurse_account_management">
    <el-row style="height: 18%; margin-bottom: 14px" :gutter="14">
      <el-col class="Nurse_height" :span="16">
        <GroupChoice />
      </el-col>
      <el-col class="Nurse_height" :span="8">
        <operation />
      </el-col>
    </el-row>
    <el-row style="height: 80%" :gutter="14">
      <el-col class="Nurse_height" :span="12">
        <WorkersList />
      </el-col>
      <el-col class="Nurse_height" :span="12">
        <SeniorsList />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WorkersList from "./WorkersList";
import SeniorsList from "./SeniorsList";
import GroupChoice from "./GroupChoice";
import operation from "./operation";
export default {
  components: {
    WorkersList,
    SeniorsList,
    GroupChoice,
    operation
  },
  destroyed() {
    this.$store.commit("clearNursing");
  }
};
</script>

<style>
.nurse_account_management {
  height: 100%;
}
.Nurse_height {
  height: 100%;
}
.workers_list,
.seniors_list,
.group_choice,
.operation {
  height: calc(100% - 28px);
  padding: 14px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.workers_list:hover,
.seniors_list:hover,
.group_choice:hover,
.operation:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.title_color {
  color: #303133;
}
</style>

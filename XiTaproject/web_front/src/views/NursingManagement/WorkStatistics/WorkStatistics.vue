<template>
  <!-- 工作统计 -->
  <div class="work_statistics">
    <div v-if="!internalShow" class="group_external">
      <el-row style="height: 10%">
        <el-col class="Nurse_height" :span="24">
          <StatisticsSelect />
        </el-col>
      </el-row>
      <div style="height: 3%"></div>
      <el-row style="height: 87%" :gutter="14">
        <el-col class="Nurse_height" :span="24">
          <StatisticsGroups />
        </el-col>
      </el-row>
    </div>
    <div v-else class="group_internal">
      <div class="group_internal_header">
        <el-page-header @back="goBack" :content="nowGroupData.teamname">
        </el-page-header>
      </div>
      <div style="height: 3%"></div>
      <el-row style="height: calc(97% - 73px)" :gutter="20">
        <el-col class="Nurse_height" :span="12">
          <WorkerList />
        </el-col>
        <el-col class="Nurse_height" :span="12">
          <PeopleList />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import StatisticsSelect from "./StatisticsSelect";
import StatisticsGroups from "./StatisticsGroups";
import WorkerList from "./WorkerList";
import PeopleList from "./PeopleList";
export default {
  components: {
    StatisticsSelect,
    StatisticsGroups,
    WorkerList,
    PeopleList
  },
  data() {
    return {};
  },
  computed: {
    internalShow() {
      return this.$store.state.workStatistics.internalShow;
    },
    nowGroupData() {
      return this.$store.state.workStatistics.nowGroupData;
    }
  },
  destroyed() {
    this.$store.commit("clearWork");
  },
  methods: {
    goBack() {
      // 关闭审批组别内护工和长者组件
      this.$store.commit("closeInternalShow");
    }
  }
};
</script>

<style scoped>
.work_statistics {
  height: 100%;
}
.group_external,
.group_internal {
  height: 100%;
}
.group_internal {
  background-color: #fff;
}
.group_internal_header {
  padding: 24px 20px;
  border-bottom: 1px solid #ebeef5;
}
.Nurse_height {
  height: 100%;
}
.statistics_select {
  height: calc(100% - 28px);
  padding: 14px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.statistics_select:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
/* .worker_list,.people_list{

} */
</style>

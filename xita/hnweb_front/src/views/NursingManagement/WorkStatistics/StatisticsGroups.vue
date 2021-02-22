<template>
  <div class="statistics_groups">
    <div v-for="item in workGroups" :key="item.id" class="groups_list">
      <h3 class="title_color">{{ item.teamname }}</h3>
      <div class="groups_b">
        <li>
          <span>总完成度： </span>
          <span>
            <el-tag size="mini">{{ item.workProgress }} %</el-tag>
          </span>
        </li>
        <li>
          <span>应做工时： </span>
          <span>
            <el-tag size="mini">{{ item.doing }} m</el-tag>
          </span>
        </li>
        <li>
          <span>已做工时： </span>
          <span>
            <el-tag size="mini">{{ item.done }} m</el-tag>
          </span>
        </li>
        <li>
          <span>审批工时：</span>
          <span>
            <el-tag size="mini">{{ item.approved }} m</el-tag>
          </span>
        </li>
        <li>
          <span>不合格工时： </span>
          <span>
            <el-tag size="mini">{{ item.approvalFailed }} m</el-tag>
          </span>
        </li>
      </div>
      <div class="groups_footer">
        <el-button size="small" type="primary" @click="openGroup(item)">
          审查工作内容
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    workGroups() {
      return this.$store.state.workStatistics.workGroups;
    }
  },
  methods: {
    //   进入到审批组组件
    openGroup(data) {
      // 打开审批组别内护工和长者组件
      this.$store.commit("openInternalShow", data);
      // 获取护工统计列表
      this.$store.dispatch("workStatistics_nursingWorkStatisticsByTeamid");
      // 获取长者统计列表
      this.$store.dispatch("workStatistics_personWorkStatisticsByTeamid");
    }
  }
};
</script>

<style scoped>
.statistics_groups {
  height: 100%;
  overflow-y: auto;
}
.groups_list {
  height: calc(50% - 48px);
  width: calc(20% - 46px);
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  position: relative;
}
.groups_footer {
  width: 90%;
  position: absolute;
  bottom: 20px;
}
.groups_footer .el-button {
  float: right;
}
.groups_list:nth-child(5n) {
  margin-right: 0;
}
.groups_list:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.groups_b {
  color: #606266;
}
.groups_b > li {
  border-bottom: 1px solid #ebeef5;
  padding: 10px 20px;
  overflow: hidden;
  transition: 0.3s;
}
.groups_b > li:hover {
  background-color: #f2f6fc;
}
.groups_b > li:first-of-type {
  border-top: 1px solid #ebeef5;
}
.groups_b > li > span:first-of-type {
  float: left;
}
.groups_b > li > span:last-of-type {
  float: right;
}
.title_color {
  color: #303133;
  margin-bottom: 10px;
}
</style>

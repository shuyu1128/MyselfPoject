<template>
  <!-- 家属账号管理 -->
  <div class="family_account_management">
    <addFamily ref="refAdd" @addSuccess="addOk" />
    <el-row style="height: 8%;">
      <el-col class="Nurse_height" :span="24">
        <div class="select_famliy">
          <el-input
            style="width: 180px; margin-right: 10px"
            v-model="selectFrom.nickname"
            placeholder="请输入用户真实姓名"
          ></el-input>
          <el-button
            style="margin-right: 20px"
            type="primary"
            @click="selectTableData()"
            >查询</el-button
          >
          <el-button type="primary" @click="openadd">新增</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style="height: 92%">
      <el-col class="Nurse_height" :span="24">
        <TableFamily ref="refTable" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TableFamily from "./TableFamily";
import addFamily from "./addFamily";
export default {
  components: {
    TableFamily,
    addFamily
  },
  data() {
    return {
      selectFrom: {
        // 真实姓名
        nickname: ""
      }
    };
  },
  methods: {
    openadd() {
      this.$refs.refAdd.openDialog();
    },
    selectTableData() {
      this.$refs.refTable.getTableData(this.selectFrom);
    },
    addOk() {
      this.$refs.refTable.getTableData(this.selectFrom);
    }
  }
};
</script>

<style scoped>
.family_account_management {
  height: 100%;
}
.Nurse_height {
  height: 100%;
}
</style>

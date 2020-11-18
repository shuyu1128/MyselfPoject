<template>
  <div>
    <addRegion :addDialogFormVisible="addDialogFormVisible" v-on:closeAdd="closeAdd" />
    <updataRegion
      v-if="updataDialogFormVisible"
      :updataDialogFormVisible="updataDialogFormVisible"
      :id="UpdataId"
      v-on:closeUpada="closeUpada"
    />
    <el-input
      v-model="selectformName"
      placeholder="请输入区域名称"
      style="width:200px;margin-bottom:15px;margin-right:15px;"
    ></el-input>
    <el-button type="primary" @click="select()">查询</el-button>
    <el-button type="primary" @click="addDialogFormVisible=true">新建</el-button>
    <el-table :data="allRegionData" height="600px" border style="width: 100%">
      <el-table-column align="center" prop="name" label="区域名称"></el-table-column>
      <el-table-column align="center" prop="code" label="区域编码"></el-table-column>
      <el-table-column align="center" prop="createdtime" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="nickname" label="创建人"></el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="openUpdata(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="delregion(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import addRegion from "./addRegion.vue";
import updataRegion from "./updataRegion.vue";
export default {
  components: {
    addRegion,
    updataRegion,
  },
  data() {
    return {
      // 新增窗口状态
      addDialogFormVisible: false,
      // 编辑窗口状态
      updataDialogFormVisible: false,
      UpdataId: "",
      // selectform: {
      //   name: ""
      // },
    };
  },
  computed: {
    selectformName: {
      get() {
        return this.$store.state.userAndRole.selectform.name;
      },
      set(val) {
        this.$store.commit("changeSelectformNname", val);
      },
    },
    allRegionData() {
      return this.$store.state.userAndRole.allRegionData;
    },
  },
  created() {
    //   获取全部责任区域
    this.$store.dispatch("inpatient_getAllInpatientList");
  },
  methods: {
    //   关闭增加弹窗
    closeAdd() {
      this.addDialogFormVisible = false;
    },
    // 关闭编辑窗口
    closeUpada() {
      this.updataDialogFormVisible = false;
    },
    // 打开编辑窗口
    openUpdata(id) {
      this.UpdataId = id;
      this.updataDialogFormVisible = true;
    },
    delregion(id) {
      this.$confirm("即将删除该责任区域, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除责任区域
          this.$store.dispatch("inpatient_delInpatient", {
            inpatientId: id,
            userid: this.$store.state.token,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    select() {
      this.$store.dispatch("inpatient_getAllInpatientList");
    },
  },
};
</script>
<style scoped>
</style>

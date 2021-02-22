<template>
  <!-- 客户端访问权限配置 -->
  <div class="client_access_configuration">
    <add-cac ref="refAdd" :rightArr="rightArr" @addSuccess="addOk"></add-cac>
    <updateCac
      ref="refUpdate"
      :rightArr="rightArr"
      @updateSuccess="updateOk"
    ></updateCac>
    <el-container>
      <el-header>
        <el-input
          style="width: 180px; margin-right: 10px"
          maxlength="32"
          v-model="computerdesc"
          placeholder="请输入备注"
        ></el-input>
        <el-button
          type="primary"
          style="margin-right: 20px"
          @click="getComputerList"
          >查询</el-button
        >
        <el-button type="primary" @click="add()">新增</el-button>
      </el-header>
      <el-main>
        <el-table
          v-loading="loading"
          border
          height="100%"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column align="center" prop="ip" label="ip地址" width="180">
          </el-table-column>
          <el-table-column align="center" prop="computerdesc" label="备注">
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="update(scope.row.id)">
                编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import addCac from "./addCac.vue";
import updateCac from "./updateCac.vue";
export default {
  components: {
    addCac,
    updateCac,
  },
  data() {
    return {
      loading: false,
      computerdesc: "",
      rightArr: "",
      tableData: [
        {
          ip: "192.168.1.1",
          computerdesc: "王小虎",
        },
        {
          ip: "192.168.1.1",
          computerdesc: "王小虎",
        },
        {
          ip: "192.168.1.1",
          computerdesc: "王小虎",
        },
        {
          ip: "192.168.1.1",
          computerdesc: "王小虎",
        },
      ],
    };
  },
  created() {
    this.getRightList();
    this.getComputerList();
  },
  methods: {
    add() {
      this.$refs.refAdd.open();
    },
    addOk() {
      this.getComputerList();
    },
    updateOk() {
      this.getComputerList();
    },
    update(id) {
      this.$refs.refUpdate.getComputerById(id);
      this.$refs.refUpdate.open();
    },
    // 删除客户电脑信息
    handleDelete(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$ajax
          .post("api/computerRights/deleteComputer", `computerid=${id}`)
          .then((res) => {
            if (res.data.state == "success") {
              this.getComputerList();
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
            }
          });
      });
    },
    // 查看权限列表
    getRightList() {
      this.$ajax.post("api/computerRights/getRightList").then((res) => {
        this.rightArr = res.data;
      });
    },
    // 查看客户电脑信息列表
    getComputerList() {
      this.loading = true;
      this.$ajax
        .post(
          "api/computerRights/getComputerList",
          `search=${JSON.stringify({ computerdesc: this.computerdesc })}`
        )
        .then((res) => {
          this.tableData = res.data;
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.client_access_configuration {
  height: 100%;
}
.client_access_configuration .el-main {
  padding-top: 0px;
}
</style>
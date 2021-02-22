<template>
  <!-- 库存统计 -->
  <div>
    <div id="InventoryStatistics-header">
      <div class="InventoryStatistics-header-left">
        <el-input
          placeholder="输入关键字"
          v-model="getMaterialFormData.materialname"
          size="normal"
          clearable
          class="InventoryStatistics-header-left-input"
        ></el-input>
        <el-select
          v-model="getMaterialFormData.classificationid"
          class="InventoryStatistics-header-left-cascader"
          placeholder="全部"
          clearable
        >
          <el-option
            v-for="item in gridData"
            :key="item.id"
            :label="item.classificationname"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="InventoryStatistics-header-right">
        <el-button
          type="primary"
          size="default"
          class="InventoryStatistics-header-right-btn1"
          @click="handleUserList"
          >查询</el-button
        >
        <el-button
          type="primary"
          size="default"
          class="InventoryStatistics-header-right-btn2"
          @click="InventoryStatisticsOut"
          >导出</el-button
        >
      </div>
    </div>
    <div class="InventoryStatistics-content">
      <el-table
        :data="
          userList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        border
        height="683px"
        class="form-style"
      >
        <el-table-column prop="idnum" label="序号" width="150" align="center">
        </el-table-column>
        <el-table-column
          prop="materialname"
          label="物品名称"
          align="center"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="classificationname"
          label="物品分类"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="norms" label="规格" width="200" align="center">
        </el-table-column>
        <el-table-column prop="amount" label="数量" width="200" align="center">
        </el-table-column>
        <el-table-column prop="factory" label="生产厂家/品牌" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="InventoryStatistics-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="userList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //起始页
      currentPage: 1,
      //初始每页数据量
      pagesize: 10,
      //存放后台请求来的数据
      userList: [],
      //商品数据
      tableData: [],
      gridData: [],

      getMaterialFormData: {
        materialname: "",
        classificationid: "",
      },
    };
  },
  methods: {
    //类目加载
    insertMaterialClassification() {
      this.$http
        .getMaterialClassificationList({
          classificationname: "",
        })
        .then((res) => {
          this.gridData = res.data;
        });
    },
    //导出
    InventoryStatisticsOut() {
      window.location.href = `${process.env.API_HOST}/mm/materialInformation/getMaterialInformationListExcel?materialname=${this.getMaterialFormData.materialname}&classificationid=${this.getMaterialFormData.classificationid}`;
    },
    //分页
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    //查询 刷新
    handleUserList() {
      this.$http
        .getMaterialInformationList(this.getMaterialFormData)
        .then((res) => {
          this.handleCurrentChange(1);
          this.userList = res.data;
          this.userList.forEach((element, index) => {
            element.idnum = index + 1;
          });
        });
    },
  },
  created() {
    this.handleUserList();
    this.insertMaterialClassification();
  },
};
</script>

<style>
#InventoryStatistics-header {
  height: 50px;
  width: 100%;
  overflow: hidden;
}
.InventoryStatistics-header-left {
  width: 500px;
  float: left;
}
.InventoryStatistics-header-left-input {
  width: 300px;
  float: left;
  margin-right: 10px;
}
.InventoryStatistics-header-left-cascader {
  width: 30%;
  float: left;
}
.InventoryStatistics-header-right {
  float: right;
}
.el-table td,
.el-table th {
  height: 62px;
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
</style>

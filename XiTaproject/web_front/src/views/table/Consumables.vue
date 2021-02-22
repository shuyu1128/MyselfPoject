<template>
  <div>
    <div class="Big_box">
      <!-- 时间查询 -->
      <div class="timeSearch">
        <div class="block">
          <el-date-picker
            v-model="valueData"
            value-format="yyyy-MM-dd"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div class="searchBtn">
          <el-button type="primary" @click="getMmMaterialUsageDetailsList()"
            >查询</el-button
          >
        </div>
      </div>
      <!-- table表单 -->
      <div class="tableForm">
        <el-table :data="tableData" border style="height: 400px">
          <el-table-column
            prop="createdtime"
            label="时间"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="materialname"
            label="物品名称"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="classificationname"
            label="物品种类"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="norms" label="规格" width="120" align="center">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="数量"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价(元)"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            label="合计(元)"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="factory" label="生产厂家/品牌" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="output_Box">
        <div class="outPut">
          <span style="width: 80px">{{ "合计：￥" }}</span>
          <span style="margin-right: 20px">{{ this.sum }}</span>
          <el-button
            type="primary"
            size="default"
            @click="getMmMaterialUsageDetailsListExcel()"
            >导出</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sum: "",
      valueData: "",
      //后台表单数据
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value: "",
    };
  },
  props: {
    did: null,
  },
  watch: {
    did() {
      this.getMmMaterialUsageDetailsList();
    },
  },
  created() {
    this.getMmMaterialUsageDetailsList();
  },
  methods: {
    //刷新
    getMmMaterialUsageDetailsList() {
      if (!this.valueData) this.valueData = ["", ""];
      let formData = {
        personid: this.did,
        begintime: this.valueData[0],
        endtime: this.valueData[1],
      };
      console.log(formData);
      this.$http.getMmMaterialUsageDetailsList(formData).then((res) => {
        this.sum = res.data.reduce((sum, e) => sum + e.total, 0);
        for (var a = 0; a < res.data.length; a++) {
          res.data[a].price = res.data[a].price.toFixed(2);
          res.data[a].total = res.data[a].total.toFixed(2);
        }
        this.tableData = res.data;
      });
    },
    //导出
    getMmMaterialUsageDetailsListExcel() {
      window.location.href = `${process.env.API_HOST}/prnPerson/getMmMaterialUsageDetailsListExcel?begintime=${this.valueData[0]}&endtime=${this.valueData[1]}`;
    },
  },
};
</script>

<style>
.Big_box {
  margin: 0 30px;
}
.timeSearch {
  width: 100%;
  height: 50px;
}
.block {
  float: left;
}
.searchBtn {
  float: left;
  margin-left: 20px;
}
.output_Box {
  margin-top: 10px;
  width: 100%;
  height: 30px;
}
.outPut {
  float: right;
}
</style>

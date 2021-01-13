<template>
  <div class="app-container">
    <el-input placeholder="请输入手环编码" v-model="sousuo.code" style="width:200px;margin-bottom: 10px">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-input placeholder="请输入手环名称" v-model="sousuo.name" style="width:200px;margin-left:10px;">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-input placeholder="请输手环类型" v-model="sousuo.type" style="width:200px;margin-left:10px;">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-input placeholder="请输入手环版本" v-model="sousuo.version" style="width:200px;margin-left:10px;">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-select v-model="vbattvalue" placeholder="请选择电量范围">
      <el-option
        v-for="(item,index) in vbattOpaction"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-button type="primary" style="margin-left:30px;" @click="serch">搜索</el-button>
    <Alertform v-on:childByValue="childByValue" />
    <el-table
      :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="ROWNUM" align="center" label="序号"></el-table-column>
      <el-table-column prop="code" align="center" label="编码"></el-table-column>
      <el-table-column prop="name" align="center" label="手环名称"></el-table-column>
      <el-table-column prop="type" align="center" label="手环类型"></el-table-column>
      <el-table-column prop="model" align="center" label="手环型号"></el-table-column>
      <el-table-column prop="version" align="center" label="手环版本"></el-table-column>
      <el-table-column prop="lasttime" align="center" label="最后接收数据时间"></el-table-column>
      <el-table-column prop="fullname" align="center" label="使用人"></el-table-column>
      <el-table-column prop="vbatt" align="center" label="电量">
        <template slot-scope="scope">
          <el-tag type="warning" v-show="scope.row.vbatt=='10%↓'||scope.row.vbatt=='10%↑' ">需充电</el-tag>
          <el-tag type="primary" v-show="scope.row.vbatt=='100%'">已充满</el-tag>
          <el-tag
            type="success"
            v-show="scope.row.vbatt=='20%↑'||scope.row.vbatt=='30%↑'||scope.row.vbatt=='40%↑'||scope.row.vbatt=='50%↑'||scope.row.vbatt=='75%↑'"
          >{{scope.row.vbatt}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="operation" align="center" label="操作">
        <template slot-scope="scope">
          <!-- <Alertbianji /> -->
          <el-button type="primary" size="mini" @click="bianji(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteshouhuan(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.length"
    ></el-pagination>
    <el-dialog title="编辑手环" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <Alertbianji
        v-if="bianjiShow"
        :did="shouhuanid"
        :fullname="fullname"
        :personid="personid"
        v-on:shuaxin="shuaxin"
      />
    </el-dialog>
  </div>
</template>


<script>
import Alertform from "./Alertform.vue";
import Alertbianji from "./Alertbianji.vue";
export default {
  name: "filterTable",
  components: { Alertform, Alertbianji },
  data() {
    return {
      vbattvalue: ["", ""],
      vbattOpaction: [
        {
          value: [0, 1],
          label: "需充电",
        },
        {
          value: [2, 4],
          label: "20%-49%",
        },
        {
          value: [5, 6],
          label: "50%-99%",
        },
        {
          value: [7, 7],
          label: "已充满",
        },
        {
          value: ["", ""],
          label: "全部",
        },
      ],
      dialogFormVisible: false,
      shouhuanid: "",
      fullname: "",
      personid: "",
      a: 1,
      list: [
        {
          ID: 1,
          code: "",
          name: "",
          type: "",
          model: "",
          version: "",
        },
      ],
      pagesize: 10,
      currentPage: 1,
      sousuo: {
        code: "",
        name: "",
        type: "",
        version: "",
        beginVbatt: "",
        endVbatt: "",
      },
      bianjiShow: false,
    };
  },
  created() {
    this.Refresh();
  },
  mounted() {
    this.handleSizeChange(10);
  },
  methods: {
    shuaxin() {
      this.dialogFormVisible = false;
      this.Refresh();
    },
    bianji(data) {
      this.shouhuanid = data.id;
      this.fullname = data.fullname;
      this.personid = data.personid;
      this.bianjiShow = false;
      this.$nextTick(() => {
        this.bianjiShow = true;
      });
      this.dialogFormVisible = true;
    },
    childByValue() {
      this.Refresh();
    },
    serch() {
      console.log(this.vbattvalue);
      this.sousuo.beginVbatt = this.vbattvalue[0];
      this.sousuo.endVbatt = this.vbattvalue[1];
      this.Refresh();
    },
    deleteshouhuan(id) {
      this.$confirm("此操作将永久删除该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除设备

          this.$ajax
            .post(process.env.API_HOST + "/device/delDevice", `deviceId=${id}`)
            .then((respones) => {
              if (respones.data.state == "success") {
                this.Refresh();
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message({
                  showClose: true,
                  message: respones.data.message,
                  type: "error",
                });
              }
              console.log(respones.data);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    // 数据刷新
    Refresh() {
      this.$ajax
        .post(
          process.env.API_HOST + "/device/getAllDevice",
          `sousou=${JSON.stringify(this.sousuo)}`
        )
        .then((respones) => {
          this.list = respones.data;
          this.list.forEach((element) => {
            if (element.lasttime) {
              element.lasttime = vm.formatTime(element.lasttime, "Y-M-D h:m:s");
            }
          });
          this.handleCurrentChange(1);
          console.log(this.list);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>


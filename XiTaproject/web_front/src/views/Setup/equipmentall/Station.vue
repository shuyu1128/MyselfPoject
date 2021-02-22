<template>
  <div class="app-container">
    <el-input placeholder="请输入基站编码" v-model="sousuo.code" style="width:200px;margin-bottom: 10px">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-input placeholder="请输入基站名称" v-model="sousuo.name" style="width:200px;margin-left:10px;">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-cascader
      v-model="floorid"
      :options="options"
      placeholder="请输所在楼层"
      style="width:200px;margin-left:10px;"
      clearable
    ></el-cascader>

    <el-button type="primary" style="margin-left:30px;" @click="select">搜索</el-button>
    <Sectionfrom v-on:childByValue="childByValue" />
    <el-button type="primary" style="margin-left:30px;" @click="toCalculationrssi">基站维护</el-button>
    <el-table
      :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="code" align="center" label="编码"></el-table-column>
      <el-table-column prop="name" align="center" label="基站名称"></el-table-column>
      <el-table-column prop="model" align="center" label="基站型号"></el-table-column>
      <el-table-column prop="version" align="center" label="基站版本"></el-table-column>
      <el-table-column prop="xmetre" align="center" label="X轴位置"></el-table-column>
      <el-table-column prop="ymetre" align="center" label="Y轴位置"></el-table-column>
      <el-table-column prop="position" align="center" label="房间"></el-table-column>
      <el-table-column prop="createdtime" align="center" label="创建时间"></el-table-column>
      <el-table-column prop="createdby" align="center" label="创建人"></el-table-column>
      <!-- <el-table-column prop="grade" align="center" label="护理等级">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.NURSINGLEVEL=='全自理' ">全自理</el-tag>
          <el-tag type="info" v-if="scope.row.NURSINGLEVEL=='半自理' ">半失能</el-tag>
          <el-tag type="danger" v-if="scope.row.NURSINGLEVEL=='全失能' ">全失能</el-tag>
        </template>
      </el-table-column>-->

      <el-table-column prop="operation" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="bianji(scope.row.id)">编辑</el-button>
          <!-- <Sectionbianji :did="scope.row.id" v-on:childByValue="childByValue"/> -->
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
    <el-dialog title="编辑基站" :visible.sync="dialogFormVisibles" :close-on-click-modal="false">
      <Sectionbianji v-if="dialogFormVisibles" :did="jizhanid" v-on:childByValue="childByValue" />
    </el-dialog>
  </div>
</template>


<script>
import Sectionfrom from "./Sectionfrom.vue";
import Sectionbianji from "./Sectionbianji.vue";
export default {
  name: "filterTable",
  components: { Sectionfrom, Sectionbianji },
  data() {
    return {
      jizhanid: "",
      dialogFormVisibles: false,
      a: 1,
      options: [],
      list: [
        {
          id: 1,
          code: "",
          name: "",
          model: "",
          version: "",
          xmetre: "",
          ymetre: "",
          position: "",
          zmetre: "",
          createdtime: "",
          createdby: "",
        },
      ],
      pagesize: 10,
      currentPage: 1,
      sousuo: {
        code: "",
        name: "",
      },
      floorid: ["", "", ""],
    };
  },
  created() {
    this.$ajax
      .post(
        process.env.API_HOST + "/basestation/getAllBasestation",
        `sousuo=${JSON.stringify(this.sousuo)}&floorid=${this.floorid[2]}`
      )
      .then((respones) => {
        console.log(respones.data);
        this.list = respones.data;
      });

    // 获取楼层列表
    this.$ajax
      .post(process.env.API_HOST + "/room/getNursingHomesTree")
      .then((respones) => {
        this.options = respones.data;
      });
  },
  mounted() {
    this.handleSizeChange(10);
  },
  methods: {
    // 跳转基站维护页面
    toCalculationrssi() {
      this.$router.push("/Calculationrssi");
    },
    bianji(id) {
      this.dialogFormVisibles = true;
      this.jizhanid = id;
    },
    childByValue(data) {
      this.dialogFormVisibles = false;
      this.$ajax
        .post(
          process.env.API_HOST + "/basestation/getAllBasestation",
          `sousuo=${JSON.stringify(this.sousuo)}&floorid=${this.floorid[2]}`
        )
        .then((respones) => {
          this.list = respones.data;
        });
    },
    select() {
      this.$ajax
        .post(
          process.env.API_HOST + "/basestation/getAllBasestation",
          `sousuo=${JSON.stringify(this.sousuo)}&floorid=${
            this.floorid.length == 0 ? "" : this.floorid[2]
          }`
        )
        .then((respones) => {
          this.list = respones.data;
          this.handleCurrentChange(1);
        });
    },
    deleteshouhuan(id) {
      this.$confirm("此操作将永久删除该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除基站
          this.$ajax
            .post(
              process.env.API_HOST + "/basestation/delBasestation",
              `basestationId=${id}&userid=${this.$store.state.token}`
            )
            .then((respones) => {
              if (respones.data == "success") {
                this.$ajax
                  .post(
                    process.env.API_HOST + "/basestation/getAllBasestation",
                    `sousuo=${JSON.stringify(this.sousuo)}&floorid=${
                      this.floorid[2]
                    }`
                  )
                  .then((respones) => {
                    this.list = respones.data;
                    this.handleCurrentChange(1);
                  });
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
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
  },
};
</script>

<style>
</style>


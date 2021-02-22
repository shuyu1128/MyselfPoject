<template>
  <div class="tableadmin">
    所在楼层：
    <el-cascader
      v-model="ZMetre"
      :options="bulid"
      style="width:100px;margin-right:10px;"
      size="mini"
      clearable
    ></el-cascader>围栏类型：
    <!-- <el-input
      v-model="json.type"
      style="width:110px;margin-right:10px;"
      size="mini"
      placeholder="请输入内容"
    ></el-input>-->
    <el-select
      v-model="json.type"
      placeholder="请选择"
      style="width:100px;margin-right:20px"
      clearable
      size="mini"
    >
      <el-option v-for="item in types" :key="item.id" :label="item.value" :value="item.id"></el-option>
    </el-select>围栏名称：
    <el-input
      v-model="json.railname"
      style="width:100px;margin-right:10px;"
      size="mini"
      placeholder="请输入内容"
    ></el-input>
    <el-button type="primary" icon="el-icon-search" size="small" circle @click="selet"></el-button>
    <el-table :data="tabledata" height="275px" border style="width: 613px;margin-top:10px">
      <el-table-column type="index" label="序号" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column align="center" label="类型" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.type=='1'">禁入</span>
          <span v-if="scope.row.type=='2'">计时禁入</span>
          <span v-if="scope.row.type=='5'">分时段禁入</span>
          <span v-if="scope.row.type=='3'">禁出</span>
          <span v-if="scope.row.type=='4'">预警</span>
          <span v-if="scope.row.type=='6'">单点禁入</span>
          <span v-if="scope.row.type=='7'">单点禁出</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="railname" label="名称"></el-table-column>
      <el-table-column align="center" prop="floorname" label="楼层"></el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="bianji(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="delUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal="false" title="修改围栏信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <bianji v-if="dialogVisible" :pid="upid" v-on:childByValue="childByValue" />
    </el-dialog>
  </div>
</template>
<script>
import bianji from "./bianji.vue";
export default {
  components: {
    bianji
  },
  inject: ["reload"],
  data() {
    return {
      upid: "",
      dialogVisible: false,
      bulid: [],
      json: {
        railname: "",
        type: ""
      },
      ZMetre: ["", "", ""],
      types: [
        { id: 1, value: "禁入" },
        { id: 2, value: "计时禁入" },
         { id: 5, value: "分时段禁入" },
        { id: 3, value: "禁出" },
        { id: 4, value: "预警" },
        { id: 6, value: "单点禁入" },
        { id: 7, value: "单点禁出" }
      ],
      tabledata: [
        {
          num: "1",
          type: "禁出",
          name: "一号围栏",
          floor: "二层"
        }
      ]
    };
  },
  created() {
    // 获取全部电子围栏表格信息
    this.$ajax
      .post(
        process.env.API_HOST + "/rail/getAllRailList",
        `query=${JSON.stringify(this.json)}&floorid=`
      )
      .then(respones => {
        this.tabledata = respones.data;
      });
    this.$ajax
      .post(process.env.API_HOST + "/room/getNursingHomesTree")
      .then(respones => {
        this.bulid = respones.data;
        // this.bulid.push({label:'无',value:''})
      });
  },
  methods: {
    selet() {
      if (this.ZMetre.length == 0) {
        this.ZMetre = ["", "", ""];
      }
      this.$ajax
        .post(
          process.env.API_HOST + "/rail/getAllRailList",
          `query=${JSON.stringify(this.json)}&floorid=${this.ZMetre[2]}`
        )
        .then(respones => {
          this.tabledata = respones.data;
        });
    },
    bianji(upid) {
      this.upid = upid;
      this.dialogVisible = true;
    },
    delUser(delid) {
      this.$confirm("此操作将永久删除该围栏, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$ajax
            .post(
              process.env.API_HOST + "/rail/delRail",
              `id=${delid}&userid=${this.$store.state.token}`
            )
            .then(respones => {
              if (respones.data == "success") {
                this.$ajax
                  .post(
                    process.env.API_HOST + "/rail/getAllRailList",
                    `query=${JSON.stringify(this.json)}&floorid=`
                  )
                  .then(res => {
                    this.tabledata = res.data;
                    this.$message({
                      message: "删除成功",
                      type: "success"
                    });
                  });
              } else {
                this.$message.error("删除失败");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    childByValue(val) {
      this.$message({
        message: "修改成功",
        type: "success"
      });
      this.reload();
    }
  }
};
</script>
<style scoped>
.tableadmin {
  margin-left: 10px;
  margin-top: 10px;
}
</style>


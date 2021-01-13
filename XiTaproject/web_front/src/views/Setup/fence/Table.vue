<template>
  <div class="tableadmin">
    所在楼层：
    <el-cascader
      @change="changeFloorid"
      :options="NursingHomesTree"
      style="width:100px;margin-right:10px;"
      size="mini"
      clearable
    ></el-cascader>围栏类型：
    <el-select
      v-model="query.type"
      placeholder="请选择"
      style="width:100px;margin-right:20px"
      clearable
      size="mini"
    >
      <el-option v-for="item in types" :key="item.id" :label="item.value" :value="item.id"></el-option>
    </el-select>围栏名称：
    <el-input
      v-model="query.railname"
      style="width:100px;margin-right:10px;"
      size="mini"
      placeholder="请输入内容"
    ></el-input>
    <el-button type="primary" icon="el-icon-search" size="small" circle @click="select"></el-button>
    <el-table :data="allEnclosure" height="275px" border style="width: 613px;margin-top:10px">
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
      <el-table-column align="center" label="等级">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.raillevel==='1'" type="warning">低</el-tag>
          <el-tag v-if="scope.row.raillevel==='3'" type="danger">高</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="openUpdata(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="delEnclosure(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal="false" title="修改围栏信息" :visible.sync="dialogVisible" width="55%" :before-close="handleClose">
      <div class="enclosure-left">
        <div class="enclosure-map">
          <div class="Fence-step2">
            <Map
              v-if="dialogVisible"
              :ifUpdata="true"
              :tableFloorid="tableFloorid"
              ref="onEnclosureAdd"
            />
          </div>
        </div>
        <enclosureAdd
          v-if="dialogVisible"
          class="Fence-step1"
          :ifUpdata="true"
          :updataRnclosureData="updataRnclosureData"
          @updataEnclosure="updataEnclosure"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import bianji from "./bianji.vue";
import Map from "./fenceMap.vue";
import enclosureAdd from "./enclosureAdd.vue";
export default {
  components: {
    bianji,
    Map,
    enclosureAdd,
  },
  // inject: ["reload"],
  data() {
    return {
      // 点击编辑时选中的楼层id
      tableFloorid: "",
      updataRnclosureData: {},
      floorid: "",
      upid: "",
      dialogVisible: false,
      query: {
        railname: "",
        type: "",
      },
      ZMetre: ["", "", ""],
      types: [
        { id: 1, value: "禁入" },
        { id: 2, value: "计时禁入" },
        { id: 5, value: "分时段禁入" },
        { id: 3, value: "禁出" },
        { id: 4, value: "预警" },
        { id: 6, value: "单点禁入" },
        { id: 7, value: "单点禁出" },
      ],
    };
  },
  computed: {
    ...mapState({
      //全部建筑结构
      NursingHomesTree: (state) => state.fance.NursingHomesTree,
      // 全部新电子围栏
      allEnclosure: (state) => state.fance.allEnclosure,
    }),
  },
  created() {
    // 获取全部电子围栏表格信息
    this.select();
  },
  methods: {
    changeFloorid(data) {
      if (data.length != 0) {
        this.floorid = data[2];
      } else {
        this.floorid = "";
      }
    },
    // 获取全部电子围栏表格信息
    select() {
      this.$store.dispatch("railNew_getAllRailList", {
        query: this.query,
        floorid: this.floorid,
      });
    },
    // 打开修改对话框并且获取围栏信息
    openUpdata(id) {
      // 清空当前map中显示的电子围栏
      this.$store.commit("clearSureData");
      // 获取点击围栏信息
      this.$store.dispatch("railNew_getRailById", id).then((res) => {
        this.$store.commit("changeInputMode", res.enclosureFrom.roomtype);
        this.dialogVisible = true;
        this.updataRnclosureData = res;
        this.tableFloorid = res.enclosureFrom.floorid;
      });
    },
    // 删除围栏
    delEnclosure(delid) {
      this.$confirm("此操作将永久删除该围栏, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store
          .dispatch("railNew_delRail", {
            id: delid,
            query: this.query,
            floorid: this.floorid,
          })
          .then((res) => {
            this.$emit("newrailok");
          });
      });
    },
    // 修改围栏后关闭弹窗
    updataEnclosure(data) {
      if (data === "success") {
        this.$emit("newrailok");
        this.$emit("reMap");
        this.dialogVisible = false;
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.$store.commit("clearSureData");
          this.$emit("reMap");
        })
        .catch((_) => {});
    },
  },
};
</script>
<style scoped>
.tableadmin {
  margin-left: 10px;
  margin-top: 10px;
}
.enclosure-left {
  height: 790px;
  /* float: left; */
  margin-right: 15px;
}
.enclosure-map {
  padding-top: 28px;
  height: 552px;
  background-color: #fff;
  margin-bottom: 15px;
}

.map {
  height: 505px;
  width: 946px;
  margin-left: 20px;
  background-color: #1d283b;
  border-radius: 7px;
  padding-top: 10px;
  padding-left: 10px;
  background-image: url(../../../assets/5.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
</style>


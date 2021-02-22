<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <div>
      <FilenameOption />
      <div class="filterTable-step5" style="float:left">
        <el-button ref="rbtn" type="primary" @click="changeStates(0)" style="margin-left:40px">批量入院</el-button>
        <el-button ref="wbtn" type="primary" @click="changeStates(1)" style="margin-left:10px">批量外出</el-button>
        <el-button
          ref="lbtn"
          type="primary"
          @click="batchDeparturefromhospital"
          style="margin-left:10px"
        >批量离院</el-button>
        <el-button type="primary" @click="bulkDelete" style="margin-left:10px">批量删除</el-button>
      </div>
    </div>
    <el-table
      class="filterTable-step6"
      :data="allSeniors.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      @selection-change="handleSelectionChange"
      element-loading-text="拼命加载中"
      border
      highlight-current-row
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="ROWNUM" align="center" label="序号"></el-table-column>
      <el-table-column prop="CODE" align="center" label="编号"></el-table-column>
      <el-table-column prop="FULLNAME" align="center" label="姓名"></el-table-column>
      <el-table-column prop="SEX" align="center" label="性别"></el-table-column>
      <el-table-column prop="DEVICECODE" label="绑定设备编码" align="center"></el-table-column>
      <el-table-column prop="ROOMNAME" label="房间号" align="center"></el-table-column>
      <el-table-column prop="grade" align="center" label="护理等级">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.NURSINGLEVEL=='全自理' ">全自理</el-tag>
          <el-tag type="info" v-if="scope.row.NURSINGLEVEL=='半自理' ">半自理</el-tag>
          <el-tag type="danger" v-if="scope.row.NURSINGLEVEL=='全介护' ">全介护</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="入院时间">
        <template slot-scope="scope">
          <span type="success" v-if="scope.row.ADMISSIONDATE">{{scope.row.ADMISSIONDATE}}</span>
          <span type="info" v-else>{{scope.row.CREATEDTIME}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="STATE" align="center" label="在院状态">
        <template slot-scope="scope">
          <el-select
            @change="((val)=>{changeHospitalState(val, scope.row.ID,scope.row.STATE)})"
            size="small"
            :value="JSON.parse(JSON.stringify(scope.row.STATE))"
            placeholder="请选择"
          >
            <el-option
              v-for="item in inHospitalState(scope.row.STATE)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <router-link :to="{ name: '详情', params: { id: scope.row.ID}}">
            <el-button type="primary" size="mini">详情</el-button>
          </router-link>
          <router-link :to="{ name: '编辑', params: { id: scope.row.ID}}">
            <el-button type="success" size="mini">编辑</el-button>
          </router-link>

          <span>
            <el-button type="danger" size="mini" @click="deletepeople(scope.row.ID)">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="allSeniors.length"
    ></el-pagination>
  </div>
</template>


<script>
import { mapState } from "vuex";
import FilenameOption from "./FilenameOption";
export default {
  name: "filterTable",
  components: {
    FilenameOption,
  },
  computed: {
    ...mapState({
      // 全部人员数据
      allSeniors: (state) => state.details.allSeniors,
      pageSize: (state) => state.archivesList.pageSize,
      currentPage: (state) => state.archivesList.currentPage,
    }),
  },
  data() {
    return {
      rbtn: false,
      wbtn: false,
      lbtn: false,
      inHospitalStatez: [
        {
          value: "0",
          label: "在院",
        },
        {
          value: "1",
          label: "外出",
        },
        {
          value: "2",
          label: "离院",
        },
      ],
      inHospitalStatew: [
        {
          value: "0",
          label: "在院",
        },
        {
          value: "1",
          label: "外出",
        },
        {
          value: "2",
          label: "离院",
          disabled: true
        },
      ],
      inHospitalStatel: [
        {
          value: "0",
          label: "在院",
        },
        {
          value: "1",
          label: "外出",
          disabled: true
        },
        {
          value: "2",
          label: "离院",
        },
      ],
      // 当前为修改状态
      gOldState: 0,
      beHospitalizedbtn: true,
      goOutbtn: true,
      outOfHospital: true,
      deletebtn: true,
      // 批量选中
      multipleSelection: [],
      a: 1,
      list: [
        {
          ID: 1,
          FULLNAME: "",
          ROWNUM: "",
          SEX: "",
          AGE: "",
          ROOMNAME: "",
          NURSINGLEVEL: "",
          ADMISSIONDATE: "",
          STATE: "",
          CODE: "",
          bgc: "",
        },
      ],
      sousuo: {
        id: "",
        name: "",
        sex: "",
        roomN: "",
        state: "",
        hasDevice: "",
      },
    };
  },
  beforeRouteLeave(to, form, next) {
    if (this.$store.state.hospitalshow) {
      if (to.name == "简单评估" && this.$store.state.actives == 1) {
        next();
      } else {
        if (this.childByValuename != "") {
          this.$confirm("入院未完成, 是否退出?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              next();
              this.$store.commit("closehospitalshow");
              this.$store.state.actives = 0;
              this.$store.state.activeNames = "1";
            })
            .catch(() => {
              next(false);
            });
        } else {
          next();
        }
      }
    } else {
      next();
    }
  },
  created() {
    this.$store.dispatch("person_getPersonList", {
      id: "",
      name: "",
      sex: "",
      roomN: "",
      state: "",
      hasDevice: "",
    });
  },
  mounted() {
    this.$refs.rbtn.$el.style.display = "none";
    this.$refs.wbtn.$el.style.display = "none";
    this.$refs.lbtn.$el.style.display = "none";
    this.handleSizeChange(10);
  },
  methods: {
    // 根据在院状态返回可切换选项
    inHospitalState(state) {
      if (state == "0") {
        return this.inHospitalStatez;
      } else if (state == "1") {
        return this.inHospitalStatew;
      } else if (state == "2") {
        return this.inHospitalStatel;
      }
    },
    // 改变在院状态
    changeHospitalState(state, id, oldState) {
      if (state != "2") {
        this.changestate(id, state, oldState);
      } else {
        this.leave(id);
      }
    },
    // 删除人员
    deletepeople(id) {
      this.$confirm("即将删除人员，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("person_delPersonById", {
            id: id,
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
    // 修改状态
    changestate(id, state, oldState) {
      this.$confirm("即将修改在院状态，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let arr = [];
          arr.push(id);
          this.$store.dispatch("person_updatePersonsInHospital", {
            personIds: arr,
            userid: this.$store.state.token,
            state: state,
            oldState: oldState,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    }, // 离院
    leave(id) {
      this.$confirm("即将离院，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("person_departurePerson", {
            personid: id,
            userid: this.$store.state.token,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消离院",
          });
        });
    },
    handleCurrentChange(data) {
      this.$store.commit("changeCurrentPage", data);
    },
    handleSizeChange(data) {
      this.$store.commit("changePageSize", data);
    },
    // 批量选中
    handleSelectionChange(val) {
      if (val.length !== 0) {
        this.gOldState = val[0].STATE;
        this.multipleSelection = [];
        val.forEach((element) => {
          this.multipleSelection.push(element.ID);
        });
        const zaiyuan = val.some(function (data) {
          return data.STATE == "0";
        });
        const waichu = val.some(function (data) {
          return data.STATE == "1";
        });
        const liyuan = val.some(function (data) {
          return data.STATE == "2";
        });
        console.log(zaiyuan, waichu, liyuan);
        if ((zaiyuan && waichu) || (zaiyuan && liyuan)) {
          this.$refs.rbtn.$el.style.display = "none";
          this.$refs.wbtn.$el.style.display = "none";
          this.$refs.lbtn.$el.style.display = "none";
        } else {
          if (zaiyuan) {
            this.$refs.rbtn.$el.style.display = "none";
            this.$refs.wbtn.$el.style.display = "inline-block";
            this.$refs.lbtn.$el.style.display = "inline-block";
          } else if (waichu) {
            this.$refs.rbtn.$el.style.display = "inline-block";
            this.$refs.wbtn.$el.style.display = "none";
            this.$refs.lbtn.$el.style.display = "none";
          } else if (liyuan) {
            this.$refs.rbtn.$el.style.display = "inline-block";
            this.$refs.wbtn.$el.style.display = "none";
            this.$refs.lbtn.$el.style.display = "none";
          }
        }
      } else {
        this.$refs.rbtn.$el.style.display = "none";
        this.$refs.wbtn.$el.style.display = "none";
        this.$refs.lbtn.$el.style.display = "none";
      }
    },
    // 批量修改在院状态
    changeStates(state) {
      this.$confirm("即将批量修改在院状态，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 批量修改人员在院状态(在院 外出)
          this.$store.dispatch("person_updatePersonsInHospital", {
            personIds: this.multipleSelection,
            userid: this.$store.state.token,
            state: state,
            oldState: this.gOldState,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 批量离院
    batchDeparturefromhospital() {
      this.$confirm("即将批量离院，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 批量离院
          this.$store.dispatch("person_departurePersons", {
            personids: this.multipleSelection,
            userid: this.$store.state.token,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 批量删除
    bulkDelete() {
      if (this.multipleSelection.length != 0) {
        this.$confirm("即将批量删除人员，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$store.dispatch("person_delPersonByIds", {
              personIds: this.multipleSelection,
              userid: this.$store.state.token,
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          type: "warning",
          message: "请勾选！",
        });
      }
    },
    // 表格变色
    tableRowClassName({ row }) {
      if (row.STATE == "2") {
        return "grey-row";
      } else if (row.STATE == "1") {
        return "light-grey-row";
      }
      return "";
    },
  },
};
</script>
<style>
.el-table .grey-row {
  /* background: #606266;
    color: #fff; */
}

.el-table .light-grey-row {
  /* background: #909399;
    color: #fff; */
}
</style>
<style scoped>
</style>

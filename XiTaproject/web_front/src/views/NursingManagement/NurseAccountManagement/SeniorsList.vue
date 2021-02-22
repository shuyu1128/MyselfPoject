<template>
  <!-- 长者管理组件 -->
  <div class="seniors_list">
    <!-- 分配长者对话框 -->
    <el-dialog title="分配长者" :visible.sync="addSeniorBtn">
      <el-select
        style="width: 100%"
        v-model="peopleForm.teamid"
        placeholder="请选择组别"
      >
        <el-option
          v-for="item in allGroup"
          :key="item.id"
          :label="item.teamname"
          :value="item.id"
        ></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSeniorBtn = false">取 消</el-button>
        <el-button type="primary" @click="submitSeniorForm"> 确 定 </el-button>
      </div>
    </el-dialog>
    <el-row :gutter="20">
      <el-col :span="6"><h3 class="title_color">长者管理</h3></el-col>
      <el-col :span="6" :offset="12">
        <el-input
          style="width:100%"
          size="mini"
          v-model="selectTable"
          placeholder="请输入姓名查询"
        ></el-input>
      </el-col>
    </el-row>

    <el-table
      height="calc(100% - 24px)"
      :data="
        idsPelple.filter(
          data =>
            !selectTable ||
            data.fullname.toLowerCase().includes(selectTable.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column align="center" label="姓名" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.fullname }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sex" label="性别">
      </el-table-column>
      <el-table-column align="center" prop="roomname" label="房间号">
      </el-table-column>
      <el-table-column align="center" prop="nursinglevel" label="护理等级">
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            修改组别
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectTable: "",
      peopleForm: {
        teamid: "",
        id: ""
      },
      addSeniorBtn: false,
      tableData: [
        {
          // 姓名
          fullname: "韩怡斌",
          // 性别
          sex: "男",
          // 房间号
          roomname: "315",
          // 护理等级
          nursinglevel: "全自理",
          teamid: "1",
          id: 2
        }
      ]
    };
  },
  computed: {
    // 全部长者
    idsPelple() {
      return this.$store.state.NursingManagement.idsPelple;
    },
    // 全部组别
    allGroup() {
      return this.$store.state.NursingManagement.allGroup;
    }
  },
  created() {
    // 获取表格长者list
    this.$store.dispatch("prnPerson_getPersonTeamList");
  },
  methods: {
    handleEdit(item) {
      this.peopleForm.teamid = item.teamid;
      this.peopleForm.id = item.personteamid;
      this.addSeniorBtn = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 切换长者组别
    submitSeniorForm() {
      this.$store
        .dispatch("basNursingTeam_updatePersonTeam", {
          id: this.peopleForm.id,
          teamid: this.peopleForm.teamid
        })
        .then(res => {
          if (res == "yes") {
            this.addSeniorBtn = false;
          }
        });
    }
  }
};
</script>

<style></style>

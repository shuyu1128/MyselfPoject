<template>
  <!-- 护工组管理操作组件 -->
  <div class="operation">
    <!-- 新增组别对话框 -->
    <el-dialog title="新增组别" :visible.sync="addGroupBtn">
      <el-form :rules="GroupRules" ref="GroupRuleForm" :model="GroupForm">
        <el-form-item label="组别名称" prop="teamName">
          <el-input v-model="GroupForm.teamName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGroupBtn = false">取 消</el-button>
        <el-button type="primary" @click="submitGroupForm"> 确 定 </el-button>
      </div>
    </el-dialog>
    <!-- 新增护工对话框 -->
    <el-dialog title="新增护工" :visible.sync="addWorkerBtn">
      <el-form :rules="WorkerRules" ref="WorkerRuleForm" :model="WorkerForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="WorkerForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="WorkerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="WorkerForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idcard">
          <el-input v-model="WorkerForm.idcard"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="WorkerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select
            style="width: 100%"
            v-model="WorkerForm.sex"
            placeholder="请选择"
          >
            <el-option label="男" :value="'0'"></el-option>
            <el-option label="女" :value="'1'"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属组别" prop="teamid">
          <el-select
            style="width: 100%"
            v-model="WorkerForm.teamid"
            placeholder="请选择"
          >
            <el-option
              v-for="item in allGroup"
              :key="item.id"
              :label="item.teamname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addWorkerBtn = false">取 消</el-button>
        <el-button type="primary" @click="submitWorkerForm"> 确 定 </el-button>
      </div>
    </el-dialog>
    <!-- 分配长者对话框 -->
    <el-dialog title="分配长者" :visible.sync="addSeniorBtn">
      <el-select
        style="width: 100%"
        v-model="choiceGroup"
        placeholder="请选择组别"
      >
        <el-option
          v-for="item in allGroup"
          :key="item.id"
          :label="item.teamname"
          :value="item.id"
        ></el-option>
      </el-select>
      <div class="selectPeople">
        <div style="margin-bottom:20px;overflow: hidden;">
          <li style="float:right">
            <span>
              长者姓名查询：
            </span>
            <el-input
              style="width:180px"
              size="small"
              v-model="addSeniorSelect"
              placeholder="请输入"
            ></el-input>
          </li>
        </div>
        <el-checkbox-group v-model="checkPelple" size="small">
          <el-checkbox
            v-for="item in nonePeople.filter(
              data =>
                !addSeniorSelect ||
                data.fullname
                  .toLowerCase()
                  .includes(addSeniorSelect.toLowerCase())
            )"
            :key="item.id"
            :label="item.id"
            border
            >{{ item.fullname }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSeniorBtn = false">取 消</el-button>
        <el-button type="primary" @click="submitSeniorForm"> 确 定 </el-button>
      </div>
    </el-dialog>
    <h3 class="title_color" style="margin-bottom: 26px">操作</h3>
    <div class="btn_group">
      <el-button type="primary" @click="addGroupBtn = true">新增组别</el-button>
      <el-button type="primary" @click="addWorkerBtn = true">
        新增护工
      </el-button>
      <el-button type="primary" @click="addSeniorBtn = true">
        分配长者
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询可勾选长者使用
      addSeniorSelect: "",
      // 可选择组别
      groups: [{ teamName: "小组1", id: "1" }],
      // 长者分配组信息相关
      checkPelple: [],
      choiceGroup: "",
      // 新增组别相关
      addGroupBtn: false,
      GroupForm: {
        teamName: ""
      },
      GroupRules: {
        teamName: [
          { required: true, message: "请输入组别名称", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur"
          }
        ]
      },
      //   新增护工相关
      addWorkerBtn: false,
      WorkerForm: {
        // 账号
        account: "",
        // 密码
        password: "",
        // 身份证
        idcard: "",
        // 性别
        sex: "",
        nickname: "",
        phone: "",
        // 所属组别
        teamid: ""
      },
      WorkerRules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur"
          }
        ],
        nickname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur"
          }
        ],
        idcard: [
          {
            required: true,
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            message: "请输入正确身份证号",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: "请输入正确联系方式",
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "请输选择性别", trigger: "blur" }],
        teamid: [{ required: true, message: "请选择组别", trigger: "blur" }]
      },
      //   新增长者相关
      addSeniorBtn: false
    };
  },
  computed: {
    // 全部组别
    allGroup() {
      return this.$store.state.NursingManagement.allGroup;
    },
    // 供选择使用长者
    nonePeople() {
      return this.$store.state.NursingManagement.nonePeople;
    }
  },
  created() {
    // 获取未分组长者供选择使用
    this.$store.dispatch("prnPerson_getPersonNoTeamList");
  },
  methods: {
    //   添加组别
    submitGroupForm() {
      this.$refs["GroupRuleForm"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("basNursingTeam_insertNursingTeam", {
              json: this.GroupForm,
              userid: this.$store.state.token
            })
            .then(res => {
              if (res == "yes") {
                this.addGroupBtn = false;
                this.GroupForm.teamName = "";
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加护工
    submitWorkerForm() {
      this.$refs["WorkerRuleForm"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("sysNursingUser_insertNursingUser", this.WorkerForm)
            .then(res => {
              if (res == "yes") {
                this.addWorkerBtn = false;
                this.WorkerForm = {
                  account: "",
                  password: "",
                  idcard: "",
                  sex: "",
                  teamid: ""
                };
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 分配长者
    submitSeniorForm() {
      if (this.checkPelple.length != 0 && this.choiceGroup != "") {
        this.$store
          .dispatch("basNursingTeam_insertPersonTeam", {
            personids: this.checkPelple,
            teamid: this.choiceGroup
          })
          .then(res => {
            if (res == "yes") {
              this.addSeniorBtn = false;
              this.checkPelple = [];
              this.choiceGroup = "";
            }
          });
      } else {
        this.$message.warning("请选择完整");
      }
    }
  }
};
</script>
<style>
.operation .el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
}
.operation .el-checkbox {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
<style scoped>
.operation {
  position: relative;
}
.btn_group {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -160px;
}
.selectPeople {
  margin-top: 20px;
  height: 200px;
  overflow-y: auto;
}
</style>

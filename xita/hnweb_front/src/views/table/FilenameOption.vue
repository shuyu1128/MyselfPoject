<template>
  <div style="float:left">
    <!-- 新增人员对话框 -->
    <el-dialog title="新增人员" :visible.sync="dialogNewPersonnel" :close-on-click-modal="false">
      <el-form
        v-loading="dialogNewPersonnelLoading"
        :model="NewPersonnelobj"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="姓名" prop="username">
          <el-input maxlength="16" v-model="NewPersonnelobj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住院号" prop="hospitalID">
          <el-input v-model="NewPersonnelobj.hospitalID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手环" prop="deviceId">
          <el-select v-model="NewPersonnelobj.deviceId" placeholder="请选择手环" style="width:100%">
            <el-option
              v-for="(item,index) in notWearingEquipment"
              :key="index"
              :label="item.name"
              :value="item.ID"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewPersonnel = false">取 消</el-button>
        <el-button type="primary" @click="sureNewPersonnel('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增人员对话框 -->

    <form id="msgForm" target="form" action enctype="multipart/form-data" method="post">
      <input
        ref="filElem"
        name="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        type="file"
        class="upload-file"
        @change="getFile"
        style="display:none"
      />
    </form>
    <iframe name="form" ref="reszhi" style="display: none" id="form"></iframe>
    <!-- $t is vue-i18n global function to translate lang -->
    <div class="header-clo filterTable-step1">
      <el-input
        maxlength="16"
        v-model="sousuo.id"
        placeholder="编号"
        style="width:100px;"
        prefix-icon="el-icon-document"
      />
      <el-input
        maxlength="16"
        v-model="sousuo.name"
        placeholder="长者姓名"
        style="width:120px;"
        prefix-icon="el-icon-document"
      />
      <el-select clearable v-model="sousuo.sex" style="width:95px;" placeholder="性别">
        <el-option
          v-for="item in optionsex"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        maxlength="16"
        v-model="sousuo.roomN"
        placeholder="房间号"
        style="width:130px;"
        prefix-icon="el-icon-document"
      />
      <el-select clearable v-model="sousuo.state" style="width:105px;" placeholder="在院状态">
        <el-option
          v-for="item in optionstate"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select clearable v-model="sousuo.hasDevice" style="width:105px;" placeholder="佩戴状态">
        <el-option
          v-for="item in equipmentoption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <div class="header-clo">
      <el-button
        class="filterTable-step2"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="document"
        @click="handleDownload"
      >
        <i class="el-icon-edit"></i>
        添加
      </el-button>

      <el-button
        class="filterTable-step3"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="document"
        @click="Downloadmoban"
      >
        <i class="el-icon-edit"></i>
        批量添加
      </el-button>
      <download-excel
        class="export-excel-wrapper filterTable-step4"
        :data="zhenlist"
        :fields="json_fields"
        name="人员概览.xls"
      >
        <i class="el-icon-download"></i>
        导出
      </download-excel>
    </div>
    <el-dialog title="提示" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="fullname" label="姓名"></el-table-column>
        <el-table-column property="idcard" label="身份证"></el-table-column>
        <el-table-column property="insurancecard" label="社保卡"></el-table-column>
        <el-table-column property="sex" label="性别"></el-table-column>
        <el-table-column property="birthdate" label="出生日期"></el-table-column>
        <el-table-column property="nation" label="民族"></el-table-column>
        <el-table-column property="religion" label="宗教"></el-table-column>
        <el-table-column property="origin" label="籍贯"></el-table-column>
        <el-table-column property="education" label="文化"></el-table-column>
        <el-table-column property="census" label="户籍所在地" width="100"></el-table-column>
        <el-table-column property="detailaddr" label="详细地址"></el-table-column>
        <el-table-column property="medicalinsurance" label="医疗保险"></el-table-column>
        <el-table-column property="commercialinsurance" label="商业保险"></el-table-column>
        <el-table-column property="endowmeninsurance" label="养老保险"></el-table-column>
        <el-table-column property="code" label="住院号"></el-table-column>
        <el-table-column property="roomname" label="房间名称"></el-table-column>
        <el-table-column property="bedname" label="床位名称"></el-table-column>
        <el-table-column property="doctor" label="所属医生"></el-table-column>
        <el-table-column property="remark" label="备注"></el-table-column>
        <el-table-column property="isinhospital" label="是否在院"></el-table-column>
        <el-table-column property="nursinglevel" label="护理等级"></el-table-column>
        <el-table-column property="health" label="健康状况"></el-table-column>
        <el-table-column property="healthstatement" label="身体状况陈述" width="120"></el-table-column>
        <el-table-column property="carepoint" label="照护重点"></el-table-column>
        <el-table-column property="diettaboo" label="饮食禁忌"></el-table-column>
        <el-table-column property="bloodtype" label="血型"></el-table-column>
        <el-table-column property="drugreaction" label="药物反应"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="baocun">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入人员姓名", trigger: "blur" },
        ],
        hospitalID: [
          {
            pattern: /^\d*\.?\d+$/,
            message: "请输入数字",
            trigger: "blur",
          },
        ],
        deviceId: [
          { required: true, message: "请选择手环", trigger: "change" },
        ],
      },
      NewPersonnelobj: {
        username: "",
        hospitalID: "",
        deviceId: "",
      },
      braceletList: [],
      dialogNewPersonnel: false,
      dialogNewPersonnelLoading: false,
      gridData: [],
      uuid: "",
      dialogTableVisible: false,
      json_fields: {
        序号: "ROWNUM",
        编号: "CODE",
        姓名: "FULLNAME",
        性别: "SEX",
        绑定设备编码: "DEVICECODE",
        房间号: "ROOMNAME",
        护理等级: "NURSINGLEVEL",
        入院时间: "ADMISSIONDATE",
        在院状态: "STATE",
      },
      optionsex: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
        {
          value: " ",
          label: "全部",
        },
      ],
      optionstate: [
        {
          value: "0",
          label: "在院",
        },
        { value: "1", label: "外出" },
        {
          value: "2",
          label: "离院",
        },
        {
          value: " ",
          label: "全部",
        },
      ],
      equipmentoption: [
        {
          value: "0",
          label: "未佩戴",
        },
        { value: "1", label: "已佩戴" },
        {
          value: " ",
          label: "全部",
        },
      ],
      value: "",
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
  computed: {
    notWearingEquipment() {
      return this.$store.state.archivesList.notWearingEquipment;
    },
    zhenlist() {
      let arr = [];
      this.$store.state.details.allSeniors.forEach((element) => {
        arr.push(Object.assign({}, element));
      });
      arr.forEach((element) => {
        if (element.STATE == 0) {
          element.STATE = "在院";
        } else if (element.STATE == 1) {
          element.STATE = "外出";
        } else if (element.STATE == 2) {
          element.STATE = "离院";
        }
      });
      return arr;
    },
    filename: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  watch: {
    sousuo: {
      handler(val) {
        console.log(val);
        this.$store.commit("changeSelectFrom", val);
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    baocun() {
      this.$ajax
        .post(
          process.env.API_HOST + "/person/insertPersonList",
          `uuid=${this.uuid}`
        )
        .then((respones) => {
          this.search();
          this.$message({
            message: "导入成功",
            type: "success",
          });
          this.dialogTableVisible = false;
        });
    },
    getFile() {
      const inputFile = this.$refs.filElem.files[0];
      if (inputFile) {
        var form1 = document.getElementById("msgForm");
        form1.action =
          process.env.API_HOST +
          "/person/uploadPersonListFile?userid=" +
          this.$store.state.token;
        form1.submit();
        setTimeout(() => {
          var text = JSON.parse($("#form").contents().find("body").text());
          this.uuid = text.code;
          if (text.msg == "success") {
            this.dialogTableVisible = true;
            this.gridData = text.personList;
          } else {
            this.$notify({
              title: "警告",
              message: text.msg,
              duration: 0,
            });
          }
        }, 1000);
      }
      this.$refs.filElem.value = null;
    },
    Downloadmoban() {
      this.$confirm("请先下载模板?", "提示", {
        confirmButtonText: "确定下载",
        cancelButtonText: "我已下载",
        distinguishCancelAndClose: true,
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "下载成功!",
          });
          window.location.href =
            process.env.API_HOST + "/person/downLoadPersonModel";
        })
        .catch((data) => {
          if (data == "cancel") {
            this.$refs.filElem.dispatchEvent(new MouseEvent("click"));
          } else {
          }
        });
    },
    handleDownload() {
      if (this.$store.state.hospitalshow) {
        this.onekey();
      } else {
        this.dialogNewPersonnel = true;
        this.dialogNewPersonnelLoading = true;
        this.$store.dispatch("person_getDeviceListByPersonId", "").then(() => {
          this.dialogNewPersonnelLoading = false;
        });
      }
    },
    // 一键入院状态下添加
    onekey() {
      this.$confirm("确认是否添加长者！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$ajax
            .post(
              process.env.API_HOST + "/person/insertPerson",
              `userid=${this.$store.state.token}`
            )
            .then((respones) => {
              if (respones.data.id) {
                // 一键入院状态更改
                if (this.$store.state.hospitalshow) {
                  this.$store.state.actives = 1;
                  this.$router.push({
                    path: "/Evaluating",
                    name: "简单评估",
                    query: { id: respones.data.id },
                  });
                } else {
                  this.$router.push({
                    path: "/Details:id",
                    name: "编辑",
                    query: { id: respones.data.id },
                  });
                }
              } else {
                this.$message({
                  type: "info",
                  message: "编号重复",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 普通添加
    sureNewPersonnel(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("person_insertPersonData", {
              userid: this.$store.state.token,
              username: this.NewPersonnelobj.username,
              deviceId: this.NewPersonnelobj.deviceId,
              hospitalID: this.NewPersonnelobj.hospitalID,
            })
            .then((res) => {
              if (res.state == "success") {
                this.$message.success("添加成功");
                this.search();
                this.NewPersonnelobj = {
                  username: "",
                  hospitalID: "",
                  deviceId: "",
                };
                this.dialogNewPersonnel = false;
              } else {
                this.$message.error(res.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    search() {
      this.$store.dispatch("person_getPersonList", this.sousuo).then(() => {
        this.$store.commit("changeCurrentPage", 1);
      });
    },
  },
};
</script>
<style>
.export-excel-wrapper {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  margin-left: 18px;
}
.header-clo {
  float: left;
}
</style>

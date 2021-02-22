<template>
  <div class="alertfrom">
    <!-- Form -->
    <el-button type="primary" @click="luru">基站录入</el-button>

    <el-dialog title="录入基站" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="110px">
        <el-form-item label="录入名称" prop="name">
          <el-input maxlength="32" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="录入编号" prop="code">
          <el-input maxlength="8" v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="录入描述">
          <el-input maxlength="50" v-model="form.basestationdesc"></el-input>
        </el-form-item>
        <el-form-item label="录入型号">
          <el-input maxlength="64" v-model="form.model"></el-input>
        </el-form-item>
        <el-form-item label="解析协议版本" prop="version">
          <el-input maxlength="32" v-model="form.version" placeholder="v1.0"></el-input>
        </el-form-item>
        <!-- <el-form-item label="校验版本">
          <el-input v-model="form.checkversion" placeholder="v1.0"></el-input>
        </el-form-item>-->
        <el-form-item label="基站高度" prop="height">
          <el-input maxlength="10" v-model="form.height"></el-input>
        </el-form-item>
        <el-form-item label="无线编码">
          <el-input maxlength="4" v-model="form.wificode"></el-input>
        </el-form-item>
        <!-- <el-form-item label="部署方式">
          <el-select style="width:100%;" v-model="deploymentmodevalue" placeholder="请选择">
            <el-option
              v-for="item in deploymentmode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="录入X轴" prop="xmetre">
          <el-input v-model="form.xmetre"></el-input>
        </el-form-item>
        <el-form-item label="录入Y轴" prop="ymetre">
          <el-input v-model="form.ymetre"></el-input>
        </el-form-item>

        <!-- <el-form-item label="X+基站">
          <el-input v-model="form.xtbasestation"></el-input>
        </el-form-item>
        <el-form-item label="Y-基站">
          <el-input v-model="form.ybbasestation"></el-input>
        </el-form-item>
        <el-form-item label="X-基站">
          <el-input v-model="form.xbbasestation"></el-input>
        </el-form-item>
        <el-form-item label="Y+基站">
          <el-input v-model="form.ytbasestation"></el-input>
        </el-form-item>-->

        <!-- <el-form-item label="录入Z轴">
          <el-input v-model="form.Zmetre"></el-input>
        </el-form-item>-->
        <el-form-item label="录入房间" prop="selectRoom">
          <el-cascader v-model="floorid" :options="options" placeholder style="width:100%;"></el-cascader>
        </el-form-item>
        <el-form-item label="卫生间X轴" prop="xtoilet">
          <el-input v-model="form.xtoilet"></el-input>
        </el-form-item>
        <el-form-item label="卫生间Y轴" prop="ytoilet">
          <el-input v-model="form.ytoilet"></el-input>
        </el-form-item>
        <div style="margin-left:10px;margin-bottom:10px;">计算方式与逻辑区域配置</div>
        <el-row v-for="(domain,index) in form.domains" :key="index">
          <el-col :span="8">
            <el-form-item
              label="计算方式"
              :prop="'domains.' + index + '.cmd'"
              :rules="{required: true, message: '计算方式不能为空', trigger: 'blur'}"
            >
              <el-select style="width:100%" v-model="domain.cmd" placeholder="请选择">
                <el-option
                  v-for="item in Calculation"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="逻辑区域"
              :prop="'domains.' + index + '.lrg'"
              :rules="{required: true, message: '逻辑区域不能为空', trigger: 'blur'}"
            >
              <el-input maxlength="5" v-model="domain.lrg"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="逻辑区域ID"
              :prop="'domains.' + index + '.lrgId'"
              :rules="{required: true, message: '逻辑区域ID不能为空', trigger: 'blur'}"
            >
              <el-input maxlength="5" style="width:120px;margin-right:20px" v-model="domain.lrgId"></el-input>
              <el-button
                type="danger"
                icon="el-icon-delete"
                v-if="form.domains.length!=1"
                @click="removeDomain(domain)"
                circle
              ></el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button style="float:right;margin-right:20px" @click="addDomain">新增计算方式与逻辑区域配置</el-button>
        </el-form-item>
      </el-form>

      <!-- <div style="margin-bottom:20px" v-for="(item,index) in logic" :key="index">
        <span style="margin-left:25px">计算方式：</span>
        <el-select style="width:150px;margin-right:10px;" v-model="item[0]" placeholder="请选择">
          <el-option
            v-for="item in Calculation"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>逻辑区域：</span>
        <el-input
          style="width:150px;margin-right:10px;"
          @blur="ziranshu(item[1])"
          v-model="item[1]"
        ></el-input>
        <span>基站逻辑id：</span>
        <el-input
          style="width:150px;margin-right:50px;"
          @blur="ziranshu(item[2])"
          v-model="item[2]"
        ></el-input>
        <el-button type="primary" icon="el-icon-plus" @click="add" circle></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          v-if="deletedshow"
          @click="deleteji(index)"
          circle
        ></el-button>
      </div>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitform('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Alertform from "./Alertform.vue";
export default {
  components: { Alertform },
  data() {
    var selectRoomvalidator = (rule, value, callback) => {
      if (this.floorid) {
        callback();
      } else {
        callback(new Error("请选择房间"));
      }
    };
    return {
      deletedshow: false,
      logic: [["", "", ""]],
      Calculation: [
        {
          value: 1,
          label: 1,
        },
        {
          value: 2,
          label: 2,
        },
        {
          value: 3,
          label: 3,
        },
        {
          value: 4,
          label: 4,
        },
      ],
      deploymentmode: [
        {
          value: 1,
          label: "部署点在所属范围上方",
        },
        {
          value: 2,
          label: "部署点在所属范围下方",
        },
      ],
      deploymentmodevalue: "",
      Calculationvalue: "",
      options: [],
      dialogFormVisible: false,
      form: {
        wificode: "",
        ytoilet: "",
        xtoilet: "",
        height: "",
        code: "",
        name: "",
        model: "",
        version: "",
        checkversion: "",
        xmetre: "",
        ymetre: "",
        zmetre: "",
        basestationdesc: "",
        method: "",
        // 动态逻辑分区
        domains: [
          {
            cmd: "",
            lrg: "",
            lrgId: "",
          },
        ],
        // xtbasestation: "",
        // ybbasestation: "",
        // xbbasestation: "",
        // ytbasestation: ""
      },
      rules: {
        name: [{ required: true, message: "请输入基站名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }],
        version: [
          { required: true, message: "请输入解析协议版本", trigger: "blur" },
        ],
        height: [
          { required: true, message: "请输入基站高度", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "基站高度格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
        ],
        xmetre: [
          { required: true, message: "请输入X轴", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
        ],
        ymetre: [
          { required: true, message: "请输入Y轴", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
        ],
        xtoilet: [
          { required: true, message: "请输入卫生间X轴", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
        ],
        ytoilet: [
          { required: true, message: "请输入卫生间Y轴", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
        ],
        selectRoom: [{ required: true, validator: selectRoomvalidator }],
      },
      floorid: null,
      formLabelWidth: "120px",
    };
  },
  created() {
    // 获取楼层列表
    this.$ajax
      .post(process.env.API_HOST + "/bed/getNursingHomesTree")
      .then((respones) => {
        this.options = respones.data;
      });
  },
  watch: {
    logic(val) {
      console.log(val);
      if (val.length == 1) {
        this.deletedshow = false;
      } else {
        this.deletedshow = true;
      }
    },
  },
  methods: {
    removeDomain(item) {
      var index = this.form.domains.indexOf(item);
      if (index !== -1) {
        this.form.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.form.domains.push({
        cmd: "",
        lrg: "",
        lrgId: "",
      });
    },
    luru() {
      // 获取基站高度默认值
      this.$ajax
        .post(process.env.API_HOST + "/basestation/getBaseStationHeight")
        .then((respones) => {
          this.form.height = respones.data;
          console.log("基站高", respones.data);
        });
      this.form = {
        wificode: "",
        ytoilet: "",
        xtoilet: "",
        height: "",
        code: "",
        name: "",
        model: "",
        version: "",
        checkversion: "",
        xmetre: "",
        ymetre: "",
        zmetre: "",
        basestationdesc: "",
        method: "",
        domains: [
          {
            cmd: "",
            lrg: "",
            lrgId: "",
          },
        ],
      };
      this.floorid = null;
      this.dialogFormVisible = true;
    },
    deleteji(data) {
      this.logic.splice(data, 1);
    },
    ziranshu(data) {
      // 校验输入的值是否为自然数
      let Q = /^[1-9]\d*$/;
      if (!Q.test(data)) {
        this.$message({
          message: "警告，请输入正整数",
          type: "warning",
        });
      }
    },
    add() {
      this.logic.push([, ,]);
    },
    submitform(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var methodStr = "";
          this.form.domains.forEach((element, index) => {
            if (index === this.form.domains.length - 1) {
              methodStr = `${methodStr}${element.cmd}-${element.lrg}-${element.lrgId}`;
            } else {
              methodStr = `${methodStr}${element.cmd}-${element.lrg}-${element.lrgId}|`;
            }
          });
          this.form.method = methodStr;
          // 添加基站信息;
          this.$ajax
            .post(
              process.env.API_HOST + "/basestation/insertBasestation",
              `json=${JSON.stringify(this.form)}&nursinghomeid=${
                this.floorid[0]
              }&buildingid=${this.floorid[1]}&floorid=${
                this.floorid[2]
              }&roomid=${this.floorid[3]}&userid=${this.$store.state.token}`
            )
            .then((respones) => {
              if (respones.data.state == "success") {
                this.$emit("childByValue", true);
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.dialogFormVisible = false;
              } else {
                this.$message.error(respones.data.message);
              }
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style>
.alertfrom {
  display: inline-block;
  margin-left: 30px;
  /* width: 100%;
  height: 100%;
  background-color: red; */
}
</style>

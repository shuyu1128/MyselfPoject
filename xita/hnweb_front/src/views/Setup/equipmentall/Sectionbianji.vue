<template>
  <div>
    <el-form :rules="rules" ref="ruleForm" :model="form" label-width="110px">
      <el-form-item label="修改名称" prop="name">
        <el-input maxlength="32" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="修改编号" prop="code">
        <el-input maxlength="8" v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="修改描述">
        <el-input maxlength="50" v-model="form.basestationdesc"></el-input>
      </el-form-item>
      <el-form-item label="修改型号">
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
      <el-form-item label="修改X轴" prop="xmetre">
        <el-input v-model="form.xmetre"></el-input>
      </el-form-item>
      <el-form-item label="修改Y轴" prop="ymetre">
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
      <!-- <el-form-item label="修改Z轴">
        <el-input v-model="form.zmetre"></el-input>
      </el-form-item>-->
      <el-form-item label="修改房间" prop="selectRoom">
        <el-cascader v-model="floorid" :options="options" placeholder style="width:100%;"></el-cascader>
      </el-form-item>
      <el-form-item label=" 卫生间X轴" prop="xtoilet">
        <el-input v-model="form.xtoilet"></el-input>
      </el-form-item>
      <el-form-item label=" 卫生间Y轴" prop="ytoilet">
        <el-input v-model="form.ytoilet"></el-input>
      </el-form-item>
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
    <div style="height:30px">
      <el-button type="primary" @click="submitform('ruleForm')" style="float:right">确 定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var selectRoomvalidator = (rule, value, callback) => {
      if (this.floorid) {
        callback();
      } else {
        callback(new Error("请选择房间"));
      }
    };
    return {
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
      Calculationvalue: "",
      options: [],
      floorid: [],
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
        domains: [
          {
            cmd: "",
            lrg: "",
            lrgId: "",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: {
    did: null,
  },
  created() {
    this.$ajax
      .post(process.env.API_HOST + "/bed/getNursingHomesTree")
      .then((respones) => {
        this.options = respones.data;
      });
    // 通过基站id查询基站信息
    this.$ajax
      .post(
        process.env.API_HOST + "/basestation/getBasestationById",
        `basestationid=${this.did}`
      )
      .then((respones) => {
        // 避免动态表单失效采用对象循环赋值
        let obj = respones.data.basBasestationPO;
        for (let key in obj) {
          this.form[key] = obj[key];
        }
        this.floorid = respones.data.positionArr;
        //  转换分组方式为数组
        this.form.domains = [];
        respones.data.basBasestationPO.method.split("|").forEach((element) => {
          let arr = element.split("-");
          this.form.domains.push({ cmd: arr[0], lrg: arr[1], lrgId: arr[2] });
        });
      });
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
    submitform(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          var methodStr = "";
          this.form.domains.forEach((element, index) => {
            if (index === this.form.domains.length - 1) {
              methodStr = `${methodStr}${element.cmd}-${element.lrg}-${element.lrgId}`;
            } else {
              methodStr = `${methodStr}${element.cmd}-${element.lrg}-${element.lrgId}|`;
            }
          });
          this.form.method = methodStr;

          // 修改基站信息
          if (this.floorid == undefined) {
            this.floorid = ["", "", "", ""];
          }
          this.$ajax
            .post(
              process.env.API_HOST + "/basestation/updateBasestation",
              `json=${JSON.stringify(this.form)}&nursinghomeid=${
                this.floorid[0]
              }&buildingid=${this.floorid[1]}&floorid=${
                this.floorid[2]
              }&roomid=${this.floorid[3]}&userid=${this.$store.state.token}`
            )
            .then((respones) => {
              if (respones.data.state === "success") {
                this.$emit("childByValue", true);
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
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
.alertbianji {
  display: inline-block;
  margin-left: 30px;
  /* width: 100%;
  height: 100%;
  background-color: red; */
}
</style>

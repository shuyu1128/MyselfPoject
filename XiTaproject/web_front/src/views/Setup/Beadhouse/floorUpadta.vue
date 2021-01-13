<template>
  <el-dialog
    :showClose="false"
    :closeOnClickModal="false"
    title="编辑楼层"
    :visible.sync="floorUpdataVisible"
  >
    <el-form :rules="rules" ref="form" :model="form" label-width="90px">
      <el-form-item label="楼层名称" prop="floorname">
        <el-input maxlength="16" v-model="form.floorname"></el-input>
      </el-form-item>
      <el-form-item label="楼层编码" prop="floorcode">
        <el-input maxlength="16" v-model="form.floorcode"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input maxlength="50" v-model="form.floordesc"></el-input>
      </el-form-item>
      <el-form-item label="左下角">
        <el-col :span="11">
          <el-form-item prop="xleftbmetre" label="X">
            <el-input maxlength="16" style v-model="form.xleftbmetre"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
          <el-form-item prop="yleftbmetre" label="y">
            <el-input prop="yleftbmetre" maxlength="16" style v-model="form.yleftbmetre"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="右上角">
        <el-col :span="11">
          <el-form-item prop="xrighttmetre" label="X">
            <el-input maxlength="16" v-model="form.xrighttmetre"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
          <el-form-item prop="yrighttmetre" label="y">
            <el-input maxlength="16" v-model="form.yrighttmetre"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitformbianji('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    // 楼层填写左下角时校验
    var validateAddFloorFormRuleXleftbmetre = (rule, value, callback) => {
      if (
        Number(value) > Number(this.form.xrighttmetre) &&
        this.form.xrighttmetre != ""
      ) {
        callback(new Error("不可大于右上角X坐标"));
      } else if (
        Number(value) == Number(this.form.xrighttmetre) &&
        this.form.xrighttmetre != ""
      ) {
        callback(new Error("不可等于右上角X坐标"));
      } else {
        callback();
      }
    };
    var validateAddFloorFormRuleYleftbmetre = (rule, value, callback) => {
      if (
        Number(value) > Number(this.form.yrighttmetre) &&
        this.form.yrighttmetre != ""
      ) {
        callback(new Error("不可大于右上角Y坐标"));
      } else if (
        Number(value) == Number(this.form.yrighttmetre) &&
        this.form.yrighttmetre != ""
      ) {
        callback(new Error("不可等于右上角Y坐标"));
      } else {
        callback();
      }
    };
    // 楼层填写右上角时校验
    var validateAddFloorFormRuleXrighttmetre = (rule, value, callback) => {
      if (value == 0) {
        callback(new Error("右上角不可为0"));
      } else {
        if (Number(value) < Number(this.form.xleftbmetre)) {
          callback(new Error("不可小于左下角X坐标"));
        } else if (Number(value) == Number(this.form.xleftbmetre)) {
          callback(new Error("不可等于左下角X坐标"));
        } else {
          callback();
        }
      }
    };
    var validateAddFloorFormRuleYrighttmetre = (rule, value, callback) => {
      if (Number(value) < Number(this.form.yleftbmetre)) {
        callback(new Error("不可小于左下角Y坐标"));
      } else if (Number(value) == Number(this.form.yleftbmetre)) {
        callback(new Error("不可等于左下角Y坐标"));
      } else {
        callback();
      }
    };
    return {
      form: {
        floorname: "",
        floorcode: "",
        floordesc: "",
        xleftbmetre: "",
        yleftbmetre: "",
        xrighttmetre: "",
        yrighttmetre: "",
        id: "",
      },
      rules: {
        floorname: [
          { required: true, message: "请输入楼层名称", trigger: "blur" },
        ],
        floorcode: [{ required: true, message: "请输入编码", trigger: "blur" }],
        xleftbmetre: [
          { required: true, message: "请左下角坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddFloorFormRuleXleftbmetre,
            trigger: "blur",
          },
        ],
        yleftbmetre: [
          { required: true, message: "请左下角坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddFloorFormRuleYleftbmetre,
            trigger: "blur",
          },
        ],
        xrighttmetre: [
          { required: true, message: "请右下角坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddFloorFormRuleXrighttmetre,
            trigger: "blur",
          },
        ],
        yrighttmetre: [
          { required: true, message: "请右下角坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddFloorFormRuleYrighttmetre,
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    floorUpdataVisible() {
      return this.$store.state.beadhouse.floorUpdataVisible;
    },
    updataContent() {
      return this.$store.state.beadhouse.updataContent;
    },
  },
  watch: {
    updataContent(val) {
      this.form = val;
    },
  },
  methods: {
    submitformbianji(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("floor_updateFloor", {
            data: this.form,
            userid: this.$store.state.token,
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    close() {
      this.$store.commit("closeFloor");
    },
  },
};
</script>

<style>
</style>
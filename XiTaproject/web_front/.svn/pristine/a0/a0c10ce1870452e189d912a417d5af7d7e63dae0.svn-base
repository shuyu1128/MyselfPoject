<template>
  <div class="panel3_up">
    <el-dialog
      width="70%"
      :close-on-click-modal="false"
      title="编辑内容"
      :visible.sync="updataFormVisible2"
      :show-close="false"
    >
      <el-form
        v-if="updataFormVisible2"
        :rules="addFormRule"
        ref="ruleForm"
        :model="addForm"
        label-width="100px"
      >
        <el-form-item label="内容名称" prop="chargename">
          <el-input v-model="addForm.chargename"></el-input>
        </el-form-item>
        <el-form-item label="末级子节点" prop="lastnode">
          <el-radio @change="changelastnode" v-model="addForm.lastnode" label="1">是</el-radio>
          <el-radio @change="changelastnode" v-model="addForm.lastnode" label="0">否</el-radio>
        </el-form-item>
        <el-form-item v-if="addForm.lastnode=='1'" label="价格" prop="charge">
          <el-input v-model="addForm.charge"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addFormSub('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 编辑时的题目
      updataTL: [],
      // 表单类
      addForm: {
        // 护理名称
        chargeName: "",
        // 是否最末子节点0：不是/1：是
        lastNode: "0",
        // 价格
        charge: "",
      },
      addFormRule: {
        chargename: [
          { required: true, message: "请输入内容名称", trigger: "blur" },
        ],
        lastnode: [{ required: true, message: "请选择", trigger: "change" }],
        charge: [{ required: true, message: "请输入价格", trigger: "blur" }],
      },
    };
  },
  props: {
    pdata: null,
  },
  computed: {
    //   弹窗状态
    updataFormVisible2() {
      return this.$store.state.Evaluatiomaintenance.updataFormVisible2;
    },
  },
  watch: {
    pdata(val) {
      this.addForm = val;
      // 如果是计算类型就获取题目和权重
    },
  },
  methods: {
    close() {
      this.$store.commit("closeUpdataVisible2");
    },
    changelastnode(data){
        if(data=='0'){
            this.addForm.charge=''
        }
    },
    // 修改提交
    addFormSub(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store
              .dispatch("evalNursing_updateNursingChargeById", {
                json: this.addForm,
                userid: this.$store.state.token,
              })
              .then((res) => {
                if (res.state == "success") {
                  this.$message.success(res.msg);
                  this.$store.commit("closeUpdataVisible2");
                } else {
                  this.$message.error(res.msg);
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
.panel3_up .el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
}
.panel3_up .el-checkbox.is-bordered.el-checkbox--small {
  margin-right: 10px;
}
</style>
<style scoped>
.box-card {
  height: 100%;
}
.Templatedata_row {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f2f2f2;
}
.Templatedata_row:hover {
  background-color: #f2f2f2;
}
.checkbox_width {
  width: 50%;
  float: left;
  margin-bottom: 12px;
}
</style>
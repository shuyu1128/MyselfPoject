<template>
  <div class="panel3_up">
    <el-dialog
      width="70%"
      :close-on-click-modal="false"
      title="编辑内容"
      :visible.sync="updataFormVisible"
      :show-close="false"
    >
      <el-form
        v-if="updataFormVisible"
        :rules="addFormRule"
        ref="ruleForm"
        :model="addForm"
        label-width="100px"
      >
        <el-form-item label="内容名称" prop="nursingname">
          <el-input v-model="addForm.nursingname"></el-input>
        </el-form-item>
        <el-form-item v-if="addForm.lastnode=='1'" label="价格" prop="charge">
          <el-input v-model="addForm.charge"></el-input>
        </el-form-item>
        <el-form-item v-if="nowType=='2'" label="起始分数" prop="beginscore">
          <el-input v-model="addForm.beginscore"></el-input>
        </el-form-item>
        <el-form-item v-if="nowType=='2'" label="终止分数" prop="endscore">
          <el-input v-model="addForm.endscore"></el-input>
        </el-form-item>
        <el-form-item v-if="nowType=='3'" label="起始等级" prop="beginscore">
          <el-select style="width:100%" v-model="addForm.beginscore" placeholder="请选择">
            <el-option
              v-for="item in GradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="nowType=='3'" label="终止等级" prop="endscore">
          <el-select style="width:100%" v-model="addForm.endscore" placeholder="请选择">
            <el-option
              v-for="item in GradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px" v-if="addForm.nursingtype=='1'">
        <h3 style="margin-bottom: 12px">选择题目及权重</h3>
        <el-checkbox-group @change="changeCheckbox" v-model="topicWeight" size="small">
          <div class="checkbox_width" v-for="item in updataTL" :key="item.id">
            <el-checkbox :label="item.id" border>{{item.topic}}</el-checkbox>
            <span style="font-size:12px">权重：</span>
            <el-input-number
              :disabled="item.weight==0"
              size="mini"
              v-model="item.weight"
              controls-position="right"
              :precision="2"
              :min="0"
              :max="1"
              :step="0.1"
              @change="((val,oldval)=>{changeWeight(val,oldval, item.id)})"
            ></el-input-number>
          </div>
        </el-checkbox-group>
      </div>
      <div style="clear: both;"></div>
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
      // 权重总和
      prices: 0,
      // 题目权重参数
      topicWeight: [],
      // 表单类
      addForm: {
        pid: "",
        classificationid: "",
        // 护理名称
        nursingname: "",
        // 是否最末子节点0：不是/1：是
        lastNode: "0",
        // 价格
        charge: "",
        special: "0",
        // 分类类型
        nursingtype: "0",
        // 分数
        beginscore: "",
        endscore: "",
      },
      updataForm: {},
      addFormRule: {
        nursingname: [
          { required: true, message: "请输入内容名称", trigger: "blur" },
        ],
        lastNode: [{ required: true, message: "请选择", trigger: "change" }],
        charge: [{ required: true, message: "请输入价格", trigger: "blur" }],
        nursingtype: [{ required: true, message: "请选择", trigger: "change" }],
        beginscore: [
          { required: true, message: "不可为空", trigger: "blur" },
          {
            pattern: /^\d*\.?\d+$/,
            message: "请输入数字",
            trigger: "blur",
          },
        ],
        endscore: [
          { required: true, message: "不可为空", trigger: "blur" },
          {
            pattern: /^\d*\.?\d+$/,
            message: "请输入数字",
            trigger: "blur",
          },
        ],
      },
      updataFormRule: [],
      // 级别类下拉框
      GradeOptions: [
        {
          value: "0",
          label: "能力完好",
        },
        {
          value: "1",
          label: "轻度失能",
        },
        {
          value: "2",
          label: "中度失能",
        },
        {
          value: "3",
          label: "重度失能",
        },
        {
          value: "4",
          label: "极重度失能",
        },
      ],
      // 分类下拉框
      Nursingoptions: [
        {
          value: "0",
          label: "常量类",
        },
        {
          value: "1",
          label: "计算类",
        },
        {
          value: "2",
          label: "级别类",
        },
      ],
      // 当前选中的渲染类型 0:最末级时，点击不给反应/1:非子节点常量类，可随意选择类型/2:计算类，下级必须为常量类  并且需要选择关联题和分数/3:级别类，下级必须为常量类，并且输入级别
      nowType: "0",
    };
  },
  props: {
    pdata: null,
  },
  computed: {
    //   弹窗状态
    updataFormVisible() {
      return this.$store.state.Evaluatiomaintenance.updataFormVisible;
    },
    // 题目列表
    // updataTL() {
    //   return this.$store.state.Evaluatiomaintenance.updataTL;
    // },
    selectContent() {
      let selectContent = this.$store.state.Evaluatiomaintenance.selectContent;
      if (selectContent) {
        if (selectContent.lastnode == "1") {
          this.nowType = "0";
        } else {
          if (selectContent.chargename) {
            this.nowType = "4";
          } else if (selectContent.nursingtype == "0") {
            this.nowType = "1";
          } else if (selectContent.nursingtype == "1") {
            this.nowType = "2";
          } else if (selectContent.nursingtype == "2") {
            this.nowType = "3";
          }
        }
      }
      return selectContent;
    },
  },
  watch: {
    pdata(val) {
      this.addForm = val;
      this.topicWeight = [];
      // 如果是计算类型就获取题目和权重
      if (val.nursingtype == "1") {
        this.$functionarrs
          .evalNursing_getTopicByClassificationId(val.id)
          .then((data) => {
            data.forEach((element) => {
              if (!element.weight) {
                element.weight = 0;
              } else {
                element.weight = Number(element.weight);
                this.topicWeight.push(element.id);
              }
            });
            this.updataTL = data;
            // 计算总权重
            this.prices = this.$allMethods.toDecimal(
              this.updataTL.reduce((p, e) => p + e.weight, 0)
            );
          });
      }
    },
    selectContent(val) {
      console.log(val);
    },
  },
  methods: {
    // 计算权重总值
    changeWeight(data, oldval, id) {
      // let index = this.updataTL.findIndex((item) => item.id == id);
      if (data == 0) {
        this.topicWeight.forEach((element, index) => {
          if (element === id) {
            this.topicWeight.splice(index, 1);
          }
        });
      }
      this.prices = this.$allMethods.toDecimal(
        this.updataTL.reduce((p, e) => p + e.weight, 0)
      );
      if (this.prices > 1) {
        this.$message.warning("权重总和不可大于1，请恢复！");
      }
    },
    // 选题显隐权重
    changeCheckbox(data) {
      // 获取全部id
      let allData = [];
      this.updataTL.forEach((element) => {
        allData.push(element.id);
      });
      // 获取反选选择框id
      let list = [];
      list = allData.filter((item) => {
        return data.indexOf(item) === -1;
      });
      // 反选数组清空值
      this.updataTL.forEach((welement) => {
        list.forEach((nelement) => {
          if (welement.id == nelement) {
            welement.weight = 0;
          }
        });
      });
      // 已选数组中新选中赋值为0.1
      this.updataTL.forEach((welement) => {
        data.forEach((nelement) => {
          if (welement.id == nelement && welement.weight === 0) {
            welement.weight = 0.1;
          }
        });
      });

      // 计算总权重
      this.prices = this.$allMethods.toDecimal(
        this.updataTL.reduce((p, e) => p + e.weight, 0)
      );
      if (this.prices > 1) {
        this.$message.warning("权重总和不可大于1，请恢复！");
      }
    },
    // 修改末级字节点状态值
    changeLastNode(data) {
      if (data == "1") {
        this.addForm.nursingtype = "0";
      }
    },
    // 生成后端需求题目权重
    ifWeight(arr, values) {
      let newArr = [];
      arr.forEach((welement) => {
        values.forEach((nelement) => {
          if (welement.id == nelement) {
            newArr.push({ topicid: nelement, weight: welement.weight });
          }
        });
      });
      return newArr;
    },
    close() {
      this.$store.commit("closeUpdataVisible");
    },
    // 修改提交
    addFormSub(formName) {
      if (this.topicWeight == 0 && this.addForm.nursingtype == "1") {
        this.$message.warning("请选择题目！");
      } else if (this.prices > 1 && this.addForm.nursingtype == "1") {
        this.$message.warning("权重总和不可大于1，请恢复！");
      } else if (this.prices != 1 && this.addForm.nursingtype == "1") {
        this.$message.warning("权重总和需等于1，请配置！");
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 获取题目权重数据
            let topicWeight = this.ifWeight(this.updataTL, this.topicWeight);
            // 调用提交
            this.$store
              .dispatch("updateNursingClassificationSById", {
                json: this.addForm,
                userid: this.$store.state.token,
                topicWeight,
              })
              .then((res) => {
                if (res.state == "success") {
                  this.$message.success(res.msg);
                  this.$store.commit("closeUpdataVisible");
                } else {
                  this.$message.error(res.msg);
                }
              });
          } else {
            return false;
          }
        });
      }
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
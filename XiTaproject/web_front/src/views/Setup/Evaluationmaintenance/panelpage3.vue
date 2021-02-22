<template>
  <div class="panel3">
    <updataPage3 :pdata="ddata" />
    <updata2Page3 :pdata="ddata" />
    <!-- 新增窗口 -->
    <el-dialog
      width="70%"
      :close-on-click-modal="false"
      title="新增内容"
      :visible.sync="addFormVisible"
    >
      <el-form
        v-if="addFormVisible&&xykz"
        :rules="addFormRule"
        ref="ruleForm"
        :model="addForm"
        label-width="100px"
      >
        <el-form-item label="内容名称" prop="nursingname">
          <el-input v-model="addForm.nursingname"></el-input>
        </el-form-item>
        <el-form-item v-if="nowType=='1'" label="末级子节点" prop="lastNode">
          <el-radio @change="changeLastNode" v-model="addForm.lastNode" label="1">是</el-radio>
          <el-radio @change="changeLastNode" v-model="addForm.lastNode" label="0">否</el-radio>
        </el-form-item>
        <el-form-item
          v-if="addForm.lastNode=='1'||nowType=='2'||nowType=='3'"
          label="价格"
          prop="charge"
        >
          <el-input v-model="addForm.charge"></el-input>
        </el-form-item>
        <el-form-item v-if="nowType=='1'&&addForm.lastNode=='0'" label="分类类型" prop="nursingtype">
          <el-select style="width:100%" v-model="addForm.nursingtype" placeholder="请选择">
            <el-option
              v-for="item in Nursingoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
          <div class="checkbox_width" v-for="item in TopicList" :key="item.id">
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
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormSub('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 基础设施收费窗口 -->
    <el-dialog :close-on-click-modal="false" title="新增内容" :visible.sync="addFormVisible2">
      <el-form
        v-if="addFormVisible2"
        :rules="addFormRule2"
        ref="ruleForm2"
        :model="addForm2"
        label-width="100px"
      >
        <el-form-item label="内容名称" prop="chargeName">
          <el-input v-model="addForm2.chargeName"></el-input>
        </el-form-item>
        <el-form-item label="末级子节点" prop="lastNode">
          <el-radio v-model="addForm2.lastNode" label="1">是</el-radio>
          <el-radio v-model="addForm2.lastNode" label="0">否</el-radio>
        </el-form-item>
        <el-form-item v-if="addForm2.lastNode=='1'" label="价格" prop="charge">
          <el-input v-model="addForm2.charge"></el-input>
        </el-form-item>
      </el-form>
      <div style="clear: both;"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addFormSub2('ruleForm2')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 列表渲染 -->
    <el-card class="box-card" v-if="selectContent">
      <div slot="header" class="clearfix">
        <span v-if="nowType=='0'">当前选中：末子节点</span>
        <span v-else>{{nowType=='4'?selectContent.chargename:selectContent.nursingname}}</span>
        <el-button
          @click="newnursingname"
          style="float: right; padding: 3px 0"
          type="text"
          v-show="nowType!='0'"
        >新建护理内容</el-button>
      </div>
      <div class="Templatedata_row" v-for="(item,index) in selectContent.child" :key="index">
        <span style="margin-right:10px;">{{nowType=='4'?item.chargename:item.nursingname}}</span>
        <span v-show="item.charge!=undefined">收费 {{item.charge}}元</span>
        <li class="row" style="float:right">
          <el-button type="text" @click="modifybefore(item)">修改</el-button>
          <el-button type="text" @click="deleteNewnursing1(item.id)">删除</el-button>
        </li>
      </div>
    </el-card>
  </div>
</template>

<script>
import updataPage3 from "./updataPage3.vue";
import updata2Page3 from "./updata2Page3.vue";
export default {
  components: {
    updataPage3,
    updata2Page3,
  },
  data() {
    return {
      xykz:true,
      // 编辑窗口需要的数据
      ddata: null,
      // 权重总和
      prices: 0,
      // 题目权重参数
      topicWeight: [],
      // 表单类
      addFormVisible: false,
      addFormVisible2: false,
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
      addForm2: {
        // 护理名称
        chargeName: "",
        // 是否最末子节点0：不是/1：是
        lastNode: "0",
        // 价格
        charge: "",
      },
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
      addFormRule2: {
        chargeName: [
          { required: true, message: "请输入内容名称", trigger: "blur" },
        ],
        lastNode: [{ required: true, message: "请选择", trigger: "change" }],
        charge: [{ required: true, message: "请输入价格", trigger: "blur" }],
      },
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
      dialogVisible: false,
      // 当前值
      nowdata: "",
      nursingname: "",
      nursingcharge: "",
    };
  },
  computed: {
    // 题目列表
    TopicList() {
      return this.$store.state.Evaluatiomaintenance.TopicList;
    },
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
            this.addForm.lastNode = 1;
          } else if (selectContent.nursingtype == "2") {
            this.nowType = "3";
            this.addForm.lastNode = 1;
          }
        }
      }

      return selectContent;
    },
  },
  methods: {
    // 计算权重总值
    changeWeight(data, oldval, id) {
      // let index = this.TopicList.findIndex((item) => item.id == id);
      if (data == 0) {
        this.topicWeight.forEach((element, index) => {
          if (element === id) {
            this.topicWeight.splice(index, 1);
          }
        });
      }
      this.prices = this.$allMethods.toDecimal(
        this.TopicList.reduce((p, e) => p + e.weight, 0)
      );
      if (this.prices > 1) {
        this.$message.warning("权重总和不可大于1，请恢复！");
      }
    },
    // 选题显隐权重
    changeCheckbox(data) {
      // 获取全部id
      let allData = [];
      this.TopicList.forEach((element) => {
        allData.push(element.id);
      });
      // 获取反选选择框id
      let list = [];
      list = allData.filter((item) => {
        return data.indexOf(item) === -1;
      });
      // 反选数组清空值
      this.TopicList.forEach((welement) => {
        list.forEach((nelement) => {
          if (welement.id == nelement) {
            welement.weight = 0;
          }
        });
      });
      // 已选数组中新选中赋值为0.1
      this.TopicList.forEach((welement) => {
        data.forEach((nelement) => {
          if (welement.id == nelement && welement.weight === 0) {
            welement.weight = 0.1;
          }
        });
      });
        // 计算总权重
      this.prices = this.$allMethods.toDecimal(
        this.TopicList.reduce((p, e) => p + e.weight, 0)
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
      this.xykz=false
       this.$nextTick(() => {
          this.xykz = true;
        });
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
    // 打开护理内容弹窗并清空上次添加
    newnursingname() {
      if (this.nowType == "4") {
        this.addForm2 = {
          // 护理名称
          chargeName: "",
          // 是否最末子节点0：不是/1：是
          lastNode: "0",
          // 价格
          charge: "",
        };
        this.addFormVisible2 = true;
      } else {
        // 获取全部题目
        this.$store.dispatch("evalTopic_getTopicList");
        // 清空表单
        this.addForm = {
          pid: "",
          classificationid: "",
          nursingname: "",
          lastNode: "0",
          charge: "",
          special: "0",
          nursingtype: "0",
          beginscore: "",
          endscore: "",
        };
        // 清空后台所需权重内容
        this.topicWeight = [];
        this.addFormVisible = true;
      }
    },
    // 新增提交
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
            // 赋值两个id
            this.addForm.pid = this.$store.state.Evaluatiomaintenance.nowPid;
            this.addForm.classificationid = this.$store.state.Evaluatiomaintenance.nursingListId;
            // 获取题目权重数据
            let topicWeight = this.ifWeight(this.TopicList, this.topicWeight);
            // 调用提交
            this.$store
              .dispatch("evalNursing_insertNursingClassificationS", {
                json: this.addForm,
                userid: this.$store.state.token,
                topicWeight,
              })
              .then((res) => {
                if (res.state == "success") {
                  this.$message.success(res.msg);
                  this.addFormVisible = false;
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
    // 新增提交2
    addFormSub2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 赋值两个id
          this.addForm2.pid = this.$store.state.Evaluatiomaintenance.nowPid;
          this.addForm2.classificationid = this.$store.state.Evaluatiomaintenance.nursingListId;

          // 调用提交
          this.$store
            .dispatch("evalNursing_insertNursingCharge", {
              json: this.addForm2,
              userid: this.$store.state.token,
            })
            .then((res) => {
              if (res.state == "success") {
                this.$message.success(res.msg);
                this.addFormVisible2 = false;
              } else {
                this.$message.error(res.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    // 打开修改护理内容对话框
    modifybefore(data) {
      this.ddata = data;
      if (this.nowType == "4") {
        this.$store.commit("openUpdataVisible2");
      } else {
        this.$store.commit("openUpdataVisible");
      }

      // this.nowdata = data;
      // this.nursingname = data.nursingname;
      // this.nursingcharge = data.charge;
      // this.dialogVisible = true;
    },
    // 删除护理内容
    deleteNewnursing1(id) {
      this.$confirm("即将删除内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.nowType == "4") {
            // 判断是基础设施删除
            this.$functionarrs
              .evalNursing_deleteNursingChargeById(id, this.$store.state.token)
              .then((data) => {
                if (data.state) {
                  this.$store.commit("replaceNode2", data.data);
                  this.$store.dispatch("evalNursing_getNursingChargeById");
                  this.$message.success("删除成功！");
                } else {
                  this.$message(data.msg);
                }
              });
          } else {
            // 判断是护理内容删除
            this.$functionarrs
              .deleteNursingClassificationSById(id, this.$store.state.token)
              .then((data) => {
                if (data.state) {
                  this.$store.commit("replaceNode", data.data);
                  this.$store.dispatch(
                    "evalNursing_getNursingClassificationSById"
                  );
                  this.$message.success("删除成功！");
                } else {
                  this.$message(data.msg);
                }
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    zdelete2(id) {
      this.$confirm("即将删除内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$functionarrs
            .evalNursing_deleteNursingChargeById(id, this.$store.state.token)
            .then((data) => {
              if (data.state) {
                this.$message({
                  message: "删除成功！",
                  type: "success",
                });
                this.$emit("Refresh4");
              } else {
                this.$message("请重试！");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style>
.panel3 .el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
}
.panel3 .el-checkbox.is-bordered.el-checkbox--small {
  margin-right: 10px;
}
.panel3 .el-card__body {
  height: 86%;
  overflow-y: auto;
}
</style>
<style scoped>
.panel3{
  background-color: #fff;
}
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
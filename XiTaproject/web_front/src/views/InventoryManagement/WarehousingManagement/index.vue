<template>
  <!-- 入库管理 -->
  <div id="WarehousingManagement-box">
    <div class="WarehousingManagement-header">
      <div class="WarehousingManagement-header-left">
        <el-input
          v-model="valueInput"
          placeholder="输入物品名称"
          class="WarehousingManagement-header-input"
        >
        </el-input>
        <el-date-picker
          v-model="valueData"
          value-format="yyyy-MM-dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="请选择开始日期"
          end-placeholder="请选择结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        <el-select
          placeholder="全部"
          v-model="updataForm.classificationid"
          class="cascader"
          clearable
        >
          <el-option
            v-for="item in gridData"
            :key="item.id"
            :label="item.classificationname"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="WarehousingManagement-header-right">
        <el-button type="primary" size="medium" @click="handleUserList"
          >查询</el-button
        >
        <el-button type="primary" size="medium" @click="dialogVisible = true"
          >入库</el-button
        >
        <div>
          <el-dialog
            title="入库单"
            :visible.sync="dialogVisible"
            width="30%"
            style="margin-bottom: 0"
            :close-on-click-modal="false"
          >
            <el-form
              label-width="80px"
              label-position="top"
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
            >
              <el-form-item label="物品种类" prop="classificationid">
                <el-select
                  placeholder="请输入物品种类"
                  style="width: 100%"
                  v-model="ruleForm.classificationid"
                  @change="changeClassification"
                >
                  <el-option
                    v-for="item in getMaterialClassificationListData"
                    :key="item.id"
                    :label="item.classificationname"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物品名称" prop="materialname">
                <el-select
                  placeholder="请输入物品名称"
                  style="width: 100%"
                  v-model="ruleForm.materialname"
                  @change="changeMaterial"
                >
                  <el-option
                    v-for="item in getMaterialNameListData"
                    :key="item.materialname"
                    :label="item.materialname"
                    :value="item.materialname"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="规格" prop="norms">
                <el-select
                  placeholder="请输入物品规格"
                  style="width: 100%"
                  v-model="ruleForm.norms"
                  @change="changegetMaterialNormsList"
                >
                  <el-option
                    v-for="item in getMaterialNormsListData"
                    :key="item.norms"
                    :label="item.norms"
                    :value="item.norms"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生产厂家/品牌" prop="materialid">
                <el-select
                  placeholder="请输入生产厂家"
                  style="width: 100%"
                  v-model="ruleForm.materialid"
                >
                  <el-option
                    v-for="item in getMaterialFactoryListData"
                    :key="item.materialid"
                    :label="item.factory"
                    :value="item.materialid"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="数量"
                prop="amount"
                :rules="[
                  { required: true, message: '数量不能为空' },
                  { type: 'number', message: '数量必须是数字' },
                ]"
              >
                <el-input
                  placeholder="请输入物品数量"
                  clearable
                  v-model.number="ruleForm.amount"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="WarehousingManagement-dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
    <div class="WarehousingManagement-content">
      <el-table
        :data="
          userList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        border
        height="683"
        class="form-style"
      >
        <el-table-column
          prop="createdtime"
          label="时间"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="materialname"
          label="物品名称"
          width="350"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="classificationname"
          label="物品分类"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="norms" label="规格" width="150" align="center">
        </el-table-column>
        <el-table-column prop="amount" label="数量" width="150" align="center">
        </el-table-column>
        <el-table-column prop="factory" label="生产厂家/品牌" align="center">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="deleteRow(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="WarehousingManagement-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="userList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //查询
      valueData: "",
      valueInput: "",
      updataForm: {
        classificationid: "",
      },

      //日期时间
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      getMaterialClassificationListData: [],
      gridData: [],

      //日期时间转化
      createdtime: "",

      //日期选择
      valueTime: "",

      //出库页面跳转
      dialogVisible: false,

      //起始页
      currentPage: 1,

      //初始每页数据量
      pagesize: 10,

      //存放后台请求来的数据
      userList: [],

      //商品类型选择
      value: [],
      numberValidateForm: {
        number: "",
      },

      //验证出库表单
      ruleForm: {
        classificationid: "",
        materialname: "",
        materialid: "",
        norms: "",
        factory: "",
        amount: "",
      },

      //验证
      rules: {
        classificationid: [
          { required: true, message: "请选择物品种类", trigger: "blur" },
        ],
        materialname: [
          { required: true, message: "请选择物品名称", trigger: "blur" },
        ],
        norms: [{ required: true, message: "请选择物品规格", trigger: "blur" }],
        materialid: [
          { required: true, message: "请选择出产厂家", trigger: "blur" },
        ],
      },

      tableData: [],

      getMaterialClassificationListData: [],
      getMaterialNameListData: [],
      getMaterialNormsListData: [],
      getMaterialFactoryListData: [],
    };
  },
  methods: {
    //查看全部可选择条件-查询种类
    getMaterialClassificationList() {
      this.$http
        .getMaterialClassificationList({
          classificationname: "",
        })
        .then((res) => {
          this.getMaterialClassificationListData = res.data;
        });
    },
    //查看全部可选择条件-查询物品
    changeClassification(classificationid) {
      this.$http
        .getMaterialNameList({
          classificationid,
        })
        .then((res) => {
          this.getMaterialNameListData = res.data;
          this.ruleForm.materialname = "";
          this.ruleForm.norms = "";
          this.ruleForm.materialid = "";
          this.ruleForm.amount = "";
        });
    },
    //查看全部可选择条件-查询规格
    changeMaterial(materialname) {
      this.$http
        .getMaterialNormsList({
          materialname,
          classificationid: this.ruleForm.classificationid,
        })
        .then((res) => {
          this.getMaterialNormsListData = res.data;
          this.ruleForm.norms = "";
          this.ruleForm.materialid = "";
          this.ruleForm.amount = "";
        });
    },
    //查看全部可选择条件-查询厂家
    changegetMaterialNormsList(norms) {
      this.$http
        .getMaterialFactoryList({
          materialname: this.ruleForm.materialname,
          classificationid: this.ruleForm.classificationid,
          norms,
        })
        .then((res) => {
          this.getMaterialFactoryListData = res.data;
          this.ruleForm.materialid = "";
          this.ruleForm.amount = "";
        });
    },

    //入库单上传
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.amount !== 0) {
            this.$http
              .insertMaterialWarehousing({
                materialid: this.ruleForm.materialid,
                userid: this.$store.state.token,
                amount: this.ruleForm.amount,
              })
              .then((res) => {
                if (res.data.state == "success") {
                  this.$message({
                    message: res.data.msg,
                    type: "success",
                  });
                  this.dialogVisible = false;
                  this.handleUserList();
                  this.ruleForm.materialname = "";
                  this.ruleForm.norms = "";
                  this.ruleForm.materialid = "";
                  this.ruleForm.amount = "";
                } else {
                  this.$message.error(res.data.msg);
                }
              });
          } else {
            this.$message.error("数量不能为0");
          }
        }
      });
    },
    //类目添加主页面加载
    insertMaterialClassification() {
      this.$http
        .getMaterialClassificationList({
          classificationname: "",
        })
        .then((res) => {
          this.gridData = res.data;
        });
    },
    //删除
    deleteRow(id) {
      this.$confirm("此操作将永久删除该入库记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http
          .deleteMaterialWarehousingById({
            id,
            userid: this.$store.state.token,
          })
          .then((res) => {
            if (res.data.state == "success") {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.handleUserList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
      });
    },
    //分页
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    //刷新 查询
    handleUserList() {
      if (!this.valueData) this.valueData = ["", ""];
      let formData = {
        classificationid: this.updataForm.classificationid,
        materialname: this.valueInput,
        begintime: this.valueData[0],
        endtime: this.valueData[1],
      };
      this.$http.getMaterialWarehousingList(formData).then((res) => {
        this.handleCurrentChange(1);
        this.userList = res.data;
        this.userList.forEach((element, index) => {
          element.idnum = index + 1;
        });
      });
    },
  },
  created() {
    this.handleUserList();
    this.insertMaterialClassification();
    this.getMaterialClassificationList();
  },
};
</script>

<style>
.WarehousingManagement-header {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 50px;
}
.WarehousingManagement-header-left {
  width: 750px;
  float: left;
}
.WarehousingManagement-header-right {
  float: right;
}
.form-style {
  width: 100%;
}
.WarehousingManagement-header-input {
  width: 250px;
}
.WarehousingManagement-header-timepicker {
  width: 300px;
}
.cascader {
  width: 140px;
}
</style>

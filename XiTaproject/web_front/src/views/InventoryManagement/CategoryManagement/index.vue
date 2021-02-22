<template>
  <!-- 类目管理 -->
  <div id="categoryManagement">
    <div class="categoryManagementheader">
      <div class="categoryManagementheader-left">
        <el-input
          placeholder="请输入关键字"
          v-model="getMaterialFormData.materialname"
          size="normal"
          clearable
          class="categoryManagementheaderinput"
        ></el-input>
        <el-select
          v-model="getMaterialFormData.classificationid"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in gridData"
            :key="item.id"
            :label="item.classificationname"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="categoryManagementheader-right">
        <el-button
          type="primary"
          size="default"
          style="width: 100px"
          @click="handleUserList"
          >查询</el-button
        >
        <el-button type="primary" size="default" @click="dialogVisible = true"
          >分类管理</el-button
        >
        <el-button
          type="primary"
          size="default"
          @click="dialogFormvisible = true"
          >添加物品</el-button
        >
        <!-- 类目管理 -->
        <div>
          <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="30%"
            style="margin-bottom: 0"
            :close-on-click-modal="false"
            id="categoryManagementForm"
          >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item>
                <span>类目名称</span>
                <el-input
                  placeholder="请输入要添加的类目"
                  size="normal"
                  clearable
                  class="diaInput"
                  v-model="ruleForm.classificationname"
                  style="margin-left: 20px; margin-top: 20px"
                ></el-input>
                <el-button
                  type="primary"
                  size="default"
                  @click="insertMat"
                  class="diaBtn"
                  >添加</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-table
                  :data="gridData"
                  border
                  :header-cell-style="{
                    background: '#f2f2f2',
                  }"
                >
                  <el-table-column
                    property="classificationname"
                    label="物品类目"
                    width=""
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    property="name"
                    label=""
                    width="150"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="primary"
                        size="small"
                        @click="
                          changeClassificationID = scope.row.id;
                          dialogEditvisible = true;
                        "
                        class="editbtn1"
                        >编辑</el-button
                      >
                      <!-- 分类管理 编辑类名 -->
                      <div>
                        <el-dialog
                          title=""
                          :visible.sync="dialogEditvisible"
                          width="30%"
                          append-to-body
                          :close-on-click-modal="false"
                        >
                          <el-form
                            :model="ruleForm"
                            :rules="rules"
                            ref="ruleForm"
                            label-width="100px"
                            class="demo-ruleForm"
                          >
                            <el-input
                              v-model="ruleForm.classificationname"
                              placeholder="请输入新的类名"
                              size="normal"
                              clearable
                              style="margin-top: 30px"
                            ></el-input>
                          </el-form>
                          <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogEditvisible = false"
                              >取 消</el-button
                            >
                            <el-button type="primary" @click="changeEdit()"
                              >确 定</el-button
                            >
                          </span>
                        </el-dialog>
                      </div>
                      <el-button
                        type="primary"
                        size="small"
                        @click="deletRow(scope.row.id)"
                        class="editbtn2"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <!-- 添加物品 -->
        <div>
          <el-dialog
            title="添加物品"
            :visible.sync="dialogFormvisible"
            width="30%"
            :close-on-click-modal="false"
          >
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              label-position="top"
            >
              <el-form-item
                label="物品种类"
                prop="classificationid"
                style="margin-top: 10px"
              >
                <el-select
                  placeholder="请选择物品种类"
                  filterable
                  v-model="ruleForm.classificationid"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in gridData"
                    :key="item.id"
                    :label="item.classificationname"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物品名称" prop="materialname">
                <el-input v-model="ruleForm.materialname"  placeholder="请输入物品名称"></el-input>
              </el-form-item>
              <el-form-item label="规格" prop="norms">
                <el-input v-model="ruleForm.norms"  placeholder="请输入物品规格"></el-input>
              </el-form-item>
              <el-form-item label="销售价" prop="price">
                <el-input v-model="ruleForm.price" placeholder="请输入物品销售价"></el-input>
              </el-form-item>
              <el-form-item label="生产厂家/品牌" prop="factory" >
                <el-input v-model="ruleForm.factory" placeholder="请输入生产厂家"></el-input>
              </el-form-item>
            </el-form>

            <span slot="footer">
              <el-button @click="dialogFormvisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
        <!-- 主页面编辑 -->
        <div>
          <el-dialog
            title=""
            :visible.sync="dialogChangevisible"
            width="30%"
            :close-on-click-modal="false"
          >
            <el-form
              :model="updataForm"
              :rules="rules"
              ref="updataForm"
              label-width="100px"
              label-position="top"
            >
              <el-form-item
                label="物品种类"
                prop="classificationid"
                style="margin-top: 10px"
              >
                <el-select
                  placeholder="输入关键字"
                  filterable
                  v-model="updataForm.classificationid"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in gridData"
                    :key="item.id"
                    :label="item.classificationname"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物品名称" prop="materialname">
                <el-input v-model="updataForm.materialname"></el-input>
              </el-form-item>
              <el-form-item label="规格" prop="norms">
                <el-input v-model="updataForm.norms"></el-input>
              </el-form-item>
              <el-form-item label="销售价" prop="price">
                <el-input v-model="updataForm.price"></el-input>
              </el-form-item>
              <el-form-item label="生产厂家/品牌" prop="factory">
                <el-input v-model="updataForm.factory"></el-input>
              </el-form-item>
            </el-form>

            <span slot="footer">
              <el-button @click="dialogChangevisible = false">取 消</el-button>
              <el-button type="primary" @click="edititem">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <!-- 主页面 -->
    </div>
    <div class="categoryManagementcontent">
      <el-table
        :data="
          userList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        border
        style="height: 680px"
      >
        <el-table-column prop="idnum" label="序号" width="150" align="center">
        </el-table-column>
        <el-table-column
          prop="materialname"
          label="物品名称"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="classificationname"
          label="物品分类"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="norms" label="规格" width="200" align="center">
        </el-table-column>
        <el-table-column prop="price" label="销售价" width="200" align="center">
        </el-table-column>
        <el-table-column prop="factory" label="生产厂家/品牌" align="center">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="
                updataForm = JSON.parse(JSON.stringify(scope.row));
                dialogChangevisible = true;
              "
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="delectitem(scope.row.materialid)"
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
      labelPosition: "top",
      changeClassificationID: "",
      //分类管理
      dialogVisible: false,
      dialogFormvisible: false,
      dialogEditvisible: false,
      dialogChangevisible: false,
      //数据
      gridData: [],
      tableData: [],
      classificationname: "",
      //验证
      ruleForm: {
        classificationid: "",
        materialname: "",
        norms: "",
        price: "",
        factory: "",
        userid: this.$store.state.token,
      },
      // 编辑物品表单
      updataForm: {
        classificationid: "",
        materialname: "",
        norms: "",
        price: "",
        factory: "",
      },
      //验证
      rules: {
        classificationname: [
          { required: true, message: "请输入要添加的类目名", trigger: "blur" },
        ],
        classificationid: [
          { required: true, message: "请输入物品种类", trigger: "blur" },
        ],
        materialname: [
          { required: true, message: "请输入物品名称", trigger: "blur" },
        ],
        norms: [{ required: true, message: "请输入物品规格", trigger: "blur" }],
        price: { required: true, message: "请输入物品价格", trigger: "blur" },
        factory: { required: true, message: "请输入出产厂家", trigger: "blur" },
      },

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

      //输入
      getMaterialFormData: {
        materialname: "",
        classificationid: "",
      },
    };
  },
  methods: {
    //添加物品 上传表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.insertMaterialInformation(this.ruleForm).then((res) => {
            if (res.data.state == "success") {
              this.handleUserList();
              this.$message({
                message: "上传成功！",
                type: "success",
              });
              this.dialogFormvisible = false;
              this.ruleForm = {
                classificationid: "",
                materialname: "",
                norms: "",
                price: "",
                factory: "",
                userid: this.$store.state.token,
              };
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
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
    //分类管理 编辑类目
    changeEdit() {
      this.dialogEditvisible = false;
      this.$http
        .updateMaterialClassification({
          userid: this.$store.state.token,
          id: this.changeClassificationID,
          classificationname: this.classificationname,
        })
        .then((res) => {
          if (res.data.state == "success") {
            if (this.classificationname !== "") {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.$http
                .getMaterialClassificationList({
                  classificationname: "",
                })
                .then((res) => {
                  this.gridData = res.data;
                  this.classificationname = "";
                });
            }else{
               this.$message.error("类名不能为空!");
            }
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    //分类管理 删除类目
    deletRow(id) {
      this.$confirm("此操作将永久删除该入库记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http
          .deleteMaterialClassificationById({
            id,
          })
          .then((res) => {
            if (res.data.state == "success") {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              this.$http
                .getMaterialClassificationList({
                  classificationname: "",
                })
                .then((res) => {
                  this.gridData = res.data;
                  this.classificationname = "";
                });
            } else {
              this.$message.error(res.data.msg);
            }
          });
      });
    },

    //分类管理 添加类目
    insertMat() {
      this.$confirm("此操作将添加该类目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.classificationname !== "") {
          this.$http
            .insertMaterialClassification({
              classificationname: this.classificationname,
              userid: this.$store.state.token,
            })
            .then((res) => {
              if (res.data.state == "success") {
                this.$http
                  .getMaterialClassificationList({
                    classificationname: "",
                  })
                  .then((res) => {
                    this.gridData = res.data;
                    this.classificationname = "";
                  });
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
              } else {
                this.$message.error(res.data.msg);
              }
            });
        } else {
          this.$message.error("类目名不能为空");
        }
      });
    },

    //编辑物品
    edititem() {
      this.$confirm("此操作将修改该物品信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        this.updataForm.userid = this.$store.state.token;
        this.$http.updateMaterialInformation(this.updataForm).then((res) => {
          if (res.data.state == "success") {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.dialogChangevisible = false;
            this.handleUserList();
            this.classificationname = "";
            this.ruleForm.classificationid = "";
            this.ruleForm.materialname = "";
            this.ruleForm.norms = "";
            this.ruleForm.price = "";
            this.ruleForm.factory = "";
          } else {
            this.$message.error(res.data.msg);
          }
        });
      });
    },

    //删除物品
    delectitem(id) {
      this.$confirm("此操作将永久删除该入库记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http
          .deleteMaterialInformationById({
            id,
            userid: this.$store.state.token,
          })
          .then((res) => {
            if (res.data.state == "success") {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              this.handleUserList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
      });
    },

    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    //查询 刷新
    handleUserList() {
      this.$http
        .getMaterialInformationList(this.getMaterialFormData)
        .then((res) => {
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
  },
};
</script>

<style>
.categoryManagementheader {
  overflow: hidden;
}
.categoryManagementheader-left {
  width: 600px;
  float: left;
}
.categoryManagementheaderinput {
  width: 300px;
}
.categoryManagementheader-right {
  float: right;
}
.categoryManagementcontent {
  margin-top: 10px;
}
.el-table td,
.el-table th {
  height: 61.5px;
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
.diaInput {
  margin-top: 10px;
  width: 193px;
}
.el-icon-close:before {
  z-index: 9999;
  content: "\E6DB";
  position: relative;
}
.editbtn1 {
  position: absolute;
  transform: translate(-120%, -50%);
}
.editbtn2 {
  position: absolute;
  transform: translate(20%, -50%);
}
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  padding-top: 0;
}
.diaBtn {
  float: right;
  margin-top: 20px;
}
#categoryManagementForm .el-table td,
#categoryManagementForm .el-table th {
  height: 40px;
  padding: 8px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
}
#categoryManagementForm .el-form-item__content {
  line-height: 30px;
  position: relative;
  font-size: 14px;
}
</style>

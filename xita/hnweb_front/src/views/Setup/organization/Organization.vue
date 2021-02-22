<template>
  <div id="test1">
    <el-row :gutter="20">
      <el-col class="Organization-step1" :span="10" style="margin-left:170px;">
        <div
          style="width:100%;text-align: left;background-color:#fff;padding-top:10px;padding-bottom:10px;"
        >
          <i class="el-icon-circle-plus" style="margin-left:10px;"></i>
          总结构
        </div>
        <el-tree
          class="tree"
          :data="data"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="moren"
          :expand-on-click-node="false"
          :render-content="renderContent"
          @node-click="card"
        ></el-tree>
      </el-col>
      <el-col class="Organization-step2" :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{dalabel}}部门下人员</span>
            <el-button
              :disabled="addBtn"
              style="float: right; padding: 3px 0"
              type="text"
              @click="add"
            >增加</el-button>
          </div>
          <div style="height:20px">
            <div v-for="(o,index) in datacheck" :key="index" class="item">
              {{o.nickname}}
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                style="float:right;font-size:10px"
                circle
                @click="delUser(o.id)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                style="float:right;font-size:10px;margin-right: 8px;"
                circle
                @click="bianji(o.id,o.deptid)"
              ></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="新增部门" :visible.sync="dialogFormVisible1" :closeOnClickModal="false">
      <el-form :model="form" :rules="addFormRule" ref="ruleAddForm">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="deptname">
          <el-input v-model="form.deptname"></el-input>
        </el-form-item>
        <el-form-item label="部门编号" :label-width="formLabelWidth" prop="deptcode">
          <el-input v-model="form.deptcode"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" :label-width="formLabelWidth">
          <el-input v-model="form.deptdesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click=" insertDept('ruleAddForm') ">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑部门" :visible.sync="dialogFormVisible2" :closeOnClickModal="false">
      <el-form :model="form" :rules="bjFormRule" ref="rulebjForm">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="deptname">
          <el-input v-model="form.deptname"></el-input>
        </el-form-item>
        <el-form-item label="部门编号" :label-width="formLabelWidth" prop="deptcode">
          <el-input v-model="form.deptcode"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" :label-width="formLabelWidth">
          <el-input v-model="form.deptdesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click=" update('rulebjForm') ">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      title="增加用户"
      :visible.sync="dialogVisible1"
      width="30%"
    >
      <el-select v-model="value" style="width:100%" filterable placeholder="请选择">
        <el-option
          v-for="(item,index) in options"
          :key="index"
          :label="item.nickname"
          :value="item.id"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="insertUserDept">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      title="修改用户所在部门"
      :visible.sync="dialogVisible2"
      width="30%"
    >
      <el-tree
        default-expand-all
        v-if="dialogVisible2"
        :data="data"
        :default-checked-keys="deptid"
        :expand-on-click-node="false"
        show-checkbox
        node-key="id"
        ref="tree"
        highlight-current
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="send">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addBtn: true,
      carddata: "",

      peopleid: "",
      deptid: [],

      moren: ["0"],
      formLabelWidth: "120px",
      form: {
        deptname: "",
        deptcode: "",
        deptdesc: "",
        pid: "",
      },
      addFormRule: {
        deptname: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        deptcode: [
          { required: true, message: "请输入部门编码", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
      },
      bjFormRule: {
        deptname: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        deptcode: [
          { required: true, message: "请输入部门编码", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
      },
      options: [],
      value: "",
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogVisible1: false,
      dialogVisible2: false,
      data: [],
      peopledata: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      datacheck: [],
      datacheckid: "0",
      dalabel: "总结构",
    };
  },
  created() {
    this.$ajax.post(process.env.API_HOST + "/dept/getDeptTree").then((res) => {
      this.data = res.data;
      this.distrue(this.data);
    });
    this.$ajax
      .post(process.env.API_HOST + "/dept/getDeptPersonTree")
      .then((response) => {
        this.peopledata = response.data;
      });
  },
  methods: {
    distrue(arr) {
      // 加入禁止选中方法

      arr.forEach((element) => {
        if (element.children.length > 0) {
          element["disabled"] = true;
          this.distrue(element.children);
        }
      });
    },

    send() {
      var ids = [];
      for (var i = 0; i < this.$refs.tree.getCheckedNodes().length; i++) {
        if (this.$refs.tree.getCheckedNodes()[i].children.length == 0) {
          ids.push(this.$refs.tree.getCheckedNodes()[i].id);
        }
      }
      if (ids.length > 1) {
        this.$message({
          message: "请勿选中多个部门",
          type: "warning",
        });
      } else {
        // 修改用户部门
        this.$ajax
          .post(
            process.env.API_HOST + "/basic/updateDeptByUser",
            `deptid=${ids[0]}&userid=${this.peopleid}&updateUserid=${this.$store.state.token}`
          )
          .then((res) => {
            if (res.data == "success") {
              this.$message({
                message: "修改成功",
                type: "success",
              });
            } else {
              this.$message({
                message: "修改失败",
                type: "warning",
              });
            }

            this.$ajax
              .post(
                process.env.API_HOST + "/dept/getUserByDeptId",
                `deptId=${this.datacheckid}`
              )
              .then((res) => {
                this.datacheck = res.data;
              });
          });
        this.dialogVisible2 = false;
      }
    },
    bianji(data, deptid) {
      this.dialogVisible2 = true;
      this.peopleid = data;
      this.deptid = [deptid];
    },
    delUser(id) {
      this.$confirm("此操作将永久移出该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$ajax
            .post(
              process.env.API_HOST + "/dept/insertUserDept",
              `userid=${id}&deptid=&updateUserid=${this.$store.state.token}`
            )
            .then((res) => {
              this.$ajax
                .post(
                  process.env.API_HOST + "/dept/getUserByDeptId",
                  `deptId=${this.datacheckid}`
                )
                .then((res) => {
                  this.datacheck = res.data;
                });
            });
        })
        .catch(() => {});
    },
    insertUserDept() {
      this.dialogVisible1 = false;
      if (this.value == "") {
        this.$message({
          showClose: true,
          message: "请选择用户",
          type: "warning",
        });
      } else {
        if (this.carddata.children.length == 0) {
          this.$ajax
            .post(
              process.env.API_HOST + "/dept/insertUserDept",
              `userid=${this.value}&deptid=${this.datacheckid}&updateUserid=${this.$store.state.token}`
            )
            .then((res) => {
              this.$ajax
                .post(
                  process.env.API_HOST + "/dept/getUserByDeptId",
                  `deptId=${this.datacheckid}`
                )
                .then((res) => {
                  this.datacheck = res.data;
                });
            });
        } else {
          this.$message({
            showClose: true,
            message: "请选中末级部门",
            type: "warning",
          });
        }
      }
    },
    insertDept(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax
            .post(
              process.env.API_HOST + "/dept/insertDept",
              `json=${JSON.stringify(this.form)}`
            )
            .then((response) => {
              if (response.data.state == "success") {
                this.$ajax
                  .post(process.env.API_HOST + "/dept/getDeptTree")
                  .then((res) => {
                    this.data = res.data;
                    this.distrue(this.data);
                    this.moren = [this.form.pid];
                    this.$message({
                      message: "添加成功",
                      type: "success",
                    });
                    this.dialogFormVisible1 = false;
                  });
              } else {
                this.$message({
                  message: response.data.msg,
                  type: "error",
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    card(data) {
      if (data.children.length !== 0) {
        this.addBtn = true;
      } else {
        this.addBtn = false;
      }
      this.carddata = data;
      this.dalabel = data.label;
      this.datacheckid = data.id;
      this.$ajax
        .post(
          process.env.API_HOST + "/dept/getUserByDeptId",
          `deptId=${data.id}`
        )
        .then((res) => {
          this.datacheck = res.data;
        });
    },
    add() {
      this.value = "";
      this.getNoDeptUser();
      this.dialogVisible1 = true;
    },
    append(data) {
      this.form.pid = data.id;
      this.dialogFormVisible1 = true;
      this.form.deptname = "";
      this.form.deptcode = "";
      this.form.deptdesc = "";
    },
    updateDept(data) {
      this.form.pid = data.id;
      this.dialogFormVisible2 = true;
      this.form.deptname = data.label;
      this.form.deptcode = data.code;
      this.form.deptdesc = data.desc;
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax
            .post(
              process.env.API_HOST + "/dept/updateDept",
              `json=${JSON.stringify(this.form)}`
            )
            .then((response) => {
              if (response.data.state == "success") {
                this.$ajax
                  .post(process.env.API_HOST + "/dept/getDeptTree")
                  .then((res) => {
                    this.data = res.data;
                    this.distrue(this.data);
                    this.moren = [this.form.pid];
                    this.$message({
                      message: "修改成功",
                      type: "success",
                    });
                    this.dialogFormVisible2 = false;
                  });
              } else {
                this.$message({
                  message: response.data.msg,
                  type: "error",
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    remove(node, data) {
      this.$confirm("即将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$ajax
            .post(process.env.API_HOST + "/dept/delDept", `deptId=${data.id}`)
            .then((response) => {
              if (response.data.state == "failure") {
                this.$message.error(response.data.message);
              } else {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex((d) => d.id === data.id);
                children.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
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
    // 获取未分配部门用户
    getNoDeptUser() {
      this.$ajax
        .post(process.env.API_HOST + "/dept/getNoDeptUser")
        .then((response) => {
          this.options = response.data;
        });
    },
    renderContent(h, { node, data, store }) {
      if (node.label != "组织结构") {
        return (
          <span style="flex: 1;display: flex;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 8px;">
            <span>{node.label}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.append(data)}
              >
                增加
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.updateDept(data)}
              >
                编辑
              </el-button>
              <el-button
                id="test"
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span style="flex: 1;display: flex;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 8px;">
            <span>{node.label}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.append(data)}
              >
                增加
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.updateDept(data)}
              >
                编辑
              </el-button>
            </span>
          </span>
        );
      }
    },
  },
};
</script>


<style scoped>
.tree {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 18px 20px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 680px;
}
</style>

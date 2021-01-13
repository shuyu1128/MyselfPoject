<template>
  <div class="hospital-information-entry-page">
    <el-row type="flex" class="row-bg" :gutter="20" justify="left">
      <el-col v-if="yorn=='t'" :span="6">
        <el-card v-for="(item,index) in yuan" :key="index" class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{item.name}}</span>
            <!-- <el-button style="float: right; padding: 3px 0;margin-left:15px;" type="text" @click=del(item.id)>删除</el-button> -->
            <el-button style="float: right; padding: 3px 0" type="text" @click="bianji(item.id)">编辑</el-button>
          </div>
          <li class="bottom">
            <span>院编码：</span>
            <span>{{item.code}}</span>
          </li>
          <li class="bottom">
            <span>创建日期：</span>
            <span>{{item.createdtime}}</span>
          </li>
          <li class="bottom">
            <span>创建人：</span>
            <span>{{item.createdby}}</span>
          </li>
        </el-card>
      </el-col>
      <el-col v-else :span="6">
        <el-card class="box-card bbbb" shadow="hover">
          <i class="el-icon-plus" style="font-size: 200px;" @click="add"></i>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :close-on-click-modal="false" title="添加院" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="ruleForm" :model="form" label-width="90px">
        <el-form-item label="院名称" prop="name">
          <el-input maxlength="16" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="院编号" prop="code">
          <el-input maxlength="16" v-model="form.code"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitform('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑模态框 -->
    <el-dialog :close-on-click-modal="false" title="修改院" :visible.sync="dialogFormVisiblebianji">
      <el-form :rules="rules" ref="form" :model="form" label-width="90px">
        <el-form-item label="院名称" prop="name">
          <el-input maxlength="16" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="院编号" prop="code">
          <el-input maxlength="16" v-model="form.code"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblebianji = false">取 消</el-button>
        <el-button type="primary" @click="submitformbianji('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yorn: "t",
      dialogFormVisible: false,
      dialogFormVisiblebianji: false,
      form: {
        name: "",
        code: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入院名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 16 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入编号", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 16 个字符", trigger: "blur" }
        ]
      },
      yuan: []
    };
  },
  created() {
    this.$ajax
      .post(process.env.API_HOST + "/nursingHome/getAllNursingHomeList")
      .then(respones => {
        // this.option = respones.data;
        if (respones.data != "") {
          this.yuan = respones.data;
        } else {
          this.yorn = "f";
        }
      });
  },
  methods: {
    bianji(id) {
      // 根据建筑id获取院信息
      this.$ajax
        .post(
          process.env.API_HOST + "/nursingHome/getNursingHomeById",
          `nursingHomeId=${id}`
        )
        .then(respones => {
          this.form = respones.data;
        });
      this.form.id = id;
      this.dialogFormVisiblebianji = true;
    },
    submitformbianji(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改院信息
          this.$ajax
            .post(
              process.env.API_HOST + "/nursingHome/updateNursingHome",
              `json=${JSON.stringify(this.form)}&userid=${
                this.$store.state.token
              }`
            )
            .then(respones => {
              // 成功再次获取
              this.$ajax
                .post(
                  process.env.API_HOST + "/nursingHome/getAllNursingHomeList"
                )
                .then(respones => {
                  this.yuan = respones.data;
                });
              if (respones.data == "success") {
                this.dialogFormVisible = false;
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.dialogFormVisiblebianji = false;
              } else {
                this.$message.error("修改失败");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    del(id) {
      this.$confirm("即将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$ajax
            .post(
              process.env.API_HOST + "/nursingHome/delNursingHome",
              `nursingHomeId=${id}&userid=${this.$store.state.token}`
            )
            .then(respones => {
              if (respones.data.state == "success") {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.$ajax
                  .post(
                    process.env.API_HOST + "/nursingHome/getAllNursingHomeList"
                  )
                  .then(respones => {
                    // this.option = respones.data;
                    this.yorn = "t";
                    if (respones.data != "") {
                      this.yuan = respones.data;
                    } else {
                      this.yorn = "f";
                    }
                  });
              } else {
                this.$message.error("删除失败");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add() {
      //   alert('我可以')
      this.dialogFormVisible = true;
    },
    submitform(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$ajax
        .post(
          process.env.API_HOST + "/nursingHome/insertNursingHome",
          `json=${JSON.stringify(this.form)}&userid=${this.$store.state.token}`
        )
        .then(respones => {
          if (respones.data == "success") {
            this.$message({
              message: "创建成功",
              type: "success"
            });

            this.$ajax
              .post(process.env.API_HOST + "/nursingHome/getAllNursingHomeList")
              .then(respones => {
                // this.option = respones.data;
                this.yorn = "t";
                if (respones.data != "") {
                  this.yuan = respones.data;
                } else {
                  this.yorn = "f";
                }
              });

            this.dialogFormVisible = false;
          } else {
            this.$message.error("创建失败");
          }
        });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    }
  }
};
</script>
<style scoped>
.beainfor {
  margin-left: 10px;
}
.row-bg {
  margin-bottom: 20px;
}
.bottom {
  margin-bottom: 10px;
}
.add {
  width: 200px;
  height: 200px;
  background-color: #ffffff;
}
.add:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.box-card {
  height: 240px;
}
.bbbb {
  width: 240px;
  height: 240px;
}
</style>



<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      title="新增客户端"
      :visible.sync="dialogAdd"
    >
      <div>
        <el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px">
          <el-form-item label="ip地址" prop="ip">
            <el-input v-model="form.ip"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="computerdesc">
            <el-input type="textarea" v-model="form.computerdesc"></el-input>
          </el-form-item>
          <el-form-item label="权限选择">
            <el-checkbox-group v-model="rights">
              <el-checkbox
                v-for="item in rightArr"
                :label="item.id"
                :key="item.id"
                name="type"
              >
                {{ item.rightdesc }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogAdd: false,
      form: {
        ip: "",
        computerdesc: "",
      },
      rights: [],
      rules: {
        ip: [
          { required: true, message: "请输入ip地址", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        computerdesc: [
          { required: true, message: "请输入备注", trigger: "change" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 32 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    rightArr: null,
  },
  methods: {
    open() {
      this.dialogAdd = true;
    },
    // 添加客户端信息及查看权限
    sureAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax
            .post(
              "api/computerRights/insertComputer",
              `computer=${JSON.stringify(this.form)}&rights=${JSON.stringify(
                this.rights
              )}&userid=${this.$store.state.token}`
            )
            .then((res) => {
              if (res.data.state == "success") {
                this.$emit("addSuccess");
                this.$message.success("添加成功");
                this.dialogAdd = false;
              } else {
                this.$message.error(res.data.msg);
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
</style>
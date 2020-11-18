<template>
  <el-dialog
    :showClose="false"
    :closeOnClickModal="false"
    title="添加责任区域"
    :visible.sync="addDialogFormVisible"
  >
    <el-input maxlength="32" v-model="form.name" placeholder="请输入新建区域名称" style="margin-bottom: 20px;"></el-input>
    <el-input maxlength="32" v-model="form.code" placeholder="请输入新建区编码" style="margin-bottom: 20px;"></el-input>
    <el-tree v-if="addDialogFormVisible" :data="roomsTree" node-key="id" ref="tree" show-checkbox></el-tree>

    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitform">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        code: "",
        devicedesc: ""
      }
    };
  },
  props: {
    addDialogFormVisible: null
  },
  computed: {
    roomsTree() {
      return this.$store.state.userAndRole.roomsTree;
    }
  },
  created() {
    this.$store.dispatch("bed_getNursingHomesTree");
  },
  methods: {
    closeDialog() {
      this.$emit("closeAdd");
    },
    submitform() {
      if (this.form.name == "") {
        this.$message({
          message: "请输入名称",
          type: "warning"
        });
      } else if (this.form.code == "") {
        this.$message({
          message: "请输入编码",
          type: "warning"
        });
      } else {
        var treedata = [];
        this.$refs.tree.getCheckedNodes().forEach(element => {
          if (!element.children) {
            treedata.push(element.value);
          }
        });
        this.$store
          .dispatch("inpatient_insertInpatient", {
            data: this.form,
            userid: this.$store.state.token,
            roomids: treedata
          })
          .then(res => {
            if (res === "yes") {
              this.$emit("closeAdd");
              this.form = {
                name: "",
                code: "",
                devicedesc: ""
              };
            }
          });
      }
    }
  }
};
</script>

<style>
</style>
<template>
  <el-dialog
    :showClose="false"
    :closeOnClickModal="false"
    title="修改责任区域"
    :visible.sync="updataDialogFormVisible"
  >
    <el-input maxlength="32" v-model="form.name" placeholder="请输入区域名称" style="margin-bottom: 20px;"></el-input>
    <el-input maxlength="32" v-model="form.code" placeholder="请输入区编码" style="margin-bottom: 20px;"></el-input>
    <el-tree
      v-if="showTree"
      default-expand-all
      :default-checked-keys="defaultArr"
      :data="roomsTree"
      node-key="value"
      ref="tree"
      show-checkbox
    ></el-tree>

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
      showTree: true,
      defaultProps: {
        children: "children",
        label: "label",
      },
      defaultArr: [],
      form: {
        name: "",
        code: "",
        devicedesc: "",
      },
    };
  },
  props: {
    updataDialogFormVisible: null,
    id: null,
  },
  computed: {
    roomsTree() {
      return this.$store.state.userAndRole.roomsTree;
    },
  },
  created() {
    // 获取全部信息
    this.$functionarrs.inpatient_getInpatientById(this.id).then((data) => {
      this.form = data;
    });
    // 获取默认选中房间
    this.showTree = false;
    this.$functionarrs.inpatient_getRoomsByInpatientId(this.id).then((data) => {
      this.showTree = true;
      this.defaultArr = data;
    });

    this.$store.dispatch("bed_getNursingHomesTree");
  },
  methods: {
    closeDialog() {
      this.$emit("closeUpada");
    },
    submitform() {
      if (this.form.name == "") {
        this.$message({
          message: "请输入名称",
          type: "warning",
        });
      } else if (this.form.code == "") {
        this.$message({
          message: "请输入编码",
          type: "warning",
        });
      } else {
        var treedata = [];
        this.$refs.tree.getCheckedNodes().forEach((element) => {
          if (!element.children) {
            treedata.push(element.value);
          }
        });
        this.$store
          .dispatch("inpatient_updateInpatient", {
            data: this.form,
            userid: this.$store.state.token,
            roomids: treedata,
          })
          .then((res) => {
            if (res === "yes") {
              this.$emit("closeUpada");
            }
          });
      }
    },
  },
};
</script>

<style>
</style>
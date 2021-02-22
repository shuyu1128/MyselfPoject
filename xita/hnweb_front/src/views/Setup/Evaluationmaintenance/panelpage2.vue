<template>
  <div class="panel2 zpanel2">
    <el-tree
      class="changesize"
      default-expand-all
      :expand-on-click-node="false"
      @node-click="change"
      :render-content="renderContent"
      :data="contentTree"
      :props="defaultProps"
    ></el-tree>
    <el-tree
      class="changesize"
      default-expand-all
      :expand-on-click-node="false"
      @node-click="change2"
      :render-content="renderContent2"
      :data="facilitiesTree"
      :props="defaultProps2"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "child",
        label: "nursingname",
      },
      defaultProps2: {
        children: "child",
        label: "chargeName",
      },
    };
  },
  props: {
    panelEvent1data: null,
    panelevent1_data2: null,
    Templateid: null,
  },
  computed: {
    nursingListId() {
      return this.$store.state.Evaluatiomaintenance.nursingListId;
    },
    // 护理内容树
    contentTree() {
      return this.$store.state.Evaluatiomaintenance.contentTree;
    },
    // 基础设施树
    facilitiesTree() {
      return this.$store.state.Evaluatiomaintenance.facilitiesTree;
    },
  },
  watch: {
    nursingListId(val) {
      // 护理列表改变重新获取护理内容树
      this.$store.dispatch("getNursingClassificationSObj");
      // 护理列表改变重新获取基础设施树
      this.$store.dispatch("evalNursing_getnursingChargeObj");
    },
  },
  methods: {
    change(data) {
      // 改变store上级分类id
      this.$store.commit("changeNowPid", data.id);
      this.$store.dispatch("evalNursing_getNursingClassificationSById");
      // let obj = {
      //   name: data.nursingname,
      //   child:data.child,
      //   id: data.id,
      //   type: 0,
      // };
      // // 改变store中当前选中值
      // this.$store.commit("changeSelectContent", obj);
      // this.$emit("panelEvent2", data.id, data.nursingname, 0);
    },
    change2(data) {
      this.$store.commit("changeNowPid", data.id);
      this.$store.dispatch("evalNursing_getNursingChargeById");
      // let obj = {
      //   name: data.chargeName,
      //   child:data.child,
      //   id: data.id,
      //   type: 1,
      // };
      // // 改变store中当前选中值
      // this.$store.commit("changeSelectContent", obj);
      // this.$emit("panelEvent2", data.id, data.chargeName, 1);
    },
    up1(node, data) {
      // const parent = node.parent;
      // const child = parent.data.child || parent.data;
      // const index = child.findIndex((d) => d.id === data.id);
      // child.splice(index, 1);

      this.$functionarrs
        .evalNursing_moveUpNursingClassificationSById(
          data.id,
          this.$store.state.token
        )
        .then((data) => {
          if (data.state == "success") {
            this.$message({
              message: data.msg,
              type: "success",
            });
            this.$store.dispatch("getNursingClassificationSObj");
            // this.$emit("Refresh2");
          } else {
            this.$message(data.msg);
          }
        });
    },
    down1(node, data) {
      this.$functionarrs
        .evalNursing_moveDownNursingClassificationSById(
          data.id,
          this.$store.state.token
        )
        .then((data) => {
          if (data.state == "success") {
            this.$message({
              message: data.msg,
              type: "success",
            });
            this.$store.dispatch("getNursingClassificationSObj");
            // this.$emit("Refresh2");
          } else {
            this.$message(data.msg);
          }
        });
    },
    up2(node, data) {
      this.$functionarrs
        .evalNursing_moveUpNursingChargeById(data.id, this.$store.state.token)
        .then((data) => {
          if (data.state == "success") {
            this.$message({
              message: data.msg,
              type: "success",
            });
            this.$store.dispatch("evalNursing_getnursingChargeObj");

            // this.$emit("Refresh2");
          } else {
            this.$message(data.msg);
          }
        });
    },
    down2(node, data) {
      this.$functionarrs
        .evalNursing_moveDownNursingChargeById(data.id, this.$store.state.token)
        .then((data) => {
          if (data.state == "success") {
            this.$message({
              message: data.msg,
              type: "success",
            });
            this.$store.dispatch("evalNursing_getnursingChargeObj");
            // this.$emit("Refresh2");
          } else {
            this.$message(data.msg);
          }
        });
    },
    renderContent(h, { node, data, store }) {
      return (
        <div style="width: 100%;line-height: 32px;">
          <span>{node.label}</span>
          <el-button
            style="float:right;margin-left:20px"
            size="small"
            type="text"
            on-click={(e) => {
              e.stopPropagation();
              this.up1(node, data);
            }}
          >
            <i class="el-icon-top"></i>
          </el-button>
          <el-button
            style="float:right"
            size="small"
            type="text"
            on-click={(e) => {
              e.stopPropagation();
              this.down1(node, data);
            }}
          >
            <i class="el-icon-bottom"></i>
          </el-button>
        </div>
      );
    },
    renderContent2(h, { node, data, store }) {
      return (
        <div style="width: 100%;line-height: 32px;">
          <span>{node.label}</span>
          <el-button
            style="float:right;margin-left:20px"
            size="small"
            type="text"
            on-click={(e) => {
              e.stopPropagation();
              this.up2(node, data);
            }}
          >
            <i class="el-icon-top"></i>
          </el-button>
          <el-button
            style="float:right"
            size="small"
            type="text"
            on-click={(e) => {
              e.stopPropagation();
              this.down2(node, data);
            }}
          >
            <i class="el-icon-bottom"></i>
          </el-button>
        </div>
      );
    },
  },
};
</script>

<style scoped>
.zpanel2 {
  background-color: #fff;
  overflow-y: auto;
}
.changesize {
  width: 488px;
  margin: 0 auto;
  margin-top: 16px;
}
</style>

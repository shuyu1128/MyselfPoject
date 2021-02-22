<template>
  <div class="grop">
    <el-tabs
      :before-leave="handleClick"
      @tab-click="changeName"
      v-model="valueId"
      tab-position="left"
      style="height: 100%;"
    >
      <div style="float:right;position: relative; right:28px;">
        <el-button size="small" type="primary" @click="addzu">
          新增
          <i class="el-icon-circle-plus el-icon--right"></i>
        </el-button>
        <el-button size="small" type="warning" @click="editzu">
          编辑
          <i class="el-icon-circle-plus el-icon-edit"></i>
        </el-button>
        <el-button size="small" type="danger" @click="del">
          删除
          <i class="el-icon-delete el-icon--right"></i>
        </el-button>
      </div>
      <el-tab-pane
        v-for="item in RailListData"
        :key="item.id"
        :label="item.groupname"
        :name="item.id"
      >
        <div class="grop-title">
          <el-tag>{{item.groupname}}</el-tag>
        </div>
        <Groptap v-if="item.id===valueId" :id="item.id" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Groptap from "./Groptap.vue";
import { mapState } from "vuex";
export default {
  components: {
    Groptap,
  },
  data() {
    return {
      valueId: "",
      valueName: "",
      groupids: [],
    };
  },
  computed: {
    ...mapState({
      // 全部电子围栏组
      RailListData: (state) => state.fance.RailListData,
    }),
  },
  created() {
    // 获取全部组
    this.$store.dispatch("railNew_getAllRailGroupList").then((res) => {
      this.valueId = res[0].id;
      this.valueName = res[0].groupname;
    });
  },
  watch: {},
  methods: {
    // 切换围栏组
    handleClick(data) {
      this.$store.commit("clearSureData");
    },
    // 删除围栏组
    del() {
      this.$confirm("即将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("railNew_delRailGroup", this.valueId)
            .then((res) => {
              if (res === "success") {
                this.$store
                  .dispatch("railNew_getAllRailGroupList")
                  .then((res) => {
                    this.valueId = res[0].id;
                    this.valueName = res[0].groupname;
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
    // 添加围栏组
    addzu() {
      this.$prompt("请输入组名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,36}$/,
        inputErrorMessage: "请输入0~36个字符！",
        closeOnClickModal: false,
      }).then(({ value }) => {
        var json = {
          groupName: value,
        };
        this.$store
          .dispatch("railNew_insertRailGroup", {
            railGroup: json,
            userid: this.$store.state.token,
          })
          .then((res) => {
            if (res === "success") {
              this.$store
                .dispatch("railNew_getAllRailGroupList")
                .then((res) => {
                  this.valueId = res[0].id;
                  this.valueName = res[0].groupname;
                });
            }
          });
      });
    },
    // 编辑组
    editzu() {
      this.$prompt("请输入组名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.valueName,
        inputPattern: /^.{1,36}$/,
        inputErrorMessage: "请输入0~36个字符！",
        closeOnClickModal: false,
      }).then(({ value }) => {
        var json = {
          groupName: value,
          id: this.valueId,
        };
        this.$store
          .dispatch("railNew_updateRailGroup", {
            railGroup: json,
            userid: this.$store.state.token,
          })
          .then((res) => {
            if (res === "success") {
              this.$store
                .dispatch("railNew_getAllRailGroupList")
                .then((res) => {
                  this.valueId = res[0].id;
                  this.valueName = res[0].groupname;
                });
            }
          });
      });
    },
    changeName(data) {
      this.valueName = data.label;
    },
  },
};
</script>
<style>
.grop {
  position: relative;
  height: 325px;
  margin-top: 10px;
}
.grop .el-tabs--left .el-tabs__header.is-left {
  /* height: 190px; */
  width: 64px;
}
.grop .el-transfer-panel__body {
  height: 210px;
}
.grop .el-transfer-panel__list.is-filterable {
  height: 163px;
}
</style>
<style scoped>
.grop-title {
  padding: 0px 28px 16px 7px;
}
</style>

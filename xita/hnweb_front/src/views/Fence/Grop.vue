<template>
  <div class="grop">
    <el-tabs v-model="id" tab-position="left" style="height: 100%;">
      <el-tab-pane
        v-for="item in electronicFenceGroupData"
        :key="item.id"
        :label="item.groupname"
        :name="item.id"
      >
        <div class="grop-title">
          <el-tag>{{item.groupname}}</el-tag>
          <div style="float:right">
             <el-button size="small" type="primary" @click="addzu">新增<i class="el-icon-circle-plus el-icon--right"></i></el-button>
          <el-button size="small" type="danger" @click="del">删除<i class="el-icon-delete el-icon--right"></i></el-button>
          </div>
        </div>
        <Groptap v-if="idshow" :id="item.id" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Groptap from "./Groptap.vue";
import { mapState } from "vuex";
export default {
  components: {
    Groptap
  },
  data() {
    return {
      idshow: true,
      id: "",
      groupids: []
    };
  },
  computed: {
    ...mapState({
      // 全部电子围栏组
      electronicFenceGroupData: state => state.details.electronicFenceGroupData
    })
  },
  created() {
    // 获取全部组
    this.$store.dispatch("rail_getAllRailGroupList").then(res => {
      this.id = res[0].id;
    });
  },
  watch: {
    id(val) {
      this.$store.state.fence = [];
      this.idshow = false;
      setTimeout(() => {
        this.idshow = true;
      }, 100);
    }
  },
  methods: {
    del() {
      // 删除围栏组
      this.$confirm("即将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$ajax
            .post(process.env.API_HOST + "/rail/delRailGroup", `id=${this.id}`)
            .then(respones => {
              if (respones.data.state == "success") {
                this.$store.dispatch("rail_getAllRailGroupList").then(res => {
                  this.id = res[0].id;
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                });
              } else {
                this.$message({
                  message: respones.data.msg,
                  type: "warning"
                });
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
    addzu() {
      this.$prompt("请输入1组名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal:false
      })
        .then(({ value }) => {
          if (value == null) {
            this.$message.error("内容不能为空");
          } else {
            var json = {
              groupName: value
            };
            this.$ajax
              .post(
                process.env.API_HOST + "/rail/insertRailGroup",
                `railGroup=${JSON.stringify(json)}&userid=${
                  this.$store.state.token
                }`
              )
              .then(respones => {
                if (respones.data.state == "success") {
                  this.$store.dispatch("rail_getAllRailGroupList").then(res => {
                    this.id = res[0].id;
                    this.$message({
                      message: "添加成功",
                      type: "success"
                    });
                  });
                } else {
                  this.$message.error(respones.data.msg);
                }
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
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
.grop .el-transfer-panel__list.is-filterable{
  height: 163px;
}
</style>
<style scoped>
.grop-title {
  padding: 0px 28px 16px 7px;
}
</style>

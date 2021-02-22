<template>
  <div>
    <el-tabs tab-position="left" style="height: 800px;">
      <el-tab-pane v-for="(item,index) in groupids" :key="index" :label="item.groupname">
        <Fencestree :id="item.id" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Fencestree from "./Fencestree.vue";
export default {
  components: {
    Fencestree
  },
  data() {
    return {
      groupids: []
    };
  },
  created() {
    //  this.$notify({
    //       title: '提示',
    //       message: '该围栏组适用于右侧建筑、房间、或者人员。',
    //       duration: 0
    //     });
    // this.$alert('灰色区域为定义的围栏组名称，该围栏组适用于白色区域的建筑、房间、或者人员。', '提示', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //     }
    //   });

    // this.$alert('左侧为您配置的围栏组，请在右侧勾选建筑、房间、或者人员来添加到目前所在的围栏组，点击保存即可。', '提示', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //     }
    //   });
    this.$ajax
      .post(process.env.API_HOST + "/rail/getAllRailGroupList")
      .then(respones => {
        if (respones.data.length === 0) {
          this.$confirm(
            "当前没有关于电子围栏的数据，请在电子围栏配置页面进行添加！",
            "提示",
            {
              confirmButtonText: "转到电子围栏配置页面",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              this.$router.push("Fence");
            })
            .catch(() => {
              this.$router.go(-1);
            });
        } else {
          this.groupids = respones.data;
        }
      });
  }
};
</script>
<style>
</style>

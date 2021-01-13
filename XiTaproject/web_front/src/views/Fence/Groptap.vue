<template>
  <div class="groptap">
    <el-transfer
      v-model="value"
      filterable
      :data="data"
      :titles="['未分配', '已分配']"
      :button-texts="['解绑', '绑定']"
      @right-check-change="rightSelectChange"
      @left-check-change="leftSelectChange"
      @change="change"
    ></el-transfer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      leftData: [],
      rightData: [],
      fenlength: [],
      showplan: [],
      data: [],
      value: []
    };
  },
  props: {
    id: null
  },
  created() {
    // 获取全部围栏信息
    this.$ajax
      .post(process.env.API_HOST + "/rail/getRailListJson")
      .then(respones => {
        this.data = respones.data;
      });
    // 获取已经选中围栏id
    this.$ajax
      .post(
        process.env.API_HOST + "/rail/getRailIdListByGroupId",
        `groupId=${this.id}`
      )
      .then(respones => {
        //   this.data=respones.data
        this.value = respones.data;
      });
  },
  methods: {
    change(data) {
      // 修改组配置
      this.$ajax
        .post(
          process.env.API_HOST + "/rail/updateRailGroupRelation",
          `groupid=${this.id}&railids=${JSON.stringify(data)}`
        )
        .then(respones => {
          if (respones.data == "success") {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message.error("修改失败");
          }
        });
    },
    leftSelectChange(data) {
      let arr = [];
      this.leftData = data;
      arr = this.leftData.concat(this.rightData);
      arr.length === 0
        ? this.$store.commit("updataDrewRailList", [])
        : this.$store.dispatch("rail_getRailDrawing", arr);
    },
    rightSelectChange(data) {
      let arr = [];
      this.rightData = data;
      arr = this.rightData.concat(this.leftData);
      arr.length === 0
        ? this.$store.commit("updataDrewRailList", [])
        : this.$store.dispatch("rail_getRailDrawing", arr);
    }
  }
};
</script>
<style scoped>
.groptap {
  /* height: 100%; */
  margin-left: 7px;
}
</style>

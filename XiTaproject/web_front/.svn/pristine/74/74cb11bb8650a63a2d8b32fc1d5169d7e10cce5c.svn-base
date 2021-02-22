<template>
  <div class="groptap">
    <el-transfer
      v-if="clearShow"
      v-model="value"
      filterable
      :data="data"
      :titles="['未分配', '已分配']"
      @right-check-change="rightSelectChange"
      @left-check-change="leftSelectChange"
      @change="change"
    ></el-transfer>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      clearShow: true,
      leftData: [],
      rightData: [],
      fenlength: [],
      showplan: [],
      data: [],
      value: [],
    };
  },
  props: {
    id: null,
  },
  computed: {
    ...mapState({}),
  },
  created() {
    // 获取全部围栏信息
    this.$ajax
      .post(process.env.API_HOST + "/railNew/getRailListJson")
      .then((respones) => {
        this.data = respones.data;
      });
    // 获取已经选中围栏id&&通过分组ids 查询电子围栏列表
    this.$ajax
      .post(
        process.env.API_HOST + "/railNew/getRailIdListByGroupId",
        `groupId=${this.id}`
      )
      .then((respones) => {
        this.value = respones.data;
      });
  },
  methods: {
    change(data) {
      // 修改组配置
      this.$ajax
        .post(
          process.env.API_HOST + "/railNew/updateRailGroupRelation",
          `groupid=${this.id}&railids=${JSON.stringify(data)}`
        )
        .then((respones) => {
          if (respones.data == "success") {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            // 重新加载围栏组组件防止数据与展示不符
            this.clearShow = false;
            this.$nextTick(() => {
              this.clearShow = true;
            });
            // 清空选中图像展示
            this.$store.commit("clearSureData");
            this.leftData = [];
            this.rightData = [];
          } else {
            this.$message.error("修改失败");
          }
        });
    },
    leftSelectChange(data) {
      this.changeNowSelect();
      let arr = [];
      this.leftData = data;
      arr = this.leftData.concat(this.rightData);
      this.$store.commit("changeGroupTaps", arr);
      // 清空三种将要绘制的电子围栏
      this.$store.commit("clearSureData");
      if (arr.length !== 0) {
        this.$store.dispatch("railNew_getRailDrawing", arr).then((res) => {
          // 开始绘制三种
          res.MultipleRoom.forEach((welement) => {
            welement.roomidlist.forEach((nelement) => {
              this.$store.commit("addReadyAddRoom", nelement);
            });
          });
          this.$store.commit("changeDrewsinglePointPw", res.PointPw);
          this.$store.commit("changeInRoomEnclosure", res.inroom);
        });
      }
    },
    rightSelectChange(data) {
      this.changeNowSelect();
      let arr = [];
      this.rightData = data;
      arr = this.rightData.concat(this.leftData);
      // 改变vuex中的选中状态判断是否重新加载该组件
      this.$store.commit("changeGroupTaps", arr);
      // 清空三种将要绘制的电子围栏
      this.$store.commit("clearReadyAddRoom");
      this.$store.commit("clearInRoomEnclosure");
      this.$store.commit("clearDrewsinglePointPw");
      if (arr.length !== 0) {
        this.$store.dispatch("railNew_getRailDrawing", arr).then((res) => {
          // 开始绘制三种
          res.MultipleRoom.forEach((welement) => {
            welement.roomidlist.forEach((nelement) => {
              this.$store.commit("addReadyAddRoom", nelement);
            });
          });
          this.$store.commit("changeDrewsinglePointPw", res.PointPw);
          this.$store.commit("changeInRoomEnclosure", res.inroom);
        });
      }
    },
    changeNowSelect() {
      // 左右勾选时重新加载录入信息
      this.$store.commit("clearenclosure");
    },
  },
};
</script>
<style>
.groptap .el-transfer__buttons {
  width: 70px;
}
.groptap .el-button + .el-button {
  margin-left: 0px;
}
</style>
<style scoped>
.groptap {
  /* height: 100%; */
  margin-left: 7px;
}
</style>

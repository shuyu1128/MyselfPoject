<template>
  <div class="roomstate">
    <div class="left">
      <div v-loading="tableLoading" class="huizong">
        <table v-if="!tableLoading" class="v-step1">
          <tr>
            <td
              colspan="5"
              style="font-size: 20px;height: 50px;line-height: 50px;text-align: center"
            >院内房间床位统计</td>
          </tr>
          <tr>
            <td></td>
            <td>房间</td>
            <td>床位</td>
            <td>空余房间</td>
            <td>空余床位</td>
          </tr>
          <tr>
            <td>合计</td>
            <td v-for="(item,index) in RoomAndBedStatistics.total" :key="index">{{item}}</td>
          </tr>
          <tr>
            <td>全自理</td>
            <td v-for="(item,index) in RoomAndBedStatistics.selfcareh" :key="index+100">{{item}}</td>
          </tr>
          <tr>
            <td>半自理</td>
            <td v-for="(item,index) in RoomAndBedStatistics.halfselfcareh" :key="index+200">{{item}}</td>
          </tr>
          <tr>
            <td>全介护</td>
            <td v-for="(item,index) in RoomAndBedStatistics.unselfcareh" :key="index+300">{{item}}</td>
          </tr>
        </table>
      </div>
      <div v-loading="echartsLoading" class="echor">
        <Roomstatecho class="v-step2" />
      </div>
    </div>
    <div class="right">
      <Rightxia class="v-step3" />
    </div>
  </div>
</template>
<script>
import Roomstatecho from "./Roomstatecho";
import Rightxia from "./Rightxia";
export default {
  components: {
    Roomstatecho,
    Rightxia,
  },
  data() {
    return {
      tableLoading: true,
      echartsLoading: true,
      statistics: [],
    };
  },
  computed: {
    // 房间床位统计情况
    RoomAndBedStatistics() {
      return this.$store.state.management.RoomAndBedStatistics;
    },
  },
  created() {
    // 获取全部责任区域选项，并且根据选项获取房间床位统计情况和图表数据
    this.$store
      .dispatch(
        "roomStatus_getInpatientareaListByUserid",
        this.$store.state.token
      )
      .then((res) => {
        let arr = [];
        res.forEach((element) => {
          arr.push(element.value);
        });
        // 房间床位统计情况
        this.$store
          .dispatch("roomStatus_getRoomAndBedStatistics", arr)
          .then((res) => {
            this.tableLoading = false;
          });
        // 图表数据
        this.$store
          .dispatch("roomStatus_getRoomTypeStatistics", arr)
          .then((res) => {
            this.echartsLoading = false;
          });
      });
  },
};
</script>
<style scoped>
.roomstate {
  height: 100%;
}
.left {
  width: 27%;
  height: 760px;
  background-color: #fff;
  color: #010101;
  float: left;
  padding-top: 15px;
  padding-left: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.huizong {
  width: 96%;
  height: 315px;
  background-color: #cccccc;
  border-radius: 4px;
}
.huizong table {
  margin-left: 22px;
}
.huizong table td {
  width: 76px;
  height: 46px;
  text-align: center;
}
.echor {
  width: 96%;
  height: 420px;
  margin-top: 10px;
  background-color: #cccccc;
  border-radius: 4px;
}
.right {
  width: 70%;
  height: 745px;
  padding-top: 30px;
  background-color: #fff;
  float: left;
  margin-left: 1%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>



<template>
  <div class="historicalVitalSigns">
    <el-table :data="historicalVitalSignsData.rtdPersonvitalsignsPOList">
      <el-table-column align="center" prop="number" label="序号" width="100"></el-table-column>
      <el-table-column align="center" prop="createtime" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="heartrate" label="心率"></el-table-column>
    </el-table>
    <el-pagination
      style="float:right;margin-top:30px"
      @current-change="handleCurrentChange"
      :page-size="8"
      layout="total, prev, pager, next, jumper"
      :total="historicalVitalSignsData.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    };
  },
  props: {
    did: null
  },
  computed: {
    historicalVitalSignsData() {
      console.log(this.$store.state.details.historicalVitalSignsData);
      if(this.$store.state.details.historicalVitalSignsData.rtdPersonvitalsignsPOList){
        this.$store.state.details.historicalVitalSignsData.rtdPersonvitalsignsPOList.forEach(
        (element, index) => {
          this.$set(element, "number", index + 1);
          element.createtime = vm.formatTime(element.createtime, "Y-M-D h:m:s");
        }
      );
      }
      
      return this.$store.state.details.historicalVitalSignsData;
    }
  },
  watch: {
    did(val) {
      this.$store.dispatch("person_getVitalSignsListByPersonId", {
        personid: val,
        pageNum: 1
      });
    }
  },
  created() {
    this.$store.dispatch("person_getVitalSignsListByPersonId", {
      personid: this.did,
      pageNum: 1
    });
  },
  methods: {
    // 切换页数
    handleCurrentChange(data) {
      this.currentPage = data;
      this.$store.dispatch("person_getVitalSignsListByPersonId", {
        personid: this.did,
        pageNum: data
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.historicalVitalSigns {
  background: #fff;
}
</style>
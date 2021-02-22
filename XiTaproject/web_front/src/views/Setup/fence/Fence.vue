<template>
  <div class="enclosure">
    <div class="enclosure-left">
      <div class="enclosure-map">
        <div class="Fence-step2">
          <Map v-if="mapOK" />
        </div>
      </div>
      <enclosureAdd v-if="enclosureAddShow" @newrailok="newrailok" class="Fence-step1" />
    </div>
    <div class="enclosure-rigth">
      <div class="enclosure-group Fence-step3">
        <h2 style="margin-left:30px">围栏组方案管理</h2>
        <Grop v-if="railOK&&GropShow" />
      </div>
      <div class="enclosure-table Fence-step4">
        <h2 style="margin-left:30px">围栏方案管理</h2>
        <Table @reMap="reMap" @newrailok="newrailok" v-if="railOK" />
      </div>
    </div>
  </div>
</template>
<script>
import Map from "./fenceMap.vue";
import enclosureAdd from "./enclosureAdd.vue";
import Grop from "./Grop.vue";
import Table from "./Table.vue";
import { mapState } from "vuex";
export default {
  components: {
    Map,
    enclosureAdd,
    Grop,
    Table,
  },
  data() {
    return {
      mapOK: true,
      railOK: true,
      enclosureAddShow: true,
      GropShow: true,
    };
  },
  computed: {
    ...mapState({
      // 重新加载填写信息
      enclosureShow: (state) => state.fance.enclosureShow,
      GroupShow: (state) => state.fance.GroupShow,
      groupTaps: (state) => state.fance.groupTaps,
    }),
  },
  watch: {
    enclosureShow(val) {
      this.enclosureAddShow = false;
      this.$nextTick(() => {
        this.enclosureAddShow = true;
      });
    },
    GroupShow(val) {
      if (this.groupTaps.length !== 0) {
        this.GropShow = false;
        this.$nextTick(() => {
          this.GropShow = true;
        });
      }
    },
  },
  created() {},
  destroyed() {
    this.$store.commit("clearAll");
  },
  methods: {
    reMap() {
      this.mapOK = false;
      this.$nextTick(() => {
        this.mapOK = true;
      });
    },
    newrailok() {
      this.railOK = false;
      this.$nextTick(() => {
        this.railOK = true;
      });
    },
  },
};
</script>


<style scoped>
.Singlepoint_content {
  float: left;
  width: 28%;
  text-align: center;
  padding-top: 8px;
}
.enclosure .newbtn {
  width: 93px;
  height: 84px;
  background-color: #409eff;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  border: none;
}
.enclosure .floorread {
  float: left;
}
.enclosure .cengread {
  float: left;
}
.enclosure .btn {
  float: left;
}
.enclosure .enclosure-left {
  width: 60%;
  height: 790px;
  float: left;
  margin-right: 15px;
}
.enclosure .enclosure-map {
  padding-top: 28px;
  height: 552px;
  background-color: #fff;
  margin-bottom: 15px;
}

.enclosure .map {
  height: 505px;
  width: 946px;
  margin-left: 20px;
  background-color: #1d283b;
  border-radius: 7px;
  padding-top: 10px;
  padding-left: 10px;
  background-image: url(../../../assets/5.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.enclosure .enclosure-rigth {
  width: 38%;
  height: 790px;
  float: left;
  margin-right: 15px;
}
.enclosure .enclosure-group {
  height: 367.5px;
  padding-top: 20px;
  background-color: #fff;
  margin-bottom: 15px;
  position: relative;
}
.enclosure .enclosure-table {
  height: 367.5px;
  padding-top: 20px;
  background-color: #fff;
}
</style>

<template>
  <div>
    <button
      v-if="changeBtn"
      type="button"
      class="baocun el-button el-button--success is-circle"
      @click="baocun"
    >
      <!---->
      <i class="el-icon-check"></i>
      <!---->
    </button>
    <Grenmap :did="did" />
    <div class="Choice">
      <h2 style="margin-top:10px;margin-left:10px;">修改绑定的围栏组</h2>
      <el-checkbox-group @change="changeSelect" class="fence-group-check" v-model="checkList">
        <li class="fence-group-list" v-for="item in electronicFenceGroupData" :key="item.id">
          <el-checkbox :disabled="!changeBtn" :label="item.id">{{item.groupname}}</el-checkbox>
        </li>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
import Grenmap from "../Setup/fence/fenceMap";
import { mapState } from "vuex";
export default {
  components: {
    Grenmap,
  },
  data() {
    return {
      checkList: [],
    };
  },
  props: {
    did: null,
    changeBtn: null,
  },
  computed: {
    ...mapState({
      // 全部电子围栏组
      electronicFenceGroupData: (state) => {
        return state.fance.RailListData;
      },
      nowDefaultElectronicFenceGrou: (state) =>
        state.details.nowDefaultElectronicFenceGrou,
    }),
  },
  watch: {
    nowDefaultElectronicFenceGrou(val) {
      // 页面初始化更新电子围栏
      this.changeSelect(val)
      this.$store.commit("updataSelectRailGroup", val);
      this.checkList = val;
    },
  },
  created() {
    // 获取所有组
    this.$store.dispatch("railNew_getAllRailGroupList");
     // 获取默认
    this.$store.dispatch("person_getRailGroupsByPerson", this.did);
  },
  destroyed() {
    // 清空当前map上的围栏
    this.$store.commit('clearSureData')
    // 清空默认电子围栏组
    this.$store.commit("updataSelectRailGroup", []);
  },
  methods: {
    changeSelect(data) {
      // 清空三种将要绘制的电子围栏
      this.$store.commit("clearSureData");
      if (data.length !== 0) {
        this.$store
          .dispatch("railNew_getRailListByGroupIds", data)
          .then((res) => {
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
    baocun() {
      // this.show = false;
      // setTimeout(() => {
      //   this.show = true;
      // }, 100);
      this.$ajax
        .post(
          process.env.API_HOST + "/person/insertPersonRailGroup",
          `userid=${this.$store.state.token}&person=${
            this.did
          }&railgroupids=${JSON.stringify(this.checkList)}`
        )
        .then((respones) => {
          if (respones.data == "success") {
            this.$message.success("修改成功");
            if (this.$store.state.hospitalshow) {
              this.$store.state.actives = 7;
              this.$alert("一键入院完成", "提示", {
                confirmButtonText: "确定",
                center: true,
                callback: (action) => {
                  this.$store.commit("closehospitalshow");
                  this.$router.push("/index");
                  this.$store.state.actives = 0;
                },
              });
            }
          } else {
            this.$message.error("修改失败");
          }
        });
    },
  },
};
</script>
<style scoped>
.baocun {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 999;
}
#zujiegou {
  background-color: #fff;
  margin-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0);
}
.fence-group-check {
  margin-top: 10px;
  margin-left: 25px;
}
.fence-group-list {
  margin-bottom: 5px;
}
.map {
  height: 500px;
  width: 946px;
  margin-left: 20px;
  background-color: #1d283b;
  border-radius: 7px;
  padding-top: 10px;
  padding-left: 10px;
  background-image: url(../../assets/5.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  float: left;
}
.Choice {
  width: 326px;
  height: 509px;
  margin-left: 15px;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* background-color: #409EFF; */
  float: left;
}
</style>

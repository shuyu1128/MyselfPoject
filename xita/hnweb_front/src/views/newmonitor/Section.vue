<template>
  <div id="section">
    <el-row :gutter="10">
      <el-col :xs="8" :sm="12" :md="16" :lg="18" :xl="19">
        <div class="map_special">
          <div style="float:left">
            <div class="qingkuang">
              <li>
                <p style="font-size: 23px;font-weight: 700;color:#ffffff">异常状况</p>
                <p style="font-size: 23px;font-weight: 700;color:#ffffff">{{allSpecialsDataLength}}</p>
              </li>
              <li>
                <p style="font-size: 23px;font-weight: 700;color:#00cbff">入住长者人数</p>
                <p style="font-size: 23px;font-weight: 700;color:#ffffff">{{BigData.personCount}}</p>
              </li>
              <li>
                <p style="font-size: 23px;font-weight: 700;color:#00cbff">入住率</p>
                <p style="font-size: 23px;font-weight: 700;color:#ffffff">{{BigData.occupancyRate}}</p>
              </li>
              <li>
                <p style="font-size: 23px;font-weight: 700;color:#00cbff">当前长者/护工比</p>
                <p style="font-size: 23px;font-weight: 700;color:#ffffff">{{BigData.proportion}}</p>
              </li>
              <li>
                <p style="font-size: 23px;font-weight: 700;color:#00cbff">大数据完整度</p>
                <p style="font-size: 23px;font-weight: 700;color:#ffffff">{{BigData.integrityRate}}</p>
              </li>
            </div>
            <svgMap />
          </div>
          <Special />
        </div>
        <div class="ev_per">
          <Environmental />
          <Personnel />
        </div>
      </el-col>
      <el-col :xs="16" :sm="12" :md="8" :lg="6" :xl="5">
        <Blood />
        <Big />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Map from "./Lt/Map";
import svgMap from "./Lt/svgMap";
// import Special from './Lt/Special'
import Special from "./Lt/Special";
import Blood from "./Rt/Blood";
import Big from "./Rt/Big";
import Personnel from "./Lt/Personnel";
import Environmental from "./Lt/Environmental";
export default {
  components: {
    Map,
    svgMap,
    Special,
    Blood,
    Big,
    Personnel,
    Environmental,
  },
  data() {
    return {
      abnormal: "",
      BigData: "",
    };
  },
  computed: {
    allSpecialsDataLength() {
      return this.$store.state.websocket.allSpecialsData.length;
    },
  },
  created() {
    this.$ajax
      .post(process.env.API_HOST + "/mainPage/getNursingHomeSurvey")
      .then((response) => {
        this.BigData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style scoped>
#section {
  height: 983px;
  padding: 0 30px;
  padding-top: 17px;
  background-color: #191f2d;
}
.map_special {
  height: 640px;
  margin-bottom: 17px;
}
/* .map {
  height: 534px;
  width: 946px;
  margin-top: 6px;
  background-color: #1d283b;
  border-radius: 7px;
  padding-top: 10px;
  padding-left: 10px;
  background-image: url(../../assets/5.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
} */
.ev_per {
  /* background-color: yellow; */
  height: 310px;
}
.blood {
  height: 310px;
  background-color: blue;
  margin-bottom: 17px;
}
.big {
  height: 620px;
  padding-top: 20px;
  background-color: #1c293a;
}
.qingkuang {
  width: 60.1875rem;
  height: 5.625rem;
  text-align: center;
}
.qingkuang li {
  width: 11.5rem;
  height: 4.625rem;
  float: left;
  margin-right: 0.4375rem;
  background-color: #1c293a;
  padding-top: 1rem;
}
.qingkuang li:nth-of-type(1) {
  background-color: #f4464a;
  width: 12rem;
}
/* #left {
  width: 1423px;
  height: 100%;
  background-color: red;
  float: left;
}
#right {
  width: 433px;
  height: 100%;
  background-color: blue;
  float: left;
} */
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  height: 36px;
}
</style>
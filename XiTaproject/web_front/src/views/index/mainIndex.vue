<template>
  <div>
    <!-- 危机人员对话框 -->
    <el-dialog title="待办事项" :visible.sync="specialVisible" width="25%">
      <specialPopup :peoplej="zjj" :peopleg="zguanzhu" :ifs="child" />
    </el-dialog>
    <el-row :gutter="20">
      <el-col :span="8">
        <div id="v-step1" class="card kjfs">
          <p class="title">
            <i class="fa fa-th-large"></i>快捷方式
          </p>
          <ul>
            <li>
              <router-link to="/Roomstate" class="kjfs kjfs-bluee">
                <span>
                  <i class="fa fa-hospital-o fa-2x"></i>
                </span>
                <span>房间状态</span>
              </router-link>
            </li>
            <li>
              <router-link to="/Information" class="kjfs kjfs-pinkk">
                <span>
                  <i class="fa fa-info-circle fa-2x"></i>
                </span>
                <span>院内信息</span>
              </router-link>
            </li>
            <li>
              <router-link to="/filterTable" class="kjfs kjfs-lightBluee">
                <span>
                  <i class="fa fa-user-o fa-2x"></i>
                </span>
                <span>长者概览</span>
              </router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="/fDetails" class="kjfs kjfs-yelloww">
                <span>
                  <i class="fa fa-archive fa-2x"></i>
                </span>
                <span>长者档案</span>
              </router-link>
            </li>
            <li>
              <router-link to="/seniorindex" class="kjfs kjfs-grennn">
                <span>
                  <i class="fa fa-commenting fa-2x"></i>
                </span>
                <span>智能健康评估</span>
              </router-link>
            </li>
            <li @click="hospitalshow">
              <router-link to="#" class="kjfs kjfs-purplee">
                <span>
                  <i class="el-icon-circle-plus fa-2x"></i>
                </span>
                <span>一键入院</span>
              </router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div id="v-step2" class="card dbsx">
          <p class="title">
            <i class="fa fa-thumb-tack"></i>待办事项
          </p>
          <ul>
            <li @click="meng('jj')">
              <router-link to="#">
                <span>紧急事件</span>
                <span class="num" style="color:#f4464a">{{this.emergencyLength}}</span>
              </router-link>
            </li>
            <li @click="meng('guanzhu')">
              <router-link to="#">
                <span>特殊关注</span>
                <span class="num">{{this.specialAttentionLength}}</span>
              </router-link>
            </li>
            <div class="messal">
              <!-- <router-view /> -->
              <!-- <Urgent v-if="show" :people="child" @close="cls" /> -->
              <!-- <test v-if="show" :peoplej="zjj" :peopleg="zguanzhu" :ifs="child" @close="cls" /> -->
            </div>
          </ul>
          <ul>
            <li>
              <router-link to="/Information">
                <span>未读消息</span>
                <span class="num">{{PendingDisposal}}</span>
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <span></span>
                <span class="num"></span>
              </router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <router-link to="/newmonitor">
          <div id="v-step3" class="card bbxx">
            <p class="title">
              <i class="fa fa-tv"></i>院内大数据监控中心
            </p>
            <span style="display: inline-block;width: 22%;">
              <img src="../../assets/minic.png" alt style=" margin-right:35px;margin-left:25px" />
            </span>

            <span style="height: 256px;display: inline-block;width: 72%; ">
              <img style="width:100%;height:215px" src="../../assets/mini.png" alt />
            </span>
          </div>
        </router-link>
      </el-col>
    </el-row>
    <el-row id="v-step4">
      <el-col :span="24">
        <line-echarts width="1383px" height="415px" ref="echarts"></line-echarts>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineEcharts from "../../components/ECharts/lineEcharts";
import Special from "../Monitor/Special";
import Urgent from "./Urgent";
import specialPopup from "./specialPopup";
export default {
  name: "mainIndex",
  components: { LineEcharts, Special, Urgent, specialPopup },
  data() {
    return {
      websock: null,
      specialVisible: false,
      zjj: [],
      zguanzhu: [],
      child: "",
      // 未读消息
      PendingDisposal: "0",
      // 紧急
      jj: [],
      // 关注
      guanzhu: [],
      // 子组件展示
      show: false
    };
  },
  computed: {
    emergencyLength() {
      return this.$store.state.websocket.emergencyDataLength;
    },
    specialAttentionLength() {
      return this.$store.state.websocket.specialAttentionDataLength;
    }
  },
  created() {
    // 获取未读消息个数
    this.$ajax
      .post(
        process.env.API_HOST + "/homePage/getPendingDisposalJson",
        `userid=${this.$store.state.token}`
      )
      .then(respones => {
        this.PendingDisposal = respones.data.xiaoxi;
      });
     this.$store.commit("changeNowpath",'mainIndex');
     this.$store.dispatch('startSocoket')
  },
  destroyed() {
    // 关闭功能向导
    this.$store.commit('closeIntro')
    // 关闭多通道
    this.$store.commit('closeSocket')
  },
  beforeRouteLeave(to, form, next) {
    if (to.path == "/newmonitor") {
      var docElm = document.documentElement;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      next();
    } else {
      next();
    }
  },
  mounted() {
    
  },
  methods: {
    hospitalshow() {
      if (!this.$store.state.hospitalshow) {
        this.$store.commit("sethospitalshow");
        this.$router.push("filterTable");
      } else {
        this.$message({
          message: "您已开启一键入院",
          type: "warning"
        });
      }
    },
    // element弹窗
    meng(data) {
      this.child = data;
      this.specialVisible = true;
    },
    // echart自适应
    selfAdaption() {
      let that = this;
      setTimeout(() => {
        window.onresize = function() {
          if (that.$refs.echarts) {
            that.$refs.echarts.chart.resize();
          }
        };
      }, 10);
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri =
        "ws://" + process.env.ws_host + "/homePendingDisposalWebsocket";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },

    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      this.$store.commit("changeEmergencyData", {
        data: redata.jj,
        removeAttentionMap: redata.removeAttentionMap
      });
      this.$store.commit("changeSpecialAttentionData", {
        data: redata.gz,
        removeAttentionMap: redata.removeAttentionMap
      });
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("关闭主页通道", e);
    }
  }
};
</script>

<style lang="scss">
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
$pinkk: #eec2d3;
$bluee: #409eff;
$yelloww: #f4d884;
$grennn: #89dda0;
$purplee: #78a2ea;
$lightBluee: #b8d6ff;

$list: bluee pinkk yelloww grennn purplee lightBluee;
$list1: $bluee $pinkk $yelloww $grennn $purplee $lightBluee;
%shadow {
  background: #fff;
  -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.2);
  .title {
    font-size: 14px;
    padding: 10px;
    i {
      margin-#{$right}: 5px;
    }
  }
}

@mixin flex($direction: row, $content: space-between) {
  display: flex;
  flex-direction: $direction;
  justify-content: $content;
}
.card {
  color: #666;
  @extend %shadow;

  ul {
    @include flex;
    li {
      flex: 1;
      a {
        color: #666666;
        align-items: center;
        padding-#{$top}: 20px;
        padding-#{$bottom}: 20px;
        @include flex(column);
        span {
          height: 44px;
        }
        .num {
          line-height: 44px;
          font-size: 42px;
          color: $bluee;
          margin: 0px;
        }
      }
      .kjfs-bluee {
        color: $bluee;
      }
      .kjfs-pinkk {
        color: $pinkk;
      }
      .kjfs-yelloww {
        color: $yelloww;
      }
      .kjfs-grennn {
        color: $grennn;
      }
      .kjfs-purplee {
        color: $purplee;
      }
      .kjfs-lightBluee {
        color: $lightBluee;
      }
      &:hover {
        .kjfs-bluee {
          color: #ffffff;
          background: $bluee;
        }
        .kjfs-pinkk {
          color: #ffffff;
          background: $pinkk;
        }
        .kjfs-yelloww {
          color: #ffffff;
          background: $yelloww;
        }
        .kjfs-grennn {
          color: #ffffff;
          background: $grennn;
        }
        .kjfs-purplee {
          color: #ffffff;
          background: $purplee;
        }
        .kjfs-lightBluee {
          color: #ffffff;
          background: $lightBluee;
        }
      }
    }
  }
  .table {
    padding: 21px;
    p {
      height: 52px;
      line-height: 52px;
      border: 1px solid #cccccc;
      overflow: hidden;
      border-#{$top}: none;
      @include flex(null, start);
      &:first-child {
        border-#{$top}: 1px solid #cccccc;
      }
      span {
      }
      .tit {
        width: 90px;
        min-width: 90px;
        height: 100%;
        text-align: center;
        border-#{$right}: 1px solid #cccccc;
        margin-#{$right}: 18px;
      }
      span.gitbox {
        flex: 1;
        height: 100%;
        overflow: hidden;
        @include flex(row, start);
        a {
          &:first-child {
            margin-#{$right}: 30px;
          }
        }
      }
    }
  }
}
#lineEchart {
  margin-#{$top}: 30px;
  padding-#{$top}: 30px;
  @extend %shadow;
}

#maintable {
  margin-#{$top}: 30px;
  padding-#{$top}: 10px;
  @extend %shadow;
}
.messal {
  z-index: 9999;
  // display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
</style>

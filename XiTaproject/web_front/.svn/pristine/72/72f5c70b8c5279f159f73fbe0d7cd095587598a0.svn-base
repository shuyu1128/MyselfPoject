<template>
  <div id="header" @click="sssss">
    <el-button round class="goback" icon="el-icon-s-home" @click="goback">回到主页</el-button>
    <div style="float:left;">希塔智慧养老平台</div>
    <div class="button_left" @click="opendrawer">
      <i class="fa fa-angle-double-left fa-2x"></i>
    </div>
    <!-- <span>哈尔滨市耄耋养老院</span> -->
    <div style="float:right;">{{time}}</div>
    <el-drawer
      @close="drawersize = '64%'"
      style="position: absolute"
      :visible.sync="drawer"
      :size="drawersize"
    >
      <h3 slot="title">全体人员健康检测</h3>
      <allPeopleHealthy v-if="drawer" @openScreen="drawersizefun" />
    </el-drawer>
  </div>
</template>
<script>
import allPeopleHealthy from "./allPeopleHealthy.vue";
export default {
  components: {
    allPeopleHealthy
  },
  data() {
    return {
      // 抽屉显示状态
      peoplelength: [],
      drawersize: "64%",
      drawer: false,
      // 获取系统时间状态
      time: "",
      timer: null
    };
  },
  created() {
    this.timer = setInterval(() => {
      var d = new Date();
      var d2 =
        d.getFullYear() +
        "年" +
        (d.getMonth() + 1) +
        "月" +
        d.getDate() +
        "日" +
        " " +
        "" +
        d.getHours() +
        "时" +
        d.getMinutes() +
        "分" +
        d.getSeconds() +
        "秒";
      this.time = d2;
    }, 1000);
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  computed: {},
  methods: {
    sssss() {
      this.$store.commit("test");
    },
    // 返回主页
    goback() {
      this.$router.push("/index");
    },
    // 拉长抽屉至全屏
    drawersizefun() {
      this.drawersize = "100%";
    },
    opendrawer() {
      window.scrollTo(0, 0);
      this.$ajax
        .post(process.env.API_HOST + "/mainPage/getAttentionNum")
        .then(respones => {
          this.peoplelength = respones.data;
        });
      this.drawer = true;
    }
  }
};
</script>
<style>
#header .el-avatar,
.el-drawer {
  overflow: visible;
}
</style>
<style scoped>
#header {
  background-color: #204d90;
  text-align: center;
  height: 80px;
  font-size: 23px;
  font-weight: 700;
  color: #ffffff;
  padding: 0 30px;
  line-height: 80px;
}
.goback {
  position: fixed;
  left: 50%;
  top: -50px;
  transform: translate(-50%);
  opacity: 0.8;
  transition-duration: 1s;
}
#header:hover .goback {
  top: 20px;
}
.allpeoplehealthy {
  height: 800px;
  padding-left: 45px;
  padding-top: 32px;
  overflow-y: auto;
  background: #f0f2f5;
}
.allpeoplehealthy_box {
  float: left;
  margin-bottom: 12px;
  margin-right: 32px;
}
.button_left {
  position: fixed;
  width: 40px;
  height: 50px;
  background-color: #ffffff;
  color: #72767b;
  text-align: center;
  line-height: 50px;
  border-radius: 8px 0 0 8px;
  right: 0;
  top: 50%;
  z-index: 2;
}
.button_left_N {
  font-size: 23px;
  position: absolute;
  width: 40px;
  height: 50px;
  background-color: #ffffff;
  color: #72767b;
  text-align: center;
  line-height: 50px;
  border-radius: 8px 0 0 8px;
  left: -40px;
  top: 50%;
  z-index: 2078;
}
@media screen and (height: 1080px) {
  .allpeoplehealthy {
    height: 950px;
    padding-top: 20px;
    padding-left: 45px;
    overflow-y: auto;
  }
}
</style>


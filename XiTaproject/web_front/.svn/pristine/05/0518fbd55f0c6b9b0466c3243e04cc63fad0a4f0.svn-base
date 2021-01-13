<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view v-if="isrouteralive"></router-view>
    </transition>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import "./reset.css";
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isrouteralive: true,
    };
  },
  created() {
    window.vm = this;
  },
  mounted() {
    let that = this;
    window.onbeforeunload = function (e) {
      if (!that.$store.state.loginif) {
        Cookies.remove("token");
        return "您是否确认离开此页面-您的登录状态可能不会被保存";
      }
    };
  },
  methods: {
    formatTime(number, format) {
      let time = new Date(number);
      let newArr = [];
      let formatArr = ["Y", "M", "D", "h", "m", "s"];
      newArr.push(time.getFullYear());
      newArr.push(this.formatNumber(time.getMonth() + 1));
      newArr.push(this.formatNumber(time.getDate()));
      newArr.push(this.formatNumber(time.getHours()));
      newArr.push(this.formatNumber(time.getMinutes()));
      newArr.push(this.formatNumber(time.getSeconds()));

      for (let i in newArr) {
        format = format.replace(formatArr[i], newArr[i]);
      }
      return format;
    },
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },
    ready() {},

    reload() {
      this.isrouteralive = false;
      this.$nextTick(function () {
        this.isrouteralive = true;
      });
    },
    sdf() {
      this.plauAudio();
    },
  },
  name: "app",
};
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  font-family: Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC,
    Hiragino Sans GB, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
a {
  color: #56a9ff;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
// .introjs-tooltipReferenceLayer .introjs-tooltip{
//       max-width: none;
// }
</style>

<template>
  <div>
    <!-- <div class="linshi"></div> -->
    <Header />
    <Section />
  </div>
</template>
<script>
import Header from "./Header";
import Section from "./Section";
export default {
  name: "app",
  components: {
    Header,
    Section
  },
  data() {
    return {
      websock: null
    };
  },
  created() {
       this.$store.commit("changeNowpath",'monitor');
    this.$store.dispatch('startSocoket')
  },
  destroyed() {
    this.$store.commit('closeSocket')
  },
  methods: {
  
  },
  beforeRouteLeave(to, form, next) {
    if (to.path !== "/dmap") {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      next();
    } else {
      next();
    }
  }
};
</script>
<style>
.linshi {
  height: 1080px;
  background-color: blue;
  position: fixed;
  width: 1920px;
  z-index: 2019;
  background: #fff url(../../assets/nowlinshi.png) no-repeat;
  background-size: 100% 100%;
}
</style>

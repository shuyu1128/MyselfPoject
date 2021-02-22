<template>
  <!-- 长者护理内容完成度 -->
  <div class="nursing-completion">
    <van-nav-bar
      :title="$route.name"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="serviceValue" :options="serviceOption" />
        </van-dropdown-menu>
      </template>
    </van-nav-bar>
    <routine-services v-show="serviceValue == '0'"></routine-services>
    <cycle-services v-show="serviceValue == '1'"></cycle-services>
    <group-services v-show="serviceValue == '2'"></group-services>
  </div>
</template>

<script>
import routineServices from "./routine-services";
import cycleServices from "./cycle-service";
import groupServices from "./group-services";
export default {
  components: {
    routineServices,
    cycleServices,
    groupServices,
  },
  data() {
    return {
      // 打开查看常规服务内容
      showContent: false,
      // 选择查看服务类型
      serviceValue: "0",
      serviceOption: [
        { text: "常规服务", value: "0" },
        { text: "周期服务", value: "1" },
        { text: "组内服务", value: "2" },
      ],
    };
  },
  computed: {
    nowId() {
      return this.$store.state.nowId;
    },
    nowdate() {
      return this.$store.state.nowdate;
    },
  },
  created() {},
  methods: {
    openContent(id) {
      this.showContent = true;
    },
  },
};
</script>
<style>
.nursing-completion .van-dropdown-menu__bar {
  box-shadow: none;
}
</style>
<style scoped>
.nursing-completion {
  height: 100%;
}
.progress-display {
  height: 400px;
}
.speet_style {
  overflow: hidden;
  padding: 6px 10px 6px 0;
}
</style>

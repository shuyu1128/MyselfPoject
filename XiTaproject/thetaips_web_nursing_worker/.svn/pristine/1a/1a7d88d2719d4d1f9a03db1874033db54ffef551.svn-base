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
    <routine-services v-if="serviceValue == '0'"></routine-services>
    <cycle-services v-if="serviceValue == '1'"></cycle-services>
  </div>
</template>

<script>
import routineServices from "./routine-services";
import cycleServices from "./cycle-service";
export default {
  components: {
    routineServices,
    cycleServices,
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
      ],
    };
  },
  computed: {
    nowId() {
      return this.$store.state.nowId;
    },
    // 当前查看长者
    nowPeople() {
      return this.$store.state.nowPeople;
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

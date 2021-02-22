<template>
  <!-- 收益明细 -->
  <div class="detailed">
    <van-nav-bar
      left-text="收益明细"
      fixed
      :placeholder="true"
      style="background-color: rgba(0, 0, 0, 0)"
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="detailed_list">
      <van-cell
        v-for="item in detailedList"
        :key="item.id"
        :label="$globalMethod.formatTimeStamp(item.passingTime, 'Y-M-D h:m')"
      >
        <template #title>
          <span v-if="item.workNum" style="color: #646566">{{
            `工单号：${item.workNum}`
          }}</span>
          <span v-else style="color: #646566">兑换扣除</span>
        </template>
        <template #default>
          <div
            :style="{ color: item.estimatedTime > 0 ? '#1989FA' : '#969799' }"
          >
            <li class="profit_style">
              {{
                item.estimatedTime > 0
                  ? "+" + item.estimatedTime
                  : item.estimatedTime
              }}分钟
            </li>
            <li class="surplus_style">剩余：{{ item.surplus }}</li>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailedList: [],
    };
  },
  created() {
    this.$http.getLogListByReceivingid().then((res) => {
      this.detailedList = res.data;
    });
  },
};
</script>

<style scoped>
.detailed {
  height: 100%;
}
.detailed_list {
  height: calc(100% - 46px);
  background-color: #fff;
}
.profit_style {
  font-size: 18px;
  /* color: #1989fa; */
  font-weight: 1000;
  margin-bottom: 1px;
}
</style>

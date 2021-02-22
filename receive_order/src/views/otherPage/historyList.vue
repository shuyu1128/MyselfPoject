<template>
  <!-- 工单记录 -->
  <div class="detailed">
    <!-- 详情弹窗-->
    <van-popup v-model="detailsShow" round position="bottom">
      <detailsApproval v-if="detailsShow" :detailsData="detailsData" />
    </van-popup>
    <van-nav-bar
      left-text="工单记录"
      fixed
      :placeholder="true"
      style="background-color: rgba(0, 0, 0, 0)"
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        @cancel="timeShow = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-cell title="当前查看日期" :value="text" @click="openTime">
      <template #label>
        <div style="width: 150%">
          <li>
            <span class="total_title">合计已完成</span>
            <span class="total_value">{{ statisticsData.finishorder }}单</span>
            <span class="total_title">已获得奖励</span>
            <span>{{ statisticsData.finishorderTime }}分钟</span>
          </li>
          <li>
            <span class="total_title">合计未完成</span>
            <span class="total_value"
              >{{ statisticsData.notfinishorder }}单</span
            >
            <span class="total_title">未审核奖励</span>
            <span>{{ statisticsData.notfinishorderTime }}分钟</span>
          </li>
        </div>
      </template>
    </van-cell>
    <div class="detailed_list">
      <van-cell
        v-for="item in detailedList"
        :key="item.id"
        :label="`${$globalMethod.formatTimeStamp(
          item.begintime,
          'M-D h:m'
        )} 至 ${$globalMethod.formatTimeStamp(item.endtime, 'M-D h:m')}`"
        @click="openDetailsShow(item)"
      >
        <template #title>
          <span style="color: #646566">{{ `工单号：${item.worknum}` }}</span>
        </template>
        <template #default>
          <li
            :class="
              item.state == '4'
                ? 'profit_style profit_style_over'
                : 'profit_style'
            "
          >
            <span>+{{ item.estimatedtime }}分钟</span>
            <span>{{ item.state == "4" ? "已完成" : "未完成" }}</span>
          </li>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import detailsApproval from "./detailsApproval";
export default {
  components: {
    detailsApproval,
  },
  data() {
    return {
      // 详情弹窗
      detailsShow: false,
      detailsData: {},
      // 统计数据
      statisticsData: {},
      text: "",
      timeShow: false,
      currentDate: new Date(),
      detailedList: [],
    };
  },
  created() {
    //   赋值当前时间
    this.text = this.formatDate(new Date());
    this.onRefresh();
  },
  methods: {
    openDetailsShow(item) {
      console.log(item);
      this.detailsData = JSON.parse(JSON.stringify(item));
      this.detailsShow = true;
    },
    openTime() {
      this.timeShow = true;
    },
    formatDate(date) {
      return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`;
    },
    subFormatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}`;
    },
    onConfirm(date) {
      this.text = this.formatDate(date);
      this.onRefresh();
      this.timeShow = false;
    },
    onRefresh() {
      this.$http
        .getWorkOrderListByReceivingid({
          stateList: JSON.stringify(["1", "2", "3", "4"]),
          selectTime: this.subFormatDate(this.currentDate),
        })
        .then((res) => {
          this.detailedList = res.data;
        });
      // 获取统计数据
      this.$http
        .getReceivingStatisticsById({
          selectTime: this.subFormatDate(this.currentDate),
        })
        .then((res) => {
          this.statisticsData = res.data;
        });
    },
  },
};
</script>

<style scoped>
.detailed {
  height: 100%;
}
.detailed_list {
  height: calc(100% - 130px);
  background-color: #fff;
}
.profit_style {
  line-height: 46px;
  color: #969799;
  font-size: 14px;
}
.profit_style_over {
  line-height: 46px;
  color: #1989fa;
  font-size: 14px;
}
.profit_style span:first-of-type {
  margin-right: 16px;
}
.total_title {
  margin-right: 6px;
}
.total_value {
  display: inline-block;
  width: 52px;
}
</style>

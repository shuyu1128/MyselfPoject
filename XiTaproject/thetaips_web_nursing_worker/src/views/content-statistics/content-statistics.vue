<template>
  <!-- 护理内容统计 -->
  <div class="content-statistics">
    <div
      v-for="(item, index) in statisticsList"
      :key="index"
      class="content-statistics-list"
    >
      <div class="list_top">
        <li>
          {{ item.name }}
        </li>
        <van-progress
          class="progress_style"
          :color="returnColor(item.totalcompletion)"
          :percentage="item.totalcompletion > 100 ? 100 : item.totalcompletion"
          :pivot-text="item.totalcompletion + '%'"
        />
      </div>
      <div class="list_bottom">
        <van-grid :column-num="item.name == '今日完成度' ? 2 : 4">
          <van-grid-item>
            <p class="title_style">
              <!-- {{ $globalMethod.ChangeHourMinutestr(item.totalmanhours) }} -->
              {{ item.totalmanhours }}min
            </p>
            <p class="value_style">总工时</p>
          </van-grid-item>
          <van-grid-item>
            <p class="title_style">
              <!-- {{ $globalMethod.ChangeHourMinutestr(item.Workdone) }} -->
              {{ item.Workdone }}min
            </p>
            <p class="value_style">已完成</p>
          </van-grid-item>
          <van-grid-item v-if="item.name !== '今日完成度'">
            <p class="title_style">
              <!-- {{ $globalMethod.ChangeHourMinutestr(item.approvedhours) }} -->
              {{ item.approvedhours }}min
            </p>
            <p class="value_style">已审批</p>
          </van-grid-item>
          <van-grid-item v-if="item.name !== '今日完成度'">
            <p class="title_style">
              <!-- {{ $globalMethod.ChangeHourMinutestr(item.unqualifiedworkhours) }} -->
              {{ item.unqualifiedworkhours }}min
            </p>
            <p class="value_style">不合格</p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRate: 0,
      statisticsList: [
        // {
        //   name: "今日完成度",
        //   // 总完成度
        //   totalcompletion: "60",
        //   // 总工时
        //   totalmanhours: "12时30分",
        //   // 已完成
        //   Workdone: "12时30分",
        //   // 已审批
        //   approvedhours: "12时30分",
        //   // 不合格
        //   unqualifiedworkhours: "12时30分",
        // },
        // {
        //   name: "昨日完成度",
        //   // 总完成度
        //   totalcompletion: "120",
        //   // 总工时
        //   totalmanhours: "12时30分",
        //   // 已完成
        //   Workdone: "12时30分",
        //   // 已审批
        //   approvedhours: "12时30分",
        //   // 不合格
        //   unqualifiedworkhours: "12时30分",
        // },
        // {
        //   name: "周完成度",
        //   // 总完成度
        //   totalcompletion: "59",
        //   // 总工时
        //   totalmanhours: "12时30分",
        //   // 已完成
        //   Workdone: "12时30分",
        //   // 已审批
        //   approvedhours: "12时30分",
        //   // 不合格
        //   unqualifiedworkhours: "12时30分",
        // },
        // {
        //   name: "月完成度",
        //   // 总完成度
        //   totalcompletion: "78",
        //   // 总工时
        //   totalmanhours: "12时30分",
        //   // 已完成
        //   Workdone: "12时30分",
        //   // 已审批
        //   approvedhours: "12时30分",
        //   // 不合格
        //   unqualifiedworkhours: "12时30分",
        // },
      ],
    };
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
  },
  created() {
    this.onRefresh();
  },
  methods: {
    returnColor(data) {
      if (data < 60) {
        return "#ee0a24";
      } else if (data >= 60 && data < 80) {
        return "#f2826a";
      } else if (data >= 80) {
        return "#1989fa";
      }
    },
    onRefresh() {
      let that = this;
      (async function getAddRouters() {
        let today = await that.$http.getNursingWorkProgress({ type: "today" });
        let yesterday = await that.$http.getNursingWorkProgress({
          type: "yesterday",
        });
        let lastWeek = await that.$http.getNursingWorkProgress({
          type: "lastWeek",
        });
        let lastMonth = await that.$http.getNursingWorkProgress({
          type: "lastMonth",
        });
        that.statisticsList.push(today.data);
        that.statisticsList.push(yesterday.data);
        that.statisticsList.push(lastWeek.data);
        that.statisticsList.push(lastMonth.data);
      })();
    },
  },
};
</script>

<style scoped>
.content-statistics {
  overflow-y: auto;
  height: calc(100% - 46px);
}
.content-statistics-list {
  margin-bottom: 20px;
}
.list_top > li {
  position: relative;
  height: 46px;
  line-height: 46px;
  text-align: center;
  font-size: 16px;
  background-color: #ffffff;
}
.progress_style {
  z-index: 2;
}
.value_style {
  font-size: 12px;
  color: #646566;
}
.title_style {
  color: #007bff;
}
</style>

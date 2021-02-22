<template>
  <!-- 组内服务 -->
  <div class="group-services">
    <van-cell
      title="当前查看日期"
      :value="$globalMethod.formatTime(nowdate)"
      @click="showTime = true"
    />
    <van-calendar
      color="#007BFF"
      :default-date="nowdate"
      :min-date="minDate"
      :max-date="maxDate"
      v-model="showTime"
      @confirm="onConfirm"
    />
    <!-- 护理进度内容面板 -->

    <div class="progress-display">
      <progress-completed
        v-for="item in nursingList"
        :key="item.id"
        :isPicture="item.isPicture"
        :isText="item.isText"
        :feedback="item.isText == '是' ? item.feedback : ''"
        :nursingcontents="item.nursingContents"
        :nursingname="item.account"
        :overtime="$globalMethod.formatTimeStamp(item.overTime, 'Y-M-D h:m:s')"
        :imgsrc="item.isPicture == '是' ? item.imgsrc : ''"
        :nursingid="item.nursingid"
        :id="item.id"
        :type="'team'"
      ></progress-completed>
    </div>
  </div>
</template>

<script>
import progressCompleted from "../../components/progress-completed";
export default {
  components: {
    progressCompleted,
  },
  data() {
    return {
      // 当前可选择最大日期
      maxDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      minDate: new Date(1577836800000),
      showContent: false,
      showTime: false,
      //   护理内容列表
      nursingList: [],
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
  created() {
    this.onRefresh();
  },
  methods: {
    onConfirm(date) {
      // 修改时间后重新获取
      this.$store.commit("changeNowdate", date);
      this.onRefresh();
      this.showTime = false;
    },
    openContent() {
      this.showContent = true;
    },
    onRefresh() {
      let formData = {
        personid: this.nowId,
        type: "team",
        nowDay: this.$globalMethod.formatTimeStamp(this.nowdate, "Y-M-D"),
      };
      this.$http.getNursingContentsListByPersonId(formData).then((res) => {
        this.nursingList = res.data;
      });
    },
  },
};
</script>

<style scoped>
.group-services {
  height: calc(100% - 46px);
}
.progress-display {
  background: #fff;
  padding: 0 16px 0 40px;
  height: calc(100% - 44px);
  overflow-y: auto;
}
.speet_style {
  overflow: hidden;
  line-height: 28px;
}
</style>

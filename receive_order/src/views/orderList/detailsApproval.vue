<template>
  <div class="order_details">
    <!-- 日期选择器 -->
    <van-popup
      closeable
      v-model="calendarShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <div class="select_time">
        <div class="time_header">提交接单信息</div>
        <div class="begin_time">
          <p class="time_title">选择服务开始时间</p>
          <van-datetime-picker
            :min-date="beginMinDate"
            :max-date="beginMaxDate"
            :show-toolbar="false"
            :formatter="formatter"
            :filter="filter"
            v-model="beginDate"
          />
        </div>
        <div class="end_time">
          <p class="time_title">选择服务结束时间</p>
          <van-datetime-picker
            :min-date="beginMinDate"
            :max-date="beginMaxDate"
            :show-toolbar="false"
            :formatter="formatter"
            :filter="filter"
            v-model="endDate"
          />
        </div>
        <van-button type="info" block @click="receivingOrders">
          确 认 接 单
        </van-button>
      </div>
    </van-popup>
    <div class="order_header">工单信息</div>
    <div class="title_bg">工单基本信息</div>
    <li class="details_list">
      <span class="details_title">工单号：</span>
      <span v-html="detailsData.worknum" class="details_content" />
    </li>
    <li class="details_list">
      <span class="details_title">派单人：</span>
      <span v-html="detailsData.dispatchname" class="details_content" />
    </li>
    <li class="details_list">
      <span class="details_title">服务对象：</span>
      <span v-html="detailsData.sponsor" class="details_content" />
    </li>
    <li class="details_list">
      <span class="details_title">联系电话：</span>
      <span v-html="detailsData.sponsorphone" class="details_content" />
    </li>
    <li class="details_list">
      <span class="details_title">服务地点：</span>
      <span v-html="detailsData.workaddress" class="details_content" />
    </li>
    <li class="details_list">
      <span class="details_title">预约时间：</span>
      <span
        class="details_content"
        v-html="
          `${$globalMethod.formatTimeStamp(
            detailsData.begintime,
            'Y-M-D h:m'
          )} 至 ${$globalMethod.formatTimeStamp(
            detailsData.endtime,
            'Y-M-D h:m'
          )}`
        "
      />
    </li>
    <li class="details_list">
      <span class="details_title">完成奖励：</span>
      <span
        v-html="detailsData.estimatedtime + '分钟'"
        class="details_content"
      />
    </li>
    <div class="title_bg">工单详细内容</div>
    <li class="details_list">
      <span class="details_title">工作内容：</span>
      <span v-html="detailsData.workcontent" class="work_content" />
    </li>
    <div class="order_footer">
      <van-button
        style="float: right"
        type="info"
        size="mini"
        @click="calendarShow = true"
      >
        接 单
      </van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      beginMinDate: new Date(this.detailsData.begintime),
      beginMaxDate: new Date(this.detailsData.endtime),
      endMinDate: "",
      endManDate: "",
      beginDate: "",
      endDate: "",
      calendarShow: false,
    };
  },
  props: {
    detailsData: null,
  },
  created() {},
  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      } else if (type === "hour") {
        return `${val}时`;
      } else if (type === "minute") {
        return `${val}分`;
      }
      return val;
    },
    filter(type, options) {
      if (type === "minute") {
        return options.filter((option) => option % 15 === 0);
      }
      return options;
    },
    onConfirm(date) {
      this.calendarShow = false;
    },
    receivingOrders() {
      if (this.CompareTime(this.beginDate.getTime(), this.endDate.getTime())) {
        Dialog.confirm({
          title: "提示",
          message: "即将接取工单，是否继续？",
        })
          .then(() => {
            let formData = {
              beginTime: this.$globalMethod.formatTimeStamp(
                this.beginDate.getTime(),
                "Y-M-D h:m:s"
              ),
              endTime: this.$globalMethod.formatTimeStamp(
                this.endDate.getTime(),
                "Y-M-D h:m:s"
              ),
              orderid: this.detailsData.id,
            };
            this.$http.receivedWorkOrder(formData).then((res) => {
              if (this.$globalMethod.ifTips(res.data)) {
                this.$router.push({
                  path: `/viewOrder/${this.detailsData.id}`,
                });
              }
            });
          })
          .catch(() => {});
      }
    },
    // 时间戳比较
    CompareTime(begin, end) {
      if (end > begin) {
        return true;
      } else {
        Toast.fail("结束时间需大于开始时间");
        return false;
      }
    },
  },
};
</script>

<style scoped>
.order_details {
  font-size: 12px;
  color: #646566;
  letter-spacing: 2px;
}
.order_header {
  height: 38px;
  line-height: 38px;
  text-align: center;
  font-size: 16px;
}
.order_footer {
  border-top: 1px solid #f5f6f7;
  overflow: hidden;
  padding: 8px 16px;
}
.title_bg {
  line-height: 28px;
  padding-left: 6px;
  background-color: #409eff;
  color: #fff;
  margin-bottom: 6px;
}
.details_list {
  margin-bottom: 6px;
  padding-left: 33px;

  padding-right: 33px;
}
.details_title {
  display: inline-block;
  width: 70px;
}
.work_content {
  display: block;
  height: 80px;
  overflow-y: auto;
  text-indent: 24px;
}
.select_time {
  height: calc(100% - 32px);
  padding: 16px;
  background-color: #f7f8fa;
}
.time_header {
  height: 35px;
  font-size: 16px;
}
.begin_time,
.end_time {
  height: 40%;
  padding-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.time_title {
  height: 20px;
  line-height: 20px;
  margin-bottom: 8px;
  font-size: 16px;
  color: #323233;
  text-align: center;
}
</style>

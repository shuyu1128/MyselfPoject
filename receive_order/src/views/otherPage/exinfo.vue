<!-- 兑换信息 -->
<template>
  <div class="exinfo">
    <van-nav-bar
      left-text="兑换信息"
      fixed
      :placeholder="true"
      style="background-color: rgba(0, 0, 0, 0)"
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="exinfo_list">
      <van-cell v-for="item in exinfoList" :key="item.id">
        <template #title>
          <div class="list_tr">
            <li>
              {{ getInfo(item) }}
            </li>
            <li>
              <span>
                {{
                  $globalMethod.formatTimeStamp(item.createdtime, "Y-M-D h:m")
                }}
              </span>
              <span style="float: right">
                <span v-if="item.state == '5' && item.type == 'WORKORDER'">
                  订单已关闭
                </span>
                <span v-if="item.state == '2' && item.type == 'EXCHANGE'">
                  已拒绝
                </span>
                <span
                  v-if="
                    (item.state != '5' &&
                      item.state != '-1' &&
                      item.type == 'WORKORDER') ||
                    (item.state == '1' && item.type == 'EXCHANGE')
                  "
                >
                  已通过
                </span>
                <van-button
                  v-if="
                    (item.state == '-1' && item.type == 'WORKORDER') ||
                    (item.state == '0' && item.type == 'EXCHANGE')
                  "
                  type="info"
                  size="mini"
                  @click="approval(item, 'no')"
                >
                  拒绝
                </van-button>
                <van-button
                  v-if="
                    (item.state == '-1' && item.type == 'WORKORDER') ||
                    (item.state == '0' && item.type == 'EXCHANGE')
                  "
                  size="mini"
                  type="info"
                  @click="approval(item, 'yes')"
                >
                  确认
                </van-button>
              </span>
            </li>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Notify } from "vant";
export default {
  data() {
    return {
      userName: "",
      exinfoList: [],
    };
  },
  created() {
    this.onRefresh();
  },
  methods: {
    // 返回显示信息
    getInfo(item) {
      if (item.type == "EXCHANGE") {
        return `用户${this.userName}，您发起的用${item.score}分钟奖励时间兑换${item.approvaldesc}的请求已经通过审批，请您确认是否兑换`;
      } else {
        return `用户${this.userName}，您发起的用${item.score}分钟奖励时间兑换${item.beginTime}至${item.endTime}期间上门为老人服务的兑换请求已经通过审批，工单号：${item.workNum},请您确认是否兑换`;
      }
    },
    // 审批操作
    approval(item, operation) {
      Dialog.confirm({
        title: "提示",
        message: "即将审批是否继续？",
      })
        .then(() => {
          if (item.type == "EXCHANGE") {
            let noperation = operation == "yes" ? 1 : 2;
            this.$http
              .updateApprovalState({ approvalid: item.id, state: noperation })
              .then((res) => {
                this.$globalMethod.ifTips(res.data);
                this.onRefresh();
              });
          } else {
            let noperation = operation == "yes" ? 0 : 5;
            this.$http
              .receivedApprovalWorkOrder({
                orderid: item.id,
                state: noperation,
              })
              .then((res) => {
                if (res.data.state == "success") {
                  this.onRefresh();
                  Notify({ type: "success", message: "审批成功" });
                } else {
                  Notify({ type: "success", message: data.msg });
                }
              });
          }
        })
        .catch(() => {
          // on cancel
        });
    },
    onRefresh() {
      // 获取审批信息
      this.$http.getExchangeApprovalList().then((res) => {
        this.exinfoList = res.data;
      });
      // 获取用户名
      this.$http.getUser().then((res) => {
        this.userName = res.data.fullname;
      });
    },
  },
};
</script>

<style scoped>
.exinfo {
  height: 100%;
  background-color: #fff;
}
.exinfo_list {
  height: calc(100% - 46px);
}
.list_tr {
  font-size: 12px;
}
.list_tr li:first-of-type {
  color: #646566;
}
.list_tr li:last-of-type {
  color: #969799;
}
</style>

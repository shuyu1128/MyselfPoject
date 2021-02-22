<template>
  <!-- 工单列表 -->
  <div class="order_list">
    <!-- 头部 -->
    <van-sticky>
      <van-nav-bar style="background: #007bff" fixed>
        <!-- <van-icon color="#fff" size="24" name="user-circle-o" slot="left" /> -->
        <span style="color: #fff" slot="title">互助式居家养老平台接单系统</span>
      </van-nav-bar>
    </van-sticky>
    <!-- 详情弹窗-->
    <van-popup v-model="detailsShow" round position="bottom">
      <detailsApproval v-if="detailsShow" :detailsData="detailsData" />
    </van-popup>

    <van-cell v-for="item in peopleList" :key="item.id" @click="toChoice(item)">
      <template #title>
        <div class="content_left">
          <li>
            <span>工单号：{{ item.worknum }}</span>
          </li>
          <li>
            <span>
              预约时间：{{
                `${$globalMethod.formatTimeStamp(item.begintime, "M-D h:m")}`
              }}
              至
              {{ `${$globalMethod.formatTimeStamp(item.endtime, "M-D h:m")}` }}
            </span>
          </li>
          <li>
            <span>服务地点：{{ item.workaddress }}</span>
          </li>
        </div>
        <div class="content_right">{{ item.estimatedtime }}分钟</div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { Toast } from "vant";
import detailsApproval from "./detailsApproval";
export default {
  components: {
    detailsApproval,
  },
  data() {
    return {
      detailsShow: false,
      detailsData: "",
      peopleList: [],
    };
  },
  created() {
    this.onRefresh();
  },
  methods: {
    toChoice(data) {
      this.detailsData = JSON.parse(JSON.stringify(data));
      this.detailsShow = true;
      //   this.$store.commit("changePeople", data);
      //   this.$router.push({
      //     path: "/nursing-completion",
      //   });
    },
    rclass(completiondegree) {
      if (completiondegree < 60) {
        return "c_danger";
      } else if (completiondegree >= 60 && completiondegree < 80) {
        return "c_warning";
      } else if (completiondegree >= 80 && completiondegree <= 100) {
        return "c_success";
      }
    },
    onRefresh() {
      this.$http.getNotReceivedWorkOrderListn().then((res) => {
        console.log(res);
        this.peopleList = res.data;
      });
    },
  },
};
</script>

<style scoped>
.order_list {
  overflow-y: auto;
}
.order_list .van-cell {
  font-size: 12px;
  color: #666;
}
.content_left {
  height: 72px;
  width: 70%;
  float: left;
}
.content_right {
  height: 72px;
  width: 30%;
  float: left;
  position: relative;
  text-align: right;
  line-height: 72px;
  font-size: 16px;
  color: #007bff;
}
.order_list .cell_border {
  scroll-margin-bottom: 5px;
}
.c_danger {
  border-left: 8px solid #f56c6c;
}
.c_warning {
  border-left: 8px solid #e6a23c;
}
.c_success {
  border-left: 8px solid #67c23a;
}
</style>

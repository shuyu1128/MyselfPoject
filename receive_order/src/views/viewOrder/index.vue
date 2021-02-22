<template>
  <!-- 进入工单 -->
  <div class="view_order">
    <div class="top_bg"></div>
    <van-nav-bar
      fixed
      :placeholder="true"
      style="background-color: rgba(0, 0, 0, 0)"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <van-icon color="#fff" size="16" name="arrow-left" slot="left" />
    </van-nav-bar>
    <div class="view_order_main">
      <p class="view_order_title">进行中订单</p>
      <div class="order_info">
        <p class="order_info_header">工单号：{{ detailsData.worknum }}</p>
        <div class="order_info_main">
          <li class="order_info_list">服务对象：{{ detailsData.sponsor }}</li>
          <li class="order_info_list">
            联系方式：{{ detailsData.sponsorphone }}
          </li>
          <li class="order_info_list">
            服务时间：{{
              `${$globalMethod.formatTimeStamp(
                detailsData.estimatedbegintime,
                "Y-M-D h:m"
              )} 至 ${$globalMethod.formatTimeStamp(
                detailsData.estimatedendtime,
                "Y-M-D h:m"
              )}`
            }}
          </li>
          <li class="order_info_list">
            服务地点：{{ detailsData.workaddress }}
          </li>
          <li class="order_info_list">
            服务内容：{{ detailsData.workcontent }}
          </li>
        </div>
      </div>
      <div class="order_process">
        <p class="order_process_header">工作进度</p>
        <div class="order_process_steps">
          <van-steps
            active-color="#1989fa"
            direction="vertical"
            :active="sortnum"
          >
            <van-step style="font-size: 12px">
              <h3 style="margin-bottom: 6px">按照约定时间开始服务</h3>
              <p style="margin-bottom: 6px">
                如未按照约定时间开始服务将扣除部分收益
              </p>
              <van-button
                size="mini"
                type="info"
                :disabled="sortnum == 0 ? false : true"
                @click="OrderStart"
              >
                开始服务
              </van-button>
            </van-step>
            <van-step style="font-size: 12px">
              <h3 style="margin-bottom: 6px">完成服务上传凭证</h3>
              <p style="margin-bottom: 6px">完成服务过程中拍摄3分钟GIF</p>
              <van-uploader
                :deletable="sortnum == 1 ? true : false"
                v-model="fileList"
                :disabled="sortnum == 1 ? false : true"
                :after-read="afterRead"
                @delete="deleteimg"
                multiple
              />
            </van-step>
            <van-step style="font-size: 12px">
              <h3 style="margin-bottom: 6px">结束服务，提交审核</h3>
              <p style="margin-bottom: 6px">本次服务将于3日审核完成</p>
              <van-button
                :disabled="
                  (fileids.length != 0) & (sortnum == 1) ? false : true
                "
                size="mini"
                type="info"
                @click="OrderCompleted"
              >
                结束服务
              </van-button>
            </van-step>
          </van-steps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sortnum: 0,
      detailsData: {},
      fileList: [],
      fileids: [],
    };
  },
  created() {
    this.onRefresh();
  },
  methods: {
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      axios
        .post(
          process.env.VUE_APP_URL + "receiving/file/uploadOrderFile",
          formData,
          {
            "Content-Type": "multipart/form-data",
          }
        )
        .then((res) => {
          if (this.$globalMethod.ifTips(res.data)) {
            this.fileList[this.fileList.length - 1].fileid = res.data.fileid;
            this.fileids.push(res.data.fileid);
          }
        });
    },
    deleteimg(val) {
      this.fileids.forEach((element, index) => {
        if (element == val.fileid) {
          this.fileids.splice(index, 1);
        }
      });
    },
    // 完成工单
    OrderCompleted() {
      this.$http
        .receivedWorkOrderCompleted({
          orderid: this.$route.params.id,
          fileids: JSON.stringify(this.fileids),
        })
        .then((res) => {
          this.$globalMethod.ifTips(res.data);
          this.onRefresh();
        });
    },
    // 开始工单
    OrderStart() {
      this.$http
        .receivedWorkOrderStart({ orderid: this.$route.params.id })
        .then((res) => {
          this.$globalMethod.ifTips(res.data);
          this.onRefresh();
        });
    },
    onRefresh() {
      // 根据id获取工单信息
      this.$http
        .getWorkOrderById({ orderid: this.$route.params.id })
        .then((res) => {
          this.detailsData = res.data;
          this.sortnum = res.data.sortnum;
        });
      this.$http
        .getFileListByOrderid({ orderid: this.$route.params.id })
        .then((res) => {
          // 后台返回格式不正确，需循环获取
          this.fileList = [];
          this.fileids = [];
          res.data.forEach((item) => {
            this.fileList.push({
              url: process.env.VUE_APP_URL + item.fileurl,
              fileid: item.id,
            });
            this.fileids.push(item.id);
          });
        });
    },
  },
};
</script>

<style>
.view_order .van-nav-bar {
  background-color: rgba(0, 0, 0, 0);
}
.view_order .van-hairline--bottom::after {
  border-bottom-width: 0px;
}
</style>
<style scoped>
.view_order {
  height: 100%;
  background-color: #fff;
  position: relative;
}
.top_bg {
  position: absolute;
  top: 0;
  background-color: #1989fa;
  width: 100%;
  height: 35%;
}
.view_order_main {
  height: calc(100% - 46px);
  overflow-y: auto;
  position: absolute;
  width: calc(100% - 32px);
  padding: 0 16px 0 16px;
}
.view_order_title {
  color: #fff;
  font-size: 16px;
  margin-bottom: 16px;
}
.order_info {
  min-height: calc(40% - 24px);
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.order_info_header {
  color: #969799;
  border-bottom: 1px solid #f5f6f7;
}
.order_info_main {
  padding-top: 6px;
  color: #646566;
  font-size: 12px;
  letter-spacing: 2px;
}
.order_info_list {
  margin-bottom: 6px;
}
.order_process {
  min-height: calc(50% - 24px);
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.order_process_header {
  color: #969799;
}
</style>

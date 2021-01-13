<template>
  <!-- 我的 -->
  <div class="my_info">
    <div class="my_info_top">
      <van-row>
        <!-- 姓名 -->
        <van-col span="24">
          <h1>{{ userData.fullname }}</h1>
        </van-col>
      </van-row>
      <!-- 头像手机号id区域 -->
      <van-row>
        <!-- 姓名 -->
        <van-col span="18">
          <li style="height: 21px"></li>
          <li>
            <span class="info_title">ID</span><span>{{ userData.userid }}</span>
          </li>
          <li>
            <span class="info_title"> 手机号 </span>
            <span>{{ userData.phone }} </span>
          </li>
        </van-col>
        <van-col span="6">
          <van-image
            style="float: right"
            width="64"
            height="64"
            :src="require('../../assets/head_portrait.png')"
          />
        </van-col>
      </van-row>
      <div class="last_time">
        <van-grid :column-num="3">
          <van-grid-item>
            <p class="title_style">{{ surplus }}分钟</p>
            <p class="value_style">剩余收益</p>
          </van-grid-item>
          <van-grid-item>
            <p class="title_style">{{ total }}分钟</p>
            <p class="value_style">合计收益</p>
          </van-grid-item>
          <van-grid-item>
            <p class="title_style">{{ alreadytimate }}分钟</p>
            <p class="value_style">已兑换收益</p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div class="my_info_bottom">
      <p class="my_info_bottom_title">查询</p>
      <van-row style="margin-bottom: 16px" gutter="20">
        <van-col span="12">
          <div class="my_info_card" @click="topage('/historyList')">
            <van-row>
              <van-col span="16">
                <p class="card_title">工单记录</p>
                <div class="card_content">查询用户所有工单记录</div>
              </van-col>
              <van-col span="8">
                <van-image
                  style="float: right; margin-top: 12px"
                  width="54"
                  height="54"
                  :src="require('../../assets/icon-profit.png')"
                />
              </van-col>
            </van-row>
          </div>
        </van-col>
        <van-col span="12">
          <div class="my_info_card" @click="topage('/detailed')">
            <van-row>
              <van-col span="16">
                <p class="card_title">收益明细</p>
                <div class="card_content">查询用户所有接单信息记录</div>
              </van-col>
              <van-col span="8">
                <van-image
                  style="float: right; margin-top: 12px"
                  width="54"
                  height="54"
                  :src="require('../../assets/icon-detailed.png')"
                />
              </van-col>
            </van-row>
          </div>
        </van-col>
      </van-row>
      <van-cell
        style="font-size: 16px; color: #969799"
        title="兑换信息"
        @click="topage('/exinfo')"
      >
        <template #icon>
          <i class="iconfont icon-jilu iconfont_right"></i>
        </template>
      </van-cell>
      <van-cell
        style="font-size: 16px; color: #969799"
        title="身份绑定"
        @click="topage('/idBinding')"
      >
        <template #icon>
          <i class="iconfont icon-shenfenbangding iconfont_right"></i>
        </template>
      </van-cell>
      <van-cell
        style="font-size: 16px; margin-bottom: 20px; color: #969799"
        title="修改账户密码"
        @click="topage('/changePassword')"
      >
        <template #icon>
          <i class="iconfont icon-shezhi1 iconfont_right"></i>
        </template>
      </van-cell>
      <van-button type="info" block @click="outlogin">退 出 登 录</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      // 剩余的
      surplus: "",
      // 合计收益
      total: "",
      // 兑换收益
      alreadytimate: "",
      userData: {},
    };
  },
  created() {
    // 获取个人所剩时间
    let that = this;
    (async function getAddRouters() {
      let total = await that.$http.getUser();
      let estimate = await that.$http.getFrozenEstimatedTimeByReceivingid();
      let alreadytimate = await that.$http.getExchangeEstimatedTimeByReceivingid();
      that.userData = total.data;
      that.total = total.data.total;
      that.surplus = total.data.surplus - estimate.data;
      that.alreadytimate = alreadytimate.data;
    })();
  },
  methods: {
    // 退出登录
    outlogin() {
      Dialog.confirm({
        title: "提示",
        message: "即将修改身份信息，是否继续？",
      })
        .then(() => {
          this.$http.removeUser().then((res) => {
            this.$router.push("/login");
          });
        })
        .catch(() => {});
    },
    topage(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style>
.my_info .van-grid-item__content {
  background-color: rgba(0, 0, 0, 0);
}
.my_info .van-grid-item__content::after {
  border-width: 0;
}
.my_info [class*="van-hairline"]::after {
  border: none;
}
</style>
<style scoped>
.my_info {
  background-color: #fff;
}
.my_info_top {
  /* height: calc(35% - 18px); */
  padding: 18px 24px 0 24px;
  overflow: hidden;
  color: #fff;
  background-color: #1989fa;
  position: relative;
  font-size: 14px;
}
.info_title {
  display: inline-block;
  width: 66px;
}
.last_time {
  width: calc(100% + 48px);
  position: relative;
  left: -24px;
}
.title_style {
  font-size: 16px;
}
.value_style {
  font-size: 12px;
  color: #dcdee0;
}
.my_info_bottom {
  padding: 8px 24px 0 24px;
}
.my_info_bottom_title {
  font-size: 18px;
  color: #969799;
  margin-bottom: 6px;
}
.my_info_card {
  border-radius: 8px;
  padding: 6px 0 4px 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.card_title {
  font-size: 14px;
  color: #969799;
}
.card_content {
  font-size: 12px;
  color: #c8c9cc;
}
.iconfont_right {
  margin-right: 6px;
}
</style>

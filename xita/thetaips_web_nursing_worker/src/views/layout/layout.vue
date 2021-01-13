<template>
  <div class="layout">
    <!-- 头部 -->
    <van-nav-bar style="background: #007bff" fixed @click-left="onClickLeft">
      <van-icon color="#fff" size="24" name="user-circle-o" slot="left" />
      <span style="color: #fff" slot="title">希塔智慧养老系统</span>
    </van-nav-bar>
    <!-- 主要内容 -->
    <transition name="main" mode="out-in">
      <router-view class="view_main"></router-view>
    </transition>
    <!-- 尾部 -->
    <van-tabbar v-model="active">
      <van-tabbar-item to="/elderly-information" icon="user-o">
        长者服务
      </van-tabbar-item>
      <van-tabbar-item to="/group-service" icon="friends-o">
        组别服务
      </van-tabbar-item>
      <van-tabbar-item to="/public-service" icon="home-o">
        公共服务
      </van-tabbar-item>
      <van-tabbar-item to="/content-statistics" icon="chart-trending-o">
        护理内容统计
      </van-tabbar-item>
    </van-tabbar>
    <!-- 左侧抽屉 -->
    <div class="popup_style">
      <van-popup
        class="chouti"
        v-model="show"
        position="left"
        :style="{ height: '100%', width: '70%' }"
      >
        <van-row style="margin-bottom:6px">
          <van-col span="24" class="">
            <div class="signig_header">
              <i v-if="clockState" class="iconfont iconyiqiandao1 i_yi"></i>
              <i v-else class="iconfont iconweiqiandao i_wei"></i>
            </div>
          </van-col>
        </van-row>
        <van-row style="margin-bottom:6px">
          <div class="signig_header">
            <span>{{ userInfo.nickname }}</span>
          </div>
        </van-row>
        <van-cell-group class="van-cell-style">
          <van-cell
            :title="clockState ? '已签到' : '点击进行签到'"
            is-link
            style="background-color:#020f1d;color: #b4b9c0;"
            @click="postJudgeShift(clockState)"
          >
            <template #icon>
              <i class="iconfont icondaqia icon_margin"></i>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell-group class="van-cell-style">
          <van-cell
            title="总工时"
            :value="WorkProgressData.totalmanhours"
            style="background-color:#020f1d;color: #b4b9c0;"
          >
            <template #icon>
              <i class="iconfont iconzonggongshi icon_margin"></i>
            </template>
          </van-cell>
          <van-cell
            title="已完成"
            :value="WorkProgressData.Workdone"
            style="background-color:#020f1d;color: #b4b9c0;"
          >
            <template #icon>
              <i class="iconfont iconyiwancheng icon_margin"></i>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell-group class="van-cell-style">
          <van-cell
          title="修改密码"
          style="background-color:#020f1d;color: #b4b9c0;"
          is-link
          @click="topage('/change-password')"
          />
        </van-cell-group>
        <van-cell-group class="van-cell-style">
          <van-cell
            title="退出登录"
            style="background-color:#020f1d;color: #b4b9c0;"
            is-link
            @click="out"
          />
        </van-cell-group>
      </van-popup>
    </div>
    <!-- 左侧抽屉 -->
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      WorkProgressData: "",
      show: false,
      active: 0,
      // 打卡状态
      clockState: false,
      // 用户信息
      userInfo: {
        nickname: "",
      },
      // 当前班次
      nowJudgeShift: "",
    };
  },
  methods: {
    // 打开左边栏
    onClickLeft() {
      let that = this;
      (async function getAddRouters() {
        let getUserData = await that.$http.getUser();
        let judgeClockState = await that.$http.judgeClock();
        let WorkProgress = await that.$http.getNursingWorkProgress({
          type: "today",
        });
        that.userInfo = getUserData.data;
        that.clockState = judgeClockState.data;
        that.WorkProgressData = WorkProgress.data;
        that.show = true;
      })();
    },
    // 判断班次
    postJudgeShift(clockState) {
      if (!clockState)
        this.$http.judgeShift().then((res) => {
          let flage = res.data;
          Dialog.confirm({
            title: "确认班次",
            message: `当前为${
              flage === "day" ? "白班" : flage === "middle" ? "中班" : "夜班"
            }打卡，是否继续？`,
          })
            .then(() => {
              // 打卡
              this.$http.insertClock({ shift: flage }).then((res) => {
                this.$globalMethod.ifTips(res.data);
              });
            })
            .catch(() => {
              // on cancel
            });
        });
    },
    topage(path) {
      this.$router.push(path);
    },
    // 退出登录
    out() {
      Dialog.confirm({
        title: "退出登录",
        message: "即将退出登录，是否继续？",
      })
        .then(() => {
          this.$http.removeUser().then((res) => {
            this.$router.push({ path: "/login" });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style>
.popup_style .van-grid-item__content {
  background-color: #03152a;
  color: #b4b9c0;
}
.layout .van-nav-bar--fixed,
.home .van-tabbar--fixed {
  position: relative;
}
.layout .van-tabbar {
  z-index: 3;
}
</style>
<style scoped>
.view_main {
  position: absolute;
  height: calc(100% - 96px);
  width: 100%;
  top: 46px;
}
.chouti {
  padding-top: 40px;
  background-color: #03152a;
  color: #b4b9c0;
}
.van-cell-style {
  margin-bottom: 12px;
}
.signig_header {
  text-align: center;
}
.signig_header > i {
  font-size: 54px;
}
.i_wei {
  /* color: #ff976a; */
}
.i_yi {
  color: #07c160;
}
.icon_margin {
  margin-right: 6px;
}
</style>

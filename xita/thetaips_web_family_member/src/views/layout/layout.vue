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
        长者服务查看
      </van-tabbar-item>
      <van-tabbar-item to="/public-service" icon="friends-o">
        公共服务查看
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
            <span>{{ userInfo.account }}</span>
          </div>
        </van-row>
        <van-cell-group class="van-cell-style">
          <van-cell
            title="已完成"
            value="12时30分"
            style="background-color:#020f1d;color: #b4b9c0;"
          >
            <template #icon>
              <i class="iconfont iconyiwancheng icon_margin"></i>
            </template>
          </van-cell>
          <van-cell
            title="不合格"
            value="12时30分"
            style="background-color:#020f1d;color: #b4b9c0;"
          >
            <template #icon>
              <i class="iconfont iconbuhegechanpin icon_margin"></i>
            </template>
          </van-cell>
          <van-cell
            title="已审批"
            value="12时30分"
            style="background-color:#020f1d;color: #b4b9c0;"
          >
            <template #icon>
              <i class="iconfont iconyishenpi icon_margin"></i>
            </template>
          </van-cell>
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
      show: false,
      active: 0,
      // 打卡状态
      clockState: false,
      // 用户信息
      userInfo: {
        account: "",
      },
      // 当前班次
      nowJudgeShift: "",
    };
  },
  methods: {
    // 打开左边栏
    onClickLeft() {
      this.$http.getUser().then((res) => {
        console.log(res.data);
        this.show = true;
      });
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

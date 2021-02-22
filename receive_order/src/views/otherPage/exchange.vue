<template>
  <!-- 兑换收益 -->
  <div class="exchange">
    <van-nav-bar
      left-text="兑换收益"
      fixed
      :placeholder="true"
      style="background-color: rgba(0, 0, 0, 0)"
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <div class="exchange_tips">
      <p>兑换方式：收益时间兑换养老服务</p>
      <p>兑换比例：1分钟收益时间 = 3分钟养老服务</p>
      <p>(8小时收益起步)</p>
    </div>
    <div class="exchange_num">
      <p class="exchange_num_title">兑换数额</p>
      <van-field
        v-model="exchange_num"
        label="分钟"
        placeholder="请输入"
        @touchstart.native.stop="show = true"
      />
      <van-number-keyboard
        v-model="exchange_num"
        :show="show"
        theme="custom"
        extra-key="."
        close-button-text="完成"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exchange_num: "",
      show: true,
    };
  },
  methods: {
    onInput() {},
    onDelete() {},
  },
};
</script>

<style scoped>
.exchange {
  height: 100%;
  position: relative;
}
.exchange_num {
  width: calc(100% - 32px);
  height: calc(70% - 24px);
  background-color: #fff;
  padding: 24px 16px 0 16px;
  position: absolute;
  bottom: 0;
  border-radius: 20px 20px 0 0;
}
.exchange_tips {
  padding-left: 40px;
  padding-top: 24px;
  color: #646566;
  font-size: 12px;
}
.exchange_tips > p {
  margin-bottom: 8px;
}
.exchange_num_title {
  font-size: 16px;
  color: #646566;
}
</style>

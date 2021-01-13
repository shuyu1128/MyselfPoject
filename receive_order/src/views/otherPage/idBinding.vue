<template>
  <!-- 身份绑定 -->
  <div class="id_binding">
    <van-nav-bar
      left-text="身份绑定"
      fixed
      :placeholder="true"
      style="background-color:rgba(0,0,0,0)"
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="submitForm.fullname"
        name="fullname"
        disabled
        label="姓名"
      />
      <van-field
        v-model="submitForm.phone"
        name="phone"
        label="手机号"
        placeholder="请输入"
        :rules="[
          { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确手机号' },
        ]"
      />
      <van-field
        v-model="submitForm.idcard"
        name="idcard"
        disabled
        label="身份证号"
      />
      <van-field
        rows="2"
        v-model="submitForm.address"
        type="textarea"
        name="address"
        label="住址"
        placeholder="请输入"
        :rules="[{ required: true, message: '请填写住址' }]"
      />
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">
          绑 定
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      submitForm: {
        // 姓名
        fullname: "",
        // 手机号
        phone: "",
        // 身份证号
        idcard: "",
        // 住址
        address: "",
      },
    };
  },
  created() {
    //   获取账号信息
    this.$http.getUser().then((res) => {
      this.submitForm = res.data;
    });
  },
  methods: {
    onSubmit(values) {
      Dialog.confirm({
        title: "提示",
        message: "即将修改身份信息，是否继续？",
      })
        .then(() => {
          this.$http.updateReceivingUser(values).then((res) => {
            this.$globalMethod.ifTips(res.data);
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.id_binding {
  height: 100%;
  background-color: #fff;
}
</style>

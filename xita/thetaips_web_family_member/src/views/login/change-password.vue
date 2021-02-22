<template>
  <!-- 修改账户密码 -->
  <div class="id_binding">
    <van-nav-bar
      left-text="修改账户密码"
      fixed
      :placeholder="true"
      style="background-color:rgba(0,0,0,0)"
      left-arrow
      @click-left="$router.go(-1)"
    >
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="submitForm.account"
        name="account"
        disabled
        label="账号"
      />
      <van-field
        v-model="submitForm.oldPassword"
        name="oldPassword"
        label="原密码"
        placeholder="请输入"
        :rules="[{ required: true, message: '请输入原密码' }]"
      />
      <van-field
        v-model="submitForm.newPassword"
        name="newPassword"
        label="新密码"
        :rules="[
          {
            pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,20})$/,
            message: '密码格式为6到20位字符必须包含字母和数字',
          },
        ]"
        placeholder="请输入"
      />
      <van-field
        v-model="submitForm.againpassword"
        name="againpassword"
        label="确认密码"
        placeholder="请输入"
        :rules="[{ validator, message: '请确认两次密码输入一致' }]"
      />
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">
          确 定 修 改
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
        account: "",
        oldPassword: "",
        newPassword: "",
        againpassword: "",
      },
    };
  },
  created() {
    //   获取账号信息
    this.$http.getUser().then((res) => {
      this.submitForm.account = res.data.account;
    });
  },
  methods: {
    //   确认密码验证
    validator(val) {
      return val == this.submitForm.newPassword;
    },
    onSubmit(values) {
      Dialog.confirm({
        title: "提示",
        message: "即将修改密码，是否继续？",
      })
        .then(() => {
          this.$http.updateReceivingUserPassword(values).then((res) => {
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

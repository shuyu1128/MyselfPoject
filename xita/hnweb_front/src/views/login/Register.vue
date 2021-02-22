<template>
  <div style="width:100%;height:72%;">
    <div class="we"></div>
    <div
      style="colror:#888888;font-size: 16px;margin: 0 auto;width:80%;text-align: left;margin-top: 5px;margin-bottom: 5px;"
    >账号</div>
    <div class="l2">
      <input
        maxlength="16"
        type="text"
        class="username"
        id="username"
        v-model="loginForm.username"
        placeholder="请输入用户名"
      />
    </div>
    <div
      style="colror:#888888;font-size: 16px;margin: 0 auto;width:80%;text-align: left;margin-top: 5px;margin-bottom: 5px;"
    >真实姓名</div>
    <div class="l2">
      <input
        maxlength="16"
        type="text"
        class="username"
        id="username"
        v-model="loginForm.nickname"
        placeholder="请输入真实姓名"
      />
    </div>
    <div
      style="colror:#888888;font-size: 16px;margin: 0 auto;width:80%;text-align: left;margin-top: 5px;margin-bottom: 5px;"
    >密码</div>
    <div class="l3">
      <input
        maxlength="16"
        type="text"
        class="password"
        id="password"
        v-model="loginForm.password"
        placeholder="请输入密码"
      />
    </div>
    <div
      style="colror:#888888;font-size: 16px;margin: 0 auto;width:80%;text-align: left;margin-top: 5px;margin-bottom: 5px;"
    >确认密码</div>
    <div class="l3">
      <input
        maxlength="16"
        type="text"
        class="password"
        id="password"
        v-model="surepassword"
        placeholder="请输入密码"
      />
    </div>
    <div
      style="colror:#888888;font-size: 16px;margin: 0 auto;width:80%;text-align: left;margin-top: 5px;margin-bottom: 5px;"
    >邀请码</div>
    <div class="l5">
      <input
        maxlength="6"
        type="text"
        class="invitation"
        v-model="Invitationcode"
        id="invitation"
        placeholder="邀请码由管理员统一发放"
      />
    </div>
    <div class="l6">
      <div>
        <button @click="login" style="margin-right: 80px;">注册</button>
      </div>
    </div>
    <div class="contact">如无邀请码，请联系管理员</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      surepassword: "",
      loginForm: {
        username: "",
        password: "",
        nickname: ""
      },
      Invitationcode: "",
      userToken: ""
    };
  },
  created() {},
  destroyed() {},
  methods: {
    login() {
      let usernamerule = /^[a-zA-Z0-9_-]{4,16}$/;
      let passwordrule = /^[a-zA-Z0-9_-]{4,16}$/;
      let nicknamerule = /^[a-zA-Z\u4E00-\u9FA5]{2,6}$/;
      if (!usernamerule.test(this.loginForm.username)) {
        this.$message({
          showClose: true,
          message: "账号格式为4到16位（字母，数字，下划线，减号）！",
          type: "error"
        });
      } else if (!nicknamerule.test(this.loginForm.nickname)) {
        this.$message({
          showClose: true,
          message: "真实姓名格式为2到8位（汉字，字母）！",
          type: "error"
        });
      } else if (!passwordrule.test(this.loginForm.password)) {
        this.$message({
          showClose: true,
          message: "密码格式为4到16位（字母，数字，下划线，减号）！",
          type: "error"
        });
      } else if (this.loginForm.password != this.surepassword) {
        this.$message({
          showClose: true,
          message: "请确认两次密码一致！",
          type: "error"
        });
      } else if (this.Invitationcode === "") {
        this.$message({
          showClose: true,
          message: "请输入邀请码",
          type: "error"
        });
      } else if (this.loginForm.nickname === "") {
        this.$message({
          showClose: true,
          message: "请输入真实姓名",
          type: "error"
        });
      } else {
        this.$ajax
          .post(
            process.env.API_HOST + "login/register",
            `username=${this.loginForm.username}&password=${this.loginForm.password}&Invitationcode=${this.Invitationcode}&nickname=${this.loginForm.nickname}`
          )
          .then(response => {
            if (response.data.status === "success") {
              this.$message({
                showClose: true,
                message: "注册成功",
                type: "success"
              });
              this.$router.push({ path: "/" });
            } else {
              this.$message({
                showClose: true,
                message: response.data.message,
                type: "error"
              });
            }
          })
      }
    }
  }
};
</script>
<style scoped>
.we {
  height: 3%;
  font-size: 35px;
  text-align: left;
  line-height: 100px;
  width: 80%;
  margin: 0 auto;
}
</style>




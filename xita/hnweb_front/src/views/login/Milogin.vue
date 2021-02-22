<template>
  <div style="width:100%;height:100%;">
    <div class="we">欢迎回来!请登录</div>
    <div
      style="colror:#888888;font-size: 16px;margin: 0 auto;width:80%;text-align: left;margin-top: 5px;margin-bottom: 5px;"
    >账号</div>
    <div class="l2">
      <input
        maxlength="16"
        v-on:keyup.13="login"
        type="text"
        class="username"
        id="username"
        v-model="loginForm.username"
        placeholder="请输入用户名"
      />
    </div>
    <div
      style="colror:#888888;font-size: 16px;margin: 0 auto;width:80%;text-align: left;margin-top: 5px;margin-bottom: 5px;"
    >密码</div>
    <div class="l3">
      <input
        maxlength="16"
        v-on:keyup.13="login"
        type="password"
        class="password"
        id="password"
        v-model="loginForm.password"
        placeholder="请输入密码"
      />
    </div>
    <div
      style="colror:#888888;font-size: 16px;margin: 0 auto;width:80%;text-align: left;margin-top: 5px;margin-bottom: 5px;"
    >验证码</div>
    <div class="l5">
      <div>
        <input
          maxlength="4"
          type="text"
          v-model="loginForm.zhencode"
          v-on:keyup.13="login"
          class="code"
        />
      </div>
      <div class="givcode" style="line-height:36px;overflow: hidden;" @click="geicode">{{vcText}}</div>
    </div>
    <div class="l6">
      <div>
        <el-checkbox v-model="$store.state.loginif">记住登录</el-checkbox>
      </div>
      <div>
        <button class="loginbutton" @click="login">登录</button>
      </div>
    </div>
    <div class="contact">如您忘记密码，请联系管理员</div>
  </div>
</template>
<script>
import debounce from "../../components/utils.js";
export default {
  data() {
    return {
      loginif: true,
      total: 0,
      code: {
        vcText: "",
        vcid: ""
      },
      vcText: "点击获取验证码",
      loginForm: {
        username: "",
        password: "",
        zhencode: ""
      },
      userToken: ""
    };
  },
  created() {},
  destroyed() {},
  methods: {
    login() {
      debounce(() => {
        let that = this;
        let usernamerule = /^[a-zA-Z0-9_-]{4,16}$/;
        let passwordrule = /^[a-zA-Z0-9_-]{4,16}$/;
        if (!usernamerule.test(this.loginForm.username)) {
          this.$message({
            showClose: true,
            message: "账号格式为4到16位（字母，数字，下划线，减号）！",
            type: "error"
          });
        } else if (this.loginForm.password === "") {
          this.$message({
            showClose: true,
            message: "密码不能为空！",
            type: "error"
          });
        } else if (this.loginForm.zhencode === "") {
          this.$message({
            showClose: true,
            message: "请输入验证码",
            type: "error"
          });
          return false;
        } else if (
          this.loginForm.zhencode.toUpperCase() !=
          this.code.vcText.toUpperCase()
        ) {
          this.$message({
            showClose: true,
            message: "请输入正确验证码",
            type: "error"
          });
        } else {
          this.$ajax
            .post(
              process.env.API_HOST + "/login/doLogin",
              `username=${this.loginForm.username}&password=${this.loginForm.password}&vcid=${this.code.vcid}&vcText=${this.loginForm.zhencode}`
            )
            .then(response => {
              if (response.data.state === "success") {
                that.$store
                  .dispatch("setToken", response.data.user.id)
                  .then(() => {
                    that.$router.push({ path: "/" });
                  })
                  .catch(res => {
                    that.$message({
                      showClose: true,
                      message: res,
                      type: "error"
                    });
                  });
              } else {
                this.$message.error(response.data.message)
              }
            })
        }
      }, 500);
    },
    geicode() {
      if (this.total == 0) {
        this.$ajax
          .post(process.env.API_HOST + "/login/getValidateCode")
          .then(response => {
            this.code = response.data;
            this.total = 30;
            let totaltime = setInterval(() => {
              this.total--;
              this.vcText = `${response.data.vcText}  请${this.total}s后重试`;
              if (this.total == 0) {
                clearInterval(totaltime);
                this.vcText = response.data.vcText;
              }
            }, 1000);
          })
      } else {
        this.$message.error(`请${this.total}秒后重试`);
      }
    }
  }
};
</script>
<style scoped>
</style>



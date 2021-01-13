<template>
  <div class="login">
    <div class="welcome">
      <img src="../../assets/welcome.png" />
    </div>
    <div class="login-form">
      <div class="login-inp">
        <label>账户</label>
        <input v-model="loginForm.username" type="text" placeholder />
      </div>
      <div class="login-inp">
        <label>密码</label>
        <input v-model="loginForm.password" type="password" placeholder />
      </div>
      <div class="login-inp" @click="login">
        <a href="#">立即登录</a>
      </div>
    </div>
    <div class="login-txt">
      <a href="#">管理员</a>|
      <a href="#">忘记密码？</a>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  created() {},
  methods: {
    login() {
      if (this.loginForm.username != "" && this.loginForm.password != "") {
        this.$http.doLogin(this.loginForm).then((res) => {
          if (this.$globalMethod.ifTips(res.data))
            this.$router.push({ path: "/" });
        });
      } else {
        Notify({ type: "warning", message: "账户或密码不能为空!" });
      }
    },
  },
};
</script>

<style>
@charset "utf-8";
html,
body,
div,
p,
form,
label,
ul,
li,
dl,
dt,
dd,
ol,
img,
button,
b,
em,
strong,
small,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
  border: 0;
  list-style: none;
  font-style: normal;
}
body {
  font-size: 14px;
  color: #333;
  background: #f2f2f2;
}
a,
a.link {
  color: #666;
  text-decoration: none;
  font-weight: 500;
}
a,
a.link:hover {
  color: #666;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}
</style>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/login-bg.png) no-repeat;
  background-size: cover;
  position: fixed;
}
.welcome {
  width: 100%;
  margin: 25% 0;
}
.welcome img {
  width: 100%;
}
.login-inp {
  margin: 0 30px 15px 30px;
  border: 1px solid #fff;
  border-radius: 25px;
}
.login-inp label {
  width: 4em;
  text-align: center;
  display: inline-block;
  color: #fff;
}
.login-inp input {
  width: 60%;
  line-height: 40px;
  color: #fff;
  background-color: transparent;
  border: none;
  outline: none;
}
.login-inp a {
  display: block;
  width: 100%;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  letter-spacing: 5px;
}
.login-txt {
  text-align: center;
  color: #fff;
}
.login-txt a {
  color: #fff;
  padding: 0 5px;
}
</style>

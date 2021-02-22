<template>
  <div>
    <!-- 关于我们对话框 -->
    <el-dialog title="关于我们" :visible.sync="aboutVisible" width="70%">
      <div></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="aboutVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 关于我们对话框 -->
    <!-- 基本资料修改对话框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogInformationFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        v-if="dialogInformationFormVisible"
        :model="InformationForm"
        :rules="InformationFormRules"
        ref="ruleForm"
      >
        <el-form-item label="原密码" prop="oldpassword">
          <el-input v-model="InformationForm.oldpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="InformationForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInformationFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeInformationForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 基本资料修改对话框 -->
    <el-header id="header">
      <span class="hideAside" @click="collapse">
        <i class="fa fa-indent fa-lg"></i>
      </span>
      <ul class="personal">
        <li class="fullScreen" @click="fullScreen">
          <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
            <i class="fa fa-arrows-alt fa-lg layout-step1"></i>
          </el-tooltip>
        </li>
        <!-- <li>
          <langSelect></langSelect>
        </li>-->
        <!-- <el-tooltip class="item" effect="dark" content="打开工单管理" placement="top-start">
      <li @click="wailian" style="cursor:pointer;">希塔OA</li>
        </el-tooltip>-->
        <el-tooltip class="item" effect="dark" content="打开并查看关于我们" placement="top-start">
          <li @click="aboutVisible=true" style="cursor:pointer;">关于</li>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="开启一键入院模式" placement="top-start">
          <li @click="inhospital" style="cursor:pointer;">
            <span class="layout-step2">一键入院</span>
          </li>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="开启功能向导模式" placement="top-start">
          <li @click="openIntorJs" style="cursor:pointer;">
            <span class="layout-step4">功能向导</span>
          </li>
        </el-tooltip>
        <li>{{ this.$store.getters.info.role }}</li>
        <li>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link layout-step3">
              {{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="information">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <!-- <li class="icon"><img :src="avatar"/></li> -->
      </ul>
    </el-header>
    <tabNav></tabNav>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import langSelect from "../../../components/lang/langSelect";
import tabNav from "./tabNav";

// sessionStorage.setItem('aa',a)
export default {
  name: "Header",
  components: { tabNav, langSelect },
  data() {
    return {
      // 修改密码表单
      InformationForm: {
        userId: this.$store.state.token,
        password: "",
        oldpassword: "",
      },
      // 修改密码表单验证规则
      InformationFormRules: {
        password: [
          { required: true, message: "请输入新密码！", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur",
          },
        ],
        oldpassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      // 修改密码弹窗
      dialogInformationFormVisible: false,
      aboutVisible: false,
      isfullScreen: true,
      // avatar: './static/images/icon.jpg'
    };
  },
  created() {
    this.$store.dispatch("getuserinfo");
  },
  computed: {
    username() {
      return this.$store.state.userinfo.nickname;
    },
  },
  methods: {
    // 修改密码
    changeInformationForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$functionarrs
            .login_changePassword(
              this.InformationForm.userId,
              this.InformationForm.password,
              this.InformationForm.oldpassword
            )
            .then((res) => {
              if (res.status === "success") {
                this.$message.success(res.message);
                this.dialogInformationFormVisible = false;
              } else {
                this.$message.error(res.message);
              }
            });
        } else {
          return false;
        }
      });
    },
    // 打开一键入院
    inhospital() {
      if (!this.$store.state.hospitalshow) {
        this.$store.commit("sethospitalshow");
        this.$router.push("filterTable");
      } else {
        this.$message({
          message: "您已开启一键入院",
          type: "warning",
        });
      }
    },
    // 开启功能向导模式
    openIntorJs() {
      this.$store.commit("startIntro");
    },
    wailian() {
      window.open("http://www.baidu.com");
    },
    collapse() {
      this.$store.dispatch("collapse");
    },
    fullScreen() {
      if (this.isfullScreen) {
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
        this.isfullScreen = false;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        this.isfullScreen = true;
      }
    },
    handleCommand(command) {
      if (command === "logout") {
        Cookies.remove("token");
        location.reload();
      } else if (command === "information") {
        this.InformationForm = {
          userId: this.$store.state.token,
          password: "",
          oldpassword: "",
        };
        this.dialogInformationFormVisible = true;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
%w100 {
  width: 100%;
}

%h100 {
  height: 100%;
}

%cursor {
  cursor: pointer;
}

html,
body,
#app,
.el-container,
#asideNav,
ul.el-menu {
  @extend %h100;
}

@mixin set-value($side, $value) {
  @each $prop in $leftright {
    #{$side}-#{$prop}: $value;
  }
}

#header {
  max-height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  .hideAside {
    @extend %cursor;
  }
  .personal {
    display: flex;
    flex-direction: row;
    li {
      @include set-value(margin, 13px);
      font-size: 12px;
    }
    .fullScreen {
      @extend %cursor;
    }
    .el-dropdown-link {
      @extend %cursor;
    }
    .icon img {
      margin-#{$top}: 7px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>

<template>
  <div id="loyout">
    <el-container>
      <layoutAside></layoutAside>
      <el-container>
        <layoutHeader></layoutHeader>
        <el-main id="elmain">
          <transition name="main" mode="out-in">
            <div v-drag v-if="this.$store.state.hospitalshow" class="hospital">
              <i class="locs el-icon-circle-close" @click="locs"></i>
              <el-steps
                style="z-index:2019"
                :active="this.$store.state.actives"
                direction="vertical"
              >
                <el-step title="创建长者" description="请点击【添加】按钮"></el-step>
                <el-step title="入院测评" description="答题最后需保存"></el-step>
                <el-step title="护理方案" description="请编写护理方案"></el-step>
                <el-step title="个人信息" description="请录入个人信息后，点击【对号】保存"></el-step>
                <el-step title="在院信息" description="请录入在院信息后，点击【对号】保存"></el-step>
                <el-step title="智能设备" description="请勾选智能设备，点击【对号】保存"></el-step>
                <el-step title="电子围栏" description="请勾选电子围栏方案组，点击【对号】保存"></el-step>
              </el-steps>
            </div>
          </transition>
          <transition name="main" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer>
          <Bottom></Bottom>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutAside from "./aside/aside";
import layoutHeader from "./header/header";
import Bottom from "./Footer/bottom";
import langSelect from "../../components/lang/langSelect";

export default {
  name: "dc-home",
  components: {
    layoutHeader,
    Bottom,
    langSelect,
    layoutAside
  },
  data() {
    return {
      active: 0
    };
  },
  directives: {
    drag(el, bindings) {
      el.onmousedown = function(e) {
        var disx = e.pageX - el.offsetLeft;
        var disy = e.pageY - el.offsetTop;
        document.onmousemove = function(e) {
          el.style.left = e.pageX - disx + "px";
          el.style.top = e.pageY - disy + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = document.onmouseup = null;
        };
      };
    }
  },
  created() {},
  mounted() {
    // 判断是否初次登录
    this.$functionarrs
      .login_getAllowLoginByUserId(this.$store.state.token)
      .then(data => {
        if (data.first) {
          this.indexIntro();
        }
      });
  },
  methods: {
    indexIntro() {
      let intro = introJs();
      intro
        .setOptions({
          nextLabel: "下一步",
          skipLabel: "跳 过",
          doneLabel: "我知道了",
          exitOnOverlayClick: false,
          disableInteraction: true,
          steps: [
            {
              element: ".layout-step1",
              intro: "点击可开启全屏操作",
              position: "bottom"
            },
            {
              element: ".layout-step2",
              intro: "点击一键入院可跟随提示快速完成入院过程",
              position: "bottom"
            },
            {
              element: ".layout-step3",
              intro: "鼠标悬浮会弹出下拉退出登录，点击退出登录即可完成退出登录",
              position: "bottom"
            },
            {
              element: ".layout-step4",
              intro: "在使用过程中如有问题请点击功能向导",
              position: "bottom"
            }
          ]
        })
        .start();
    },
    locs() {
      this.$confirm("入院未完成, 是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("closehospitalshow");
          this.$store.state.actives = 0;
          this.$store.state.activeNames = "1";
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style>
.locs {
  position: absolute;
  right: 5px;
  top: 5px;
}
.hospital {
  width: 240px;
  height: 450px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f5f7fa;
  opacity: 0.8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  position: fixed;
  z-index: 2000;
}
.main-enter,
.main-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.main-enter-active {
  transition: all 0.2s;
}
.main-leave-active {
  position: absolute;
  transition: all 0.3s;
}
</style>
<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

body {
  background-color: #f2f2f2;
  font-size: 14px;
  color: #333333;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

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
#loyout,
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

#elmain {
  background-color: #f0f2f5;
}
</style>

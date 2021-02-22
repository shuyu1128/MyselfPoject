<template>
  <div class="detailsx">
    <div
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      aria-label="确认信息"
      class="el-message-box__wrapper"
      style="z-index: 2016;"
    >
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <!---->
            <span>确认信息</span>
          </div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close">
            <i class="el-message-box__close el-icon-close"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <!---->
          <div class="el-message-box__message">
            <el-checkbox-group :max="8" v-model="checkList" @change="changeChoice">
              <el-checkbox
                :checked="item.state==1?true:false"
                v-for="(item,index) in carddata"
                :key="index"
                :label="item.id"
                size="small"
                border
                style="width:110px;margin-bottom:10px"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="el-message-box__input" style="display: none;">
            <div class="el-input">
              <!---->
              <input type="text" autocomplete="off" placeholder class="el-input__inner" />
              <!---->
              <!---->
              <!---->
            </div>
            <div class="el-message-box__errormsg" style="visibility: hidden;"></div>
          </div>
        </div>
        <div class="el-message-box__btns">
          <button
            type="button"
            class="el-button el-button--default el-button--small"
            @click="close"
          >
            <!---->
            <!---->
            <span>放弃修改</span>
          </button>
          <button
            type="button"
            class="el-button el-button--default el-button--small el-button--primary"
            @click="baocun"
          >
            <!---->
            <!---->
            <span>保存</span>
          </button>
        </div>
      </div>
    </div>

    <div class="left-suo">
      <div class="fDetails-step1">
        <el-input
          size="mini"
          v-model="sousuo.name"
          placeholder="搜索长者"
          style="width: 120px;height: 16px;font-size:14px;margin-right: 5px;"
        ></el-input>
        <el-button type="primary" size="mini" @click="search" style="margin-right: 5px;">搜索</el-button>
        <router-link :to="{ path: '/filterTable'}">
          <el-button type="primary" size="mini">高级搜索</el-button>
        </router-link>
      </div>
      <div>
        <div class="test fDetails-step2">
          <div
            v-for="(item,index) in allSeniors"
            :id="item.ID"
            :key="index"
            :class="item.ID===changeid?'active-old-list':'old-list'"
            @click="changeids(item.ID)"
          >
            <li>{{item.FULLNAME}}</li>
            <li>{{item.SEX}}</li>
            <li>{{item.ROOMNAME}}</li>
          </div>
        </div>
      </div>
    </div>
    <div class="right-sou">
      <div class="basic">
        <div>
          <dl>
            <dt>
              <el-upload
                class="avatar-uploader fDetails-step3"
                :action="acturl1"
                :data="test"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </dt>
            <dd class="img_name">{{fullname}}</dd>
          </dl>
        </div>
        <div class="fDetails-step4">
          <li v-for="(item,index) in chooiscarddata" :key="index" class="kapianconte">
            <span>{{item.name}}：</span>
            <span>{{item.code!="birthdate"?(item.value!=""?item.value:'未填写'):(item.value!=""?formatTime(item.value,"Y-M-D"):'未填写')}}</span>
          </li>
        </div>
        <div>
          <p class="fDetails-step5" @click="zidingyi">
            <i class="el-icon-edit-outline"></i>
            <span>快捷信息卡内容</span>
          </p>
        </div>
      </div>

      <div style="position: relative;">
        <router-link :to="{ name: '编辑', params: { id:changeid}}">
          <el-button
            type="success"
            style="position: absolute;z-index:99;right:15px;top:6px"
            size="mini"
          >编辑</el-button>
        </router-link>
        <el-tabs v-model="$store.state.activeNames" class="tap" type="border-card">
          <el-tab-pane lazy label="个人信息" key="1" name="1">
            <div class="tap-data">
              <Wugeren :did="changeid" />
            </div>
          </el-tab-pane>
          <el-tab-pane lazy label="在院信息" key="2" name="2">
            <div class="tap-data">
              <Wzaiyuan :did="changeid" />
            </div>
          </el-tab-pane>
          <el-tab-pane lazy label="护理方案" key="3" name="3">
            <div class="tap-data">
              <Program :did="changeid" />
            </div>
          </el-tab-pane>
          <el-tab-pane lazy label="实时健康监测" key="7" name="7">
            <div class="tap-data" style="background-color:#edeff2">
              <Testing :did="changeid" />
            </div>
          </el-tab-pane>
          <el-tab-pane lazy label="历史健康档案" key="8" name="8">
            <div class="tap-data">
              <History :kapians="chooiscarddata" :did="changeid" :imageUrls="imageUrl" />
            </div>
          </el-tab-pane>
          <el-tab-pane lazy label="电子围栏" key="4" name="4">
            <div class="tap-data">
              <personalEleFence v-if="weilanshow" :did="changeid" :changeBtn="false" />
            </div>
          </el-tab-pane>
          <el-tab-pane lazy label="智能设备" key="5" name="5">
            <div class="tap-data">
              <Equipmentx v-if="showPage" :did="changeid" />
            </div>
          </el-tab-pane>
          <el-tab-pane lazy label="附件管理" key="6" name="6">
            <div class="tap-data">
              <Enclosure show="xiang" :did="changeid" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Wugeren from "./Wugeren.vue";
import Wzaiyuan from ".//Wzaiyuan.vue";
import Equipmentx from "./Equipmentx.vue";
import Testing from "./Testing.vue";
import Enclosure from "./Enclosure.vue";
import History from "./History.vue";
import personalEleFence from "./personalEleFence.vue";

import Program from "./Program";
var aapian = [];
var zhenkapan = [];
var shang;
var ji = 0;
export default {
  components: {
    Wugeren,
    Wzaiyuan,
    Equipmentx,
    Testing,
    Enclosure,
    History,
    Program,
    personalEleFence
  },
  data() {
    return {
      showPage:true,
      checkList: [],
      test: {},
      acturl1: `${process.env.API_HOST}/person/uploadFile?type=picture`,
      weilanshow: true,
      changeid: "",
      imageUrl: "",
      list: {},
      activeName: "2",
      ji: 0,
      checko: [],
      sousuo: {
        id: "",
        name: "",
        sex: "",
        roomN: "",
        state: "",
        hasDevice: ""
      }
    };
  },
  computed: {
    chooiscarddata() {
      return this.$store.state.details.chooiscarddata;
    },
    carddata() {
      return this.$store.state.details.carddata;
    },
    fullname() {
      return this.$store.state.details.fullname;
    },
    // 全部老人
    allSeniors() {
      return this.$store.state.details.allSeniors;
    }
  },
  created() {
    console.log(this.$store.state.activeNames);
    this.$store.commit("changeNowpath", "fence");
    this.$store.dispatch("startSocoket");
    this.changeid =
      this.$route.params.id == undefined
        ? this.$route.query.id
        : this.$route.params.id;

    var personid = this.changeid;
    var username = this.$store.state.token;
    var test = {
      personid,
      username
    };
    this.test = test;
    // 获取全部老人
    this.$store.dispatch("person_getPersonList", this.sousuo).then(() => {
      if (!this.$route.params.id && !this.$route.query.id) {
        console.log(this.allSeniors);
        this.changeid = this.allSeniors[0].ID;
        console.log(this.changeid);
      }
      // 获取头像
      this.$ajax
        .post(
          process.env.API_HOST + "/person/getPictureByPersonid",
          `personid=${this.changeid}`
        )
        .then(respones => {
          this.imageUrl = respones.data.fileurl;
        });
      this.$store.dispatch("changecarddata", {
        userid: this.$store.state.token,
        id: this.changeid
      });
    });
  },
  destroyed() {
    this.$store.commit("closeSocket");
  },
  beforeRouteLeave(to, form, next) {
    if (to.path !== "/Details"||this.$store.state.activeNames=="7"||this.$store.state.activeNames=="8") this.$store.state.activeNames = "1";
    next()
  },
  watch: {
    changeid(val) {
      if (val != undefined) {
        this.showPage = false;
        this.$nextTick(() => {
          this.showPage = true;
        });
        this.$store.dispatch("changecardfield", val);
        // 获取图片
        this.$ajax
          .post(
            process.env.API_HOST + "/person/getPictureByPersonid",
            `personid=${val}`
          )
          .then(respones => {
            this.imageUrl = respones.data.fileurl;
          });
      }
    }
  },
  mounted() {},
  // updated() {
  //   var ids = document.querySelectorAll(".old-list");
  //   for (var i = 0; i < ids.length; i++) {
  //     ids[i].style.backgroundColor = "#fff";
  //     if (this.changeid == ids[i].getAttribute("id")) {
  //       ids[i].style.backgroundColor = "#409EFF";
  //     }
  //   }
  // },
  methods: {
    changeids(id) {
      this.changeid = id;
      var personid = id;
      var username = this.$store.state.token;
      var test = {
        personid,
        username
      };
      this.test = test;
      this.weilanshow = false;
      setTimeout(() => {
        this.weilanshow = true;
      }, 500);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    search() {
      this.$store.dispatch("person_getPersonList", this.sousuo);
    },
    changeChoice() {
      if (this.checkList.length > 8) {
        this.checkList.pop();
        this.$message.error("只能选择八项！");
      }
    },
    baocun() {
      var el = document.querySelector(".el-message-box__wrapper");
      el.style.display = "none";
      this.$store.dispatch("person_insertUserProfileSettings", {
        settings: this.checkList,
        userid: this.$store.state.token,
        id: this.changeid
      });
    },
    close() {
      var el = document.querySelector(".el-message-box__wrapper");
      el.style.display = "none";
    },
    zidingyi() {
      // var bain=document.querySelectorAll(".bain div")
      var el = document.querySelector(".el-message-box__wrapper");
      el.style.display = "block";
    },
    formatTime(number, format) {
      let time = new Date(number);
      let newArr = [];
      let formatArr = ["Y", "M", "D", "h", "m", "s"];
      newArr.push(time.getFullYear());
      newArr.push(this.formatNumber(time.getMonth() + 1));
      newArr.push(this.formatNumber(time.getDate()));
      newArr.push(this.formatNumber(time.getHours()));
      newArr.push(this.formatNumber(time.getMinutes()));
      newArr.push(this.formatNumber(time.getSeconds()));

      for (let i in newArr) {
        format = format.replace(formatArr[i], newArr[i]);
      }
      return format;
    },
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    }
  }
};
</script>
<style>
.detailsx .el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
}
</style>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 95px;
  height: 104px;
  line-height: 104px;
  text-align: center;
}
.avatar {
  width: 95px;
  height: 104px;
  display: block;
}
.test {
  height: 677px;
  overflow-y: auto;
}
.bain {
  height: 288px;
  /* background-color: aqua; */
}
.bain div {
  padding: 3px 10px 3px 10px;
  /* background-color: red; */
  border: 1px solid #dcdfe6;
  margin-right: 14px;
  border-radius: 4px;
  margin-bottom: 8px;
  float: left;
}
.el-message-box {
  width: 630px;
}
.el-message-box__wrapper {
  background-color: rgba(0, 0, 0, 0.6);
  display: none;
}

.left-suo {
  width: 300px;
  height: 780px;
  float: left;
  margin-right: 10px;
}

.left-suo > div:first-of-type {
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  width: 280px;
  background-color: #ffffff;
  height: 65px;
  margin-bottom: 4px;
  padding-top: 35px;
  padding-left: 20px;
}
.left-suo > div:last-of-type {
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  width: 100%;
  background-color: #ffffff;
  height: 676px;
}
.right-sou {
  float: left;
  width: 1352px;
}
.basic {
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  width: 100%;
  background-color: #ffffff;
  height: 160px;
  margin-bottom: 10px;
  padding-top: 30px;
}
.basic > div {
  float: left;
  height: 100%;
}
.basic > div:first-of-type {
  width: 189px;
  /* height: 100px; */
  /* background-color: #409eff; */
}
.basic > div:first-of-type dl {
  margin-left: 45px;
}
.basic > div:first-of-type dl > dt {
  width: 95px;
  height: 104px;
  margin-bottom: 6px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.img_name{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.kapianconte {
  float: left;
  margin-right: 28px;
  margin-bottom: 20px;
  width: 142px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.basic > div:first-of-type dl > dd {
  width: 95px;
  text-align: center;
  color: #000000;
}
.basic > div:nth-of-type(2) {
  width: 566px;
  padding-right: 400px;
  height: 160px;
  overflow: hidden;
}
.basic > div:nth-of-type(2) > table {
  font-size: 13px;
  /* border: 1px solid red; */
}
.basic > div:nth-of-type(2) > table input {
  border: none;
  background-color: #ffffff;
}
.basic > div:nth-of-type(3) {
  width: 187px;
  text-align: right;
  padding-right: 1px;
  /* height: 100px; */
  /* background-color: #213252; */
}
.tap {
  background-color: #ffffff;
}
.tap-data {
  position: relative;
  height: 510px;
}
.baocun {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 999;
}
.old-list,
.active-old-list {
  width: 225px;
  height: 30px;
  /* background-color: #409eff; */
  border-bottom: 1px solid #dcdfe6;
  margin: 10px auto;
  padding-top: 15px;
  padding-left: 38px;
}
.active-old-list {
  background-color: #409eff;
}
.old-list li {
  float: left;
  color: #606266;
  margin-right: 30px;
}
.active-old-list li {
  float: left;
  color: #fff;
  margin-right: 30px;
}
.xiangqing {
  position: absolute;
  /* top:2px; */
  right: 100px;
  width: 30px;
  z-index: 99;
  text-align: center;
}
</style>



<template>
  <div class="yulan">
    <div class="plantu_newweilan">
      <div class="plantu">
        <div class="Fence-step2">
          <Map v-if="showof" :fufloorid="floorid" />
        </div>
      </div>
      <div class="newweilan Fence-step1">
        <div>
          <span style="font-size:18px;font-weight: 600;margin-left:20px;margin-right:82px">新增围栏</span>
          <span style="font-size:16px;font-weight: 400">围栏名称：</span>
          <el-input
            v-model="json.railName"
            maxlength="16"
            placeholder="请输入内容"
            style="width:160px;margin-right:20px"
            size="mini"
          ></el-input>
          <span style="font-size:16px;font-weight: 400">围栏类型：</span>
          <el-select
            v-model="json.type"
            placeholder="请选择"
            style="width:160px;margin-right:20px"
            size="mini"
            class="fenceType"
          >
            <el-option v-for="item in types" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
          <span style="font-size:16px;font-weight: 400">归属方案：</span>
          <el-select v-model="groupid" placeholder="请选择" multiple style="width:160px" size="mini">
            <el-option
              v-for="item in electronicFenceGroupData"
              :key="item.id"
              :label="item.groupname"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div v-if="json.type!=6&&json.type!=7" style="margin-top:24px;">
          <div
            class="floorread"
            style="padding-top:15px;margin-left:15px;width:140px;  text-align: center"
          >
            <span style="font-size:16px;font-weight: 400">设置楼层：</span>
            <br />
            <el-cascader
              v-model="ZMetre"
              :options="bulid"
              @change="handleChange"
              style="width:110px"
              size="mini"
            ></el-cascader>
          </div>
          <div style="width:720px;padding-top:10px;" class="cengread">
            <div style="margin-bottom:12px;">
              <span style="font-size:16px;font-weight: 400;margin-right:10px;">点一坐标</span>
              <span style="font-size:16px;font-weight: 400">X：</span>
              <el-input
                v-model="json.XLeftBMetre"
                placeholder="请输入内容"
                style="width:140px;"
                size="mini"
                id="dian1x"
              ></el-input>
              <span style="font-size:16px;font-weight: 400">Y：</span>
              <el-input
                v-model="json.YLeftBMetre"
                placeholder="请输入内容"
                style="width:140px;margin-right:20px"
                size="mini"
              ></el-input>
              <span style="font-size:16px;font-weight: 400" v-show="theDur">持续时间：</span>
              <el-input
                v-model="json.duration"
                placeholder="单位分钟"
                style="width:160px;margin-right:20px"
                size="mini"
                v-show="theDur"
              ></el-input>
              <span style="font-size:16px;font-weight: 400" v-show="theDur2">开始时间：</span>
              <el-time-picker
                style="width:160px;margin-right:20px"
                size="mini"
                v-model="BeiginT"
                v-show="theDur2"
                placeholder="任意时间点"
              ></el-time-picker>
              <span style="font-size:16px;font-weight: 400" v-show="showdirection">方向：</span>
              <el-select
                v-model="json.direction"
                v-show="showdirection"
                placeholder="请选择"
                style="width:160px"
                size="mini"
              >
                <el-option
                  v-for="item in directions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <span style="font-size:16px;font-weight: 400;margin-right:10px;">点二坐标</span>
              <span style="font-size:16px;font-weight: 400">X：</span>
              <el-input
                v-model="json.XRightTMetre"
                placeholder="请输入内容"
                style="width:140px;"
                size="mini"
                class="dian2x"
              ></el-input>
              <span style="font-size:16px;font-weight: 400">Y：</span>
              <el-input
                v-model="json.YRightTMetre"
                placeholder="请输入内容"
                style="width:140px;margin-right:20px"
                size="mini"
              ></el-input>
              <span style="font-size:16px;font-weight: 400" v-show="theSen">灵敏度：&nbsp&nbsp&nbsp&nbsp</span>
              <el-input
                v-model="json.Sensitivity"
                placeholder="请输入内容"
                style="width:160px;margin-right:20px"
                size="mini"
                v-show="theSen"
              ></el-input>
              <span style="font-size:16px;font-weight: 400" v-show="theSen2">结束时间：</span>

              <el-time-picker
                style="width:160px;margin-right:20px"
                size="mini"
                v-model="EndT"
                v-show="theSen2"
                placeholder="任意时间点"
              ></el-time-picker>
              <!-- 
              <el-input
                v-model="EndT"
                placeholder="请输入内容"
                style="width:160px;margin-right:20px"
                size="mini"
                v-show="theSen2"
              ></el-input>-->
            </div>
          </div>
          <div class="btn">
            <el-button-group style="margin-top:25px;margin-right:1px;" v-if="show">
              <el-button size="mini" type="primary" @click="cancelPreview">取消</el-button>
              <el-button size="mini" type="primary" @click="newadd">确定</el-button>
            </el-button-group>

            <button class="newbtn" v-else @click="yulan">预览</button>
          </div>
        </div>
        <div v-else style="margin-top:24px;">
          <div class="Singlepoint_content">
            <span style="font-size:16px;font-weight: 400">选择基站：</span>
            <el-cascader
              v-model="basestationid"
              :options="basestationdata"
              @change="handleChange"
              style="width:150px"
              :props="basestationprops"
              size="mini"
            ></el-cascader>
          </div>
          <div class="Singlepoint_content">
            <span style="font-size:16px;font-weight: 400">信号强度级别：</span>
            <el-select
              size="mini"
              style="width:150px"
              v-model="json.signallevelid"
              placeholder="请选择"
            >
              <el-option
                v-for="item in signalleveldata"
                :key="item.value"
                :label="item.basname"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="Singlepoint_content">
            <span style="font-size:16px;font-weight: 400">灵敏度：&nbsp&nbsp&nbsp&nbsp</span>
            <el-select
              size="mini"
              style="width:150px"
              v-model="json.sensitivitylevel"
              placeholder="请选择"
            >
              <el-option
                v-for="item in sensitivityleveldata"
                :key="item.bascode"
                :label="item.basname"
                :value="item.bascode"
              ></el-option>
            </el-select>
            <div style="margin-top: 26px;padding-left: 68px;">
              <el-radio v-model="json.alarmmode" label="0">滤波前</el-radio>
              <el-radio v-model="json.alarmmode" label="1">滤波后</el-radio>
            </div>
          </div>
          <div style="margin-left: 20px;" class="btn">
            <el-button-group style="margin-top:25px;margin-right:1px;" v-if="show">
              <el-button size="mini" type="primary" @click="show=false">取消</el-button>
              <el-button size="mini" type="primary" @click="newadd2">确定</el-button>
            </el-button-group>

            <button class="newbtn" v-else @click="yulan2">预览</button>
          </div>
        </div>
      </div>
    </div>
    <div class="zu_table">
      <div class="zu Fence-step3">
        <h2 style="margin-left:30px">围栏组方案管理</h2>
        <Grop v-if="showof" />
      </div>
      <div class="zutable Fence-step4">
        <h2 style="margin-left:30px">围栏方案管理</h2>
        <Table v-if="showof" />
      </div>
    </div>
  </div>
</template>
<script>
// import Map from "../newmonitor/Lt/Map.vue";
// import Map from "./Wmonitor.vue";
import Map from "../table/Grenmap.vue";
import Grop from "./Grop.vue";
import Table from "./Table.vue";
import { mapState } from "vuex";
export default {
  components: {
    Map,
    Grop,
    Table
  },
  data() {
    return {
      // 选择框选中的楼层id
      floorid: "",
      // 可输入最大数值
      Xmax: 0,
      Ymax: 0,
      // 校验参数
      zhengze: false,
      zhengze1: false,
      zhengze2: false,
      zhengze3: false,
      zhengze4: false,
      theDur: false,
      theDur2: false,
      theSen: false,
      theSen2: false,
      showdirection: false,
      show: false,
      showof: true,
      // 电子围栏画图数据
      chdata: [],
      // 信号值画图数据
      circulardata: [],
      groupids: [],
      bulid: [],
      signalleveldata: [],
      sensitivityleveldata: [],
      basestationdata: [],
      basestationprops: {
        children: "child",
        label: "name",
        value: "id"
      },
      basestationid: [],
      types: [
        { id: 1, value: "禁入" },
        { id: 2, value: "计时禁入" },
        { id: 5, value: "分时段禁入" },
        { id: 3, value: "禁出" },
        { id: 4, value: "预警" },
        { id: 6, value: "单点禁入" },
        { id: 7, value: "单点禁出" }
      ],
      directions: [
        { name: "从上到下", value: "1" },
        { name: "从下到上", value: "2" },
        { name: "从左到右", value: "3" },
        { name: "从右到左", value: "4" }
      ],
      ZMetre: [],
      json: {
        type: "",
        railName: "",
        XLeftBMetre: "",
        YLeftBMetre: "",
        XRightTMetre: "",
        YRightTMetre: "",
        duration: "",
        Sensitivity: "",
        BeiginTime: null,
        EndTime: null,
        direction: "",
        signallevelid: "",
        sensitivitylevel: "",
        alarmmode: "0"
      },
      BeiginT: "",
      EndT: "",
      groupid: []
    };
  },
  computed: {
    ...mapState({
      // 全部电子围栏组
      electronicFenceGroupData: state => state.details.electronicFenceGroupData,
      // 全部建筑、楼层、房间信息
      allBuildsData: state => state.websocket.allBuildsData
    })
  },
  created() {
    // 获取全部建筑结构
    this.$ajax
      .post(process.env.API_HOST + "/room/getNursingHomesTree")
      .then(respones => {
        this.bulid = respones.data;
      });
    // 通过类型获取基本信息数据
    this.$functionarrs.basic_getBasDataByType("signalLevel").then(data => {
      this.signalleveldata = data;
    });
    this.$functionarrs.basic_getBasDataByType("sensitivityLevel").then(data => {
      this.sensitivityleveldata = data;
    });
    // 获取基站位置树
    this.$functionarrs.rail_getBasestationTree().then(data => {
      this.basestationdata = data;
    });
  },
  destroyed() {
    this.$store.state.fence = [];
  },
  watch: {
    BeiginT(val) {
      if (val != null) {
        let temes = val + "1";
        this.json.BeiginTime = temes.substr(temes.length - 27, 8);
      } else {
        this.json.BeiginTime = null;
      }
    },
    EndT(val) {
      if (val != null) {
        let temes = val + "1";
        this.json.EndTime = temes.substr(temes.length - 27, 8);
      } else {
        this.json.EndTime = null;
      }
    },
    json: {
      handler(newName, oldName) {
        if (newName.BeiginTime != "") {
          let temes = newName.BeiginTime + "1";
        }
        if (newName.type == "2") {
          this.theDur = true;
          this.theSen = true;
          this.theDur2 = false;
          this.theSen2 = false;
          this.showdirection = false;
        } else if (newName.type == "5") {
          this.theDur2 = true;
          this.theSen2 = true;
          this.theDur = false;
          this.theSen = false;
          this.showdirection = false;
        } else if (newName.type == "4") {
          this.theDur2 = false;
          this.theSen2 = false;
          this.theDur = false;
          this.theSen = false;
          this.showdirection = true;
        } else {
          this.theDur = false;
          this.theSen = false;
          this.theDur2 = false;
          this.theSen2 = false;
          this.showdirection = false;
        }
        this.show = false;
      },
      deep: true
    }
  },
  methods: {
    // 获取当前楼层信息
    getFloorData(floorid) {
      let arr = this.allBuildsData;
      let obj = {
        x: 0,
        y: 0
      };
      for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr[i].loushu.length; k++) {
          if (arr[i].loushu[k].floorId == floorid) {
            obj.x = arr[i].loushu[k].X;
            obj.y = arr[i].loushu[k].Y;
            break;
          }
        }
      }
      return obj;
    },
    // 取消预览
    cancelPreview() {
      this.show = false;
      this.$store.commit("updataDrewRailList", []);
    },
    yulan() {
      let railName = /^[a-zA-Z0-9\u4E00-\u9FA5_-]{1,16}$/;
      let BMetre = /^[0-9]\d*\,\d*|[0-9]\d*$/;
      let duration = /^[0-9]{1,16}$/;
      let Sensitivity = /^100$|^(\d|[1-9]\d)$/;
      if (!railName.test(this.json.railName)) {
        this.$message({
          showClose: true,
          message: "围栏名称格式为1到16位（汉字，字母，数字，下划线，减号）！",
          type: "error"
        });
      } else if (this.json.type == "") {
        this.$message({
          showClose: true,
          message: "请选择围栏类型！",
          type: "error"
        });
      } else if (this.groupid.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择归属方案！",
          type: "error"
        });
      } else if (this.ZMetre.length == 0) {
        this.$message({
          showClose: true,
          message: "请设置楼层！",
          type: "error"
        });
      } else if (
        !BMetre.test(this.json.XLeftBMetre) ||
        !BMetre.test(this.json.YLeftBMetre) ||
        !BMetre.test(this.json.XRightTMetre) ||
        !BMetre.test(this.json.YRightTMetre)
      ) {
        this.$message({
          showClose: true,
          message: "坐标请输入数字！",
          type: "error"
        });
      } else if (this.json.XLeftBMetre > this.Xmax) {
        this.$message({
          showClose: true,
          message: "点一X坐标输入过大，请输入" + this.Xmax + "米以内",
          type: "error"
        });
      } else if (this.json.XLeftBMetre > this.Ymax) {
        this.$message({
          showClose: true,
          message: "点一Y坐标输入过大，请输入" + this.Ymax + "米以内",
          type: "error"
        });
      } else if (this.json.XRightTMetre > this.Xmax) {
        this.$message({
          showClose: true,
          message: "点二X坐标输入过大，请输入" + this.Xmax + "米以内",
          type: "error"
        });
      } else if (this.json.YRightTMetre > this.Ymax) {
        this.$message({
          showClose: true,
          message: "点二Y坐标输入过大，请输入" + this.Ymax + "米以内",
          type: "error"
        });
      } else if (this.json.type == 2 && !duration.test(this.json.duration)) {
        this.$message({
          showClose: true,
          message: "持续时间请输入数字！",
          type: "error"
        });
      } else if (
        this.json.type == 2 &&
        !Sensitivity.test(this.json.Sensitivity)
      ) {
        this.$message({
          showClose: true,
          message: "灵敏度请输入100以内整数！",
          type: "error"
        });
      } else if (this.json.type == 4 && this.json.direction == "") {
        this.$message({
          showClose: true,
          message: "请选择方向！",
          type: "error"
        });
      } else if (this.json.type == 5 && this.json.BeiginTime == null) {
        this.$message({
          showClose: true,
          message: "请选择开始时间！",
          type: "error"
        });
      } else if (this.json.type == 5 && this.json.EndTime == null) {
        this.$message({
          showClose: true,
          message: "请选择结束时间！",
          type: "error"
        });
      } else {
        // 获取系数
        // 成功添加
        let arr = [];
        arr.push({
          railname: this.json.railName,
          type: this.json.type,
          xrighttmetre: this.json.XRightTMetre,
          xleftbmetre: this.json.XLeftBMetre,
          yrighttmetre: this.json.YRightTMetre,
          yleftbmetre: this.json.YLeftBMetre,
          floorid: this.ZMetre[2]
        });
        this.$store.commit("updataDrewRailList", arr);
        this.show = true;
      }
    },
    yulan2() {
      let railName = /^[a-zA-Z0-9\u4E00-\u9FA5_-]{1,16}$/;
      if (!railName.test(this.json.railName)) {
        this.$message({
          showClose: true,
          message: "围栏名称格式为1到16位（汉字，字母，数字，下划线，减号）！",
          type: "error"
        });
      } else if (this.json.type == "") {
        this.$message({
          showClose: true,
          message: "请选择围栏类型！",
          type: "error"
        });
      } else if (this.groupid.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择归属方案！",
          type: "error"
        });
      } else if (this.basestationid.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择基站！",
          type: "error"
        });
      } else if (this.json.signallevelid == "") {
        this.$message({
          showClose: true,
          message: "请选择信号强度级别！",
          type: "error"
        });
      } else if (this.json.sensitivitylevel == "") {
        this.$message({
          showClose: true,
          message: "请选择灵敏度！",
          type: "error"
        });
      } else {
        this.$functionarrs
          .basestation_getBasestationById(
            this.basestationid[this.basestationid.length - 1]
          )
          .then(data => {
            let arr = [];
            arr.push({
              railname: this.json.railName,
              xleftbmetre: data.basBasestationPO.xmetre,
              yleftbmetre: data.basBasestationPO.ymetre,
              type: this.json.type,
              floorid: this.basestationid[2]
            });
            this.$store.commit("updataDrewRailList", arr);
            this.show = true;
            //  获取系数
            // this.$ajax
            //   .post(
            //     process.env.API_HOST + "/rail/railPreview",
            //     `floorid=${data.positionArr[2]}`
            //   )
            //   .then(respones => {

            //     this.show = true;
            //     this.chdata = [
            //       {
            //         xleftbmetre: data.basBasestationPO.xmetre * respones.data,
            //         yleftbmetre: data.basBasestationPO.ymetre * respones.data,
            //         type: this.json.type,
            //         floorid: data.positionArr[2]
            //       }
            //     ];
            //   });
          });
      }
    },
    newadd() {
      if (
        this.json.type == "" ||
        this.json.railName == "" ||
        this.json.XLeftBMetre == "" ||
        this.json.YLeftBMetre == "" ||
        this.json.XRightTMetre == "" ||
        this.json.YRightTMetre == "" ||
        this.ZMetre.length == 0
      ) {
        this.$alert("不能为空！", "警告", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else {
        this.show = false;
        this.showof = false;
        this.$ajax
          .post(
            process.env.API_HOST + "/rail/insertRail",
            `rail=${JSON.stringify(this.json)}&userid=${
              this.$store.state.token
            }&groupid=${JSON.stringify(this.groupid)}&NursingHomeid=${
              this.ZMetre[0]
            }&BuildingId=${this.ZMetre[1]}&Floorid=${this.ZMetre[2]}`
          )
          .then(respones => {
            this.showof = true;
            // 情况默认电子围栏
            this.$store.commit("updataDrewRailList", []);
            // 情况已填写选项
            this.json = {
              type: "",
              railName: "",
              XLeftBMetre: "",
              YLeftBMetre: "",
              XRightTMetre: "",
              YRightTMetre: "",
              duration: "",
              Sensitivity: "",
              BeiginTime: null,
              EndTime: null,
              direction: "",
              signallevelid: "",
              sensitivitylevel: "",
              alarmmode: "0"
            };
            this.$message(respones.data.msg);
          });
      }
    },
    newadd2() {
      this.show = false;
      this.showof = false;
      this.$functionarrs
        .rail_insertSingleRail(
          this.json,
          this.$store.state.token,
          this.groupid,
          this.basestationid
        )
        .then(data => {
          this.showof = true;
          this.$message(data.msg);
        });
    },
    handleChange(data) {
      this.floorid = data[2];
      let obj = this.getFloorData(data[2]);
      this.Xmax = obj.x;
      this.Ymax = obj.y;
    }
  }
};
</script>


<style scoped>
.Singlepoint_content {
  float: left;
  width: 28%;
  text-align: center;
  padding-top: 8px;
}
.yulan .newbtn {
  width: 93px;
  height: 84px;
  background-color: #409eff;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  border: none;
}
.yulan .floorread {
  float: left;
}
.yulan .cengread {
  float: left;
}
.yulan .btn {
  float: left;
}
.yulan .plantu_newweilan {
  width: 60%;
  height: 790px;
  float: left;
  margin-right: 15px;
}
.yulan .plantu {
  padding-top: 28px;
  height: 552px;
  background-color: #fff;
  margin-bottom: 15px;
}

.yulan .map {
  height: 505px;
  width: 946px;
  margin-left: 20px;
  background-color: #1d283b;
  border-radius: 7px;
  padding-top: 10px;
  padding-left: 10px;
  background-image: url(../../assets/5.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.yulan .newweilan {
  padding-top: 24px;
  height: 171px;
  background-color: #ffffff;
}
.yulan .zu_table {
  width: 38%;
  height: 790px;
  float: left;
  margin-right: 15px;
}
.yulan .zu {
  height: 367.5px;
  padding-top: 20px;
  background-color: #fff;
  margin-bottom: 15px;
  position: relative;
}
.yulan .zutable {
  height: 367.5px;
  padding-top: 20px;
  background-color: #fff;
}
</style>

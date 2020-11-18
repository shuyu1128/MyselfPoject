<template>
  <div v-if="json.type!=6&&json.type!=7" class="uprail" style="margin-left:30px;">
    <div style="margin-bottom:20px;">
      <span style="font-size:16px;font-weight: 400">修改名称：</span>
      <el-input
        v-model="json.railname"
        placeholder="请输入内容"
        style="width:160px;margin-right:20px"
        size="mini"
      ></el-input>
      <span style="font-size:16px;font-weight: 400">修改楼层：</span>
      <el-cascader v-model="zmetre" :options="bulid" style="width:150px" size="mini"></el-cascader>
    </div>

    <div style="margin-bottom:20px;">
      <span style="font-size:16px;font-weight: 400;margin-right:10px;">点一坐标</span>
      <span style="font-size:16px;font-weight: 400">X：</span>
      <el-input v-model="json.xleftbmetre" placeholder="单位米" style="width:70px;" size="mini"></el-input>
      <span style="font-size:16px;font-weight: 400">Y：</span>
      <el-input
        v-model="json.yleftbmetre"
        placeholder="单位米"
        style="width:70px;margin-right:20px"
        size="mini"
      ></el-input>
      <span style="font-size:16px;font-weight: 400" v-show="json.type==2">持续时间：</span>
      <el-input
        v-model="json.duration"
        v-show="json.type==2"
        placeholder="单位秒"
        style="width:70px;margin-right:20px"
        size="mini"
      ></el-input>
      <span style="font-size:16px;font-weight: 400" v-show="json.type==5">开始时间：</span>
      <el-input v-model="json.beigintime" v-show="json.type==5" style="width:115px;" size="mini"></el-input>
      <span style="font-size:16px;font-weight: 400" v-show="json.type==4">方向：</span>
      <el-select
        v-model="json.direction"
        v-show="json.type==4"
        placeholder="请选择"
        style="width:148px"
        size="mini"
      >
        <el-option v-for="item in directions" :key="item.id" :label="item.name" :value="item.value"></el-option>
      </el-select>
    </div>
    <span style="font-size:16px;font-weight: 400;margin-right:10px;">点二坐标</span>
    <span style="font-size:16px;font-weight: 400">X：</span>
    <el-input v-model="json.xrighttmetre" placeholder="单位米" style="width:70px;" size="mini"></el-input>
    <span style="font-size:16px;font-weight: 400">Y：</span>
    <el-input
      v-model="json.yrighttmetre"
      placeholder="单位米"
      style="width:70px;margin-right:20px"
      size="mini"
    ></el-input>
    <span style="font-size:16px;font-weight: 400" v-show="json.type==2">灵敏度：&nbsp&nbsp&nbsp&nbsp</span>
    <el-input
      v-model="json.sensitivity"
      v-show="json.type==2"
      placeholder="请输入"
      style="width:70px;margin-right:20px"
      size="mini"
    ></el-input>
    <span style="font-size:16px;font-weight: 400" v-show="json.type==5">结束时间：</span>
    <el-input v-model="json.endtime" v-show="json.type==5" style="width:115px;" size="mini"></el-input>
    <!-- <button class="newbtn" @click="newadd">新增</button> -->
    <el-button type="primary" @click="newadd" style="position: absolute;bottom:0px;right:10px;">确定</el-button>
  </div>
  <div v-else class="uprail2" style="margin-left:30px;">
    <div class="Singlepoint_content">
      <span class="content_text" style="font-size:16px;font-weight: 400">修改名称：</span>
      <el-input
        v-model="json.railname"
        placeholder="请输入内容"
        style="width:150px;margin-right:20px"
        size="mini"
      ></el-input>
    </div>
    <div class="Singlepoint_content">
      <span class="content_text" style="font-size:16px;font-weight: 400">选择基站：</span>
      <el-cascader
        v-model="basestationid"
        :options="basestationdata"
        style="width:150px"
        :props="basestationprops"
        size="mini"
      ></el-cascader>
    </div>
    <div class="Singlepoint_content">
      <span class="content_text" style="font-size:16px;font-weight: 400">信号强度级别：</span>
      <el-select size="mini" style="width:150px" v-model="json.signallevelid" placeholder="请选择">
        <el-option
          v-for="item in signalleveldata"
          :key="item.value"
          :label="item.basname"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="Singlepoint_content">
      <span class="content_text" style="font-size:16px;font-weight: 400">灵敏度：&nbsp&nbsp&nbsp&nbsp</span>
      <el-select size="mini" style="width:150px" v-model="json.sensitivitylevel" placeholder="请选择">
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
    <el-button type="primary" @click="newadd2" style="position: absolute;bottom:0px;right:10px;">确定</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      basestationid: [],
      bulid: [],
      zmetre: [],
      BeiginT: "",
      EndT: "",
      directions: [
        { name: "从上到下", value: "1" },
        { name: "从下到上", value: "2" },
        { name: "从左到右", value: "3" },
        { name: "从右到左", value: "4" }
      ],
      signalleveldata: [],
      sensitivityleveldata: [],
      basestationdata: [],
      basestationprops: {
        children: "child",
        label: "name",
        value: "id"
      },
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
      }
    };
  },
  props: {
    pid: null
  },
  created() {
    this.$ajax
      .post(process.env.API_HOST + "/rail/getRailById", `railid=${this.pid}`)
      .then(respones => {
        this.json = respones.data.basRailPO;
        this.basestationid = [
          respones.data.basRailPO.nursinghomeid,
          respones.data.basRailPO.buildingid,
          respones.data.basRailPO.floorid,
          respones.data.basRailPO.roomid,
          respones.data.basRailPO.basestationid
        ];
        this.BeiginT = respones.data.basRailPO.beigintime;
        // this.EndT = respones.data.basRailPO.EndTime;
        this.zmetre = respones.data.floor;
      });
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
  methods: {
    newadd() {
      if (
        this.json.railname == "" ||
        this.json.xleftbmetre === "" ||
        this.json.yleftbmetre === "" ||
        this.json.xrighttmetre == "" ||
        this.json.yrighttmetre == "" ||
        this.zmetre.length == 0
      ) {
        this.$alert("不能为空！", "警告", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else {
        this.$ajax
          .post(
            process.env.API_HOST + "/rail/updateRail",
            `rail=${JSON.stringify(this.json)}&userid=${
              this.$store.state.token
            }&railid=${this.pid}&NursingHomeid=${this.zmetre[0]}&BuildingId=${
              this.zmetre[1]
            }&Floorid=${this.zmetre[2]}`
          )
          .then(respones => {
            if (respones.data == "success") {
              this.$emit("childByValue", 1);
            } else {
              this.$message.error("修改失败");
            }
          });
      }
    },
    newadd2() {
      this.$functionarrs
        .rail_updateSingleRail(
          this.json,
          this.$store.state.token,
          this.pid,
          this.basestationid
        )
        .then(data => {
          if (data == "success") {
            this.$emit("childByValue", 1);
          } else {
            this.$message.error("修改失败");
          }
        });
    }
  }
};
</script>
<style scoped>
.content_text {
  display: inline-block;
  width: 112px;
}
.uprail {
  position: relative;
  height: 200px;
}
.uprail2 {
  position: relative;
  height: 250px;
}
.Singlepoint_content {
  margin-bottom: 10px;
}
</style>

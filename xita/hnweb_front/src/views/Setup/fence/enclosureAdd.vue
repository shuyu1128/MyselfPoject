<template>
  <div class="enclosure-add">
    <h3 v-if="!ifUpdata">新增围栏</h3>
    <el-form
      v-if="vForm"
      :hide-required-asterisk="true"
      :rules="enclosureFromRules"
      ref="ruleForm"
      size="mini"
      :model="enclosureFrom"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="围栏名称" prop="railname">
            <el-input
              maxlength="32"
              style="width:60%"
              v-model="enclosureFrom.railname"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入方式">
            <el-select
              @change="changeInputMode"
              style="width:60%"
              v-model="enclosureFrom.roomtype"
              placeholder="请选择"
            >
              <el-option
                v-for="item in enclosureRoomType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="围栏等级">
            <el-select
              @change="changeRaillevel"
              style="width:60%"
              v-model="enclosureFrom.raillevel"
              placeholder="请选择"
            >
              <el-option
                v-for="item in enclosureLevel"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="围栏类型">
            <el-select
              @change="changeType"
              style="width:60%"
              v-model="enclosureFrom.railtype"
              placeholder="请选择"
            >
              <el-option
                v-for="item in enclosureType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="35">
        <el-col :span="6">
          <div v-if="showSelectFloor()">
            <el-form-item label="所在楼层" prop="floorTreeValue">
              <el-cascader
                id="louceng"
                v-model="floorTreeValue"
                :options="NursingHomesTree"
                placeholder="请选择"
                @change="changeBulid"
                style="width:100%"
                size="mini"
              ></el-cascader>
            </el-form-item>
          </div>
          <div v-if="showSelectRoom()">
            <el-form-item label="所在房间" prop="roomTreeValue">
              <el-cascader
                id="fagnjian"
                v-model="roomTreeValue"
                :options="roomsTree"
                placeholder="请选择"
                @change="changeRoom"
                style="width:100%"
                size="mini"
              ></el-cascader>
            </el-form-item>
          </div>
          <div v-if="showSelectpoint()">
            <el-form-item label="选择基站" prop="basestationTreeValue">
              <el-cascader
                id="jizhan"
                v-model="basestationTreeValue"
                :options="BasestationTree"
                :props="basestationprops"
                placeholder="请选择"
                @change="changeBasestationTree"
                style="width:100%"
                size="mini"
              ></el-cascader>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" v-if="showInputXY()">
          <el-row>
            <el-col :span="6">
              <span>点一坐标</span>
            </el-col>
            <el-col :span="9">
              <el-form-item label="X:" prop="xleftbmetre">
                <el-input
                  style="width:70%"
                  v-model.number="enclosureFrom.xleftbmetre"
                  placeholder="单位米"
                  @blur="preview"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="Y:" prop="yleftbmetre">
                <el-input
                  style="width:70%"
                  v-model.number="enclosureFrom.yleftbmetre"
                  placeholder="单位米"
                  @blur="preview"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>点二坐标</span>
            </el-col>
            <el-col :span="9">
              <el-form-item label="X:" prop="xrighttmetre">
                <el-input
                  style="width:70%"
                  v-model.number="enclosureFrom.xrighttmetre"
                  placeholder="单位米"
                  @blur="preview"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="Y:" prop="yrighttmetre">
                <el-input
                  style="width:70%"
                  v-model.number="enclosureFrom.yrighttmetre"
                  placeholder="单位米"
                  @blur="preview"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" v-if="showDurationAndSensitivity()">
          <el-form-item label-width="68px" label="持续时间" prop="duration">
            <el-input-number
              v-model="enclosureFrom.duration"
              :precision="0"
              :step="10"
              placeholder="单位分钟"
              controls-position="right"
              :min="1"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item label-width="68px" label="灵敏度" prop="sensitivity">
            <el-input-number
              v-model="enclosureFrom.sensitivity"
              :precision="0"
              controls-position="right"
              :min="1"
              :max="100"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="showTimeFrame()">
          <el-form-item label="时间范围" prop="timeValue">
            <el-time-picker
              style="width:100%"
              is-range
              v-model="timeValue"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              @change="changeTime"
            ></el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="showSelectDirection()">
          <el-form-item label="方向" prop="direction">
            <el-select style="width:100%" v-model="enclosureFrom.direction" placeholder="请选择">
              <el-option
                v-for="item in directions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" v-if="showSelectpoint()">
          <el-form-item label="信号强度级别" prop="signallevelid">
            <el-select style="width:100%" v-model="enclosureFrom.signallevelid" placeholder="请选择">
              <el-option
                v-for="item in signalLevelData"
                :key="item.id"
                :label="item.basname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" v-if="showSelectpoint()">
          <el-form-item label="灵敏度等级" prop="sensitivitylevel">
            <el-select
              style="width:100%"
              v-model="enclosureFrom.sensitivitylevel"
              placeholder="请选择"
            >
              <el-option
                v-for="item in sensitivityLevelData"
                :key="item.bascode"
                :label="item.basname"
                :value="item.bascode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" v-if="showSelectpoint()">
          <el-form-item>
            <el-radio v-model="enclosureFrom.alarmmode" label="0">滤波前</el-radio>
            <el-radio v-model="enclosureFrom.alarmmode" label="1">滤波后</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button v-if="!ifUpdata" class="add-enclosure-btn" @click="addRail('ruleForm')">添加</el-button>
          <el-button v-else class="add-enclosure-btn" @click="updataRail('ruleForm')">确定</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    var floorTreeValidator = (rule, value, callback) => {
      if (this.floorTreeValue.length === 0) {
        callback(new Error("请选择楼层！"));
      } else {
        callback();
      }
    };
    var roomTreeValidator = (rule, value, callback) => {
      if (this.roomTreeValue.length === 0) {
        callback(new Error("请选择房间！"));
      } else {
        callback();
      }
    };
    var basestationValidator = (rule, value, callback) => {
      if (this.basestationTreeValue.length === 0) {
        callback(new Error("请选择基站！"));
      } else {
        callback();
      }
    };
    var timeValueValidator = (rule, value, callback) => {
      if (!this.timeValue) {
        callback(new Error("请选择时间范围！"));
      } else {
        callback();
      }
    };
    return {
      vForm: true,
      //   新建围栏表单
      enclosureFrom: {
        //电子围栏名称
        railname: "",
        //电子围栏等级
        raillevel: "1",
        //类型
        railtype: "1",
        //时长
        duration: undefined,
        //灵敏度
        sensitivity: undefined,
        //楼层id
        floorid: "",
        //开始时间
        beigintime: "",
        //结束时间
        endtime: "",
        //方向
        direction: "",
        //电子围栏选择房间类型（多选，单选）
        roomtype: "1",
        //房间id
        roomidlist: [],
        //左下角X点
        xleftbmetre: "",
        //左下角Y点
        yleftbmetre: "",
        //右上角X点
        xrighttmetre: "",
        //右上角Y点
        yrighttmetre: "",
        //基站id
        basestationid: "",
        //信号强度级别
        signallevelid: "",
        //报警方式（滤波前0 滤波后 1）
        alarmmode: "0",
        //灵敏等级
        sensitivitylevel: "",
      },
      // 新增围栏规则
      enclosureFromRules: {
        railname: [{ required: true, message: "不能为空" }],
        duration: [{ required: true, message: "不能为空" }],
        sensitivity: [{ required: true, message: "不能为空" }],
        direction: [{ required: true, message: "不能为空" }],
        xleftbmetre: [
          { required: true, message: "不能为空" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
        ],
        yleftbmetre: [
          { required: true, message: "不能为空" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
        ],
        xrighttmetre: [
          { required: true, message: "不能为空" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
        ],
        yrighttmetre: [
          { required: true, message: "不能为空" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
        ],
        signallevelid: [{ required: true, message: "请选择" }],
        sensitivitylevel: [{ required: true, message: "请选择" }],
        floorTreeValue: [{ validator: floorTreeValidator }],
        roomTreeValue: [{ validator: roomTreeValidator }],
        basestationTreeValue: [{ validator: basestationValidator }],
        timeValue: [{ validator: timeValueValidator }],
      },
      // 基站值
      basestationTreeValue: [],
      // 房间值
      roomTreeValue: [],
      // 楼层值
      floorTreeValue: [],
      // 分时段禁入时间值
      timeValue: null,
      //   围栏等级选项
      enclosureLevel: [
        { value: "3", label: "高" },
        { value: "1", label: "低" },
      ],
      //   围栏录入方式
      enclosureRoomType: [
        { value: "2", label: "房间为单位" },
        { value: "1", label: "房间内录入" },
      ],
      //   电子围栏类型选项
      enclosureType: [
        { value: "1", label: "禁入" },
        { value: "2", label: "计时禁入" },
        { value: "5", label: "分时段禁入" },
        { value: "3", label: "禁出" },
        { value: "4", label: "预警" },
        { value: "6", label: "单点禁入" },
        { value: "7", label: "单点禁出" },
      ],
      // 方向选项
      directions: [
        { label: "从上到下", value: "1" },
        { label: "从下到上", value: "2" },
        { label: "从左到右", value: "3" },
        { label: "从右到左", value: "4" },
      ],
      // 基站选择配置项
      basestationprops: {
        children: "child",
        label: "name",
        value: "id",
      },
    };
  },
  props: {
    ifUpdata: null,
    updataRnclosureData: null,
  },
  computed: {
    ...mapState({
      //全部建筑结构
      NursingHomesTree: (state) => state.fance.NursingHomesTree,
      // 基站位置树
      BasestationTree: (state) => state.fance.BasestationTree,
      // 到房间的树形结构
      roomsTree: (state) => state.userAndRole.roomsTree,
      // 信号强度级别
      signalLevelData: (state) => state.fance.signalLevelData,
      // 灵敏度等级
      sensitivityLevelData: (state) => state.fance.sensitivityLevelData,
      // 当前选中单独房间的信息
      nowRoominfo: (state) => state.fance.nowRoominfo,
    }),
  },
  watch: {
    enclosureFrom: {
      handler(val) {
        // 单点时改变录入方式
        if (val.railtype == "6" || val.railtype == "7") val.roomtype = "1";
        this.$store.commit("clearGroup");
      },
      // immediate: true,  //刷新加载 立马触发一次handler
      deep: true, // 可以深度检测到 enclosureFrom 对象的属性值的变化
    },
  },
  created() {
    if (this.ifUpdata) {
      this.assignmentEnclosureFrom(this.updataRnclosureData);
    }
    // 获取全部建筑结构
    this.$store.dispatch("room_getNursingHomesTree");
    // 获取基站位置树
    this.$store.dispatch("rail_getBasestationTree");
    // 获取到房间的树形结构
    this.$store.dispatch("bed_getNursingHomesTree");
    // 通过类型获取基本信息数据
    this.$store.dispatch("basic_getBasDataByType", "signalLevel");
    this.$store.dispatch("basic_getBasDataByType", "sensitivityLevel");
  },
  destroyed() {
    this.$store.commit("changeInputMode", "1");
  },
  methods: {
    // 编辑打开是赋值默认数据
    assignmentEnclosureFrom(data) {
      // 时间选择器赋值
      this.enclosureFrom = data.enclosureFrom;
      if (this.enclosureFrom.railtype === "5") {
        this.timeValue = [
          this.enclosureFrom.beigintime,
          this.enclosureFrom.endtime,
        ];
        console.log(this.timeValue);
      }
      if (
        this.enclosureFrom.roomtype === "1" &&
        this.enclosureFrom.railtype !== "6" &&
        this.enclosureFrom.railtype !== "7"
      ) {
        this.roomTreeValue = data.roomTreeValue;
        // 改变将要绘制的单个房间的电子围栏
        this.$store.commit("changeInRoomEnclosure", [data.enclosureFrom]);
        console.log("反查到房间");
      } else if (
        this.enclosureFrom.roomtype === "1" &&
        (this.enclosureFrom.railtype === "6" ||
          this.enclosureFrom.railtype === "7")
      ) {
        this.basestationTreeValue = data.basestationTreeValue;
        console.log(data.enclosureFrom);
        // 改变将要绘制的单点围栏
        this.$store.commit("changeDrewsinglePointPw", [data.enclosureFrom]);
        console.log("反查到基站");
      } else if (
        this.enclosureFrom.roomtype === "2" &&
        this.enclosureFrom.railtype !== "6" &&
        this.enclosureFrom.railtype !== "7"
      ) {
        this.floorTreeValue = data.floorTreeValue;
        data.enclosureFrom.roomidlist.forEach((element) => {
          this.$store.commit("addReadyAddRoom", element);
        });
        console.log("反查到楼层");
      } else if (
        this.enclosureFrom.roomtype === "2" &&
        (this.enclosureFrom.railtype === "6" ||
          this.enclosureFrom.railtype === "7")
      ) {
        this.basestationTreeValue = data.basestationTreeValue;
        console.log("反查到基站");
      }
    },
    // 录入xy预览围栏
    preview() {
      if (
        this.enclosureFrom.xleftbmetre !== "" &&
        this.enclosureFrom.yleftbmetre !== "" &&
        this.enclosureFrom.xrighttmetre !== "" &&
        this.enclosureFrom.yrighttmetre !== "" &&
        this.enclosureFrom.roomidlist
      ) {
        // 判断坐标是否满足条件
        this.judgeXY(
          this.nowRoominfo.xrighttmetre,
          this.nowRoominfo.xleftbmetre,
          this.nowRoominfo.yrighttmetre,
          this.nowRoominfo.yleftbmetre,
          this.enclosureFrom.xrighttmetre,
          this.enclosureFrom.xleftbmetre,
          this.enclosureFrom.yrighttmetre,
          this.enclosureFrom.yleftbmetre
        );
        this.$store.commit("changeInRoomEnclosure", [this.enclosureFrom]);
      } else {
      }
    },
    // 单点围栏类型预览
    singlePointPw() {
      console.log(this.enclosureFrom.alarmmode);
    },
    // 新增电子围栏
    addRail(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 进行坐标准确性校验
          if (
            this.judgeXY(
              this.nowRoominfo.xrighttmetre,
              this.nowRoominfo.xleftbmetre,
              this.nowRoominfo.yrighttmetre,
              this.nowRoominfo.yleftbmetre,
              this.enclosureFrom.xrighttmetre,
              this.enclosureFrom.xleftbmetre,
              this.enclosureFrom.yrighttmetre,
              this.enclosureFrom.yleftbmetre
            ) ||
            this.enclosureFrom.roomtype == "2" ||
            this.enclosureFrom.railtype == "6" ||
            this.enclosureFrom.railtype == "7"
          ) {
            this.$confirm("即将新增电子围栏, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.$store
                .dispatch("railNew_insertRail", {
                  data: this.enclosureFrom,
                  userid: this.$store.state.token,
                })
                .then((res) => {
                  if (res === "yes") {
                    this.$emit("newrailok");
                    this.clearForm();
                  }
                });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 修改电子围栏
    updataRail(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.judgeXY(
              this.nowRoominfo.xrighttmetre,
              this.nowRoominfo.xleftbmetre,
              this.nowRoominfo.yrighttmetre,
              this.nowRoominfo.yleftbmetre,
              this.enclosureFrom.xrighttmetre,
              this.enclosureFrom.xleftbmetre,
              this.enclosureFrom.yrighttmetre,
              this.enclosureFrom.yleftbmetre
            ) ||
            this.enclosureFrom.roomtype == "2" ||
            this.enclosureFrom.railtype == "6" ||
            this.enclosureFrom.railtype == "7"
          ) {
            this.$confirm("即将修改电子围栏, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.$store
                .dispatch("railNew_updateRail", {
                  data: this.enclosureFrom,
                  userid: this.$store.state.token,
                })
                .then((res) => {
                  this.$emit("updataEnclosure", res);
                });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 改变电子围栏录入方式
    changeInputMode(data) {
      // 判断不为单点时不进行房间清空，单点无法改变录入方式
      if (
        this.enclosureFrom.railtype != "6" &&
        this.enclosureFrom.railtype != "7"
      ) {
        this.$store.commit("changeInputMode", data);
        // this.enclosureFrom.floorid = data[2];
        // 清空显隐
        this.enclosureFrom.xleftbmetre = "";
        this.enclosureFrom.yleftbmetre = "";
        this.enclosureFrom.xrighttmetre = "";
        this.enclosureFrom.yrighttmetre = "";
        this.enclosureFrom.roomidlist = [];
        this.$store.commit("clearInRoomEnclosure");
        this.$store.commit("clearReadyAddRoom");
        // 清空楼层房间选择器的value
        this.floorTreeValue = [];
        this.roomTreeValue = [];
      }
    },
    // 判断坐标关系
    judgeXY(
      rxrighttmetre,
      rxleftbmetre,
      ryrighttmetre,
      ryleftbmetre,
      xrighttmetre,
      xleftbmetre,
      yrighttmetre,
      yleftbmetre
    ) {
      // 房间宽度
      let roomWidth = this.$allMethods.FloatSub(rxrighttmetre, rxleftbmetre);
      // 房间高度
      let roomHeight = this.$allMethods.FloatSub(ryrighttmetre, ryleftbmetre);
      if (xleftbmetre > roomWidth || xleftbmetre < 0) {
        this.$alert("坐标一的X请输入" + 0 + "到" + roomWidth + "之间", "警告", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.enclosureFrom.xleftbmetre = roomWidth;
          },
        });
        return false;
      } else if (xrighttmetre > roomWidth || xrighttmetre < 0) {
        this.$alert("坐标二的X请输入" + 0 + "到" + roomWidth + "之间", "警告", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.enclosureFrom.xrighttmetre = roomWidth;
          },
        });
        return false;
      } else if (yleftbmetre > roomHeight || yleftbmetre < 0) {
        this.$alert(
          "坐标一的Y请输入" + 0 + "到" + roomHeight + "之间",
          "警告",
          {
            confirmButtonText: "确定",
            callback: (action) => {
              this.enclosureFrom.yleftbmetre = roomHeight;
            },
          }
        );
        return false;
      } else if (yrighttmetre > roomHeight || yrighttmetre < 0) {
        this.$alert(
          "坐标二的Y请输入" + 0 + "到" + roomHeight + "之间",
          "警告",
          {
            confirmButtonText: "确定",
            callback: (action) => {
              this.enclosureFrom.yrighttmetre = roomHeight;
            },
          }
        );
        return false;
      } else if (xleftbmetre >= xrighttmetre) {
        this.$alert("坐标一的X要小于坐标二的X", "警告", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.enclosureFrom.xleftbmetre = 0;
          },
        });
        return false;
      } else if (yleftbmetre >= yrighttmetre) {
        this.$alert("坐标一的Y要小于坐标二的Y", "警告", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.enclosureFrom.yleftbmetre = 0;
          },
        });
        return false;
      } else {
        return true;
      }
    },
    // 楼层改变赋值
    changeBulid(data) {
      // 清空全部为围栏方便预览
      this.$store.commit("clearSureData");
      this.$store.commit("changeNowFloorId", data[2]);
      this.enclosureFrom.floorid = data[2];
    },
    // 房间改变赋值
    changeRoom(data) {
      // 清空全部为围栏方便预览
      this.$store.commit("clearSureData");
      // 改变楼层id
      this.$store.commit("changeNowFloorId", data[2]);
      this.enclosureFrom.floorid = data[2];
      // 改变房间id
      this.enclosureFrom.roomidlist = [];
      this.enclosureFrom.roomidlist.push(data[3]);
      // 根据id获取房间信息
      this.$store.dispatch("room_getRoomById", data[3]);
      this.enclosureFrom.xrighttmetre = "";
      this.enclosureFrom.xleftbmetre = "";
      this.enclosureFrom.yrighttmetre = "";
      this.enclosureFrom.yleftbmetre = "";
    },
    // 基站改变赋值
    changeBasestationTree(data) {
      // 改变房间id
      this.enclosureFrom.roomidlist = [];
      this.enclosureFrom.roomidlist.push(data[3]);
      // 改变楼层id
      this.enclosureFrom.floorid = data[2];
      this.$store.commit("changeNowFloorId", data[2]);
      // 向表单中的基站id赋值
      this.enclosureFrom.basestationid = data[4];
      // 清空全部为围栏方便预览单点围栏
      this.$store.commit("clearSureData");
      // 预览单点围栏位置
      this.$store.dispatch("singlePointPw", data[4]);
    },
    // 时间改变赋值
    changeTime(data) {
      if (data) {
        this.enclosureFrom.beigintime = data[0];
        this.enclosureFrom.endtime = data[1];
      }
    },
    changeRaillevel() {
      this.vForm = false;
      this.$nextTick(() => {
        this.vForm = true;
      });
    },
    // 围栏类型改变清空显隐
    changeType(data) {
      this.enclosureFrom.duration = undefined;
      this.enclosureFrom.sensitivity = undefined;
      this.enclosureFrom.beigintime = "";
      this.enclosureFrom.endtime = "";
      this.enclosureFrom.direction = "";
      this.enclosureFrom.basestationid = "";
      this.enclosureFrom.signallevelid = "";
      this.enclosureFrom.alarmmode = "0";
      this.enclosureFrom.sensitivitylevel = "";
      this.timeValue = null;
      this.basestationTreeValue = [];
      this.$store.commit("clearInRoomEnclosure");
      this.$store.commit("clearReadyAddRoom");
      this.$store.commit("clearDrewsinglePointPw");
      this.vForm = false;
      this.$nextTick(() => {
        this.vForm = true;
      });
    },
    // 是否显示选择楼层
    showSelectFloor() {
      if (
        this.enclosureFrom.roomtype === "2" &&
        this.enclosureFrom.railtype !== "6" &&
        this.enclosureFrom.railtype !== "7"
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 是否显示选择房间
    showSelectRoom() {
      if (
        this.enclosureFrom.roomtype === "1" &&
        this.enclosureFrom.railtype !== "6" &&
        this.enclosureFrom.railtype !== "7"
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 是否显示选择基站
    showSelectpoint() {
      if (
        this.enclosureFrom.railtype === "6" ||
        this.enclosureFrom.railtype === "7"
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 是否显示录入XY轴
    showInputXY() {
      if (
        this.enclosureFrom.roomtype === "1" &&
        this.enclosureFrom.railtype !== "6" &&
        this.enclosureFrom.railtype !== "7"
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 是否显示录入持续时间和灵敏度录入
    showDurationAndSensitivity() {
      if (this.enclosureFrom.railtype === "2") {
        return true;
      } else {
        return false;
      }
    },
    // 是否显示选择时间范围
    showTimeFrame() {
      if (this.enclosureFrom.railtype === "5") {
        return true;
      } else {
        return false;
      }
    },
    // 是否显示选择方向
    showSelectDirection() {
      if (this.enclosureFrom.railtype === "4") {
        return true;
      } else {
        return false;
      }
    },
    // 清空新增围栏表单
    clearForm() {
      this.enclosureFrom = {
        //电子围栏名称
        railname: "",
        //电子围栏等级
        raillevel: "1",
        //类型
        railtype: "1",
        //时长
        duration: undefined,
        //灵敏度
        sensitivity: undefined,
        //楼层id
        floorid: "",
        //开始时间
        beigintime: "",
        //结束时间
        endtime: "",
        //方向
        direction: "",
        //电子围栏选择房间类型（多选，单选）
        roomtype: "1",
        //房间id
        roomidlist: [],
        //左下角X点
        xleftbmetre: "",
        //左下角Y点
        yleftbmetre: "",
        //右上角X点
        xrighttmetre: "",
        //右上角Y点
        yrighttmetre: "",
        //基站id
        basestationid: "",
        //信号强度级别
        signallevelid: "",
        //报警方式（滤波前0 滤波后 1）
        alarmmode: "0",
        //灵敏等级
        sensitivitylevel: "",
      };
      // 基站值
      this.basestationTreeValue = [];
      // 房间值
      this.roomTreeValue = [];
      // 楼层值
      this.floorTreeValue = [];
      // 分时段禁入时间值
      this.timeValue = null;
      this.vForm = false;
      this.$nextTick(() => {
        this.vForm = true;
      });
    },
  },
};
</script>

<style scoped>
.enclosure-add {
  padding: 24px 0 0 24px;
  height: 171px;
  background-color: #ffffff;
}
.add-enclosure-btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  width: 100%;
  height: 70px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
</style>
<template>
  <!-- 编辑房间 -->
  <el-dialog
    :showClose="false"
    :closeOnClickModal="false"
    title="编辑房间"
    :visible.sync="roomUpdataVisible"
  >
    <el-form :rules="rules" ref="form" :model="form" label-width="90px">
      <el-form-item label="房间号" prop="roomname">
        <el-input maxlength="32" v-model="form.roomname"></el-input>
      </el-form-item>
      <el-form-item label="房间编码" prop="roomcode">
        <el-input maxlength="32" v-model="form.roomcode"></el-input>
      </el-form-item>
      <el-form-item label="房间备注">
        <el-input maxlength="50" v-model="form.roomdesc"></el-input>
      </el-form-item>
      <el-form-item label="看护等级" prop="nursinglevel">
        <el-select style="width:100%" v-model="form.nursinglevel" placeholder="请选择">
          <el-option
            v-for="item in grade"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房间类型" prop="type">
        <el-select style="width:100%" v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in roomtype"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示层级" prop="level">
        <el-select style="width:100%" v-model="form.level" placeholder="请选择">
          <el-option
            v-for="item in leveltype"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="基站个数" prop="roombasestationnum">
        <el-input maxlength="2" v-model="form.roombasestationnum"></el-input>
      </el-form-item>
      <el-form-item label="左右房间">
        <span>左：</span>
        <el-cascader
          style="width:30%;margin-right:10px;"
          v-model="leftroomid"
          :options="croom"
          :props="{ expandTrigger: 'hover' }"
          clearable
        ></el-cascader>

        <el-input
          maxlength="12"
          style="width:102px;margin-right:30px;"
          v-model="form.leftwallattenuation"
          placeholder="左墙体衰减"
        ></el-input>

        <span>右：</span>
        <el-cascader
          style="width:30%;margin-right:10px;"
          v-model="rightroomid"
          :options="croom"
          :props="{ expandTrigger: 'hover' }"
          clearable
        ></el-cascader>

        <el-input
          maxlength="12"
          style="width:102px;"
          v-model="form.rightwallattenuation"
          placeholder="右墙体衰减"
        ></el-input>
      </el-form-item>
      <el-form-item label="上下房间">
        <span>上：</span>
        <el-cascader
          style="width:30%;margin-right:10px;"
          v-model="upperroomid"
          :options="croom"
          :props="{ expandTrigger: 'hover' }"
          clearable
        ></el-cascader>

        <el-input
          maxlength="12"
          style="width:102px;margin-right:30px;"
          v-model="form.upperwallattenuation"
          placeholder="上墙体衰减"
        ></el-input>

        <span>下：</span>
        <el-cascader
          style="width:30%;margin-right:10px;"
          v-model="lowerroomid"
          :options="croom"
          :props="{ expandTrigger: 'hover' }"
          clearable
        ></el-cascader>

        <el-input style="width:102px;" v-model="form.lowerwallattenuation" placeholder="下墙体衰减"></el-input>
      </el-form-item>
      <el-form-item label="左下角">
        <el-col :span="11">
          <el-form-item prop="xleftbmetre" label="X">
            <el-input maxlength="16" style v-model="form.xleftbmetre"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
          <el-form-item prop="yleftbmetre" label="y">
            <el-input prop="yleftbmetre" maxlength="16" style v-model="form.yleftbmetre"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="右上角">
        <el-col :span="11">
          <el-form-item prop="xrighttmetre" label="X">
            <el-input maxlength="16" v-model="form.xrighttmetre"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
          <el-form-item prop="yrighttmetre" label="y">
            <el-input maxlength="16" v-model="form.yrighttmetre"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitformbianji('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    // 房间填写左下角时校验
    var validateAddRoomFormRuleXleftbmetre = (rule, value, callback) => {
      if (
        Number(value) > Number(this.form.xrighttmetre) &&
        this.form.xrighttmetre != ""
      ) {
        callback(new Error("不可大于右上角X坐标"));
      } else if (
        Number(value) == Number(this.form.xrighttmetre) &&
        this.form.xrighttmetre != ""
      ) {
        callback(new Error("不可等于右上角X坐标"));
      } else {
        callback();
      }
    };
    var validateAddRoomFormRuleYleftbmetre = (rule, value, callback) => {
      if (
        Number(value) > Number(this.form.yrighttmetre) &&
        this.form.yrighttmetre != ""
      ) {
        callback(new Error("不可大于右上角Y坐标"));
      } else if (
        Number(value) == Number(this.form.yrighttmetre) &&
        this.form.yrighttmetre != ""
      ) {
        callback(new Error("不可等于右上角Y坐标"));
      } else {
        callback();
      }
    };
    // 房间填写右上角时校验
    var validateAddRoomFormRuleXrighttmetre = (rule, value, callback) => {
      if (value == 0) {
        callback(new Error("右上角不可为0"));
      } else {
        if (Number(value) < Number(this.form.xleftbmetre)) {
          callback(new Error("不可小于左下角X坐标"));
        } else if (Number(value) == Number(this.form.xleftbmetre)) {
          callback(new Error("不可等于左下角X坐标"));
        } else {
          callback();
        }
      }
    };
    var validateAddRoomFormRuleYrighttmetre = (rule, value, callback) => {
      if (Number(value) < Number(this.form.yleftbmetre)) {
        callback(new Error("不可小于左下角Y坐标"));
      } else if (Number(value) == Number(this.form.yleftbmetre)) {
        callback(new Error("不可等于左下角Y坐标"));
      } else {
        callback();
      }
    };
    return {
      croom: [],
      leftroomid: [
        "A",
        "4fe366f7bc214df1810a3703aa47e41a",
        "7f817c6900f24204856dc9b5ca2d4826",
        "953ece821ded434cb4fb46f17853ff5a",
      ],
      rightroomid: [],
      upperroomid: [],
      lowerroomid: [],
      leveltype: [
        {
          value: '0',
          label: "正常房间",
        },
        {
          value: '1',
          label: "显示在正常房间上层",
        },
        {
          value: '2',
          label: "最高层级",
        },
      ],
      grade: [
        {
          value: "全自理",
          label: "全自理",
        },
        {
          value: "半自理",
          label: "半自理",
        },
        {
          value: "全介护",
          label: "全介护",
        },
      ],
      roomtype: [
        {
          label: "私人区域",
          value: "私人区域",
        },
        {
          label: "公共区域",
          value: "公共区域",
        },
        {
          label: "移动区域",
          value: "移动区域",
        },
        {
          label: "办公区域",
          value: "办公区域",
        },
        {
          label: "高危区域",
          value: "高危区域",
        },
      ],
      form: {
        level: "",
        roomname: "",
        roomcode: "",
        roomdesc: "",
        nursinglevel: "",
        xleftbmetre: "",
        yleftbmetre: "",
        xrighttmetre: "",
        yrighttmetre: "",
        id: "",
        type: "",
        LeftWallAttenuation: "",
        RightWallAttenuation: "",
        UpperWallAttenuation: "",
        LowerWallAttenuation: "",
        roombasestationnum: "",
      },
      rules: {
        roomname: [
          { required: true, message: "请输入房间号", trigger: "blur" }
        ],
        roomcode: [
          { required: true, message: "请输入编码", trigger: "blur" }
        ],
        nursinglevel: [
          { required: true, message: "请选择等级", trigger: "change" },
        ],
        roombasestationnum: [
          { required: true, message: "请输入基站个数", trigger: "blur" },
          {
            pattern: /^[+]{0,1}(\d+)$/,
            message: "请输入整数",
            trigger: "blur",
          },
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        level: [{ required: true, message: "请选择层级", trigger: "change" }],
        xleftbmetre: [
          { required: true, message: "请左下角坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddRoomFormRuleXleftbmetre,
            trigger: "blur",
          },
        ],
        yleftbmetre: [
          { required: true, message: "请左下角坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddRoomFormRuleYleftbmetre,
            trigger: "blur",
          },
        ],
        xrighttmetre: [
          { required: true, message: "请右下角坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddRoomFormRuleXrighttmetre,
            trigger: "blur",
          },
        ],
        yrighttmetre: [
          { required: true, message: "请右下角坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddRoomFormRuleYrighttmetre,
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    roomUpdataVisible() {
      return this.$store.state.beadhouse.roomUpdataVisible;
    },
    updataContent() {
      return this.$store.state.beadhouse.updataContent;
    },
  },
  watch: {
    updataContent(val) {
      console.log(val);
      this.getRoomsByid(val.id);
    },
  },
  created() {
    // 获取院下房间结构
    this.$ajax
      .post(process.env.API_HOST + "/bed/getNursingHomesTree")
      .then((respones) => {
        this.croom = respones.data;
      });
  },
  methods: {
    submitformbianji(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.leftroomid[3] == undefined) {
            this.form.leftroomid = "";
          } else {
            this.form.leftroomid = this.leftroomid[3];
          }
          if (this.rightroomid[3] == undefined) {
            this.form.rightroomid = "";
          } else {
            this.form.rightroomid = this.rightroomid[3];
          }

          if (this.upperroomid[3] == undefined) {
            this.form.upperroomid = "";
          } else {
            this.form.upperroomid = this.upperroomid[3];
          }

          if (this.lowerroomid[3] == undefined) {
            this.form.lowerroomid = "";
          } else {
            this.form.lowerroomid = this.lowerroomid[3];
          }
          this.$store.dispatch("room_updateRoom", {
            data: this.form,
            userid: this.$store.state.token,
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    close() {
      this.$store.commit("closeRoom");
    },
    // 根据id和深度获取房间信息
    getRoomsByid(id) {
      console.log(id);
      this.$ajax
        .post(process.env.API_HOST + "/room/getRoomById", `roomId=${id}`)
        .then((respones) => {
          if (respones.data.basNursinghomeroomPO) {
            this.form = respones.data.basNursinghomeroomPO;
            this.leftroomid = respones.data.leftArr;
            this.rightroomid = respones.data.rightArr;
            this.upperroomid = respones.data.upperArr;
            this.lowerroomid = respones.data.lowerArr;
          }
        });
    },
  },
};
</script>

<style>
</style>
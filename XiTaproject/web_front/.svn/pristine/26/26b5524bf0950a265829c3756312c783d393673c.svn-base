<template>
  <div class="build-list">
    <!-- 弹窗类 -->
    <!-- 添加建筑 -->
    <el-dialog title="添加建筑" :visible.sync="BuildFormVisible" :closeOnClickModal="false">
      <el-form
        :rules="addBuildFormRule"
        ref="ruleBuildForm"
        :model="addBuildForm"
        label-width="90px"
      >
        <el-form-item label="建筑名称" prop="name">
          <el-input maxlength="30" v-model="addBuildForm.name"></el-input>
        </el-form-item>
        <el-form-item label="建筑编码" prop="code">
          <el-input maxlength="16" v-model="addBuildForm.code"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input maxlength="50" v-model="addBuildForm.builddesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="BuildFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBuildForm('ruleBuildForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加楼层 -->
    <el-dialog title="添加楼层" :visible.sync="FloorFormVisible" :closeOnClickModal="false">
      <el-form
        :rules="addFloorFormRule"
        ref="ruleFloorForm"
        :model="addFloorForm"
        label-width="90px"
      >
        <el-form-item label="楼层名称" prop="floorname">
          <el-input maxlength="16" v-model="addFloorForm.floorname"></el-input>
        </el-form-item>
        <el-form-item label="楼层编码" prop="floorcode">
          <el-input maxlength="16" v-model="addFloorForm.floorcode"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input maxlength="50" v-model="addFloorForm.floordesc"></el-input>
        </el-form-item>
        <el-form-item label="左下角">
          <el-col :span="11">
            <el-form-item prop="xleftbmetre" label="X">
              <el-input maxlength="16" style v-model="addFloorForm.xleftbmetre"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item prop="yleftbmetre" label="Y">
              <el-input prop="yleftbmetre" maxlength="16" style v-model="addFloorForm.yleftbmetre"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="右上角">
          <el-col :span="11">
            <el-form-item prop="xrighttmetre" label="X">
              <el-input maxlength="16" v-model="addFloorForm.xrighttmetre"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item prop="yrighttmetre" label="Y">
              <el-input maxlength="16" v-model="addFloorForm.yrighttmetre"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="FloorFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFloorform('ruleFloorForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加房间 -->
    <el-dialog title="添加房间" :visible.sync="RoomFormVisible" :closeOnClickModal="false">
      <el-form :rules="addRoomFormRule" ref="ruleRoomForm" :model="addRoomForm" label-width="90px">
        <el-form-item label="房间号" prop="roomname">
          <el-input maxlength="32" v-model="addRoomForm.roomname"></el-input>
        </el-form-item>
        <el-form-item label="房间编码" prop="roomcode">
          <el-input maxlength="32" v-model="addRoomForm.roomcode"></el-input>
        </el-form-item>
        <el-form-item label="房间备注">
          <el-input maxlength="50" v-model="addRoomForm.roomdesc"></el-input>
        </el-form-item>
        <el-form-item label="看护等级" prop="nursinglevel">
          <el-select style="width:100%" v-model="addRoomForm.nursinglevel" placeholder="请选择">
            <el-option
              v-for="item in grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间类型" prop="type">
          <el-select style="width:100%" v-model="addRoomForm.type" placeholder="请选择">
            <el-option
              v-for="item in roomtype"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示层级" prop="level">
          <el-select style="width:100%" v-model="addRoomForm.level" placeholder="请选择">
            <el-option
              v-for="item in leveltype"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基站个数" prop="roombasestationnum">
          <el-input maxlength="2" v-model="addRoomForm.roombasestationnum"></el-input>
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
            v-model="addRoomForm.LeftWallAttenuation"
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
            v-model="addRoomForm.RightWallAttenuation"
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
            v-model="addRoomForm.UpperWallAttenuation"
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

          <el-input
            maxlength="12"
            style="width:102px;"
            v-model="addRoomForm.LowerWallAttenuation"
            placeholder="下墙体衰减"
          ></el-input>
        </el-form-item>
        <el-form-item label="左下角">
          <el-col :span="11">
            <el-form-item prop="xleftbmetre" label="X">
              <el-input maxlength="16" style v-model="addRoomForm.xleftbmetre"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item prop="yleftbmetre" label="y">
              <el-input prop="yleftbmetre" maxlength="16" style v-model="addRoomForm.yleftbmetre"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="右上角">
          <el-col :span="11">
            <el-form-item prop="xrighttmetre" label="X">
              <el-input maxlength="16" v-model="addRoomForm.xrighttmetre"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item prop="yrighttmetre" label="y">
              <el-input maxlength="16" v-model="addRoomForm.yrighttmetre"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="RoomFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRoomform('ruleRoomForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加床位 -->
    <el-dialog title="添加床位" :visible.sync="BedFormVisible" :closeOnClickModal="false">
      <el-form :rules="addBedFormRule" ref="ruleBedForm" :model="addBedForm" label-width="90px">
        <el-form-item label="床位名称" prop="name">
          <el-input maxlength="32" v-model="addBedForm.name"></el-input>
        </el-form-item>
        <el-form-item label="床位编码" prop="code">
          <el-input maxlength="32" v-model="addBedForm.code"></el-input>
        </el-form-item>
        <el-form-item label="床位描述">
          <el-input maxlength="50" v-model="addBedForm.beddesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="BedFormVisible= false">取 消</el-button>
        <el-button type="primary" @click="submitBedform('ruleBedForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 内容头部 -->
    <div class="addHeader">
      <el-button v-show="level=='0'" class="addHeaderTitle" plain>当前所在：未选择</el-button>
      <el-button v-show="level=='1'" class="addHeaderTitle" plain>院：{{nowlabel}}(可对该院下建筑进行操作)</el-button>
      <el-button v-show="level=='2'" class="addHeaderTitle" plain>建筑：{{nowlabel}}(可对该建筑下楼层进行操作)</el-button>
      <el-button v-show="level=='3'" class="addHeaderTitle" plain>楼层：{{nowlabel}}(可对该楼层下房间进行操作)</el-button>
      <el-button v-show="level=='4'" class="addHeaderTitle" plain>房间：{{nowlabel}}(可对该房间下床位进行操作)</el-button>
      <el-button
        v-show="level!='0'&&level!='5'"
        class="addHeaderBtn"
        type="primary"
        round
        @click="opendialog"
      >添加</el-button>
    </div>
    <!-- 结构列表展示 -->
    <div class="build-list-coent">
      <div v-for="item in ContentData" :key="item.value" @dblclick="inNext(item)">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{item.label}}</span>
            <el-button
              style="float: right; padding: 3px 0;margin-left:15px;"
              type="text"
              @click.stop="remove(item)"
            >删除</el-button>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click.stop="updataCard(item)"
            >编辑</el-button>
          </div>
          <li>
            <span>编码：</span>
            <span v-show="item.code">{{item.code}}</span>
            <span v-show="item.floorcode">{{item.floorcode}}</span>
            <span v-show="item.roomcode">{{item.roomcode}}</span>
          </li>
          <li class="desc">
            <span>备注：</span>
            <span v-show="item.builddesc">{{item.builddesc}}</span>
            <span v-show="item.floordesc">{{item.floordesc}}</span>
            <span v-show="item.roomdesc">{{item.roomdesc}}</span>
            <span v-show="item.beddesc">{{item.beddesc}}</span>
          </li>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    // 楼层填写左下角时校验
    var validateAddFloorFormRuleXleftbmetre = (rule, value, callback) => {
      if (
        Number(value) > Number(this.addFloorForm.xrighttmetre) &&
        this.addFloorForm.xrighttmetre != ""
      ) {
        callback(new Error("不可大于右上角X坐标"));
      } else if (
        Number(value) == Number(this.addFloorForm.xrighttmetre) &&
        this.addFloorForm.xrighttmetre != ""
      ) {
        callback(new Error("不可等于右上角X坐标"));
      } else {
        callback();
      }
    };
    var validateAddFloorFormRuleYleftbmetre = (rule, value, callback) => {
      if (
        Number(value) > Number(this.addFloorForm.yrighttmetre) &&
        this.addFloorForm.yrighttmetre != ""
      ) {
        callback(new Error("不可大于右上角Y坐标"));
      } else if (
        Number(value) == Number(this.addFloorForm.yrighttmetre) &&
        this.addFloorForm.yrighttmetre != ""
      ) {
        callback(new Error("不可等于右上角Y坐标"));
      } else {
        callback();
      }
    };
    // 楼层填写右上角时校验
    var validateAddFloorFormRuleXrighttmetre = (rule, value, callback) => {
      if (value == 0) {
        callback(new Error("右上角不可为0"));
      } else {
        if (Number(value) < Number(this.addFloorForm.xleftbmetre)) {
          callback(new Error("不可小于左下角X坐标"));
        } else if (Number(value) == Number(this.addFloorForm.xleftbmetre)) {
          callback(new Error("不可等于左下角X坐标"));
        } else {
          callback();
        }
      }
    };
    var validateAddFloorFormRuleYrighttmetre = (rule, value, callback) => {
      if (Number(value) < Number(this.addFloorForm.yleftbmetre)) {
        callback(new Error("不可小于左下角Y坐标"));
      } else if (Number(value) == Number(this.addFloorForm.yleftbmetre)) {
        callback(new Error("不可等于左下角Y坐标"));
      } else {
        callback();
      }
    };
    // 房间填写左下角时校验
    var validateAddRoomFormRuleXleftbmetre = (rule, value, callback) => {
      if (
        Number(value) > Number(this.addRoomForm.xrighttmetre) &&
        this.addRoomForm.xrighttmetre != ""
      ) {
        callback(new Error("不可大于右上角X坐标"));
      } else if (
        Number(value) == Number(this.addRoomForm.xrighttmetre) &&
        this.addRoomForm.xrighttmetre != ""
      ) {
        callback(new Error("不可等于右上角X坐标"));
      } else {
        callback();
      }
    };
    var validateAddRoomFormRuleYleftbmetre = (rule, value, callback) => {
      if (
        Number(value) > Number(this.addRoomForm.yrighttmetre) &&
        this.addRoomForm.yrighttmetre != ""
      ) {
        callback(new Error("不可大于右上角Y坐标"));
      } else if (
        Number(value) == Number(this.addRoomForm.yrighttmetre) &&
        this.addRoomForm.yrighttmetre != ""
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
        if (Number(value) < Number(this.addRoomForm.xleftbmetre)) {
          callback(new Error("不可小于左下角X坐标"));
        } else if (Number(value) == Number(this.addRoomForm.xleftbmetre)) {
          callback(new Error("不可等于左下角X坐标"));
        } else {
          callback();
        }
      }
    };
    var validateAddRoomFormRuleYrighttmetre = (rule, value, callback) => {
      if (Number(value) < Number(this.addRoomForm.yleftbmetre)) {
        callback(new Error("不可小于左下角Y坐标"));
      } else if (Number(value) == Number(this.addRoomForm.yleftbmetre)) {
        callback(new Error("不可等于左下角Y坐标"));
      } else {
        callback();
      }
    };
    return {
      // 建筑信息
      BuildFormVisible: false,
      addBuildForm: { name: "", code: "", builddesc: "" },
      addBuildFormRule: {
        name: [
          { required: true, message: "请输入建筑名称", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入编码", trigger: "blur" },
        ],
      },
      updataBuildForm: {},
      updataBuildFormRule: [],
      // 楼层信息
      FloorFormVisible: false,
      addFloorForm: {
        floorname: "",
        floorcode: "",
        floordesc: "",
        xleftbmetre: "",
        yleftbmetre: "",
        xrighttmetre: "",
        yrighttmetre: "",
      },
      addFloorFormRule: {
        floorname: [
          { required: true, message: "请输入楼层名称", trigger: "blur" },
        ],
        floorcode: [
          { required: true, message: "请输入编码", trigger: "blur" },
        ],
        xleftbmetre: [
          { required: true, message: "请输入左下角X坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddFloorFormRuleXleftbmetre,
            trigger: "blur",
          },
        ],
        yleftbmetre: [
          { required: true, message: "请输入左下角Y坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddFloorFormRuleYleftbmetre,
            trigger: "blur",
          },
        ],
        xrighttmetre: [
          { required: true, message: "请输入右上角X坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddFloorFormRuleXrighttmetre,
            trigger: "blur",
          },
        ],
        yrighttmetre: [
          { required: true, message: "请输入右上角Y坐标", trigger: "blur" },
          {
            pattern: /^\d{1,4}\.{0,1}\d{0,3}$/,
            message: "坐标格式为整数4位以内，小数三位以内",
            trigger: "blur",
          },
          {
            validator: validateAddFloorFormRuleYrighttmetre,
            trigger: "blur",
          },
        ],
      },
      updataFloorForm: {},
      updataFloorRule: [],
      // 房间信息
      croom: [],
      leftroomid: [],
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
      RoomFormVisible: false,
      addRoomForm: {
        level: "",
        roomname: "",
        roomcode: "",
        roomdesc: "",
        nursinglevel: "",
        xleftbmetre: "",
        yleftbmetre: "",
        xrighttmetre: "",
        yrighttmetre: "",
        type: "",
        LeftWallAttenuation: "",
        RightWallAttenuation: "",
        UpperWallAttenuation: "",
        LowerWallAttenuation: "",
        roombasestationnum: "",
      },
      addRoomFormRule: {
        roomname: [
          { required: true, message: "请输入房间号", trigger: "blur" },
        ],
        roomcode: [
          { required: true, message: "请输入编码", trigger: "blur" },
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
          { required: true, message: "请输入左下角X坐标", trigger: "blur" },
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
          { required: true, message: "请输入左下角Y坐标", trigger: "blur" },
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
          { required: true, message: "请输入右上角X坐标", trigger: "blur" },
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
          { required: true, message: "请输入右上角Y坐标", trigger: "blur" },
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
      updataRoomForm: {},
      updataRoomRule: [],
      // 床位信息
      BedFormVisible: false,
      addBedForm: { name: "", code: "", beddesc: "" },
      addBedFormRule: {
        name: [
          { required: true, message: "请输入床位名称", trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入编码", trigger: "blur" },
        ],
      },
      updataBedForm: {},
      updataBedFormRule: [],
    };
  },
  computed: {
    ...mapState({
      // 深度
      level: (state) => state.beadhouse.level,
      // 当前父级id
      nowParentId: (state) => state.beadhouse.nowParentId,
      // 当前父级名称
      nowlabel: (state) => state.beadhouse.nowlabel,
      // 选中内容
      ContentData: (state) => state.beadhouse.ContentData,
    }),
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
    inNext(data) {
      this.$store.commit("changeLevel", data.level);
      this.$store.commit("changeNowParentId", data.value);
      this.$store.commit("changeNowNowlabel", data.label);
      this.$store.commit("changeContent", data.children);
    },
    // 打开增加弹窗
    opendialog() {
      switch (Number(this.level) + 1) {
        case 1:
          break;
        case 2:
          this.BuildFormVisible = true;
          break;
        case 3:
          this.FloorFormVisible = true;
          break;
        case 4:
          this.RoomFormVisible = true;
          break;
        case 5:
          this.BedFormVisible = true;
          break;
      }
    },
    // 增加建筑
    submitBuildForm(formName) {
      // 向增加建筑表单中添加院id
      this.addBuildForm.nursinghomeid = this.nowParentId;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("building_insertBuilding", {
              data: this.addBuildForm,
              userid: this.$store.state.token,
            })
            .then((res) => {
              if (res === "yes") {
                this.addBuildForm = { name: "", code: "", builddesc: "" };
                this.BuildFormVisible = false;
              }
            });
        } else {
          return false;
        }
      });
    },
    // 增加楼层
    submitFloorform(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("floor_insertFloor", {
              data: this.addFloorForm,
              userid: this.$store.state.token,
              id: this.nowParentId,
            })
            .then((res) => {
              if (res === "yes") {
                this.addFloorForm = {
                  floorname: "",
                  floorcode: "",
                  floordesc: "",
                  xleftbmetre: "",
                  yleftbmetre: "",
                  xrighttmetre: "",
                  yrighttmetre: "",
                };
                this.FloorFormVisible = false;
              }
            });
        } else {
          return false;
        }
      });
    },
    // 增加房间
    submitRoomform(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.leftroomid[3] == undefined) {
            this.addRoomForm.leftroomid = "";
          } else {
            this.addRoomForm.leftroomid = this.leftroomid[3];
          }
          if (this.rightroomid[3] == undefined) {
            this.addRoomForm.rightroomid = "";
          } else {
            this.addRoomForm.rightroomid = this.rightroomid[3];
          }

          if (this.upperroomid[3] == undefined) {
            this.addRoomForm.upperroomid = "";
          } else {
            this.addRoomForm.upperroomid = this.upperroomid[3];
          }

          if (this.lowerroomid[3] == undefined) {
            this.addRoomForm.lowerroomid = "";
          } else {
            this.addRoomForm.lowerroomid = this.lowerroomid[3];
          }
          this.$store
            .dispatch("room_insertRoom", {
              data: this.addRoomForm,
              userid: this.$store.state.token,
              id: this.nowParentId,
            })
            .then((res) => {
              if (res === "yes") {
                this.addRoomForm = {
                  level: "",
                  roomname: "",
                  roomcode: "",
                  roomdesc: "",
                  nursinglevel: "",
                  xleftbmetre: "",
                  yleftbmetre: "",
                  xrighttmetre: "",
                  yrighttmetre: "",
                  type: "",
                  LeftWallAttenuation: "",
                  RightWallAttenuation: "",
                  UpperWallAttenuation: "",
                  LowerWallAttenuation: "",
                  roombasestationnum: "",
                };
                this.RoomFormVisible = false;
              }
            });
        } else {
          return false;
        }
      });
    },
    // 增加床位
    submitBedform(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("bed_insertBed", {
              data: this.addBedForm,
              userid: this.$store.state.token,
              id: this.nowParentId,
            })
            .then((res) => {
              if (res === "yes") {
                this.BedFormVisible = false;
                this.addBedForm = { name: "", code: "", beddesc: "" };
              }
            });
        } else {
          return false;
        }
      });
    },
    // 修改结构
    updataCard(item) {
      switch (item.level) {
        case "1":
          break;
        case "2":
          this.$store.commit("changeUpdataContent", item);
          this.$store.commit("openBuild");
          break;
        case "3":
          this.$store.commit("changeUpdataContent", item);
          this.$store.commit("openFloor");
          break;
        case "4":
          this.$store.commit("changeUpdataContent", item);
          this.$store.commit("openRoom");
          break;
        case "5":
          this.$store.commit("changeUpdataContent", item);
          this.$store.commit("openbed");
          break;
      }
    },
    // 删除结构
    remove(item) {
      this.$confirm("即将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          switch (item.level) {
            case "1":
              break;
            case "2":
              this.$store.dispatch("buildin_delBuilding", {
                id: item.id,
                userid: this.$store.state.token,
              });

              break;
            case "3":
              this.$store.dispatch("floor_delFloor", {
                id: item.id,
                userid: this.$store.state.token,
              });
              break;
            case "4":
              this.$store.dispatch("room_delRoom", {
                id: item.id,
                userid: this.$store.state.token,
              });
              break;
            case "5":
              this.$store.dispatch("bed_delBed", {
                id: item.id,
                userid: this.$store.state.token,
              });
              break;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.build-list {
  height: 100%;
}
.addHeader {
  height: 8%;
}
.addHeaderTitle {
  float: left;
}
.addHeaderBtn {
  float: right;
}
.build-list-coent {
  border-top: 1px solid #e4e7ed;
  padding-top: 10px;
  height: 92%;
  overflow-y: auto;
}
.box-card {
  float: left;
  margin-right: 2%;
  margin-bottom: 20px;
  height: 198px;
  width: 22%;
}
.desc {
  height: 88px;
  overflow-y: auto;
}
</style>
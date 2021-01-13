<template>
  <div class="zhuinfo">
    <button type="button" class="baocun el-button el-button--success is-circle" @click="baocun">
      <!---->
      <i class="el-icon-check"></i>
      <!---->
    </button>
    <table>
      <tr style="height:68px">
        <td style="width:80px">住院号</td>
        <td style="width:392px;">
          <el-input
            maxlength="32"
            @blur="cZhuyuanhao"
            style="width:235px;"
            v-model="yaopost.hospitalid"
            placeholder="请输入内容"
          ></el-input>
          <br />
          <span class="idZhuyuanhao" v-show="zhuyuanhao" style="color:red;padding-left:74px;">请输入数字！</span>
        </td>
        <td style="width:100px">床位</td>
        <td style="width:392px">
          <!-- <el-input style="width:235px" v-model="yaopost.roomid" placeholder="请输入内容"></el-input> -->

          <el-cascader style="width:235px;" v-model="roomif" :options="options"></el-cascader>
        </td>
        <td style="width:100px">所属医生</td>
        <td>
          <el-input maxlength="32" style="width:235px" v-model="yaopost.doctor" placeholder="请输入内容"></el-input>
        </td>
      </tr>
      <tr style="height:68px">
        <td style="width:100px">备注</td>
        <td>
          <el-input maxlength="50" style="width:235px" v-model="yaopost.remark" placeholder="请输入内容"></el-input>
        </td>
        <!-- <td style="width:100px">是否在院</td>
        <td>
          <el-select v-model="yaopost.isinhospital" placeholder="请选择">
            <el-option
              v-for="item in zaiyuanstate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>-->
        <td style="width:100px">入院时间</td>
        <td style="width:392px">
          <el-date-picker
            style="width:235px"
            v-model="yaopost.admissiondate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </td>
        <td>护理等级</td>
        <td>
          <el-select style="width:235px;" v-model="yaopost.nursinglevel" placeholder="请选择">
            <el-option
              v-for="item in grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr style="height:68px">
        <td style="width:100px">健康状况</td>
        <td>
          <el-select style="width:235px;" v-model="yaopost.health" placeholder="请选择">
            <el-option
              v-for="item in Healthy"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td style="width:100px">身体状况陈述</td>
        <td>
          <el-input
            maxlength="50"
            style="width:235px"
            v-model="yaopost.physicalcondition"
            placeholder="请输入内容"
          ></el-input>
        </td>
        <td style="width:100px">照护重点</td>
        <td>
          <el-input
            maxlength="50"
            style="width:235px"
            v-model="yaopost.carepoint"
            placeholder="请输入内容"
          ></el-input>
        </td>
      </tr>
      <tr style="height:74px">
        <td style="width:100px">饮食禁忌</td>
        <td>
          <el-input
            maxlength="50"
            style="width:235px"
            v-model="yaopost.diettaboo"
            placeholder="请输入内容"
          ></el-input>
        </td>
        <td>血型</td>
        <td>
          <el-select style="width:235px;" v-model="yaopost.bloodtype" placeholder="未知">
            <el-option
              v-for="item in blood"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td style="width:100px">药物反应</td>
        <td>
          <el-input
            maxlength="50"
            style="width:235px"
            v-model="yaopost.drugreaction"
            placeholder="请输入内容"
          ></el-input>
        </td>
      </tr>
      <tr style="height:74px">
        <td style="width:100px">编号</td>
        <td style="width:392px">
          <el-input disabled style="width:235px" v-model="yaopost.code" placeholder="请输入内容"></el-input>
        </td>
        <td>高压报警值</td>
        <td>
          <span>高值：</span>
          <el-input
            maxlength="8"
            size="mini"
            style="width:66px;margin-right:10px;"
            @blur="cXueyagao"
            v-model="yaopost.upperhypertension"
            placeholder="请输入"
          ></el-input>
          <span>低值：</span>
          <el-input
            maxlength="8"
            size="mini"
            style="width:66px"
            @blur="cXueyagao"
            v-model="yaopost.lowerhypertension"
            placeholder="请输入"
          ></el-input>
          <br />
          <span class="idXueyagao" v-show="xueyagao" style="color:red;padding-left:74px">请输入数字！</span>
        </td>
        <td style="width:100px">低压报警值</td>
        <td>
          <span>高值：</span>
          <el-input
            maxlength="8"
            size="mini"
            style="width:66px;margin-right:10px;"
            @blur="cXueyadi"
            v-model="yaopost.upperhypotension"
            placeholder="请输入"
          ></el-input>
          <span>低值：</span>
          <el-input
            maxlength="8"
            size="mini"
            style="width:66px"
            @blur="cXueyadi"
            v-model="yaopost.lowerhypotension"
            placeholder="请输入"
          ></el-input>

          <span class="idXueyagao" v-show="xueyadi" style="color:red;padding-left:74px">请输入数字！</span>
        </td>
      </tr>
      <tr style="height:74px">
        <td style="width:100px">体温报警高值</td>
        <td>
          <el-input
            maxlength="8"
            style="width:235px"
            @blur="cTiwengao"
            v-model="yaopost.uppertemperature"
            placeholder="请输入内容"
          ></el-input>
          <br />
          <span class="idXueyagao" v-show="tiwengao" style="color:red;padding-left:74px">请输入数字！</span>
        </td>
        <td style="width:100px">体温报警低值</td>
        <td>
          <el-input
            maxlength="8"
            style="width:235px"
            @blur="cTiwendi"
            v-model="yaopost.lowertemperature"
            placeholder="请输入内容"
          ></el-input>
          <br />
          <span class="idXueyagao" v-show="tiwendi" style="color:red;padding-left:74px">请输入数字！</span>
        </td>
        <td style="width:100px">心率报警低值</td>
        <td>
          <el-input
            maxlength="8"
            style="width:235px"
            @blur="cXinlvdi"
            v-model="yaopost.lowerheartrate"
            placeholder="请输入内容"
          ></el-input>
          <br />
          <span class="idXueyagao" v-show="xinlvdi" style="color:red;padding-left:74px">请输入数字！</span>
        </td>
      </tr>
      <tr style="height:74px">
        <td style="width:100px">心率报警高值</td>
        <td>
          <el-input
            maxlength="8"
            style="width:235px"
            @blur="cXinlvgao"
            v-model="yaopost.upperheartrate"
            placeholder="请输入内容"
          ></el-input>
          <br />
          <span class="idXueyagao" v-show="xinlvgao" style="color:red;padding-left:74px">请输入数字！</span>
        </td>

        <td style="width:100px"></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 床位属性对象
      options: [],
      zhuyuanhao: false,
      xueyagao: false,
      xueyadi: false,
      xinlvgao: false,
      xinlvdi: false,
      tiwengao: false,
      tiwendi: false,
      yaopost: {
        hospitalid: "",
        code: "",
        roomid: "",
        bedid: "",
        affiliateddoctor: "",
        remark: "",
        isinhospital: "",
        nursinglevel: "",
        health: "",
        physicalcondition: "",
        carepoint: "",
        diettaboo: "",
        bloodtype: "",
        drugreaction: "",
        id: this.did,
        admissiondate: "",
        upperhypertension: "",
        lowerhypertension: "",

        upperhypotension: "",
        lowerhypotension: "",

        uppertemperature: "",
        lowertemperature: "",
        upperhartrate: "",
        lowerhartrate: "",
      },
      // 存储老人位置数组
      roomif: [],
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
      Healthy: [
        {
          value: "优秀",
          label: "优秀",
        },
        {
          value: "良好",
          label: "良好",
        },
        {
          value: "较差",
          label: "较差",
        },
      ],
      zaiyuanstate: [
        {
          value: "0",
          label: "在院",
        },
        {
          value: "2",
          label: "外出",
        },
        {
          value: "1",
          label: "离院",
        },
      ],
      blood: [
        {
          value: "A型",
          label: "A型",
        },
        {
          value: "B型",
          label: "B型",
        },
        {
          value: "O型",
          label: "O型",
        },
        {
          value: "AB型",
          label: "AB型",
        },
        {
          value: "Rh阴性A型",
          label: "Rh阴性A型",
        },
        {
          value: "Rh阴性B型",
          label: "Rh阴性B型",
        },
        {
          value: "Rh阴性O型",
          label: "Rh阴性O型",
        },
        {
          value: "Rh阴性AB型",
          label: "Rh阴性AB型",
        },
      ],
      xinyaopost: "",
    };
  },
  props: {
    did: null,
  },
  created() {
    console.log("是否");
    // 获取有空余床位的树形结构
    this.$ajax
      .post(
        process.env.API_HOST + "/bed/getNoPersonBedTree",
        `personId=${this.did}`
      )
      .then((respones) => {
        this.options = respones.data;
      });
    // 获取老人所有信息
    this.$ajax
      .post(process.env.API_HOST + "/person/getPersonById", `id=${this.did}`)
      .then((respones) => {
        this.yaopost = respones.data.prnPerson;
        this.roomif = respones.data.positionArr;
      });
  },
  watch: {
    yaopost: {
      handler(newName, oldName) {
        this.xinyaopost = newName;
      },
      deep: true,
    },
    did(val) {
      // 获取有空余床位的树形结构
      this.$ajax
        .post(
          process.env.API_HOST + "/bed/getNoPersonBedTree",
          `personId=${this.did}`
        )
        .then((respones) => {
          this.options = respones.data;
        });
      // 获取人员信息
      this.$ajax
        .post(process.env.API_HOST + "/person/getPersonById", `id=${this.did}`)
        .then((respones) => {
          console.log(respones.data);
          this.yaopost = respones.data.prnPerson;
          this.roomif = respones.data.positionArr;
        });
    },
  },
  methods: {
    cZhuyuanhao() {
      var zyh = /^\d*\.?\d+$/;
      if (
        zyh.test(this.yaopost.hospitalid) ||
        this.yaopost.hospitalid == "" ||
        this.yaopost.hospitalid == undefined
      ) {
        this.zhuyuanhao = false;
      } else {
        this.zhuyuanhao = true;
      }
    },
    cXueyagao() {
      var xyg = /^\d*\.?\d+$/;
      if (
        (xyg.test(this.yaopost.upperhypertension) ||
          this.yaopost.upperhypertension == "" ||
          this.yaopost.upperhypertension == undefined) &&
        (xyg.test(this.yaopost.lowerhypertension) ||
          this.yaopost.lowerhypertension == "" ||
          this.yaopost.lowerhypertension == undefined)
      ) {
        this.xueyagao = false;
      } else {
        this.xueyagao = true;
      }
    },
    cXueyadi() {
      var xyd = /^\d*\.?\d+$/;
      if (
        (xyd.test(this.yaopost.upperhypotension) ||
          this.yaopost.upperhypotension == "" ||
          this.yaopost.upperhypotension == undefined) &&
        (xyd.test(this.yaopost.lowerhypotension) ||
          this.yaopost.lowerhypotension == "" ||
          this.yaopost.lowerhypotension == undefined)
      ) {
        this.xueyadi = false;
      } else {
        this.xueyadi = true;
      }
    },
    cTiwengao() {
      var twg = /^\d*\.?\d+$/;
      if (
        twg.test(this.yaopost.uppertemperature) ||
        this.yaopost.uppertemperature == "" ||
        this.yaopost.uppertemperature == undefined
      ) {
        this.tiwengao = false;
      } else {
        this.tiwengao = true;
      }
    },
    cTiwendi() {
      var twd = /^\d*\.?\d+$/;
      if (
        twd.test(this.yaopost.lowertemperature) ||
        this.yaopost.lowertemperature == "" ||
        this.yaopost.lowertemperature == undefined
      ) {
        this.tiwendi = false;
      } else {
        this.tiwendi = true;
      }
    },
    cXinlvgao() {
      var xlg = /^\d*\.?\d+$/;
      if (
        xlg.test(this.yaopost.upperheartrate) ||
        this.yaopost.upperheartrate == "" ||
        this.yaopost.upperheartrate == undefined
      ) {
        this.xinlvgao = false;
      } else {
        this.xinlvgao = true;
      }
    },
    cXinlvdi() {
      var xld = /^\d*\.?\d+$/;
      if (
        xld.test(this.yaopost.lowerheartrate) ||
        this.yaopost.lowerheartrate == "" ||
        this.yaopost.lowerheartrate == undefined
      ) {
        this.xinlvdi = false;
      } else {
        this.xinlvdi = true;
      }
    },
    baocun() {
      if (
        this.zhuyuanhao == false &&
        this.xueyagao == false &&
        this.xueyadi == false &&
        this.xinlvgao == false &&
        this.xinlvdi == false &&
        this.tiwengao == false &&
        this.tiwendi == false
      ) {
        this.yaopost.roomid = this.roomif[3];
        this.yaopost.bedid = this.roomif[4];
        this.$ajax
          .post(
            process.env.API_HOST + "/person/updatePerson",
            `person=${JSON.stringify(this.xinyaopost)}&userid=${
              this.$store.state.token
            }`
          )
          .then((respones) => {
            console.log(respones.data);
            if (respones.data.state == "success") {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              // 获取有空余床位的树形结构
              // this.$ajax
              //   .post(process.env.API_HOST + "/bed/getNoPersonBedTree")
              //   .then(respones => {
              //     this.options = respones.data;
              //   });
              // 更新快捷信息卡
              this.$store.dispatch("changecardfield", this.did);
              this.$store.dispatch("person_getPersonList", {
                id: "",
                name: "",
                sex: "",
                roomN: "",
                state: "",
                hasDevice: "",
              });
              // 一键入院状态
              if (this.$store.state.hospitalshow) {
                this.$store.state.hospitalshowactive = true;
                this.$store.state.activeNames = "5";
                this.$store.state.actives = 5;
              }
            } else {
              this.$message({
                type: "warning",
                message: respones.data.msg,
              });
            }
          });
      } else {
        this.$message({
          type: "warning",
          message: "保存失败",
        });
      }
    },
  },
};
</script>
<style>
.zhuinfo table {
  border: none;
}
.baocun {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 999;
}
</style>


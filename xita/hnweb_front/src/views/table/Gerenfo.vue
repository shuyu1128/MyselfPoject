<template>
  <div class="ginfo">
    <button type="button" class="baocun el-button el-button--success is-circle" @click="baocun">
      <!---->
      <i class="el-icon-check"></i>
      <!---->
    </button>
    <table>
      <tr style="height:80px">
        <td style="width:100px">名字</td>
        <td style="width:392px">
          <el-input
            @blur="cMingzi"
            style="width:235px"
            maxlength="16"
            v-model="formzong.fullname  "
            placeholder="请输入内容"
          ></el-input>
          <br />
          <span class="idMingzi" v-show="mingzi" style="color:red;padding-left:74px">名称不能为空！</span>
        </td>
        <td style="width:100px">身份证号</td>
        <td style="width:392px">
          <el-input
            maxlength="18"
            style="width:235px"
            @blur="cShenfenzhenghao"
            v-model="formzong.idcard"
            placeholder="请输入内容"
          ></el-input>
          <br />
          <span
            class="idShenfenzhenghao"
            v-show="shenfenzhenghao"
            style="color:red;padding-left:74px"
          >请输入正确的身份证号！</span>
        </td>
        <td style="width:100px">社保卡</td>
        <td>
          <el-input
            maxlength="32"
            style="width:235px"
            @blur="cShebaoka"
            v-model="formzong.insurancecard"
            placeholder="请输入内容"
          ></el-input>
          <br />
          <span class="idShebaoka" v-show="shebaoka" style="color:red;padding-left:74px">请输入数字！</span>
        </td>
      </tr>
      <tr style="height:80px">
        <td style="width:100px">性别</td>
        <td>
          <el-select v-model="formzong.sex " placeholder="请选择">
            <el-option
              v-for="item in sex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td style="width:100px">出生日期</td>
        <td>
          <el-date-picker
            style="width:235px"
            v-model="formzong.birthdate  "
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </td>
        <td style="width:100px">民族</td>
        <td>
          <el-input maxlength="32" style="width:235px" v-model="formzong.nation  " placeholder="请输入内容"></el-input>
        </td>
      </tr>
      <tr style="height:80px">
        <td>宗教</td>
        <td>
          <el-select v-model="formzong.religion" placeholder="请选择">
            <el-option
              v-for="(item,index) in Religions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td style="width:100px">籍贯</td>
        <td>
          <el-input maxlength="50" style="width:235px" v-model="formzong.origin" placeholder="请输入内容"></el-input>
        </td>
        <td style="width:100px">文化</td>
        <td>
          <el-select v-model="formzong.education" placeholder="请选择文化">
            <el-option
              v-for="item in Culture"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr style="height:80px">
        <td style="width:100px">户籍所在地</td>
        <td>
          <el-input maxlength="50" style="width:235px" v-model="formzong.census" placeholder="请输入内容"></el-input>
        </td>
        <td style="width:100px">详细地址</td>
        <td>
          <el-input maxlength="50" style="width:235px" v-model="formzong.detailaddr" placeholder="请输入内容"></el-input>
        </td>
        <td style="width:100px">医疗保险</td>
        <td>
          <el-select v-model="formzong.medicalinsurance" placeholder="请选择医疗保险">
            <el-option
              v-for="item in Medical"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr style="height:80px">
        <td style="width:100px">商业保险</td>
        <td>
          <el-input maxlength="50" style="width:235px" v-model="formzong.commercialinsurance" placeholder="请输入内容"></el-input>
        </td>

        <td style="width:100px">养老保险</td>
        <td>
          <el-input maxlength="50" style="width:235px" v-model="formzong.endowmeninsurance" placeholder="请输入内容"></el-input>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mingzi: false,
      shenfenzhenghao: false,
      shebaoka: false,
      sex: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      Religions: [
        {
          value: "无宗教",
          label: "无宗教",
        },
        {
          value: "佛教",
          label: "佛教",
        },
        {
          value: "基督教",
          label: "基督教",
        },
        {
          value: "伊斯兰教",
          label: "伊斯兰教",
        },
      ],
      Culture: [
        {
          value: "大学",
          label: "大学",
        },

        {
          value: "高职",
          label: "高职",
        },
        {
          value: "高中",
          label: "高中",
        },
        {
          value: "中专技校",
          label: "中专技校",
        },
        {
          value: "初中",
          label: "初中",
        },
        {
          value: "小学",
          label: "小学",
        },
        {
          value: "文盲或半文盲",
          label: "文盲或半文盲",
        },
      ],
      Medical: [
        {
          value: "城镇职工基本医疗保险",
          label: "城镇职工基本医疗保险",
        },

        {
          value: "新型农村合作医疗",
          label: "新型农村合作医疗",
        },
        {
          value: "城镇居民基本医疗保险",
          label: "城镇居民基本医疗保险",
        },
        {
          value: "铁路医疗保险",
          label: "铁路医疗保险",
        },
        {
          value: "商业保险",
          label: "商业保险",
        },
        {
          value: "自费",
          label: "自费",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },

      formzong: {
        birthdate: "",
        fullname: "",
        sex: "",
        idcard: "",
        insurancecard: "",
        nation: "",
        origin: "",
        census: "",
        detailaddr: "",
        commercialinsurance: "",
        endowmeninsurance: "",
        medicalinsurance: "",
        education: "",
        religion: "",
        id: this.did,
      },
      xinformz: "",
    };
  },
  props: {
    did: null,
  },
  created() {
    this.$ajax
      .post(process.env.API_HOST + "/person/getPersonById", `id=${this.did}`)
      .then((respones) => {
        this.formzong = respones.data.prnPerson;
      });
  },
  watch: {
    formzong: {
      handler(newName, oldName) {
        this.xinformz = newName;
      },
      deep: true,
    },
    did(val) {
      this.$ajax
        .post(process.env.API_HOST + "/person/getPersonById", `id=${this.did}`)
        .then((respones) => {
          this.formzong = respones.data.prnPerson;
        });
    },
  },
  methods: {
    cMingzi() {
      var mz = /^\s+$/;

      if (
        !mz.test(this.formzong.fullname) &&
        this.formzong.fullname !== "" &&
        this.formzong.fullname !== undefined
      ) {
        this.mingzi = false;
      } else {
        this.mingzi = true;
      }
    },

    cShenfenzhenghao() {
      var sfzh = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (
        sfzh.test(this.formzong.idcard) ||
        this.formzong.idcard == "" ||
        this.formzong.idcard == undefined
      ) {
        this.shenfenzhenghao = false;
      } else {
        this.shenfenzhenghao = true;
      }
    },
    cShebaoka() {
      var sbk = /^\d*\.?\d+$/;
      if (
        sbk.test(this.formzong.insurancecard) ||
        this.formzong.insurancecard == "" ||
        this.formzong.insurancecard == undefined
      ) {
        this.shebaoka = false;
      } else {
        this.shebaoka = true;
      }
    },
    baocun() {
      this.cMingzi();
      this.cShenfenzhenghao();
      this.cShebaoka();
      if (
        this.mingzi == false &&
        this.shenfenzhenghao == false &&
        this.shebaoka == false
      ) {
        this.$ajax
          .post(
            process.env.API_HOST + "/person/updatePerson",
            `person=${JSON.stringify(this.xinformz)}&userid=${
              this.$store.state.token
            }`
          )
          .then((respones) => {
            if (respones.data.state == "success") {
              this.$message({
                type: "success",
                message: "修改成功",
              });
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
                this.$store.state.activeNames = "2";
                this.$store.state.actives = 4;
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


<style scoped>
.ginfo table {
  border: none;
}
.ginfo {
  height: 500px;
}
.baocun {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 999;
}
</style>


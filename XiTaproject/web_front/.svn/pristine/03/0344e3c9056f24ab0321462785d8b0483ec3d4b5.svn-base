<template>
  <div class="ginfo">
    <div class="wugeren"></div>
    <table>
      <tr style="height:80px">
        <td style="width:100px">名字</td>
        <td style="width:392px">
          <el-input
            disabled
            style="width:235px;border:0px solid red;"
            v-model="formzong.fullname  "
            placeholder="请输入内容"
          ></el-input>
        </td>
        <td style="width:100px">身份证号</td>
        <td style="width:392px">
          <el-input disabled style="width:235px" v-model="formzong.idcard" placeholder="请输入内容"></el-input>
        </td>
        <td style="width:100px">社保卡</td>
        <td>
          <el-input
            disabled
            style="width:235px"
            v-model="formzong.insurancecard"
            placeholder="请输入内容"
          ></el-input>
        </td>
      </tr>
      <tr style="height:80px">
        <td style="width:100px">性别</td>
        <td>
          <el-select disabled v-model="formzong.sex " placeholder="请选择">
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
            disabled
            style="width:235px"
            v-model="formzong.birthdate  "
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </td>
        <td style="width:100px">民族</td>
        <td>
          <el-input disabled style="width:235px" v-model="formzong.nation  " placeholder="请输入内容"></el-input>
        </td>
      </tr>
      <tr style="height:80px">
        <td>宗教</td>
        <td>
          <el-select disabled v-model="formzong.religion" placeholder="请选择">
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
          <el-input disabled style="width:235px" v-model="formzong.origin" placeholder="请输入内容"></el-input>
        </td>
        <td style="width:100px">文化</td>
        <td>
          <el-select disabled v-model="formzong.education" placeholder="请选择文化">
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
          <el-input disabled style="width:235px" v-model="formzong.census" placeholder="请输入内容"></el-input>
        </td>
        <td style="width:100px">详细地址</td>
        <td>
          <el-input disabled style="width:235px" v-model="formzong.detailaddr" placeholder="请输入内容"></el-input>
        </td>
        <td style="width:100px">医疗保险</td>
        <td>
          <el-select disabled v-model="formzong.medicalinsurance" placeholder="请选择医疗保险">
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
          <el-input
            disabled
            style="width:235px"
            v-model="formzong.commercialinsurance"
            placeholder="请输入内容"
          ></el-input>
        </td>

        <td style="width:100px">养老保险</td>
        <td>
          <el-input
            disabled
            style="width:235px"
            v-model="formzong.endowmeninsurance"
            placeholder="请输入内容"
          ></el-input>
        </td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sex: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      Religions: [
        {
          value: "无宗教",
          label: "无宗教"
        },
        {
          value: "佛教",
          label: "佛教"
        },
        {
          value: "基督教",
          label: "基督教"
        },
        {
          value: "伊斯兰教",
          label: "伊斯兰教"
        }
      ],
      Culture: [
        {
          value: "大学",
          label: "大学"
        },

        {
          value: "高职",
          label: "高职"
        },
        {
          value: "高中",
          label: "高中"
        },
        {
          value: "中专技校",
          label: "中专技校"
        },
        {
          value: "初中",
          label: "初中"
        },
        {
          value: "小学",
          label: "小学"
        },
        {
          value: "文盲或半文盲",
          label: "文盲或半文盲"
        }
      ],
      Medical: [
        {
          value: "城镇职工基本医疗保险",
          label: "城镇职工基本医疗保险"
        },

        {
          value: "新型农村合作医疗",
          label: "新型农村合作医疗"
        },
        {
          value: "城镇居民基本医疗保险",
          label: "城镇居民基本医疗保险"
        },
        {
          value: "铁路医疗保险",
          label: "铁路医疗保险"
        },
        {
          value: "商业保险",
          label: "商业保险"
        },
        {
          value: "自费",
          label: "自费"
        },
        {
          value: "其他",
          label: "其他"
        }
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
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
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
        id: this.did
      },
      xinformz: ""
    };
  },
  props: {
    did: null
  },
  created() {
    console.log(this.did);
    if (this.did != undefined) {
      this.$ajax
        .post(process.env.API_HOST + "/person/getPersonById", `id=${this.did}`)
        .then(respones => {
          this.formzong = respones.data.prnPerson;
        });
    }
  },
  watch: {
    formzong: {
      handler(newName, oldName) {
        this.xinformz = newName;
      },
      deep: true
    },
    did(val) {
      console.log(val);
      if (val != undefined) {
        this.$ajax
          .post(
            process.env.API_HOST + "/person/getPersonById",
            `id=${this.did}`
          )
          .then(respones => {
            this.formzong = respones.data.prnPerson;
          });
      }
    }
  },
  methods: {}
};
</script>


<style>
.wugeren {
  width: 100%;
  height: 400px;
  position: absolute;
  z-index: 99;
  opacity: 0;
  background-color: red;
}
.el-input.is-disabled .el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #000;
  cursor: not-allowed;
}
.ginfo table {
  border: none;
}
/* .ginfo .el-input__inner{
    border:1px solid #fff;
    
} */
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


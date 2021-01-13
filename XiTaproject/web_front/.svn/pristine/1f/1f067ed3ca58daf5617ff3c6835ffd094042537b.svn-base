<template>
  <div id="wuzaiyuan">
    <div class="wuzai"></div>
    <table>
      <tr style="height:74px">
        <td style="width:100px">住院号</td>
        <td style="width:392px">
          <el-input disabled style="width:235px" v-model="yaopost.hospitalid" placeholder="请输入内容"></el-input>
        </td>
        <td style="width:100px">床位</td>
        <td style="width:392px">
          <!-- <el-input disabled style="width:235px" v-model="roomif" placeholder="请输入内容"></el-input> -->
          <div class="bedwei">{{roomif}}</div>
        </td>
        <td style="width:100px">所属医生</td>
        <td>
          <el-input disabled style="width:235px" v-model="yaopost.doctor" placeholder="请输入内容"></el-input>
        </td>
      </tr>
      <tr style="height:74px">
        <td style="width:100px">备注</td>
        <td>
          <el-input disabled style="width:235px" v-model="yaopost.remark" placeholder="请输入内容"></el-input>
        </td>
        <td style="width:100px">是否在院</td>
        <td>
          <el-select disabled v-model="yaopost.isinhospital" placeholder="请选择">
            <el-option
              v-for="item in zaiyuanstate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
        <td>护理等级</td>
        <td>
          <el-select disabled v-model="yaopost.nursinglevel" placeholder="请选择">
            <el-option
              v-for="item in grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </td>
      </tr>
      <tr style="height:74px">
        <td style="width:100px">健康状况</td>
        <td>
          <el-select disabled v-model="yaopost.health" placeholder="请选择">
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
            disabled
            style="width:235px"
            v-model="yaopost.physicalcondition"
            placeholder="请输入内容"
          ></el-input>
        </td>
        <td style="width:100px">照护重点</td>
        <td>
          <el-input disabled style="width:235px" v-model="yaopost.carepoint" placeholder="请输入内容"></el-input>
        </td>
      </tr>
      <tr style="height:74px">
        <td style="width:100px">饮食禁忌</td>
        <td>
          <el-input disabled style="width:235px" v-model="yaopost.diettaboo" placeholder="请输入内容"></el-input>
        </td>
        <td>血型</td>
        <td>
          <el-select disabled v-model="yaopost.bloodtype" placeholder="未知">
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
          <el-input disabled style="width:235px" v-model="yaopost.drugreaction" placeholder="请输入内容"></el-input>
        </td>
      </tr>
      <tr style="height:74px">
        <td style="width:100px">编号</td>
        <td style="width:392px">
          <el-input disabled style="width:235px" v-model="yaopost.code" placeholder="请输入内容"></el-input>
        </td>
        <td style="width:100px">入院时间</td>
        <td style="width:392px">
          <el-date-picker
            disabled
            style="width:235px"
            v-model="yaopost.admissiondate"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </td>
        <td>高压报警值</td>
        <td>
          <span>高值：</span><el-input disabled size="mini" style="width:69px;margin-right:10px;" v-model="yaopost.upperhypertension" placeholder="请输入"></el-input>
          <span>低值：</span><el-input disabled size="mini" style="width:69px" v-model="yaopost.lowerhypertension" placeholder="请输入"></el-input>
        </td>
      </tr>
      <tr style="height:74px">
        <td style="width:100px">低压报警值</td>
        <td>
          <span>高值：</span>
          <el-input
            disabled
            size="mini"
            style="width:69px;margin-right:10px;"
            v-model="yaopost.upperhypotension"
            placeholder="请输入"
          ></el-input>
          <span>低值：</span>
          <el-input
            disabled
            size="mini"
            style="width:69px"
            v-model="yaopost.lowerhypotension"
            placeholder="请输入"
          ></el-input>
        </td>

        <td style="width:100px">体温报警高值</td>
        <td>
          <el-input
            disabled
            style="width:235px"
            v-model="yaopost.uppertemperature"
            placeholder="请输入内容"
          ></el-input>
        </td>
        <td style="width:100px">体温报警低值</td>
        <td>
          <el-input
            disabled
            style="width:235px"
            v-model="yaopost.lowertemperature"
            placeholder="请输入内容"
          ></el-input>
        </td>
      </tr>
      <tr style="height:74px">
        <td style="width:100px">心率报警高值</td>
        <td>
          <el-input
            disabled
            style="width:235px"
            v-model="yaopost.upperheartrate"
            placeholder="请输入内容"
          ></el-input>
        </td>

        <td style="width:100px">心率报警低值</td>
        <td>
          <el-input
            disabled
            style="width:235px"
            v-model="yaopost.lowerheartrate"
            placeholder="请输入内容"
          ></el-input>
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
      yaopost: {
        hospitalld: "",
        code: "",
        roomif: "",
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
        uppertemperature: "",
        lowertemperature: "",
        upperheartrate: "",
        lowerheartrate: ""
      },
      roomif: "",
      i: 0,
      grade: [
        {
          value: "全自理",
          label: "全自理"
        },
        {
          value: "半自理",
          label: "半自理"
        },
        {
          value: "全介护",
          label: "全介护"
        }
      ],
      Healthy: [
        {
          value: "优秀",
          label: "优秀"
        },
        {
          value: "良好",
          label: "良好"
        },
        {
          value: "较差",
          label: "较差"
        }
      ],
      zaiyuanstate: [
        {
          value: "0",
          label: "在院"
        },
        {
          value: "2",
          label: "外出"
        },
        {
          value: "1",
          label: "离院"
        }
      ],
      blood: [
        {
          value: "A型",
          label: "A型"
        },
        {
          value: "B型",
          label: "B型"
        },
        {
          value: "O型",
          label: "O型"
        },
        {
          value: "AB型",
          label: "AB型"
        },
        {
          value: "Rh阴性A型",
          label: "Rh阴性A型"
        },
        {
          value: "Rh阴性B型",
          label: "Rh阴性B型"
        },
        {
          value: "Rh阴性O型",
          label: "Rh阴性O型"
        },
        {
          value: "Rh阴性AB型",
          label: "Rh阴性AB型"
        }
      ],
      xinyaopost: ""
    };
  },
  props: {
    did: null
  },
  created() {
    this.$ajax
      .post(process.env.API_HOST + "/bed/getNursingHomesBedTree")
      .then(res => {
        this.$ajax
          .post(
            process.env.API_HOST + "/person/getPersonById",
            `id=${this.did}`
          )
          .then(respones => {
            this.yaopost = respones.data.prnPerson;
            this.huoqu(res.data, respones.data.positionArr);
          });
      });
  },
  watch: {
    yaopost: {
      handler(newName, oldName) {
        this.xinyaopost = newName;
      },
      deep: true
    },
    did(val) {
      this.$ajax
        .post(process.env.API_HOST + "/bed/getNursingHomesBedTree")
        .then(res => {
          this.$ajax
            .post(
              process.env.API_HOST + "/person/getPersonById",
              `id=${this.did}`
            )
            .then(respones => {
              this.yaopost = respones.data.prnPerson;
              this.roomif = "";
              this.i = 0;
              this.huoqu(res.data, respones.data.positionArr);
            });
        });
    }
  },
  methods: {
    huoqu(arr, data) {
      // 根据老人树形数据筛选
      arr.forEach(element => {
        if (element.value == data[this.i]) {
          if (this.i != 0 && this.i < 5) {
            this.roomif += "  " + element.label;
          }
          this.i++;

          if (element.children) {
            this.huoqu(element.children, data);
          }
        }
      });
    }
  }
};
</script>
<style>
.wuzai {
  width: 100%;
  height: 510px;
  position: absolute;
  z-index: 99;
  opacity: 0;
  background-color: rebeccapurple;
}
.el-input.is-disabled .el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #000;
  cursor: not-allowed;
}
.zhuinfo table {
  border: none;
}
.baocun {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 999;
}
.bedwei {
  width: 218px;
  height: 38px;
  line-height: 38px;
  padding-left: 15px;
  background-color: #f5f7fa;
  border: 1px solid #e4e7ed;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  position: relative;
  z-index: 1;
}

.bedwei:hover {
  /* white-space: normal; */
  overflow: visible;
}
</style>


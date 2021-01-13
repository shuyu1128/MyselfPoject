<template>
  <div class="xiaxing">
      <el-select style="width:90px;margin-right:20px;" v-model="destTypevalue" placeholder="标识">
        <el-option
          v-for="item in destType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-select style="width:90px" v-model="value" placeholder="亮灯">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select style="margin-left:20px;" v-model="mainBasestationCodevalue" placeholder="请选择主机站">
      <el-option
        v-for="item in mainBasestationCode"
        :key="item.maincode"
        :label="item.mainname"
        :value="item.maincode"
      ></el-option>
    </el-select>
    <el-select style="margin-left: 221px;margin-top:20px;" v-model="basestationCodesvalue" multiple collapse-tags placeholder="请选择子基站">
      <el-option v-for="item in basestationCodes" :key="item.code" :label="item.name" :value="item.code"></el-option>
    </el-select>
      <!-- <el-button type="primary" style="margin-left:20px;" @click="controlLamp">确定</el-button> -->
      <!-- <el-input v-model="sensitivity" placeholder="请输入" style="width:100px;"></el-input> -->
      <el-button
        type="primary"
        style="margin-left:20px;margin-right:20px;"
        round
        @click="controlLamp"
      >确定</el-button>
    </div>

</template>

<script>
export default {
  data() {
    return {
        basestationCodes: [],
        basestationCodesvalue: '',
        mainBasestationCode: [],
      mainBasestationCodevalue: "",
        value: "",
      destTypevalue: "",
      destType: [
        {
          value: "01",
          label: "标识服务器"
        },
        {
          value: "02",
          label: "标识主板基站BBB版"
        },
        {
          value: "03",
          label: "标识主机站868/434无线模块"
        },
        {
          value: "04",
          label: "标识子机站868/434无线模块"
        },
        {
          value: "05",
          label: "标识子机站蓝牙模块"
        },
        {
          value: "06",
          label: "标识蓝牙手环"
        }
      ],
      options: [
        {
          value: "01",
          label: "接收闪灯"
        },
        {
          value: "02",
          label: "发送闪灯"
        },
        {
          value: "03",
          label: "长亮"
        },
        {
          value: "04",
          label: "长灭"
        },
        {
          value: "05",
          label: "反转"
        },
        {
          value: "06",
          label: "重启"
        }
      ]
    };
  },
  created() {
    // 查询全部主基站信息
    this.$ajax
      .post(
        process.env.API_HOST +
          "/basBasestationCheck/getBasMainbasestationPOList"
      )
      .then(respones => {
        console.log(respones.data, "主机站");
        this.mainBasestationCode = respones.data;
      });
  },
    watch:{
      mainBasestationCodevalue(val){
          this.basestationCodesvalue=[]

// 通过主基站查询子基站
 this.$ajax
      .post(
        process.env.API_HOST +
          "mainBasestation/getChildBasestationByMain",`mainBasestationCode=${val}`
      )
      .then(respones => {
        console.log(respones.data, "主机站下的子基站");
        this.basestationCodes = respones.data;
      });
      },

  },
  methods:{
      controlLamp() {
      // 亮灯
      this.$ajax
        .post(
          process.env.API_HOST + "/baseStationTransmission/controlLamp",
          `type=${this.value}&mainBasestationCode=${this.mainBasestationCodevalue}&basestationCodes=${this.basestationCodesvalue}&destType=${this.destTypevalue}&`
        )
        .then(res => {
          console.log(res.data);
          this.$message(res.data);
        });
    
    },
  }
};
</script>

<style>
.xiaxing {
  width: 500px;
  height: 300px;
  position: absolute;
  top: 200px;
  right: 0px;
}
</style>
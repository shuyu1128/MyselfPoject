<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-select
          style="margin-left:20px;"
          v-model="mainBasestationCodevalue"
          placeholder="请选择主机站"
        >
          <el-option
            v-for="item in mainBasestationCode"
            :key="item.maincode"
            :label="item.mainname"
            :value="item.maincode"
          ></el-option>
        </el-select>
        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible = true">添加</el-button>
      </div>
      <div v-for="o in zhubasestationCodes" :key="o.code" class="text item">{{o.name}}</div>
    </el-card>
    <el-dialog :close-on-click-modal="false" title="提示" :visible.sync="dialogVisible" width="30%">
      <el-select
        style="width:100%"
        v-model="basestationCodesvalue"
        multiple
        collapse-tags
        placeholder="请选择子基站"
      >
        <el-option
          v-for="item in basestationCodes"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertMainChildBasestation">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainBasestationCode: [],
      basestationCodes: [],
      basestationCodesvalue: "",
      mainBasestationCodevalue: "",
      zhubasestationCodes:[],
      sousuo: {
        code: "",
        name: ""
      },
      dialogVisible: false
    };
  },
  created() {
      // 查询全部子基站信息
    this.$ajax
      .post(
        process.env.API_HOST + "/basestation/getAllBasestation",
        `sousuo=${JSON.stringify(this.sousuo)}&floorid=`
      )
      .then(respones => {
        this.basestationCodes = respones.data;
        console.log(respones.data, "查询全部子基站");
      })
      .catch(function(error) {
        console.log(error);
      });
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
        this.zhubasestationCodes = respones.data;
      });
      }
  },
  methods:{
      insertMainChildBasestation(){
    
// 修改/添加主子基站关系
this.$ajax
      .post(
        process.env.API_HOST +
          "mainBasestation/insertMainChildBasestation",`mainBasestationCode=${this.mainBasestationCodevalue}&basestationCodes=${JSON.stringify(this.basestationCodesvalue)}`
      )
      .then(respones => {
          this.dialogVisible = false
          // 通过主基站查询子基站
 this.$ajax
      .post(
        process.env.API_HOST +
          "mainBasestation/getChildBasestationByMain",`mainBasestationCode=${this.mainBasestationCodevalue}`
      )
      .then(respones => {
        console.log(respones.data, "主机站下的子基站");
        this.zhubasestationCodes = respones.data;
      });
        console.log(respones.data, "修改关系结果");
      });
      }
 
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

/* .box-card {
    width: 480px;
  } */
</style>
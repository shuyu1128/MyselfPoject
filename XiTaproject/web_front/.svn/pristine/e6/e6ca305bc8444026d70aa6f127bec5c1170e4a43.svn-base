<template>
  <div class="rssi">
    <el-select style="margin-bottom:20px;" filterable v-model="value" placeholder="请选择基站" @change="Selection">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item.basestationBegin+'——'+item.basestationEnd"
        :value="item.id"
      ></el-option>
    </el-select>
    <span style="margin-left:20px;">{{defaultval}}</span>
    <el-input v-on:keyup.13.native="updata" style="margin-bottom:20px;width:235px;margin-right:20px;" v-model="input" placeholder="请输入修改值"></el-input>
    <el-button type="primary" @click="updata">修改</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      options: [],
      value: "",
      defaultval: "校正量",
      nowid: ""
    };
  },
  created() {
    this.$ajax
      .post(
        process.env.API_HOST + "/basBasestationCheck/getAllBasBasestationCheck"
      )
      .then(respones => {
        this.options = respones.data;
        console.log(respones.data, "结果");
      });
  },
  methods: {
    updata() {
      this.$ajax
        .post(
          process.env.API_HOST +
            "/basBasestationCheck/updateBasBasestationCheck",
          `checkId=${this.nowid}&checkValue=${this.input}`
        )
        .then(respones => {
          this.$ajax
            .post(
              process.env.API_HOST +
                "/basBasestationCheck/getAllBasBasestationCheck"
            )
            .then(respones => {
              this.options = respones.data;
            });
            this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.defaultval=this.input
          console.log(respones.data, "修改结果");
        });
    },
    Selection(data) {
      
      this.options.forEach(element => {
        if (element.id == data) {
          this.defaultval = element.rssi;
          this.input = element.rssi;
        }
      });
      this.nowid = data;
    }
  }
};
</script>
<style scoped>
.rssi {
  width: 500px;
  height: 300px;
  position: absolute;
  top: 20px;
  right: 0px;
}
</style>

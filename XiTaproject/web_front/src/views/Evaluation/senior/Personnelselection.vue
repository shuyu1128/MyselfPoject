<template>
  <div
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    aria-label="确认信息"
    class="el-message-box__wrapper"
    style="z-index: 206;"
  >
    <div class="el-message-box seniorindex_0-step1">
      <div class="el-message-box__header">
        <div class="el-message-box__title">
          <!---->
          <span>请输入长者姓名</span>
        </div>
      </div>
      <div class="el-message-box__content">
        <!---->
        <div class="el-message-box__message">
          <p></p>
          <div class="bain">
            <el-select
              v-model="state1"
              style="width:67%;"
              @visible-change="change"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in restaurants"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="el-message-box__input" style="display: none;">
          <div class="el-input">
            <!---->
            <input type="text" autocomplete="off" placeholder class="el-input__inner">
            <!---->
            <!---->
            <!---->
          </div>
          <div class="el-message-box__errormsg" style="visibility: hidden;"></div>
        </div>
      </div>
      <div class="el-message-box__btns">
        <button type="button" class="el-button el-button--default el-button--small" @click="close">
          <!---->
          <!---->
          <span>取消</span>
        </button>
        <el-button v-if="btn=='f'" type="primary" size="small" disabled @click="baocun">确定</el-button>
        <el-button v-if="btn=='t'" type="primary" size="small" @click="baocun">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btn: "f",
      restaurants: [],
      state1: this.$route.query.id,
    };
  },

  created() {
    this.$ajax
      .post(process.env.API_HOST+'/personProblem/getNoAssessmentPersonList')
      .then(respones => {
        this.restaurants = respones.data;
      })
  },
  mounted() {
    
    var el = document.querySelector(".el-message-box__wrapper");
    el.style.display = "block";
  },
updated(){
if(this.$route.query.id!=undefined){
      this.baocun()
    
    }
    
},
  methods: {
    change(a) {
      a !== true && this.state1 !== undefined ? (this.btn = "t") : (this.btn = "f");
    },
    baocun() {
      var el = document.querySelector(".el-message-box__wrapper");
      el.style.display = "none";
      this.$emit("childByValue", this.state1);
    },
    close() {
      this.$router.back(-1);
    }
  }
};
</script>
<style scoped>
.el-message-box__wrapper {
  position: absolute;
  background-color: #f2f2f2;
  display: block;
}
.el-scrollbar__wrap {
  z-index: 2147483647;
}
</style>
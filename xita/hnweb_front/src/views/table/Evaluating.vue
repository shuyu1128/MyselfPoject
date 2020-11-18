<template>
  <div class="evaluating">
    <Xiala v-on:childByValue="childByValue" />
    <div
      class="Evaluating-step2"
      style="height: 750px;width:23%;float:left;margin-left: 50px;overflow-y: auto; OVERFLOW-X:hidden;"
    >
      <div>
        <el-steps :space="100" direction="vertical" :active="active" finish-status="success">
          <el-step
            v-for="(item,index) in ti"
            :title="item.name"
            :description="item.xiang"
            :key="index"
          ></el-step>
        </el-steps>
      </div>
    </div>
    <el-card class="box-card Evaluating-step3" shadow="hover" style="position: relative;">
      <el-button-group style="position: absolute;bottom:20px;right: 25px;">
        <el-button v-if="upti" type="primary" icon="el-icon-arrow-left" @click="up">上一题</el-button>
        <el-button v-if="nextti" type="primary" @click="next">
          下一题
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
        <el-button v-if="submitda" type="primary" @click="next">
          提交
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
        <el-button v-if="baocun" type="primary" @click="nextbaocun">
          保存
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </el-button-group>

      <div slot="header" class="clearfix">
        <span style="font-size:20px">{{timu}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="again">重新答题</el-button>
      </div>

      <div class="diss_y">
        <el-radio-group v-if="rea" v-model="radio">
          <el-radio
            v-for="(o,index) in da"
            :key="index"
            class="text item"
            :label="o.id"
            style="display:block;margin-left: 30px;"
          >
            <span style="display: inline-block;width:300px">{{o.answer}}</span>
            <span class="sheng">{{o.desc}}</span>
          </el-radio>
        </el-radio-group>
        <li class="ruturn" v-else v-for="(item,index) in retrunAnswer" :key="index">
          <span>{{index+1}}.</span>
          <span id="hov">{{item.PROBLEM}}</span>
          <el-select v-model="item.ANSWERID" placeholder="请选择">
            <el-option
              v-for="(t,indexx) in item.ANSWERS"
              :key="indexx"
              :label="t.choicesubject"
              :value="t.id"
            ></el-option>
          </el-select>
          <!-- <span>{{item.CHOICESUBJECT}}</span>  -->
          <span>{{item.SCORE}}分</span>
        </li>
      </div>
    </el-card>
  </div>
</template>
<script>
var a;
import Xiala from "./Xiala.vue";
export default {
  components: {
    Xiala
  },
  inject: ["reload"],
  data() {
    return {
      upti: false,
      nextti: true,
      tap: 0,
      name: "",
      timu: "",
      da: "",
      ti: [],
      active: 0,
      radio: "",
      userda: [],
      zhenuserda: [],
      childByValuename: "",
      test: {},
      tiid: "",
      submitda: false,
      retrunAnswer: [],
      rea: true,
      shangradio: false,
      baocun: false
    };
  },
  beforeRouteLeave(to, form, next) {
    if (this.$store.state.hospitalshow) {
      if (to.name == "编辑" && this.$store.state.actives == 2) {
        next();
      } else {
        this.$confirm("入院未完成, 是否退出?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            next();
            this.$store.commit("closehospitalshow");
            this.$store.state.actives = 0;
            this.$store.state.activeNames = "1";
          })
          .catch(() => {
            next(false);
          });
      }
    } else {
      if (to.name == "编辑") {
        next();
      } else {
        if (this.childByValuename != "") {
          this.$confirm("答题未完成, 是否退出?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              next();
            })
            .catch(() => {
              next(false);
            });
        } else {
          next();
        }
      }
    }
  },
  created() {
    var laouserda = [];
    var sangradio = 1;
    this.$ajax
      .post(process.env.API_HOST + "/personProblem/getProblemList")
      .then(respones => {
        this.ti = respones.data.ti;
        this.timu = this.ti[0].name;
        this.da = this.ti[0].da;
        this.tiid = this.ti[0].id;
        console.log(respones.data.ti);
      });
  },
  watch: {
    tap(val) {
      if (val < this.ti.length - 1 && val > 0) {
        this.upti = true;
        this.nextti = true;
        this.submitda = false;
        this.baocun = false;
      } else if (val == this.ti.length - 1) {
        this.upti = true;
        this.nextti = false;
        this.submitda = true;
        this.baocun = false;
      } else if (val <= 0) {
        this.upti = false;
        this.nextti = true;
        this.submitda = false;
        this.baocun = false;
      } else if (val == this.ti.length) {
        this.upti = false;
        this.nextti = false;
        this.submitda = false;
        this.baocun = true;
      }
    },
    radio(val, oldval) {
      if (val == oldval) {
        this.shangradio = false;
      } else if (this.radio == "") {
        this.shangradio = false;
      } else {
        this.shangradio = true;
      }
    }
  },
  methods: {
    childByValue(val) {
      this.childByValuename = val;
    },
    up() {
      if (this.tap-- > 0) {
        this.active--;
        this.timu = this.ti[this.tap].name;
        this.da = this.ti[this.tap].da;
        this.tiid = this.ti[this.tap].id;
        this.radio = eval("this.test." + this.tiid);
        // console.log(this.ti[this.tap].id);
        // console.log(this.ti[this.tap].da);
        // console.log(this.ti[this.tap].name);
        // console.log(eval("this.test." + this.tiid))
        // console.log(this.tiid);
      }
    },
    nextbaocun() {
      var arr = [];
      for (var i = 0; i < this.retrunAnswer.length; i++) {
        arr.push(this.retrunAnswer[i].ANSWERID);
      }
      this.$confirm("即将保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$ajax
            .post(
              process.env.API_HOST + "/personProblem/saveAnswer",
              `personId=${this.childByValuename}&answerArry=${JSON.stringify(
                arr
              )}&type=save&userid=${this.$store.state.token}`
            )
            .then(respones => {
              this.$alert("共" + respones.data.total + "分", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  if (this.$store.state.hospitalshow) {
                    this.$store.state.actives = 2;
                    this.$store.state.activeNames = "3";
                    this.$router.push({
                      path: "/Details",
                      name: "编辑",
                      query: { id: this.childByValuename }
                    });
                  } else {
                    if (this.$route.query.id == undefined) {
                      this.reload();
                    } else {
                      this.$router.push({
                        path: "/Details",
                        name: "编辑",
                        query: { id: this.childByValuename }
                      });
                    }
                  }
                }
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消保存"
          });
        });
    },

    next() {
      console.log("test", this.conleng(this.test));
      console.log("tap", this.tap);
      console.log(this.shangradio);

      if (this.shangradio) {
        if (this.tap < this.ti.length) {
          this.tap++;
          this.active++;
          this.test[this.ti[this.tap - 1].id] = this.radio;
          if (this.tap != this.ti.length) {
            // console.log(this.test);

            this.timu = this.ti[this.tap].name;
            this.da = this.ti[this.tap].da;
            this.tiid = this.ti[this.tap].id;
            if (this.conleng(this.test) != this.tap) {
              this.radio = eval("this.test." + this.tiid);
            } else {
              this.radio = "";
            }
          }
        }

        if (this.tap == this.ti.length) {
          this.submitt();
        }
      } else {
        this.$message({
          type: "warning",
          message: "不能为空"
        });
      }
    },
    again() {
      this.$confirm("即将重新答题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.tap = 0;
          this.timu = this.ti[this.tap].name;
          this.da = this.ti[this.tap].da;
          this.tiid = this.ti[this.tap].id;
          this.test = {};
          this.radio = "";
          this.active = 0;
          this.rea = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消提交"
          });
        });
    },
    conleng(arr) {
      var newarr = Object.keys(arr);
      return newarr.length;
    },
    submitt() {
      var t;
      var answer = [];
      for (t in this.test) {
        answer.push(this.test[t]);
      }
      this.$ajax
        .post(
          process.env.API_HOST + "/personProblem/saveAnswer",
          `personId=${this.childByValuename}&answerArry=${JSON.stringify(
            answer
          )}`
        )
        .then(respones => {
          this.upti = false;
          this.rea = false;
          this.timu =
            "已完成\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
            respones.data.total +
            "分";
          this.retrunAnswer = respones.data.retrunAnswer;
          console.log(respones.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style  scoped>
.sheng {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  width: 750px;
}
.sheng:hover {
  white-space: normal;
  overflow: hidden;
}

.el-radio__label {
  font-size: 30px !important;
}
.evaluating {
  border: 1px solid rgba(250, 0, 255, 0);
  position: relative;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 50px;
}
.diss_y {
  height: 600px;
  overflow-y: auto;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 70%;
  height: 750px;
  margin-left: 460px;
  /* margin-top: 80px; */
}
.ruturn {
  margin-bottom: 30px;
  height: 30px;
}
.ruturn span {
  display: inline-block;
  /* height: 50px; */
  /* float: left;  */
}

.ruturn span:first-of-type {
  width: 20px;
  text-align: right;
  margin-right: 3px;
  overflow: hidden;
}
.ruturn span:nth-of-type(2) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 650px;
  margin-right: 80px;
}
#hov:hover {
  white-space: normal;
  overflow: hidden;
}
.ruturn span:nth-of-type(3) {
  /* width: 520px; */
  margin-left: 80px;
  color: #f56c6c;
}
</style>







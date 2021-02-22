<template>
  <div class="evaluating">
    <Personnelselection v-on:childByValue="childByValue" />
    <div v-show="stepshow=='step1'" class="Contentarea">
      <div class="top">
        <el-steps class="seniorindex_1-step1" :active="active" align-center>
          <el-step title="老年人日常生活活动能力"></el-step>
          <el-step title="精神状态与社会参与能力"></el-step>
          <el-step title="感知觉与沟通能力"></el-step>
        </el-steps>
      </div>
      <div class="problemfu seniorindex_1-step2">
        <div class="problem">
          <ul
            v-for="(classificationitem,classificationindex) in topicdata"
            :key="classificationindex"
            class="classification"
            :id="'topic'+classificationindex"
          >
            <li style="margin-bottom:20px;">
              <h2>{{classificationitem.topictype}}</h2>
            </li>
            <li
              v-for="(toticregionitem,toticregionindex) in classificationitem.topics"
              :key="toticregionindex"
              class="toticregion"
            >
              <h3 style="margin-bottom:10px;">{{toticregionindex+1}}.{{toticregionitem.topic}}</h3>
              <el-radio-group
                v-model="toticregionitem.choose"
                @change="addanswer(toticregionitem.id,toticregionitem.choose)"
              >
                <p v-for="(radioitem,radioindex) in toticregionitem.answers" :key="radioindex">
                  <el-radio style="margin-bottom:10px;" :label="radioitem.id">{{radioitem.answer}}</el-radio>
                </p>
              </el-radio-group>
            </li>
          </ul>
          <el-button class="next seniorindex_1-step3" type="primary" @click="nexttow">下一步</el-button>
        </div>
      </div>
    </div>
    <div v-show="stepshow=='step2'" class="Contentarea">
      <steptow :seniorsid="childByValuename" @childFn="changestepshow" />
    </div>
    <div v-show="stepshow=='step3'" id="myChart" class="Contentarearesult">
      <div class="result seniorindex_3-step1">
        <div class="score" v-if="endreturnvalue!=''">
          总分：
          <i style="color:#F56C6C;font-size:38px">{{endreturnvalue.evalPersonSummaryPO.score}}</i>&nbsp&nbsp分
        </div>
        <div class="radar"></div>
        <div class="introduce">
          <div v-if="endreturnvalue!=''" class="introduce_left">
            <li>日常生活活动分：{{endreturnvalue.evalPersonSummaryPO.activityscore}}分</li>
            <li>精神状态与社会参与分：{{endreturnvalue.evalPersonSummaryPO.mentalscore}}分</li>
            <li>感知觉与沟通分：{{endreturnvalue.evalPersonSummaryPO.perceptionscore}}分</li>
            <li>老年综合征罹患情况：{{endreturnvalue.evalPersonSummaryPO.syndromenum}}个</li>
            <li>老人能力评估等级：{{endreturnvalue.evalPersonSummaryPO.assessmentlevel}}</li>
            <li>护理需求评级：{{endreturnvalue.evalPersonSummaryPO.nursinglevel}}</li>
          </div>
          <div class="introduce_right seniorindex_3-step2">
            <p>请选择护理模板后，点击生成护理方案：</p>
            <el-select
              style="margin-top:15px;width:250px"
              v-model="Nursingtemplatevalue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in Nursingtemplates"
                :key="item.id"
                :label="item.classificationname"
                :value="item.id"
              ></el-option>
            </el-select>
            <!-- <el-checkbox style="margin-top:15px;" v-model="checked">显示金额</el-checkbox> -->
            <el-button
              type="primary"
              style="margin-top:15px;width:250px"
              @click="Generatenursingorno"
            >生成护理方案</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="stepshow=='step4'" class="Contentarea">
      <stepfour
        :fudata="zidata"
        :fudata2="zidata2"
        :zsummaryid="summaryid"
        @childfour="childfours"
      />
    </div>
    <div v-if="stepshow=='step5'" class="Contentarea">
      <stepfive :fusummaryId="summaryid" @childfour="childfours" />
    </div>
  </div>
</template>
<script>
import Personnelselection from "./Personnelselection.vue";
import steptow from "./steptow.vue";
import stepfour from "./stepfour.vue";
import stepfive from "./stepfive.vue";
import { drawLine } from "./Radar.js";
export default {
  components: {
    Personnelselection,
    steptow,
    stepfour,
    stepfive
  },
  inject: ["reload"],
  data() {
    return {
      checked: true,
      active: 0,
      childByValuename: "",
      // 步骤四所需数据
      zidata: [],
      zidata2: [],
      // 全部模板数据
      Nursingtemplates: [],
      // 已选中模板数据
      Nursingtemplatevalue: "",
      // 所有问题
      topicdata: [],
      // 第几步骤
      // stepshow: "step1",
      // 第一步骤所选中答案数组
      radiovalues: [],
      // 第二步答题所需的id
      summaryid: "",
      // 答题结束返回值
      endreturnvalue: ""
    };
  },
  beforeRouteLeave(to, form, next) {
    if (to.name == "编辑") {
      next();
    } else if (this.stepshow == "step5") {
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
  },
  created() {
    // 查询护理分类列表
    this.$functionarrs.getNursingClassificationList().then(data => {
      this.Nursingtemplates = data;
      this.Nursingtemplates.forEach(element => {
        if (element.classificationname == "标准方案") {
          this.Nursingtemplatevalue = element.id;
        }
      });
    });
    // 获取第一步骤答题内容
    this.$functionarrs.getTopicTree(1).then(data => {
      this.topicdata = data;
    });
  },
  destroyed() {
    this.$store.commit("changeStepshow", "step1");
  },
  mounted() {
    this.checkDivScroolTop();
  },
  computed: {
    sumlength() {
      let sum = 0;
      this.topicdata.forEach(element => {
        sum = sum + element.topics.length;
      });
      return sum;
    },
    // 步骤状态管理
    stepshow() {
      return this.$store.state.introJs.stepshow;
    }
  },
  methods: {
    // 是否生成生成护理方案
    Generatenursingorno() {
      // 获取方案接口
      this.$functionarrs
        .getNursingClassificationObj(this.Nursingtemplatevalue, this.summaryid)
        .then(data => {
          this.zidata = data;
          // this.stepshow = "step4";
          this.$store.commit("changeStepshow", "step4");
        });

      // 获取基础设施接口
      this.$functionarrs
        .getNursingChargeObj(this.Nursingtemplatevalue)
        .then(data => {
          this.zidata2 = data;
        });
    },

    // 监听滚动
    checkDivScroolTop() {
      //获取节点
      var scrollDiv = document.querySelector(".problemfu");
      //绑定事件
      let that = this;
      scrollDiv.addEventListener("scroll", function() {
        let topic_0 = document.querySelector("#topic0");
        let topic_1 = document.querySelector("#topic1");
        let topic_2 = document.querySelector("#topic2");
        if (scrollDiv.scrollTop < topic_0.clientHeight) {
          that.active = 1;
        } else if (
          scrollDiv.scrollTop >= topic_0.clientHeight &&
          scrollDiv.scrollTop < topic_0.clientHeight + topic_1.clientHeight
        ) {
          that.active = 2;
        } else {
          that.active = 3;
        }
      });
    },
    // 筛选表单所选中的值
    addanswer(topicid, answerid) {
      if (this.radiovalues.length == 0) {
        this.radiovalues.push({
          topicid: topicid,
          answerid: answerid,
          content: ""
        });
      } else {
        let topicidno = true;
        this.radiovalues.forEach((element, index) => {
          if (topicid == element.topicid) {
            topicidno = false;
            this.radiovalues.splice(index, 1, {
              topicid: topicid,
              answerid: answerid,
              content: ""
            });
          }
        });
        if (topicidno) {
          this.radiovalues.push({
            topicid: topicid,
            answerid: answerid,
            content: ""
          });
        }
      }
    },
    childByValue(val) {
      this.childByValuename = val;
    },
    // 完成第二步
    changestepshow(value) {
      // 第二部分能力部分答题结果
      this.$functionarrs
        .insertSecondStepAnswer(value, this.$store.state.token, this.summaryid)
        .then(data => {
          drawLine(data.networkDiagramList, ".radar");
          this.endreturnvalue = data;
          // this.stepshow = "step3";
          this.$store.commit("changeStepshow", "step3");
        });
    },
    // 第四步生成评估报告
    childfours(neworold) {
      this.$functionarrs
        .insertNursing(
          this.zidata,
          this.summaryid,
          this.$store.state.token,
          neworold,
          this.Nursingtemplatevalue,
          this.zidata2
        )
        .then(data => {
          if (data.state == "success") {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            // this.stepshow = "step5";
            this.$store.commit("changeStepshow", "step5");
          } else {
            this.$message({
              message: "网络原因请重试！",
              type: "warning"
            });
          }
        });
    },
    // 完成第一步
    nexttow() {
      if (this.radiovalues.length < this.sumlength) {
        this.$message({
          message: "请完整答题，不可漏选不选！",
          type: "warning"
        });
      } else {
        // 第一部分能力部分答题结果
        this.$functionarrs
          .insertFirstStepAnswer(
            this.radiovalues,
            this.$store.state.token,
            this.childByValuename
          )
          .then(data => {
            this.summaryid = data.id;
            // this.stepshow = "step2";
            this.$store.commit("changeStepshow", "step2");
          });
      }
    }
  }
};
</script>
<style  scoped>
.top {
  padding: 0 50px 25px 50px;
}
.el-radio__label {
  font-size: 30px !important;
}
.evaluating {
  border: 1px solid rgba(250, 0, 255, 0);
  position: relative;
}

.Contentarea {
  width: 100%;
  height: 694px;
}
.problemfu {
  height: 586px;
  padding-top: 25px;
  background-color: #fff;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}
.problem {
  /* height: 900px; */
  padding-left: 50px;
  padding-bottom: 100px;
  background-color: #fff;
  position: relative;
}
.toticregion {
  border-top: 1px solid #f0f2f5;
  padding: 20px 0 10px 0;
}
.classification {
  margin-bottom: 40px;
}
.classification .toticregion:last-of-type {
  border-bottom: 1px solid #f0f2f5;
}
.next {
  position: absolute;
  bottom: 30px;
  right: 30px;
}
.Contentarearesult {
  width: 620px;
  height: 700px;
  margin: 0 auto;
}
.score {
  width: 600px;
  margin: 10px auto;
  text-align: center;
  font-size: 26px;
  font-weight: 700;
}
.result {
  position: relative;
  height: 100%;
  background-color: #fff;
  border: 1px solid #eeeeee;
  border-radius: 4px;
}
.radar {
  width: 600px;
  height: 350px;
  background-color: #f3f3f3;
  margin: 10px auto;
  border-radius: 8px;
}
.introduce {
  width: 500px;
  font-size: 16px;
  margin: 30px auto;
}
.introduce_left {
  width: 250px;
  float: left;
}
.introduce_right {
  width: 250px;
  float: left;
  height: 200px;
}
.introduce_left li {
  margin-bottom: 10px;
}
</style>







<template>
  <div class="a4Resultfu seniorindex_5-step1">
    <div id="pdfDom2">
      <div class="page1">
        <h2 style="text-align: center;">希塔智能健康评估报告</h2>
        <h3>一、测评结果：</h3>
        <ul class="Result_font">
          <li>
            <span>姓名：{{prnPersonPO.fullname}}</span>
          </li>
          <li>
            <span>总分：{{evalPersonSummaryPO.score}}</span>
          </li>
          <li>
            <span>日常生活活动分：{{evalPersonSummaryPO.activityscore}}分</span>
          </li>
          <li>
            <span>精神状态与社会参与分：{{evalPersonSummaryPO.mentalscore}}分</span>
          </li>
          <li>
            <span>感知觉与沟通分：{{evalPersonSummaryPO.perceptionscore}}分</span>
          </li>
          <li>
            <span>老年综合征罹患情况：{{evalPersonSummaryPO.syndromenum}}个</span>
          </li>
          <li>
            <span>老人能力评估等级：{{evalPersonSummaryPO.assessmentlevel}}</span>
          </li>
          <li>
            <span>护理需求评级：{{evalPersonSummaryPO.nursinglevel}}</span>
          </li>
        </ul>
        <div class="radar2"></div>
      </div>
      <div class="page2" v-for="(item,index) in Nursingpage" :key="index">
        <ul class="nursingnames">
          <h2 v-if="index==0">二、护理内容</h2>
          <div style="text-align: right;" v-if="index==0" class="score">
            共收费：
            <i style="color:#F56C6C;font-size:38px">{{$store.state.charge}}</i>&nbsp&nbsp元
          </div>
          <li style="margin-left:20px" v-for="(item1,index1) in item" :key="index1">
            <span :style="{marginLeft:item1.shendu*20+'px'}">{{item1.nursingname}}</span>
            <span style="margin-left:20px" v-if="item1.chioos">{{item1.childnursingname}}</span>
            <span
              style="margin-left:20px"
              v-if="item1.chioos||item1.allcharge"
            >收费 {{item1.childcharge}} 元</span>
          </li>
        </ul>
      </div>
    </div>
    <el-button class="pdfbtn seniorindex_5-step2" type="primary" v-on:click="getPdf('#pdfDom2','评估结果')">下载为pdf</el-button>
  </div>
</template>

<script>
import { drawLine } from "./Radar.js";
export default {
  data() {
    return {
      num: 1,
      shendu: 0,
      newarrs: [],
      newarrsPage: [],
      // 护理内容数据
      personNursingList: [],
      // 文字部分数据
      evalPersonSummaryPO: [],
      // 雷达图部分数据
      evalPersonNetworkPOList: [],
      //   老人基本数据
      prnPersonPO: [],
      defaultProps: {
        children: "child",
        label: "nursingname"
      }
    };
  },
  props: {
    fusummaryId: null
  },
  created() {},
  mounted() {
    this.$functionarrs.getSummaryById(this.fusummaryId).then(data => {
      // 护理内容数据
      this.personNursingList = data.personNursingList;

      // 文字部分数据
      this.evalPersonSummaryPO = data.evalPersonSummaryPO;
      // 雷达图部分数据
      this.evalPersonNetworkPOList = data.evalPersonNetworkPOList;
      drawLine(data.evalPersonNetworkPOList, ".radar2");
      //   老人基本数据
      this.prnPersonPO = data.prnPersonPO;
      this.sumchargefor(this.personNursingList, 0);
    });
  },
  computed: {
    Nursingpage() {
      var result = [];
      for (var i = 0; i < this.newarrs.length; i += 22) {
        result.push(this.newarrs.slice(i, i + 22));
      }
      return result;
    }
  },
  methods: {
    sumchargefor(arr, shendu) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].child.length == 1 && arr[i].child[0].charge != undefined) {
          let duixiang = {};
          duixiang.id = arr[i].id;
          duixiang.nursingname = arr[i].nursingname;
          duixiang.shendu = shendu;
          duixiang.chioos = true;
          duixiang.childnursingname = arr[i].child[0].nursingname;
          duixiang.childcharge = arr[i].child[0].charge;
          this.newarrs.push(duixiang);
          delete arr[i].child;
        } else {
          if (arr[i].charge != undefined) {
            let duixiang = {};
            duixiang.id = arr[i].id;
            duixiang.allcharge = true;
            duixiang.childcharge = arr[i].charge;
            duixiang.nursingname = arr[i].nursingname;
            duixiang.shendu = shendu;
            this.newarrs.push(duixiang);
          } else {
            let duixiang = {};
            duixiang.id = arr[i].id;
            duixiang.nursingname = arr[i].nursingname;
            duixiang.shendu = shendu;
            this.newarrs.push(duixiang);
          }
        }
        if (arr[i].child && arr[i].child.length > 0) {
          this.sumchargefor(arr[i].child, shendu + 1);
        }
      }
    }
  }
};
</script>
<style>
.el-tree {
  background-color: transparent;
}
</style>
<style scoped>
.nursingnames li {
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #f0f2f5;
}
.Result_font {
  height: 176px;
  width: 560px;
  margin-left: 88px;
  margin-top: 16px;
}
.Result_font li {
  float: left;
  width: 50%;
  margin-bottom: 20px;
}
.a4Resultfu {
  width: 888px;
  margin: 0 auto;
  /* background-color: red; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  height: 95%;
  overflow-y: auto;
  padding-top: 26px;
  padding-bottom: 28px;
  position: relative;
  border-radius: 4px;
}
.pdfbtn {
  float: right;
  margin-right: 20px;
  margin-top: 22px;
}
#pdfDom2 {
  width: 788px;
  margin: 0 auto;
}
.page1,
.page2 {
  width: 608px;
  height: 955px;
  padding: 72px 90px 72px 90px;
  background: #fff url(../../../assets/Catalog.png) no-repeat;
  background-size: 100% 100%;
  background-color: #fff;
  margin-bottom: 20px;
}

.radar2 {
  width: 600px;
  height: 350px;
  /* border: 1px solid #f3f3f3; */
  background-color: #f3f3f3;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>
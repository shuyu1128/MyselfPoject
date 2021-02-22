<template>
    <div class="problemfu seniorindex_2-step1">
      <div class="problem">
        <ul
          v-for="(classificationitem,classificationindex) in topicdata"
          :key="classificationindex"
          class="classification"
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
              v-if="toticregionitem.answers.length!=0"
              v-model="toticregionitem.choose"
              @change="addanswer(toticregionitem.id,toticregionitem.choose)"
            >
              <p v-for="(radioitem,radioindex) in toticregionitem.answers" :key="radioindex">
                <el-radio style="margin-bottom:10px;" :label="radioitem.id">{{radioitem.answer}}</el-radio>
              </p>
            </el-radio-group>
            <el-input
              @blur="addanswers(toticregionitem.id,toticregionitem.choose)"
              v-else
              style="margin-bottom:10px;"
              v-model="toticregionitem.choose"
              placeholder="请输入"
            ></el-input>
          </li>
        </ul>
        <el-button class="next seniorindex_2-step2" type="primary" @click="nextthree">生成初步结果</el-button>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // 第二步骤所选中答案数组
      radiovalues: [],
      // 所有问题
      topicdata: [],
      // 第几步骤
      stepshow: "step1"
    };
  },
  props: {
    seniorsid: null
  },
  created() {
    // 获取第二步骤答题内容
    this.$functionarrs.getTopicTree(2).then(data => {
      this.topicdata = data;
    });
    // 获取第一步骤答题内容
  },

  methods: {
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
    addanswers(topicid, value) {
      if (this.radiovalues.length == 0) {
        this.radiovalues.push({
          topicid: topicid,
          answerid: "",
          content: value
        });
      } else {
        let topicidno = true;
        this.radiovalues.forEach((element, index) => {
          if (topicid == element.topicid) {
            topicidno = false;
            this.radiovalues.splice(index, 1, {
              topicid: topicid,
              answerid: "",
              content: value
            });
          }
        });
        if (topicidno) {
          this.radiovalues.push({
            topicid: topicid,
            answerid: "",
            content: value
          });
        }
      }
    },
    // 告诉父组件答题结束
    nextthree() {
      let flag = true;
      this.radiovalues.forEach(element => {
        if (element.content != "") {
          flag = false;
        }
      });

      if (flag) {
        if (this.radiovalues.length < this.topicdata[0].topics.length - 1) {
          this.$message({
            message: "请完整答题，不可漏选不选！",
            type: "warning"
          });
        } else {
          this.$emit("childFn", this.radiovalues);
        }
      } else {
        if (this.radiovalues.length < this.topicdata[0].topics.length) {
          this.$message({
            message: "请完整答题，不可漏选不选！",
            type: "warning"
          });
        } else {
          this.$emit("childFn", this.radiovalues);
        }
      }

      // this.$emit("childFn", this.radiovalues);
    }
  }
};
</script>

<style scoped>
.problemfu {
  height: 674px;
  padding-top: 25px;
  background-color: #fff;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}
.problem {
  /* height: 900px; */
  padding-left: 50px;
  background-color: #fff;
  position: relative;
  padding-bottom: 100px;
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
</style>
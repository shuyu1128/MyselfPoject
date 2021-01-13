<template>
  <div>
    <button
      v-show="nowroute=='/Details'&&show"
      type="button"
      class="baocun el-button el-button--success is-circle"
      @click="baocun"
    >
      <i class="el-icon-check"></i>
    </button>
    <div v-if="show">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>共{{nowScore}}分</span>
          <span style="margin-left:30px">{{nowCreateDate}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="neweval">重新测评</el-button>
        </div>
        <div class="dis_y">
          <div class="text item" v-for="(o,index) in nowRetrunAnswer" :key="index">
            <span>{{index+1}}.</span>
            <span>{{o.PROBLEM}}：</span>
            <br />
            <span style="margin-left:15px;">{{o.CHOICESUBJECT}}</span>
            <span style="margin-left:15px;">得分：{{o.SCORE}}</span>
          </div>
        </div>
      </el-card>
      <div class="conte">
        <quill-editor
          class="Notice-step3"
          style="height:92%"
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </div>
      <div class="program-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="1"
          :total="evaluatingvalue.length"
          :current-page="nowPage"
          @current-change="changePage"
        ></el-pagination>
      </div>
    </div>
    <div v-else>
      <el-row style="margin-top:20px" type="flex" class="row-bg" justify="center">
        <el-col :span="16">
          <p style="font-size:24px;color:#909399">
            当前选中人员未曾进行评估，请在
            <el-link style="font-size:24px" type="primary" @click="neweval">简单评估</el-link>页面进行评估！
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; //引入编辑器
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);
export default {
  data() {
    return {
      show: true,
      // 当前修改id
      nowId: "",
      // 当前选中总分
      nowScore: "",
      // 当前选中时间
      nowCreateDate: "",
      // 当前答题结果
      nowRetrunAnswer: [],
      // 当前页
      nowPage: 1,
      // 文本内容
      content: "",
      // 富文本编辑器配置项
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块

            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向

            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            ["clean", "link"], //清除字体样式
            // ['image','video']    //上传图片、上传视频
          ],
        },
        // // 图片拖拽
        // modules: {
        //   imageDrop: true
        // },
        // theme: "snow",
        placeholder: "请输入正文",
      },
      defaultdata: "",
      hevalturnVisible: false,
      evaluatingvalue: [],
      ue: "",
    };
  },
  props: {
    did: null,
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    nowroute() {
      return this.$route.path;
    },
  },
  created() {
    this.$ajax
      .post(
        process.env.API_HOST + "/personProblem/getHistoryProblemList",
        `personId=${this.did}`
      )
      .then((res) => {
        if (res.data.length === 0) {
          this.show = false;
        } else {
          this.show = true;
          this.evaluatingvalue = res.data;
          this.nowId = this.evaluatingvalue[0].id;
          // 当前选中总分
          this.nowScore = this.evaluatingvalue[0].total;
          // 当前选中时间
          this.nowCreateDate = this.evaluatingvalue[0].createDate;
          // 当前答题结果
          this.nowRetrunAnswer = this.evaluatingvalue[0].retrunAnswer;
          // 当前页
          this.nowPage = 1;
          // 文本内容
          this.content = res.data[0].comment;
        }
      });
  },
  watch: {
    did(val) {
      this.$ajax
        .post(
          process.env.API_HOST + "/personProblem/getHistoryProblemList",
          `personId=${this.did}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            this.show = false;
          } else {
            this.show = true;
            this.evaluatingvalue = res.data;
            this.nowId = this.evaluatingvalue[0].id;
            // 当前选中总分
            this.nowScore = this.evaluatingvalue[0].total;
            // 当前选中时间
            this.nowCreateDate = this.evaluatingvalue[0].createDate;
            // 当前答题结果
            this.nowRetrunAnswer = this.evaluatingvalue[0].retrunAnswer;
            // 当前页
            this.nowPage = 1;
            // 文本内容
            this.content = res.data[0].comment;
          }
        });
    },
  },
  methods: {
    changePage(page) {
      this.nowPage = page;
      this.nowId = this.evaluatingvalue[page - 1].id;
      // 当前选中总分
      this.nowScore = this.evaluatingvalue[page - 1].total;
      // 当前选中时间
      this.nowCreateDate = this.evaluatingvalue[page - 1].createDate;
      // 当前答题结果
      this.nowRetrunAnswer = this.evaluatingvalue[page - 1].retrunAnswer;
      // 文本内容
      this.content = this.evaluatingvalue[page - 1].comment;
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus(event) {
      if (this.nowroute == "/Detailsx") event.enable(false);
    }, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件

    baocun() {
      if (this.content == undefined) this.content = "";

      this.$ajax
        .post(
          process.env.API_HOST + "/personProblem/updateCommentById",
          `evaluatinginfoId=${this.nowId}&userid=${this.$store.token}&comment=${this.content}`
        )
        .then((res) => {
          if (res.data == "success") {
            this.$message({
              type: "success",
              message: "保存成功",
            });
            // 保存成功重新获取全部内容
            this.$ajax
              .post(
                process.env.API_HOST + "/personProblem/getHistoryProblemList",
                `personId=${this.did}`
              )
              .then((res) => {
                this.evaluatingvalue = res.data;
              });
            if (this.$store.state.hospitalshow) {
              this.$store.state.hospitalshowactive = true;
              this.$store.state.activeNames = "1";
              this.$store.state.actives = 3;
            }
          } else {
            this.$message({
              type: "warning",
              message: "保存失败",
            });
          }
        });
    },
    neweval() {
      this.$router.push({
        path: "/Evaluating",
        name: "简单评估",
        query: { id: this.did },
      });
    },
  },
};
</script>
<style scoped>
.program-page {
  position: absolute;
  bottom: 0;
}
.dis_y {
  height: 357px;
  overflow-y: auto;
}
.baocun {
  position: absolute;
  right: 10px;
  bottom: 2px;
  z-index: 2000;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.cd_body {
  height: 410px;
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
  width: 49%;
  float: left;
  margin-right: 10px;
}
.conte {
  width: 50%;
  height: 425px;
  float: left;
}
</style>

<template>
  <div class="notice">
    <!-- 选择公告区域弹窗 -->
    <el-dialog :close-on-click-modal="false" title="选择发布公告区域" :visible.sync="dialogFormVisible">
      <el-tree :data="treedata" show-checkbox node-key="id" ref="tree" highlight-current></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;">取 消</el-button>
        <el-button type="primary" @click="sureSend">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 页面内容 -->
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="20">
        <el-input class="Notice-step1" v-model="json.title" style="width:100%" placeholder="请输入标题"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select
          class="Notice-step2"
          v-model="json.newtype"
          placeholder="请选择类型"
          style="width:100%"
        >
          <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="24">
        <h3 class="time-center">{{time}}</h3>
      </el-col>
    </el-row>

    <quill-editor
      class="Notice-step3"
      style="height:75%"
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <el-button type="primary" class="sendBtn Notice-step4" @click="saveHtml">发送</el-button>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; //引入编辑器
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);
export default {
  name: "App",
  data() {
    return {
      // 选择公告区域弹窗状态
      treedata: [],
      dialogFormVisible: false,
      // 编辑公告内容区域
      json: {
        title: "",
        newtype: ""
      },
      content: "",
      type: [
        {
          value: "notice",
          label: "院内公告"
        },
        {
          value: "news",
          label: "院内新闻"
        }
      ],
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
            ["clean", "link"] //清除字体样式
            // ['image','video']    //上传图片、上传视频
          ]
        },
        // // 图片拖拽
        // modules: {
        //   imageDrop: true
        // },
        // theme: "snow",
        placeholder: "请输入正文"
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    time() {
      let d = new Date();
      let d2 =
        d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
      return d2;
    }
  },
  mounted() {},
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {
      
    }, // 内容改变事件
    // 验证信息是否填写完成
    saveHtml() {
      if (this.json.title == "") {
        this.$alert("请输入文章标题", "警告", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else if (this.json.newtype == "") {
        this.$alert("请选择文章类型", "警告", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else if (this.content == "") {
        this.$alert("请输入文章内容", "警告", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else {
        // 获取发布公告区域
        this.$ajax
          .post(
            process.env.API_HOST + "/dept/getDeptrightByUser",
            `userid=${this.$store.state.token}`
          )
          .then(res => {
            this.treedata = res.data;
            this.dialogFormVisible = true;
          });
      }
    },
    // 确认发送公告
    sureSend() {
      var ids = [];
      for (var i = 0; i < this.$refs.tree.getCheckedNodes().length; i++) {
        if (this.$refs.tree.getCheckedNodes()[i].type == "p") {
          console.log(this.$refs.tree.getCheckedNodes()[i] != "0");
          ids.push(this.$refs.tree.getCheckedNodes()[i].id);
        }
      }
      if (ids.length !== 0) {
        this.$ajax
          .post(
            process.env.API_HOST + "/news/insertNews",
            `json=${JSON.stringify(this.json)}&userid=${
              this.$store.getters.token
            }&userids=${JSON.stringify(ids)}&content=${encodeURI(this.content)}`
          )
          .then(res => {
            if (res.data == "success") {
              this.$message({
                message: "发送成功",
                type: "success"
              });
              // 清空公告内容
              this.json = {
                title: "",
                newtype: ""
              };
              this.content = "";
              // 关闭选择公告区域对话框
              this.dialogFormVisible = false;
            } else {
              this.$message.error("发送失败");
            }
            console.log(res.data);
          });
      } else {
        this.$alert("请选中带有人员的部门！", "警告", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    }
  }
};
</script>
<style>
/* .notice .ql-editor {
  height: 400px;
} */
</style>
<style scoped>
.notice {
  height: 100%;
}
.sendBtn {
  margin-top: 3%;
  float: right;
}
.time-center {
  float: right;
}
</style>

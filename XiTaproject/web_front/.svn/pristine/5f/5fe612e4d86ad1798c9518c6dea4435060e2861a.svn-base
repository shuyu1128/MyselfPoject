<template>
  <div>
    <el-tabs v-model="taptype" tab-position="left" style="height: 100%;">
      <el-tab-pane label="入院合同" key="contract" name="contract" class="zhi">
        <el-upload
          class="upload-demo"
          drag
          :action="acturl1"
          multiple
          :on-success="success"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :data="test"
          :show-file-list="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">请上传附件</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="体检报告" key="physical" name="physical" class="zhi">
        <el-upload
          class="upload-demo"
          drag
          :action="acturl2"
          multiple
          :on-success="success"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :data="test"
          :show-file-list="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">请上传附件</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="证件扫描件" key="credentials" name="credentials" class="zhi">
        <el-upload
          class="upload-demo"
          drag
          :action="acturl3"
          multiple
          :on-success="success"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :data="test"
          :show-file-list="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">请上传附件</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="其它" key="other" name="other" class="zhi">
        <el-upload
          class="upload-demo"
          drag
          :action="acturl4"
          multiple
          :on-success="success"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :data="test"
          :show-file-list="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">请上传附件</div>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
    <el-table
      max-height="460"
      class="table"
      :data="zhenlist"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" align="center" width="50"></el-table-column>
      <el-table-column prop="time" align="center" label="时间"></el-table-column>
      <el-table-column prop="title" align="left" label="标题" width="260"></el-table-column>
      <el-table-column prop="username" label="上传人"></el-table-column>
      <el-table-column prop="type" align="center" label="文档类型">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.type=='contract' ">入院合同</el-tag>
          <el-tag type="info" v-if="scope.row.type=='physical' ">体检报告</el-tag>
          <el-tag type="danger" v-if="scope.row.type=='credentials' ">证件扫描件</el-tag>
          <el-tag type="danger" v-if="scope.row.type=='other' ">其他</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="down(scope.row.id)">下载</el-button>

          <el-button
            v-if="show=='bianji'"
            type="danger"
            size="mini"
            @click="deletewen(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      taptype: "contract",
      type: "合同",
      username: this.$store.state.token,
      test: {},
      list: [],
      zhenlist: [],
      acturl1: `${process.env.API_HOST}/person/uploadFile?type=contract`,
      acturl2: `${process.env.API_HOST}/person/uploadFile?type=physical`,
      acturl3: `${process.env.API_HOST}/person/uploadFile?type=credentials`,
      acturl4: `${process.env.API_HOST}/person/uploadFile?type=other`,
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ]
    };
  },
  props: {
    did: null,
    show: null
  },
  created() {
    this.$ajax
      .post(
        process.env.API_HOST + "/person/getFileListByPersonid",
        `personid=${this.did}`
      )
      .then(respones => {
        this.list = respones.data;
        this.list.forEach(element => {
          if (element.type == this.taptype) {
            this.zhenlist.push(element);
          }
        });
        console.log(this.zhenlist);
        var personid = this.did;
        var username = this.username;
        var test = {
          personid,
          username
        };
        this.test = test;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  watch: {
    taptype(val) {
      this.zhenlist = [];
      this.list.forEach(element => {
        if (element.type == val) {
          this.zhenlist.push(element);
        }
      });
    },
    did(val) {
      this.zhenlist = [];
      this.$ajax
        .post(
          process.env.API_HOST + "/person/getFileListByPersonid",
          `personid=${this.did}`
        )
        .then(respones => {
          this.list = respones.data;
          this.list.forEach(element => {
            if (element.type == this.taptype) {
              this.zhenlist.push(element);
            }
          });
          var personid = this.did;
          var username = this.username;
          var test = {
            personid,
            username
          };
          this.test = test;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  methods: {
    deletewen(val) {
      this.$confirm("即将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.zhenlist = [];
          this.$ajax
            .post(process.env.API_HOST + "/person/delFileById", `id=${val}`)
            .then(respones => {
              this.$ajax
                .post(
                  process.env.API_HOST + "/person/getFileListByPersonid",
                  `personid=${this.did}`
                )
                .then(respones => {
                  this.list = respones.data;
                  this.list.forEach(element => {
                    if (element.type == this.taptype) {
                      this.zhenlist.push(element);
                    }
                  });
                });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    down(val) {
      window.location.href = `${process.env.API_HOST}/person/downLoad?id=${val}`;
    },
    error() {
      this.$message.warning("上传失败");
    },
    success(response, a, b) {
      this.$message("上传成功");
      this.zhenlist = [];
      this.$ajax
        .post(
          process.env.API_HOST + "/person/getFileListByPersonid",
          `personid=${this.did}`
        )
        .then(respones => {
          this.list = respones.data;
          this.list.forEach(element => {
            if (element.type == this.taptype) {
              this.zhenlist.push(element);
            }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleAvatarSuccess(response, file, fileList) {
      console.log(response);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      // this.$message.warning(
      //   `当前限制选择 3 个文件，本次选择了 ${
      //     files.length
      //   } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      // );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
<style scoped>
.upload-demo {
  width: 360px;
  float: left;
  margin-right: 20px;
  margin-left: 10px;
  margin-top: 50px;
}
.table {
  float: left;
  width: 61%;
}
.el-tabs--left,
.el-tabs--right {
  overflow: hidden;
  float: left;
}
/*  */
.baocun {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 999;
}
</style>



<template>
  <div class="panel1">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>护理方案</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="nowtemplate">新建方案</el-button>
      </div>

      <div
        class="Templatedata_row"
        :id="item.id===nursingListId?'active':'noactive'"
        v-for="item in nursingList"
        v-show="item.classificationname!='标准方案'"
        :key="item.id"
        @click="change(item.id)"
      >
        <span>{{item.classificationname}}</span>
        <li class="row" style="float:right">
          <el-button type="text" @click.stop="modify(item)">修改</el-button>
          <el-button type="text" @click.stop="zdelete(item.id)">删除</el-button>
        </li>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   当前选中id
      nowid: "",
    };
  },
  computed: {
    nursingList() {
      return this.$store.state.Evaluatiomaintenance.nursingList;
    },
    nursingListId() {
      return this.$store.state.Evaluatiomaintenance.nursingListId;
    },
  },
  watch: {
    // 监听护理分类列表当前选中被删除改变id
    nursingList(val) {
      console.log(val);
      let flag = false;
      val.forEach((element) => {
        if (element.id == this.nursingListId) {
          flag = true;
        }
      });
      if (!flag) {
        // 清空当前选中列表id
        this.$store.commit("changeNursingListId", "");
        this.$store.commit("changeSelectContent", null);
      }
    },
  },
  created() {
    // 查询护理分类列表
    this.$store.dispatch("getNursingClassificationList");
  },
  methods: {
    //   修改护理方案
    modify(data) {
      this.$prompt("是否修改模板名称：", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputValue: data.classificationname,
      })
        .then((value) => {
          if (
            value.value == null ||
            value.value == "" ||
            value.value.match(/^[ ]*$/)
          ) {
            this.$message({
              message: "请输入新名称！",
              type: "warning",
            });
            this.modify(data);
          } else {
            let object = {
              classificationname: value.value,
              createdby: data.createdby,
              createdtime: data.createdtime,
              id: data.id,
              state: data.state,
            };
            // 修改护理分类信息
            this.$store.dispatch(
              "evalNursing_updateNursingClassificationById",
              { obj: object, userid: this.$store.state.token }
            );
          }
        })
        .catch(() => {
          this.$message("取消修改");
        });
    },
    // 删除护理方案
    zdelete(id) {
      this.$confirm("即将删除方案, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("evalNursing_deleteNursingClassificationById", {
          id,
          userid: this.$store.state.token,
        });
      });
    },
    // 新增模板
    nowtemplate() {
      this.$prompt("是否新建模板：", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
      })
        .then((value) => {
          if (
            value.value == null ||
            value.value == "" ||
            value.value.match(/^[ ]*$/)
          ) {
            this.$message({
              message: "请输入名称！",
              type: "warning",
            });
            this.nowtemplate();
          } else {
            this.$store.dispatch("evalNursing_insertNursingClassification", {
              value: value.value,
              userid: this.$store.state.token,
            });
          }
        })
        .catch(() => {
          this.$message("取消新增");
        });
    },
    // 切换模板
    change(id) {
      this.nowid = id;
      // 更改vuex中状态
      this.$store.commit("changeNursingListId", id);
    },
  },
};
</script>
<style>
.el-message {
  z-index: 4000 !important;
}
.panel1 .el-card__body {
  height: 86%;
  overflow-y: auto;
}
</style>
<style scoped>
.box-card {
  height: 100%;
}
.Templatedata_row {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f2f2f2;
}
#active {
  background-color: #f2f2f2;
}
.Templatedata_row:hover {
  background-color: #f2f2f2;
}
</style>
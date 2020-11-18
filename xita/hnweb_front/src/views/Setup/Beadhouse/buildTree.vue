<template>
  <div class="buildTree">
    <!-- 添加院弹窗 -->
    <el-dialog :close-on-click-modal="false" title="初始化院" :visible.sync="createdVisible">
      <el-form :rules="rules" ref="ruleForm" :model="form">
        <el-form-item label="院名称" prop="name">
          <el-input maxlength="16" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="院编码" prop="code">
          <el-input maxlength="16" v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createdVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureCreatedTree('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 建筑结构 -->
    <!-- <el-tree
      v-if="allbuildTree.length!=0"
      :data="allbuildTree"
      node-key="value"
      default-expand-all
      :highlight-current="true"
      :expand-on-click-node="false"
      @node-click="choiceData"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => updata(node,data)">编辑</el-button>
          <el-button
            v-if="node.level!=1"
            type="text"
            size="mini"
            @click="() => remove(node, data)"
          >删除</el-button>
        </span>
      </span>
    </el-tree>-->
    <el-table
      v-if="allbuildTree.length!=0"
      :data="allbuildTree.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;"
      height="100%"
      row-key="value"
      :row-class-name="tableRowClassName"
      @row-click="choiceData"
      @expand-change="changeExpand"
      :expand-row-keys="expandList"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span class="build_name">{{scope.row.label}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="selectName" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button v-if="scope.row.level==1" size="mini" @click.stop="updata(scope.row)">编辑院信息</el-button>
          <el-button v-if="scope.row.level!=1" size="mini" @click.stop="updata(scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.level!=1"
            size="mini"
            type="danger"
            @click.stop="remove(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 没有建筑结构时的添加按钮 -->
    <div class="notree-p" v-else>
      <el-tag>当前无任何建筑结构，点击➕ 可初次创建院</el-tag>
      <br />
      <el-button class="notree-btn" icon="el-icon-plus" circle @click="createdVisible=true"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // expandList:['4e9ae26ec44a4978bcebc3650ae706bc'],
      search: "",
      createdVisible: false,
      form: {
        name: "",
        code: "",
      },
      rules: {
        name: [{ required: true, message: "请输入院名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入院编码", trigger: "blur" }],
      },
    };
  },
  computed: {
    selectName: {
      get() {
        return this.$store.state.beadhouse.selectName;
      },
      set(value) {
        this.$store.commit("updateSelectName", value);
        this.$store.dispatch("bed_getNursingHomesAllTree");
      },
    },
    allbuildTree() {
      return this.$store.state.beadhouse.allbuildTree;
    },
    // 默认展开行
    expandList() {
      return this.$store.state.beadhouse.expandList;
    },
  },
  created() {
    //   获取全部楼层树形结构
    this.$store.dispatch("bed_getNursingHomesAllTree");
  },
  methods: {
    changeExpand(data, type) {
      type
        ? this.$store.commit("addExpandList", data.value)
        : this.$store.commit("reduceExpandList", data.value);
    },
    // 选中表格变色
    tableRowClassName({ row }) {
      if (row.id === this.$store.state.beadhouse.nowParentId) {
        return "active-row";
      }
      return "";
    },
    //   选中节点
    choiceData(data) {
      this.$store.commit("changeLevel", data.level);
      this.$store.commit("changeNowParentId", data.value);
      this.$store.commit("changeNowNowlabel", data.label);
      this.$store.commit("changeContent", data.children);
    },
    // 编辑选中节点
    updata(data) {
      switch (data.level) {
        case "1":
          this.$store.commit("changeUpdataContent", data);
          this.$store.commit("openNursingHomeVisible");
          break;
        case "2":
          this.$store.commit("changeUpdataContent", data);
          this.$store.commit("openBuild");
          break;
        case "3":
          this.$store.commit("changeUpdataContent", data);
          this.$store.commit("openFloor");
          break;
        case "4":
          this.$store.commit("changeUpdataContent", data);
          this.$store.commit("openRoom");
          break;
        case "5":
          this.$store.commit("changeUpdataContent", data);
          this.$store.commit("openbed");
          break;
      }
    },
    // 删除选中节点
    remove(data) {
      this.$confirm("即将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          switch (data.level) {
            case "1":
              break;
            case "2":
              this.$store.dispatch("buildin_delBuilding", {
                id: data.value,
                userid: this.$store.state.token,
              });
              break;
            case "3":
              this.$store.dispatch("floor_delFloor", {
                id: data.value,
                userid: this.$store.state.token,
              });
              break;
            case "4":
              this.$store.dispatch("room_delRoom", {
                id: data.value,
                userid: this.$store.state.token,
              });
              break;
            case "5":
              this.$store.dispatch("bed_delBed", {
                id: data.value,
                userid: this.$store.state.token,
              });
              break;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    sureCreatedTree(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("nursingHome_insertNursingHome", {
              data: this.form,
              userid: this.$store.state.token,
            })
            .then((res) => {
              if (res === "yes") {
                this.createdVisible = false;
              }
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style>
.el-table .active-row {
  background: #f0f9eb;
}
</style>
<style scoped>
.buildTree {
  height: 100%;
  /* overflow-y: auto; */
  position: relative;
}
.build_name {
  display: inline-block;
  width: 71px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.notree-p {
  text-align: center;
  margin-top: 20px;
}
.notree-btn {
  margin-top: 10px;
}
</style>